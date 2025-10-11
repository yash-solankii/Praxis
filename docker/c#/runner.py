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
        
        for i, test_case in enumerate(test_cases):
            try:
                csharp_template = f"""
using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{{
    public static void Main()
    {{
        List<string> inputLines = new List<string>();
        string line;
        while ((line = Console.ReadLine()) != null)
        {{
            inputLines.Add(line);
        }}
        
        {user_code}
    }}
}}
"""
                
                with tempfile.NamedTemporaryFile(mode='w', suffix='.cs', delete=False) as f:
                    f.write(csharp_template)
                    cs_file = f.name
                
                try:
                    exe_file = cs_file.replace('.cs', '')
                    
                    compile_result = subprocess.run([
                        'dotnet', 'new', 'console', '-n', 'TempProject', '--force'
                    ], cwd=os.path.dirname(cs_file), capture_output=True, text=True, timeout=10)
                    
                    if compile_result.returncode != 0:
                        results.append({
                            'testCase': i + 1,
                            'input': test_case['input'],
                            'expected': str(test_case['expected']),
                            'actual': f"Project creation error: {compile_result.stderr}",
                            'passed': False
                        })
                        continue
                    
                    project_dir = os.path.join(os.path.dirname(cs_file), 'TempProject')
                    program_file = os.path.join(project_dir, 'Program.cs')
                    
                    with open(program_file, 'w') as f:
                        f.write(csharp_template)
                    
                    build_result = subprocess.run([
                        'dotnet', 'build', '-c', 'Release'
                    ], cwd=project_dir, capture_output=True, text=True, timeout=10)
                    
                    if build_result.returncode != 0:
                        results.append({
                            'testCase': i + 1,
                            'input': test_case['input'],
                            'expected': str(test_case['expected']),
                            'actual': f"Compilation Error: {build_result.stderr}",
                            'passed': False
                        })
                        continue
                    
                    exec_result = subprocess.run([
                        'dotnet', 'run', '-c', 'Release', '--no-build'
                    ], cwd=project_dir, input=str(test_case['input']), 
                       capture_output=True, text=True, timeout=5)
                    
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
                    for cleanup_path in [cs_file, exe_file]:
                        try:
                            if os.path.exists(cleanup_path):
                                os.unlink(cleanup_path)
                        except:
                            pass
                    
                    try:
                        import shutil
                        if os.path.exists(project_dir):
                            shutil.rmtree(project_dir)
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