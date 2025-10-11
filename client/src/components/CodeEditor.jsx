// Code editor with language presets
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

// Starter snippets for each supported language
const languageTemplates = {
  javascript: {
    name: 'JavaScript',
    template: `/**
 * @param {any} input - problem input
 * @return {any} - expected output
 */
var solve = function(input) {
    // Write your solution here
    
};`,
    language: 'javascript'
  },
  python: {
    name: 'Python',
    template: `# Write your solution here

def main():
    """
    Your solution function
    """
    # Implementation goes here
    pass

# Test your solution
result = main()
print(result)`,
    language: 'python'
  },
  cpp: {
    name: 'C++',
    template: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // Write your solution here
    
    return 0;
}`,
    language: 'cpp'
  },
  csharp: {
    name: 'C#',
    template: `public class Solution {
    public object Solve(object input) {
        // Write your solution here
        return null;
    }
}`,
    language: 'csharp'
  }
};

export default function CodeEditor({ problemTitle , problemId }) {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(languageTemplates.python.template);
  
  // Code execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResults, setExecutionResults] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  
  // Test cases state
  const [activeTab, setActiveTab] = useState('testcases');
  const [customTestCases, setCustomTestCases] = useState([]);
  const [defaultTestCases, setDefaultTestCases] = useState([]);
  const [editableTestCase, setEditableTestCase] = useState('');

  // Initialize test cases when component mounts or the problem changes
  useEffect(() => {
    const initializeTestCases = async () => {
      const testCases = await getTestCasesForProblem(problemId);
      setDefaultTestCases(testCases);
    if (testCases && testCases.length > 0) {
      setEditableTestCase(testCases[0].input || '');
      console.log('Loaded test cases:', testCases.length);
    }
    };
    
    initializeTestCases();
  }, [problemId]);

  // Watch execution results to keep counts in sync
  useEffect(() => {
    if (executionResults) {
      const passed = executionResults.results?.filter(r => r.passed).length || 0;
      const total = executionResults.results?.length || 0;
      console.log(`Test results: ${passed}/${total} passed`);
    }
  }, [executionResults]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(languageTemplates[newLanguage].template);
    // Clear execution results when changing language
    setExecutionResults(null);
    setExecutionError(null);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  // Execute the snippet with live test cases
  const handleRun = async () => {
    if (!code.trim()) {
      setExecutionError('Please write some code first!');
      setActiveTab('results');
      return;
    }

    if (!['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage)) {
      setExecutionError('Only Python, JavaScript, C++, and C# execution are currently supported!');
      setActiveTab('results');
      return;
    }

    setIsExecuting(true);
    setExecutionResults(null);
    setExecutionError(null);
    setActiveTab('results');

    try {
      // Prefer custom test cases when available
      let testCases;
      if (customTestCases.length > 0) {
        testCases = customTestCases;
        console.log('Using custom test cases:', customTestCases.length);
      } else {
        // When no custom cases exist, fall back to the default pool
        const availableTestCases = defaultTestCases.length > 0 ? defaultTestCases : await getTestCasesForProblem(problemId);
        if (availableTestCases && availableTestCases.length > 0) {
          testCases = [availableTestCases[0]];
          console.log('Using first default test case');
        } else {
          testCases = availableTestCases;
          console.log('Using all available test cases:', availableTestCases?.length || 0);
        }
      }
      
      if (!testCases || testCases.length === 0) {
        throw new Error('No test cases available for this problem');
      }

      console.log('Executing code for problem:', problemId, 'with', testCases.length, 'test cases');
      
      const response = await fetch(getApiUrl(API_ENDPOINTS.EXECUTE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          testCases: testCases,
          language: selectedLanguage
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Execution failed');
      }

      const passed = result.results?.filter(r => r.passed).length || 0;
      const total = result.results?.length || 0;
      console.log(`Client: ${passed}/${total} tests passed`);
      
      setExecutionResults(result);

    } catch (error) {
      console.error('❌ Execution error:', error);
      setExecutionError(error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  // Fetch test cases for the active problem
  const getTestCasesForProblem = async (currentProblemId) => {
    try {
      // Fetch test cases from the API
      const response = await fetch(getApiUrl(API_ENDPOINTS.PROBLEM_BY_ID(currentProblemId)));
      if (response.ok) {
        const problemData = await response.json();
        return problemData.testCases || problemData.problem?.testCases || [];
      }
      
      // If API call fails, return empty array
      console.error('Failed to fetch test cases from API');
      return [];
    } catch (error) {
      console.error('Error fetching test cases:', error);
      return [];
    }
  };

  // Handle custom test cases
  const addCustomTestCase = () => {
    setCustomTestCases([...customTestCases, { input: '', expected: '' }]);
  };

  const updateCustomTestCase = (index, field, value) => {
    const updated = [...customTestCases];
    updated[index][field] = value;
    setCustomTestCases(updated);
  };

  const removeCustomTestCase = (index) => {
    const updated = customTestCases.filter((_, i) => i !== index);
    setCustomTestCases(updated);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit code');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code before submitting!');
      return;
    }
    
    // Use the problemId prop (convert string to number)
    const currentProblemId = problemId ? parseInt(problemId) : 1;
    
    console.log('ProblemId from props:', problemId, 'Type:', typeof problemId);
    console.log('Converted problemId:', currentProblemId, 'Type:', typeof currentProblemId);
    
    try {
      console.log('Submitting code...');
      
      // For submission, the backend automatically fetches visible and hidden tests
      const response = await fetch(getApiUrl(API_ENDPOINTS.SUBMIT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          problemId: currentProblemId,
          code: code,
          language: selectedLanguage
          // No testCases sent - backend will fetch visible + hidden test cases
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`✅ Submission successful!\nStatus: ${data.submission.status}\nAcceptance: ${data.submission.acceptance}`);
      } else {
        alert(`❌ Submission failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Network error. Please try again.');
    }
  };

  return (
    <div style={{ 
      border: '1px solid rgba(147, 51, 234, 0.3)', 
      borderRadius: '10px', 
      overflow: 'hidden',
      background: 'rgba(25, 25, 40, 0.8)',
      backdropFilter: 'blur(10px)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      boxShadow: '0 4px 16px rgba(82, 39, 255, 0.2)'
    }}>
      {/* Editor Header */}
      <div style={{ 
        padding: '10px 14px', 
        background: 'rgba(15, 15, 35, 0.9)', 
        borderBottom: '1px solid rgba(147, 51, 234, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label htmlFor="language-select" style={{ fontWeight: 'bold', color: 'white' }}>
            Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{
              padding: '6px 12px',
              border: '1px solid rgba(147, 51, 234, 0.4)',
              borderRadius: '6px',
              background: 'rgba(82, 39, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            {Object.entries(languageTemplates).map(([key, lang]) => (
              <option key={key} value={key} style={{ background: '#1a1a2e', color: 'white' }}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
         <div style={{ display: 'flex', gap: '8px' }}>
           <button
             onClick={handleRun}
             disabled={isExecuting || !['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage)}
             style={{
               padding: '6px 14px',
               background: ['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage) ? 
                 (isExecuting ? 'rgba(108, 117, 125, 0.6)' : 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)') : 
                 'rgba(108, 117, 125, 0.6)',
               color: 'white',
               border: 'none',
               borderRadius: '6px',
               cursor: ['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage) && !isExecuting ? 'pointer' : 'not-allowed',
               fontSize: '13px',
               fontWeight: '600',
               opacity: ['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage) ? 1 : 0.6,
               boxShadow: ['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage) && !isExecuting ? 
                 '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
               transition: 'all 0.3s ease'
             }}
             title={!['python', 'javascript', 'cpp', 'csharp'].includes(selectedLanguage) ? 'Only Python, JavaScript, C++, and C# are currently supported' : ''}
           >
             {isExecuting ? '⏳ Running...' : '▶ Run Code'}
           </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #5227FF, #7B4FFF)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(82, 39, 255, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            📤 Submit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div style={{ 
        flex: '0 0 300px',
        minHeight: '200px',
        maxHeight: '400px',
        border: '1px solid rgba(147, 51, 234, 0.2)',
        borderRadius: '6px',
        overflow: 'hidden',
        margin: '8px'
      }}>
        <Editor
          height="100%"
          language={languageTemplates[selectedLanguage].language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: 'on',
            roundedSelection: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
        />
      </div>

      {/* Tabs Section */}
      <div style={{
        background: 'rgba(15, 15, 35, 0.7)',
        borderTop: '1px solid rgba(147, 51, 234, 0.3)',
        flex: '1 1 auto',
        minHeight: '250px',
        maxHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(147, 51, 234, 0.3)',
          background: 'rgba(25, 25, 40, 0.6)'
        }}>
          <button
            onClick={() => setActiveTab('testcases')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'testcases' ? 'linear-gradient(135deg, rgba(82, 39, 255, 0.4), rgba(123, 79, 255, 0.4))' : 'transparent',
              borderBottom: activeTab === 'testcases' ? '2px solid #7B4FFF' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'testcases' ? 'bold' : 'normal',
              fontSize: '13px',
              color: activeTab === 'testcases' ? 'white' : 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease'
            }}
          >
            📝 Test Cases
          </button>
          <button
            onClick={() => setActiveTab('results')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: activeTab === 'results' ? 'linear-gradient(135deg, rgba(82, 39, 255, 0.4), rgba(123, 79, 255, 0.4))' : 'transparent',
              borderBottom: activeTab === 'results' ? '2px solid #7B4FFF' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === 'results' ? 'bold' : 'normal',
              fontSize: '13px',
              color: activeTab === 'results' ? 'white' : 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease'
            }}
          >
            🔍 Results
          </button>
        </div>

        {/* Tab Content */}
        <div 
          className="custom-scrollbar"
          style={{ 
            padding: '14px', 
            flex: '1 1 auto', 
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: '0'
          }}>
          {activeTab === 'testcases' && (
            <div style={{ paddingBottom: '20px' }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '15px',
                color: 'white',
                fontWeight: '600'
              }}>
                Test Cases
              </h3>
              
              {/* Default/Editable Test Case */}
              <div style={{
                marginBottom: '10px',
                padding: '1px',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '8px',
                background: 'rgba(25, 25, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                minHeight: '80px',
                boxShadow: '0 2px 6px rgba(82, 39, 255, 0.15)'
              }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: '8px',
                  color: 'white'
                }}>
                  Test Case 1 (Editable):
                </div>
                <textarea
                  value={editableTestCase}
                  onChange={(e) => setEditableTestCase(e.target.value)}
                  className="custom-scrollbar"
                  style={{
                    width: '100%',
                    height: '80px',
                    minHeight: '60px',
                    maxHeight: '120px',
                    padding: '8px',
                    border: '1px solid rgba(147, 51, 234, 0.4)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    resize: 'none',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    background: 'rgba(15, 15, 35, 0.8)',
                    color: 'white'
                  }}
                />
              </div>

              {/* Custom Test Cases */}
              {customTestCases.map((testCase, index) => (
                <div key={index} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  borderRadius: '8px',
                  background: 'rgba(25, 25, 40, 0.7)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(82, 39, 255, 0.15)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>
                      Custom Test Case {index + 2}:
                    </div>
                    <button
                      onClick={() => removeCustomTestCase(index)}
                      style={{
                        padding: '4px 10px',
                        background: 'linear-gradient(135deg, #f43f5e, #dc2626)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '4px', 
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      Input:
                    </label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => updateCustomTestCase(index, 'input', e.target.value)}
                      placeholder="Enter test input..."
                      className="custom-scrollbar"
                      style={{
                        width: '100%',
                        height: '50px',
                        minHeight: '40px',
                        maxHeight: '100px',
                        padding: '6px',
                        border: '1px solid rgba(147, 51, 234, 0.4)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        resize: 'none',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        background: 'rgba(15, 15, 35, 0.8)',
                        color: 'white'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '4px', 
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      Expected Output:
                    </label>
                    <textarea
                      value={testCase.expected}
                      onChange={(e) => updateCustomTestCase(index, 'expected', e.target.value)}
                      placeholder="Enter expected output..."
                      className="custom-scrollbar"
                      style={{
                        width: '100%',
                        height: '50px',
                        minHeight: '40px',
                        maxHeight: '100px',
                        padding: '6px',
                        border: '1px solid rgba(147, 51, 234, 0.4)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        resize: 'none',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        background: 'rgba(15, 15, 35, 0.8)',
                        color: 'white'
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Add Test Case Button */}
              <button
                onClick={addCustomTestCase}
                style={{
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                ➕ Add Custom Test Case
              </button>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '16px',
                color: 'white',
                fontWeight: '600'
              }}>
                Execution Results
              </h3>
              
              {executionError ? (
                <div style={{
                  padding: '12px',
                  background: 'rgba(220, 53, 69, 0.2)',
                  color: '#ff6b6b',
                  borderRadius: '8px',
                  border: '1px solid rgba(220, 53, 69, 0.4)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <strong>Error:</strong> {executionError}
                </div>
              ) : executionResults ? (
                <div>
                  {executionResults.success ? (
                    <div>
                      {(() => {
                        console.log('Execution results:', executionResults);
                        console.log('Execution result details:', executionResults.results);
                        const totalTests = executionResults.results?.length || 0;
                        const passedTests = executionResults.results?.filter(r => r.passed).length || 0;
                        const allPassed = totalTests > 0 && passedTests === totalTests;
                        
                        console.log('Total tests:', totalTests);
                        console.log('Passed tests:', passedTests);
                        console.log('All passed:', allPassed);
                        console.log('Results:', executionResults.results);
                        
                        return (
                          <div style={{
                            padding: '10px 14px',
                            background: allPassed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 146, 60, 0.2)',
                            color: allPassed ? '#4ade80' : '#fb923c',
                            borderRadius: '8px',
                            border: `1px solid ${allPassed ? 'rgba(34, 197, 94, 0.4)' : 'rgba(251, 146, 60, 0.4)'}`,
                            marginBottom: '12px',
                            backdropFilter: 'blur(10px)',
                            fontWeight: '600'
                          }}>
                            {allPassed ? 
                              `All tests passed (${passedTests}/${totalTests})` : 
                              `Some tests failed (${passedTests}/${totalTests} passed)`
                            }
                          </div>
                        );
                      })()}
                      
                      {executionResults.results && executionResults.results.map((result, index) => (
                        <div key={index} style={{
                          marginBottom: '10px',
                          padding: '12px',
                          border: `1px solid ${result.passed ? 'rgba(34, 197, 94, 0.4)' : 'rgba(220, 38, 38, 0.4)'}`,
                          borderRadius: '8px',
                          background: result.passed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(220, 38, 38, 0.15)',
                          backdropFilter: 'blur(10px)'
                        }}>
                          <div style={{
                            fontWeight: 'bold',
                            color: result.passed ? '#4ade80' : '#f87171',
                            marginBottom: '6px'
                          }}>
                            Test Case {result.testCase}: {result.passed ? 'PASSED' : 'FAILED'}
                          </div>
                          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                            <div><strong>Input:</strong> {result.input}</div>
                            <div><strong>Expected:</strong> {result.expected}</div>
                            <div><strong>Actual:</strong> {result.actual}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(220, 53, 69, 0.2)',
                      color: '#ff6b6b',
                      borderRadius: '8px',
                      border: '1px solid rgba(220, 53, 69, 0.4)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <strong>Execution Failed:</strong> {executionResults.error}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontStyle: 'italic'
                }}>
                  Run your code to see execution results here.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
