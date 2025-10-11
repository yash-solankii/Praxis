import sys
import json
import io
import contextlib
import signal
import traceback
import math
import random
import string
import itertools
import functools
import operator
import bisect
import heapq
import collections
import subprocess
import tempfile
import os
import time
from collections import *
from itertools import *
from functools import *
from typing import *

# Import scientific libraries 
try:
    import numpy as np
    import pandas as pd
    import scipy
    import networkx as nx
    from sortedcontainers import SortedList, SortedDict, SortedSet
    HAS_SCIENTIFIC_LIBS = True
except ImportError:
    HAS_SCIENTIFIC_LIBS = False

def timeout_handler(signum, frame):
    """Handle execution timeout"""
    raise TimeoutError("Code execution timed out after 10 seconds")

class ListNode:
    """Standard LeetCode ListNode definition"""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __repr__(self):
        """Convert linked list to readable format"""
        result = []
        current = self
        seen = set()  # Prevent infinite loops
        while current and id(current) not in seen:
            seen.add(id(current))
            result.append(str(current.val))
            current = current.next
        return '[' + ','.join(result) + ']'

class TreeNode:
    """Standard LeetCode TreeNode definition"""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def __repr__(self):
        return f"TreeNode({self.val})"

def create_linked_list(arr):
    """Helper function to create linked list from array"""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def linked_list_to_array(head):
    """Helper function to convert linked list to array"""
    result = []
    current = head
    seen = set()
    while current and id(current) not in seen:
        seen.add(id(current))
        result.append(current.val)
        current = current.next
    return result

def create_user_code_wrapper(user_code, test_input, has_scientific_libs=False):
    """Create a complete Python script that includes all necessary imports and user code"""
    
    scientific_imports = ""
    if has_scientific_libs:
        scientific_imports = """
# Scientific libraries (if available)
try:
    import numpy as np
    import pandas as pd
    import scipy
    import networkx as nx
    from sortedcontainers import SortedList, SortedDict, SortedSet
except ImportError:
    pass
"""
    
    # Simple approach: Just add all imports and helpers, then user code as-is
    wrapper_code = f"""import sys
import json
import math
import random
import string
import itertools
import functools
import operator
import bisect
import heapq
import collections
from collections import *
from itertools import *
from functools import *
from typing import *

{scientific_imports}

# LeetCode helper classes and functions
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __repr__(self):
        result = []
        current = self
        seen = set()
        while current and id(current) not in seen:
            seen.add(id(current))
            result.append(str(current.val))
            current = current.next
        return '[' + ','.join(result) + ']'

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def __repr__(self):
        return f"TreeNode({{self.val}})"

def create_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def linked_list_to_array(head):
    result = []
    current = head
    seen = set()
    while current and id(current) not in seen:
        seen.add(id(current))
        result.append(current.val)
        current = current.next
    return result

# Input handling for test case
test_input_data = {json.dumps(test_input)}
input_lines = test_input_data.split('\\n') if test_input_data else ['']
input_line_index = 0

def input(prompt=""):
    global input_line_index
    if input_line_index >= len(input_lines):
        raise EOFError("EOF when reading a line")
    
    line = input_lines[input_line_index]
    if line.endswith('\\n'):
        line = line[:-1]
    input_line_index += 1
    return line

# User code - executed directly
{user_code}
"""
    
    return wrapper_code

def execute_user_code_subprocess(user_code, test_case):
    """Execute user code in a subprocess for better isolation"""
    try:
        # Prepare test input
        test_input = str(test_case['input'])
        if '\n' not in test_input and test_input.strip():
            test_input += '\n'
        
        # Create wrapper code
        wrapper_code = create_user_code_wrapper(user_code, test_input, HAS_SCIENTIFIC_LIBS)
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as temp_file:
            temp_file.write(wrapper_code)
            temp_file_path = temp_file.name
        
        try:
            # Execute in subprocess with timeout and proper environment
            result = subprocess.run([
                sys.executable, temp_file_path
            ],
            capture_output=True,
            timeout=5,  # 5 second timeout per test case
            text=True,
            encoding='utf-8',
            env={
                **os.environ,
                'PYTHONHASHSEED': '0',  # Deterministic hashing
                'PYTHONUNBUFFERED': '1'  # Unbuffered output
            }
            )
            
            return result.stdout, result.stderr, result.returncode
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file_path)
            except:
                pass  # Ignore cleanup errors
                
    except subprocess.TimeoutExpired:
        return "", "Error: Code execution timed out after 5 seconds", 1
    except Exception as e:
        return "", f"Error: Subprocess execution failed: {e}", 1

