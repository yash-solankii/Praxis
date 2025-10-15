// Authentication components - Signup and Login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl, API_ENDPOINTS } from '../config/api';
import LiquidEther from './LiquidEther';
import './AuthComponents.css';

export function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.SIGNUP), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully! Redirecting to login...');
        setEmail('');
        setPassword('');
        // Redirect to login page after successful signup with animation
        setTimeout(() => {
          document.querySelector('.auth-page-container')?.classList.add('fade-out');
          setTimeout(() => navigate('/login'), 400);
        }, 1200);
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container animate-in">
      <div className="liquid-bg-fullscreen">
        <LiquidEther
          colors={['#5227FF', '#9333ea', '#c026d3']}
          mouseForce={25}
          cursorSize={120}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
        />
      </div>
      
      <div className="auth-form-overlay">
        <div className="auth-form-card">
          <h1 className="auth-title">SIGN UP</h1>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="password">Password (min 8 characters)</label>
              <input
                id="password"
                type="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>
          
          {message && (
            <div className="auth-message success">{message}</div>
          )}
          {error && (
            <div className="auth-message error">{error}</div>
          )}
          
          <p className="auth-footer">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        onLogin(data.user, data.token);
        setEmail('');
        setPassword('');
        
        // Smooth transition to problems page
        setTimeout(() => {
          document.querySelector('.auth-page-container')?.classList.add('fade-out');
          setTimeout(() => navigate('/problems'), 500);
        }, 300);
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container animate-in">
      <div className="liquid-bg-fullscreen">
        <LiquidEther
          colors={['#5227FF', '#9333ea', '#c026d3']}
          mouseForce={25}
          cursorSize={120}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
        />
      </div>
      
      <div className="auth-form-overlay">
        <div className="auth-form-card">
          <h1 className="auth-title">LOG IN</h1>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
          
          {error && (
            <div className="auth-message error">{error}</div>
          )}
          
          <p className="auth-footer">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
