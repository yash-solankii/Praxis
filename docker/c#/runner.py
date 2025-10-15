import json
import subprocess
import os
import tempfile
import time

def run_code():
    try:
        print("C# Code Runner Starting...")
        
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
        
        # Create C# template ONCE
        csharp_template = f"""
using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{{
    public static void Main()
    {{
        {user_code}
    }}
}}
"""
        
        # Create a unique temporary directory for this submission
        temp_dir = tempfile.mkdtemp(prefix='csharp_')
        project_name = f"Project_{int(time.time() * 1000)}"
        project_dir = os.path.join(temp_dir, project_name)
        
        try:
            # Create project ONCE
            create_result = subprocess.run([
                'dotnet', 'new', 'console', '-n', project_name, '--force'
            ], cwd=temp_dir, capture_output=True, text=True, timeout=10)
            
            if create_result.returncode != 0:
                # If project creation fails, all tests fail
                for i, test_case in enumerate(test_cases):
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': str(test_case['expected']),
                        'actual': f"Project creation error: {create_result.stderr}",
                        'passed': False
                    })
                print(f"Completed: 0/{len(test_cases)} tests passed")
                return results
            
            # Write user code to Program.cs
            program_file = os.path.join(project_dir, 'Program.cs')
            with open(program_file, 'w') as f:
                f.write(csharp_template)
            
            # Build ONCE
            build_result = subprocess.run([
                'dotnet', 'build', '-c', 'Release', '--nologo', '--verbosity', 'quiet'
            ], cwd=project_dir, capture_output=True, text=True, timeout=15)
            
            if build_result.returncode != 0:
                # If compilation fails, all tests fail
                for i, test_case in enumerate(test_cases):
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': str(test_case['expected']),
                        'actual': f"Compilation Error: {build_result.stderr}",
                        'passed': False
                    })
                print(f"Completed: 0/{len(test_cases)} tests passed")
                return results
            
            print(f"Build successful, running {len(test_cases)} test cases")
            
            # Run for each test case
            for i, test_case in enumerate(test_cases):
                try:
                    exec_result = subprocess.run([
                        'dotnet', 'run', '-c', 'Release', '--no-build', '--nologo'
                    ], cwd=project_dir, input=str(test_case['input']), 
                       capture_output=True, text=True, timeout=5)
                    
                    actual_output = exec_result.stdout.strip()
                    expected_output = str(test_case['expected']).strip()
                    passed = actual_output == expected_output
                    
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': expected_output,
                        'actual': actual_output if exec_result.returncode == 0 else f"Runtime Error: {exec_result.stderr}",
                        'passed': passed
                    })
                    
                    print(f"{'PASS' if passed else 'FAIL'} Test {i + 1}")
                    
                except subprocess.TimeoutExpired:
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': str(test_case['expected']),
                        'actual': 'Error: Execution timeout (5 seconds)',
                        'passed': False
                    })
                    print(f"TIMEOUT Test {i + 1}")
                    
                except Exception as e:
                    results.append({
                        'testCase': i + 1,
                        'input': test_case['input'],
                        'expected': str(test_case['expected']),
                        'actual': f"Error: {str(e)}",
                        'passed': False
                    })
                    print(f"ERROR Test {i + 1}: {e}")
                    
        finally:
            # Cleanup temporary directory
            try:
                import shutil
                if os.path.exists(temp_dir):
                    shutil.rmtree(temp_dir, ignore_errors=True)
            except Exception as e:
                print(f"Cleanup warning: {e}")
        
        passed_tests = len([r for r in results if r['passed']])
        print(f"Completed: {passed_tests}/{len(results)} tests passed")
        
        result_json = json.dumps({
            'success': True,
            'results': results,
            'language': 'csharp'
        })
        
        print(result_json)
        with open('/tmp/output.json', 'w') as f:
            f.write(result_json)
            
    except Exception as e:
        error_json = json.dumps({
            'success': False,
            'error': str(e),
            'language': 'csharp'
        })
        print(error_json)
        with open('/tmp/output.json', 'w') as f:
            f.write(error_json)

if __name__ == "__main__":
    run_code()