def run_code():
    """Main function that executes user code safely using subprocess"""
    try:
        # Set up timeout protection (10 seconds total)
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(10)
        
        # Read input data from file (sent by backend)
        input_file = '/tmp/input.json'
        
        # Also try to read from stdin as fallback
        stdin_input = None
        try:
            import select
            if select.select([sys.stdin], [], [], 0)[0]:
                stdin_input = sys.stdin.read()
                if stdin_input.strip():
                    print("📥 Input received via stdin")
        except:
            pass
        
        # Wait for input file to be created (with timeout)
        timeout = 10  # 10 seconds to wait for file
        start_time = time.time()
        
        # First, check if file exists immediately
        if os.path.exists(input_file):
            # File exists, but let's also check if it's readable and has content
            try:
                with open(input_file, 'r') as f:
                    content = f.read().strip()
                if content:
                    print(f"Input file found and readable: {len(content)} characters")
                else:
                    print("Input file exists but is empty, waiting...")
            except Exception as e:
                print(f"Input file exists but not readable: {e}, waiting...")
        
        # Wait for file to be created and readable
        while True:
            if os.path.exists(input_file):
                try:
                    # Try to read the file to ensure it's fully written
                    with open(input_file, 'r') as f:
                        content = f.read().strip()
                    if content:
                        print(f"Input file ready: {len(content)} characters")
                        break
                    else:
                        print("File exists but empty, waiting...")
                except Exception as e:
                    print(f"File exists but not readable: {e}, waiting...")
            
            if time.time() - start_time > timeout:
                # List directory contents for debugging
                try:
                    files = os.listdir('/tmp')
                    print(f"Timeout waiting for input file. Directory contents: {files}")
                except Exception as e:
                    print(f"Timeout waiting for input file. Cannot list directory: {e}")
                raise ValueError("Input file not created within timeout")
            
            time.sleep(0.1)
        
        # Read and parse the input data (try file first, then stdin)
        input_data = None
        
        if os.path.exists(input_file):
            try:
                with open(input_file, 'r') as f:
                    input_data = f.read().strip()
                print("Input data read from file")
            except Exception as e:
                print(f"Failed to read from file: {e}")
        
        # Fallback to stdin if file reading failed
        if not input_data and stdin_input:
            input_data = stdin_input.strip()
            print("Input data read from stdin")
        
        if not input_data:
            raise ValueError("No input data available from file or stdin")
            
        data = json.loads(input_data)
        
        user_code = data['code']
        test_cases = data['testCases']
        
        print("Executing Python code with subprocess isolation")
        print(f"Running {len(test_cases)} test cases")
        
        results = []
        
        # Execute code against each test case using subprocess
        for i, test_case in enumerate(test_cases):
            try:
                print(f"Running test case {i + 1}...")
                
                # Execute user code in subprocess
                stdout, stderr, returncode = execute_user_code_subprocess(user_code, test_case)
                
                # Get the output and clean it
                actual_output = stdout.strip()
                expected_output = str(test_case['expected']).strip()
                
                # Handle execution errors
                if returncode != 0 or stderr:
                    error_msg = stderr.strip() if stderr else "Unknown execution error"
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': expected_output,
                        'actual': f"Error: {error_msg}",
                        'passed': False,
                        'error_details': stderr
                    })
                    print(f"Test {i + 1} failed with error: {error_msg}")
                    continue
                
                # Normalize string quotes for comparison
                def normalize_quotes(s):
                    if s.startswith("'") and s.endswith("'"):
                        return s[1:-1]
                    elif s.startswith('"') and s.endswith('"'):
                        return s[1:-1]
                    return s
                
                normalized_actual = normalize_quotes(actual_output)
                normalized_expected = normalize_quotes(expected_output)
                
                # Create test result
                test_passed = normalized_actual == normalized_expected
                results.append({
                    'testCase': i + 1,
                    'input': test_case['input'],
                    'expected': expected_output,
                    'actual': actual_output,
                    'passed': test_passed
                })
                
                status = "PASS" if test_passed else "FAIL"
                print(f"{status} Test {i + 1}: expected='{expected_output}', actual='{actual_output}'")
                
            except Exception as e:
                # Handle unexpected errors gracefully
                print(f"Test {i + 1} failed with exception: {e}")
                results.append({
                    'testCase': i + 1,
                    'input': test_case['input'],
                    'expected': str(test_case['expected']),
                    'actual': f"Error: {str(e)}",
                    'passed': False,
                    'error_details': traceback.format_exc()
                })
        
        # Calculate summary
        passed_tests = len([r for r in results if r['passed']])
        total_tests = len(results)
        print(f"Execution completed: {passed_tests}/{total_tests} tests passed")
        
        # Return successful results
        result_json = json.dumps({
            'success': True,
            'results': results,
            'language': 'python',
            'execution_method': 'subprocess'
        })
        print(result_json)
        
        # Also write to file for reliable reading
        with open('/tmp/output.json', 'w') as f:
            f.write(result_json)
        
    except Exception as e:
        # Handle overall execution errors
        print(f"Overall execution failed: {e}")
        error_json = json.dumps({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc(),
            'language': 'python',
            'execution_method': 'subprocess'
        })
        print(error_json)
        
        # Also write to file for reliable reading
        with open('/tmp/output.json', 'w') as f:
            f.write(error_json)
    finally:
        # Always cancel the timeout
        signal.alarm(0)

if __name__ == "__main__":
    print("🚀 Python Code Runner Starting with Subprocess Isolation...")
    run_code()