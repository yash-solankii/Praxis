const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Common JavaScript utilities and data structures for LeetCode
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }

    toString() {
        const result = [];
        let current = this;
        const seen = new Set();
        
        while (current && !seen.has(current)) {
            seen.add(current);
            result.push(current.val);
            current = current.next;
        }
        return '[' + result.join(',') + ']';
    }
}

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    toString() {
        return `TreeNode(${this.val})`;
    }
}

// Helper functions for common LeetCode operations
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

function linkedListToArray(head) {
    const result = [];
    let current = head;
    const seen = new Set();
    
    while (current && !seen.has(current)) {
        seen.add(current);
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// Custom input function for test cases
function createInputFunction(testInput) {
    const lines = testInput.split('\n').filter(line => line.trim() !== '');
    let lineIndex = 0;
    
    return function input(prompt = "") {
        if (lineIndex >= lines.length) {
            throw new Error("EOF when reading a line");
        }
        
        const line = lines[lineIndex].trim();
        lineIndex++;
        return line;
    };
}

async function runCode() {
    try {
        // Set up timeout protection (10 seconds)
        const timeout = setTimeout(() => {
            throw new Error("Code execution timed out after 10 seconds");
        }, 10000);
        
        // Read input data from file (sent by backend)
        const inputFile = '/tmp/input.json';
        let inputData = null;
        let attempts = 0;
        const maxAttempts = 100; // 10 seconds max wait
        
        console.log("Waiting for input file...");
        
        // Wait for input file to be created and readable
        while (attempts < maxAttempts) {
            try {
                if (fs.existsSync(inputFile)) {
                    const content = fs.readFileSync(inputFile, 'utf8').trim();
                    if (content) {
                        inputData = content;
                        console.log(`Input file ready: ${content.length} characters`);
                        break;
                    }
                }
            } catch (error) {
                // File exists but not readable yet
            }
            
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (!inputData) {
            throw new Error("Input file not created within timeout");
        }
        
        const data = JSON.parse(inputData);
        const userCode = data.code;
        const testCases = data.testCases;
        
        console.log(`Running ${testCases.length} test cases`);
        
        const results = [];
        
        // Execute code against each test case
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            
            try {
                // Capture console.log output for this test case
                let output = '';
                
                // Create safe execution context using vm
                const context = {
                    // JavaScript built-ins
                    Math: Math,
                    Date: Date,
                    JSON: JSON,
                    parseInt: parseInt,
                    parseFloat: parseFloat,
                    isNaN: isNaN,
                    isFinite: isFinite,
                    encodeURIComponent: encodeURIComponent,
                    decodeURIComponent: decodeURIComponent,
                    encodeURI: encodeURI,
                    decodeURI: decodeURI,
                    
                    // Data types
                    Object: Object,
                    Array: Array,
                    String: String,
                    Number: Number,
                    Boolean: Boolean,
                    Symbol: Symbol,
                    BigInt: BigInt,
                    RegExp: RegExp,
                    Map: Map,
                    Set: Set,
                    WeakMap: WeakMap,
                    WeakSet: WeakSet,
                    
                    // LeetCode specific
                    ListNode: ListNode,
                    TreeNode: TreeNode,
                    createLinkedList: createLinkedList,
                    linkedListToArray: linkedListToArray,
                    
                    // Error handling
                    Error: Error,
                    TypeError: TypeError,
                    ReferenceError: ReferenceError,
                    SyntaxError: SyntaxError,
                    RangeError: RangeError,
                    
                    // Input function for this test case
                    input: createInputFunction(String(testCase.input)),
                    
                    // Console.log that captures output
                    console: {
                        log: (...args) => {
                            const line = args.map(arg => {
                                if (typeof arg === 'object' && arg !== null) {
                                    try {
                                        return JSON.stringify(arg);
                                    } catch (e) {
                                        return String(arg);
                                    }
                                }
                                return String(arg);
                            }).join(' ');
                            output += line + '\n';
                        }
                    },
                    
                    // Global functions
                    global: undefined,
                    process: undefined,
                    require: undefined,
                    module: undefined,
                    exports: undefined,
                    Buffer: undefined,
                    
                    // Disable dangerous functions
                    eval: undefined,
                    Function: undefined,
                    setTimeout: undefined,
                    setInterval: undefined,
                    clearTimeout: undefined,
                    clearInterval: undefined
                };
                
                // Create VM context
                vm.createContext(context);
                
                // Execute user code in safe environment with timeout
                vm.runInContext(userCode, context, {
                    timeout: 5000, // 5 second timeout per test case
                    displayErrors: true
                });
                
                // Get the output and clean it
                const actualOutput = output.trim();
                const expectedOutput = String(testCase.expected).trim();
                
                // Normalize string quotes for comparison
                function normalizeQuotes(s) {
                    if ((s.startsWith("'") && s.endsWith("'")) || 
                        (s.startsWith('"') && s.endsWith('"'))) {
                        return s.slice(1, -1);
                    }
                    return s;
                }
                
                const normalizedActual = normalizeQuotes(actualOutput);
                const normalizedExpected = normalizeQuotes(expectedOutput);
                
                // Create test result
                results.push({
                    testCase: i + 1,
                    input: testCase.input,
                    expected: expectedOutput,
                    actual: actualOutput,
                    passed: normalizedActual === normalizedExpected
                });
                
                console.log(`Test ${i + 1}: ${normalizedActual === normalizedExpected ? 'PASS' : 'FAIL'}`);
                
            } catch (error) {
                // Handle execution errors gracefully
                console.log(`Test ${i + 1}: ERROR - ${error.message}`);
                
                results.push({
                    testCase: i + 1,
                    input: testCase.input,
                    expected: String(testCase.expected),
                    actual: `Error: ${error.message}`,
                    passed: false,
                    error_details: error.stack
                });
            }
        }
        
        clearTimeout(timeout);
        
        const passedTests = results.filter(r => r.passed).length;
        console.log(`Completed: ${passedTests}/${results.length} tests passed`);
        
        // Return successful results
        const resultJson = JSON.stringify({
            success: true,
            results: results,
            language: 'javascript'
        });
        
        console.log(resultJson);
        
        // Also write to file for reliable reading
        fs.writeFileSync('/tmp/output.json', resultJson);
        
    } catch (error) {
        console.error('Execution failed:', error.message);
        
        const errorJson = JSON.stringify({
            success: false,
            error: error.message,
            traceback: error.stack,
            language: 'javascript'
        });
        
        console.log(errorJson);
        
        // Also write to file for reliable reading
        fs.writeFileSync('/tmp/output.json', errorJson);
    }
}

// Run the code
console.log('JavaScript code runner starting...');
runCode().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});