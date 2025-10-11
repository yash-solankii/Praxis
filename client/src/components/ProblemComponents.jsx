// Rendering helpers for problem listings and detail page
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

// Helper to convert problem titles into URL-friendly slugs
export const toSlug = (title) =>
  title
    .replace(/^\d+\.\s*/, "")     
    .toLowerCase()
    .replace(/\s+/g, "-");

export function ProblemStatement(props) {
  const { title, acceptance, difficulty } = props;

  return (
    <tr>
      <td>{title}</td>
      <td>
        <span className="acceptance-rate">{acceptance}</span>
      </td>
      <td>
        <span className={`difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </td>
    </tr>
  );
}

export function ProblemDetails() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.PROBLEM_BY_ID(problemId)));
        if (!response.ok) {
          throw new Error('Problem not found');
        }
        const data = await response.json();
        setProblem(data.problem);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!problem) return <h1>Problem not found</h1>;

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 50%, #0f0f23 100%)'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '10px 20px', 
        borderBottom: '1px solid rgba(147, 51, 234, 0.3)',
        background: 'linear-gradient(135deg, rgba(82, 39, 255, 0.15) 0%, rgba(123, 79, 255, 0.1) 50%, rgba(177, 158, 239, 0.15) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 16px rgba(82, 39, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flexWrap: 'wrap',
          maxWidth: 'calc(100% - 100px)' // Leave space for menu button
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            color: 'white',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #5227FF, #7B4FFF)',
              padding: '3px 10px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(82, 39, 255, 0.4)'
            }}>
              #{problem.id}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #B19EEF 0%, #9333ea 50%, #7B4FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {problem.title}
            </span>
          </h1>
          <span style={{ 
            padding: '5px 12px', 
            background: problem.difficulty === 'Easy' ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : 
                       problem.difficulty === 'Medium' ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)' : 
                       'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
            color: 'white',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            flexShrink: 0,
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            {problem.difficulty}
          </span>
          <span style={{ 
            fontSize: '13px', 
            color: 'rgba(210, 210, 235, 0.95)', 
            flexShrink: 0,
            background: 'rgba(60, 60, 120, 0.35)',
            padding: '5px 10px',
            borderRadius: '14px',
            border: '1px solid rgba(80, 80, 140, 0.4)',
            backdropFilter: 'blur(8px)',
            fontWeight: '600'
          }}>
            Acceptance: {problem.acceptance}
          </span>
        </div>
      </div>

      {/* Split Layout */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        overflow: 'hidden' 
      }}>
        {/* Left Panel - Problem Description */}
        <div 
          className="custom-scrollbar"
          style={{ 
            width: '50%', 
            padding: '20px', 
            overflowY: 'auto',
            background: 'rgba(15, 15, 35, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(147, 51, 234, 0.2)'
          }}>
          <div style={{ maxWidth: '100%' }}>
            <h2 style={{ 
              marginTop: 0, 
              marginBottom: '16px', 
              fontSize: '18px',
              color: 'white',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #B19EEF 0%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Description
            </h2>
            <div style={{ 
              lineHeight: '1.7', 
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '20px',
              whiteSpace: 'pre-line',
              fontSize: '14px'
            }}>
              {problem.description}
            </div>

            {/* Examples */}
            {problem.examples?.map((example, index) => (
              <div key={index} style={{ 
                marginBottom: '16px',
                padding: '14px',
                background: 'rgba(25, 25, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                boxShadow: '0 4px 12px rgba(82, 39, 255, 0.15)'
              }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '15px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  Example {index + 1}:
                </h3>
                <div style={{ marginBottom: '8px', fontSize: '13px' }}>
                  <strong style={{ color: '#B19EEF' }}>Input:</strong>{' '}
                  <code style={{ 
                    background: 'rgba(82, 39, 255, 0.2)',
                    color: '#e8e8e8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    border: '1px solid rgba(82, 39, 255, 0.3)'
                  }}>
                    {example.input}
                  </code>
                </div>
                <div style={{ fontSize: '13px' }}>
                  <strong style={{ color: '#B19EEF' }}>Output:</strong>{' '}
                  <code style={{ 
                    background: 'rgba(82, 39, 255, 0.2)',
                    color: '#e8e8e8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    border: '1px solid rgba(82, 39, 255, 0.3)'
                  }}>
                    {example.output}
                  </code>
                </div>
              </div>
            ))}

            {/* Additional sections that could be added later */}
            {problem.constraints && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ 
                  marginBottom: '10px', 
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #B19EEF 0%, #9333ea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Constraints:
                </h3>
                <ul style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: '1.7', 
                  fontSize: '13px', 
                  marginLeft: '20px' 
                }}>
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} style={{ marginBottom: '6px' }}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div style={{ 
          width: '50%', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(15, 15, 35, 0.6)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CodeEditor problemTitle={problem.title} problemId={problemId} />
          </div>
        </div>
      </div>
    </div>
  );
}
