const Docker = require('dockerode');
const docker = new Docker();

class CodeExecutor {
    constructor() {
        // Use Docker Hub images if DOCKER_HUB_USERNAME is set, otherwise use local images
        const dockerHubUsername = process.env.DOCKER_HUB_USERNAME;
        
        if (dockerHubUsername) {
            this.imageMap = {
                'python': `${dockerHubUsername}/praxis-python-runner:latest`,
                'javascript': `${dockerHubUsername}/praxis-javascript-runner:latest`,
                'cpp': `${dockerHubUsername}/praxis-cpp-runner:latest`,
                'csharp': `${dockerHubUsername}/praxis-csharp-runner:latest`
            };
        } else {
            this.imageMap = {
                'python': 'python-code-runner',
                'javascript': 'javascript-code-runner',
                'cpp': 'cpp-code-runner',
                'csharp': 'csharp-code-runner'
            };
        }
        
        this.resourceLimits = {
            'python': {
                Memory: 256 * 1024 * 1024,
                CpuQuota: 50000,
                CpuPeriod: 100000,
            },
            'javascript': {
                Memory: 256 * 1024 * 1024,
                CpuQuota: 50000,
                CpuPeriod: 100000,
            },
            'cpp': {
                Memory: 512 * 1024 * 1024,
                CpuQuota: 100000,
                CpuPeriod: 100000,
            },
            'csharp': {
                Memory: 512 * 1024 * 1024,
                CpuQuota: 100000,
                CpuPeriod: 100000,
            }
        };

        this.executionTimeout = 15000;
    }

    async executeCode(code, testCases, language = 'python') {
        return new Promise((resolve, reject) => {
            const image = this.imageMap[language];
            if (!image) {
                reject(new Error(`Unsupported language: ${language}`));
                return;
            }

            if (!code || !code.trim()) {
                reject(new Error('Code cannot be empty'));
                return;
            }

            if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
                reject(new Error('Test cases are required'));
                return;
            }

            const inputData = {
                code: code.trim(),
                testCases: testCases
            };

            console.log(`Executing ${language} code with ${testCases.length} test cases`);

            const inputJson = JSON.stringify(inputData);

            const timeoutId = setTimeout(() => {
                reject(new Error(`Execution timeout (${this.executionTimeout / 1000} seconds)`));
            }, this.executionTimeout);

            const fs = require('fs');
            const path = require('path');
            const os = require('os');
            
            const tempDir = os.tmpdir();
            const inputFile = path.join(tempDir, 'input.json');
            
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            try {
                fs.writeFileSync(inputFile, inputJson, 'utf8');
                
                setTimeout(() => {
                    docker.run(
                        image, 
                        [],
                        null,
                        {
                            AttachStdout: true,
                            AttachStderr: true,
                            AttachStdin: false,
                            Tty: false,
                            HostConfig: {
                                ...this.resourceLimits[language],
                                NetworkMode: 'none',
                                ReadonlyRootfs: false,
                                AutoRemove: false,
                                PidsLimit: 50,
                                Binds: [`${tempDir}:/tmp:rw`]
                            }
                        }
                    ).then((result) => {
                        clearTimeout(timeoutId);
                        
                        const [stream, container] = result;
                        let output = '';
                        let errorOutput = '';

                        const waitForCompletion = () => {
                            container.wait((err, result) => {
                                if (err) {
                                    console.error('Error waiting for container:', err);
                                    cleanupAndResolve({ success: true, results: [], language: 'python' });
                                    return;
                                }
                                
                                container.logs({ stdout: true, stderr: true }, (logErr, logs) => {
                                    if (logErr) {
                                        console.error('Error getting container logs:', logErr);
                                        cleanupAndResolve({ success: true, results: [], language: 'python' });
                                        return;
                                    }
                                    
                                    output = logs.toString();
                                    console.log('Container output:', output.substring(0, 200) + (output.length > 200 ? '...' : ''));
                                    cleanupAndProcess();
                                });
                            });
                        };
                        
                        const cleanupAndResolve = (result) => {
                            container.remove({ force: true }, (removeErr) => {
                                if (removeErr) console.warn('Could not remove container:', removeErr.message);
                            });
                            resolve(result);
                        };
                        
                        const cleanupAndProcess = () => {
                            container.remove({ force: true }, (removeErr) => {
                                if (removeErr) console.warn('Could not remove container:', removeErr.message);
                            });
                            processStreamOutput();
                        };
                        
                        waitForCompletion();

                        function processStreamOutput() {
                            try {
                                if (errorOutput) {
                                    console.log('Container stderr:', errorOutput.substring(0, 200) + (errorOutput.length > 200 ? '...' : ''));
                                }

                                let cleanOutput = output.trim();
                                
                                if (cleanOutput.charCodeAt(0) === 1) {
                                    cleanOutput = cleanOutput.substring(8);
                                }
                                
                                const jsonStart = cleanOutput.indexOf('{');
                                if (jsonStart > 0) {
                                    cleanOutput = cleanOutput.substring(jsonStart);
                                }
                                
                                const resultData = JSON.parse(cleanOutput);
                                
                                if (resultData.success) {
                                    const passedTests = resultData.results.filter(r => r.passed).length;
                                    console.log(`Execution completed: ${passedTests}/${resultData.results.length} tests passed`);
                                    const failedTests = resultData.results.filter(r => !r.passed);
                                    if (failedTests.length > 0) {
                                        console.log('Failed tests:');
                                        failedTests.forEach(test => {
                                            console.log(`   Test ${test.testCase}: input=${test.input}, expected=${test.expected}, actual=${test.actual}`);
                                        });
                                    }
                                } else {
                                    console.log('Execution failed:', resultData.error);
                                }
                                
                                try {
                                    fs.unlinkSync(inputFile);
                                } catch (cleanupErr) {
                                    console.warn('Could not clean up input file:', cleanupErr.message);
                                }
                                
                                resolve(resultData);
                                
                            } catch (parseError) {
                                console.error('Failed to parse container output:', parseError.message);
                                console.error('Raw output was:', output);
                                reject(new Error(`Invalid output from container: ${parseError.message}`));
                            }
                        }
                        
                    }).catch((err) => {
                        clearTimeout(timeoutId);
                        console.error('Docker run failed:', err.message);
                        reject(new Error(`Docker execution failed: ${err.message}`));
                    });
                }, 100);
                
            } catch (writeError) {
                console.error('Failed to write input file:', writeError);
                clearTimeout(timeoutId);
                reject(new Error(`Failed to create input file: ${writeError.message}`));
                return;
            }
        });
    }

    async checkDockerHealth() {
        try {
            await docker.ping();
            return { healthy: true, message: 'Docker is running' };
        } catch (error) {
            return { healthy: false, message: `Docker not available: ${error.message}` };
        }
    }

    getAvailableLanguages() {
        return Object.keys(this.imageMap);
    }
}

module.exports = new CodeExecutor();