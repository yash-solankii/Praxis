import json
import subprocess
import os
import tempfile
import time

def run_code():
    """C++ code execution with compilation"""
    try:
        print("C++ code runner starting")
        
        # Read input (same pattern as your Python runner)
        input_file = '/tmp/input.json'
        timeout = 10
        start_time = time.time()
        
        while True:
            if os.path.exists(input_file):
                try:
                    with open(input_file, 'r') as f:
                        content = f.read().strip()
                    if content:
                        print(f"Input file ready: {len(content)} characters")
                        break
                except Exception as e:
                    print(f"File exists but not readable: {e}")
            
            if time.time() - start_time > timeout:
                raise ValueError("Input file not created within timeout")
            time.sleep(0.1)
        
        data = json.loads(content)
        user_code = data['code']
        test_cases = data['testCases']
        
        print(f"Running {len(test_cases)} test cases")
        
        results = []
        
        for i, test_case in enumerate(test_cases):
            try:
                # Create C++ template with user code
                cpp_template = f"""
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <climits>
#include <cmath>
#include <sstream>

using namespace std;

// LeetCode structures
struct ListNode {{
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {{}}
    ListNode(int x) : val(x), next(nullptr) {{}}
    ListNode(int x, ListNode *next) : val(x), next(next) {{}}
}};

struct TreeNode {{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {{}}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {{}}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {{}}
}};

{user_code}
"""
                
                # Compile and execute (same robust pattern as Python runner)
                with tempfile.NamedTemporaryFile(mode='w', suffix='.cpp', delete=False) as f:
                    f.write(cpp_template)
                    cpp_file = f.name
                
                try:
                    exe_file = cpp_file.replace('.cpp', '')
                    
                    # Compile with security flags
                    compile_result = subprocess.run([
                        'g++', '-std=c++17', '-O2', '-Wall', '-Wextra',
                        '-fstack-protector-strong', cpp_file, '-o', exe_file
                    ], capture_output=True, text=True, timeout=10)
                    
                    if compile_result.returncode != 0:
                        results.append({
                            'testCase': i + 1,
                            'input': test_case['input'],
                            'expected': str(test_case['expected']),
                            'actual': f"Compilation Error: {compile_result.stderr}",
                            'passed': False
                        })
                        continue
                    
                    # Execute with timeout
                    exec_result = subprocess.run([
                        exe_file
                    ], input=str(test_case['input']), capture_output=True, 
                       text=True, timeout=5)
                    
                    actual_output = exec_result.stdout.strip()
                    expected_output = str(test_case['expected']).strip()
                    passed = actual_output == expected_output
                    
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': expected_output,
                        'actual': actual_output,
                        'passed': passed
                    })
                    
                    print(f"{'PASS' if passed else 'FAIL'} Test {i + 1}")
                    
                finally:
                    # Cleanup
                    for file_path in [cpp_file, exe_file]:
                        try:
                            if os.path.exists(file_path):
                                os.unlink(file_path)
                        except:
                            pass
                            
            except Exception as e:
                results.append({
                    'testCase': i + 1,
                    'input': test_case['input'],
                    'expected': str(test_case['expected']),
                    'actual': f"Error: {str(e)}",
                    'passed': False
                })
        
        # Output results (same format as your other runners)
        passed_tests = len([r for r in results if r['passed']])
        print(f"Completed: {passed_tests}/{len(results)} tests passed")
        
        result_json = json.dumps({
            'success': True,
            'results': results,
            'language': 'cpp'
        })
        
        print(result_json)
        with open('/tmp/output.json', 'w') as f:
            f.write(result_json)
            
    except Exception as e:
        error_json = json.dumps({
            'success': False,
            'error': str(e),
            'language': 'cpp'
        })
        print(error_json)
        with open('/tmp/output.json', 'w') as f:
            f.write(error_json)

if __name__ == "__main__":
    run_code()