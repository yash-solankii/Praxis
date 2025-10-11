/**
 * API Configuration
 * Centralized API URL management for development and production environments
 */

// Get API URL from environment variables
// In development, this will use the Vite proxy (relative URLs work)
// In production, this should point to your actual API domain
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to get the correct API endpoint
export const getApiUrl = (endpoint) => {
  // In development with Vite proxy, use relative URLs for /api
  if (import.meta.env.DEV) {
    // If endpoint starts with /api, use relative URL (proxy handles it)
    if (endpoint.startsWith('/api')) {
      return endpoint;
    }
  }
  
  // For production or non-proxied endpoints, use full URL
  return `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

// Export pre-configured endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/api/signup',
  LOGIN: '/api/login',
  VALIDATE_TOKEN: '/api/validate-token',
  
  // Problem endpoints (note: these are API endpoints, not routes)
  PROBLEMS: '/problems',  // Backend API endpoint for getting problems list
  PROBLEM_BY_ID: (id) => `/api/problems/${id}`,  // Backend API endpoint for getting a specific problem
  
  // Code execution endpoints
  EXECUTE: '/api/execute',
  SUBMIT: '/api/submit',
};

