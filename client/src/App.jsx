// Main application entry point with routing and data fetching
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation
} from 'react-router-dom';
import './App.css';

// Import modular components
import { Signup, Login } from './components/AuthComponents';
import { ProblemStatement, ProblemDetails, toSlug } from './components/ProblemComponents';
import { getApiUrl, API_ENDPOINTS } from './config/api';
import Homepage from './components/Homepage';
import { StaggeredMenu } from './components/StaggeredMenu';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [allProblems, setAllProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [user, setUser] = useState(null);
  const [sortBy, setSortBy] = useState(null); // null, 'difficulty', 'acceptance'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc', 'desc'

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // Function to check if token is expired (client-side check)
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true; // If we can't decode, consider it expired
    }
  };

  // Function to validate token with server
  const validateToken = async (token) => {
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.VALIDATE_TOKEN), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        // First check if token is expired client-side (faster)
        if (isTokenExpired(storedToken)) {
          console.log('Token expired, logging out...');
          handleLogout();
          return;
        }
        
        // If not expired, validate with server for additional security
        const isValid = await validateToken(storedToken);
        if (isValid) {
          setUser(JSON.parse(storedUser));
        } else {
          // Token is invalid, clear storage and logout
          console.log('Token invalid on server, logging out...');
          handleLogout();
        }
      } else if (storedUser && !storedToken) {
        // If user exists but no token, clear user (token expired)
        localStorage.removeItem('user');
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.PROBLEMS));
      if (!response.ok) {
        throw new Error('Failed to fetch problems');
      }
      const data = await response.json();
      setAllProblems(data.problems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      // If clicking the same column, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new column, set it as sort column and default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Sort problems by selected column
  const sortedProblems = [...allProblems].sort((a, b) => {
    if (!sortBy) return 0; // Keep original order if no sort selected
    
    if (sortBy === 'difficulty') {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      const aLevel = difficultyOrder[a.difficulty];
      const bLevel = difficultyOrder[b.difficulty];
      
      if (sortDirection === 'asc') {
        return aLevel - bLevel;
      } else {
        return bLevel - aLevel;
      }
    } else if (sortBy === 'acceptance') {
      // Parse acceptance percentage (e.g., "54.1%" -> 54.1)
      const aAcceptance = parseFloat(a.acceptance.replace('%', ''));
      const bAcceptance = parseFloat(b.acceptance.replace('%', ''));
      
      if (sortDirection === 'asc') {
        return aAcceptance - bAcceptance;
      } else {
        return bAcceptance - aAcceptance;
      }
    }
    
    return 0;
  });

  // Calculate current problems to show
  const totalPages = Math.ceil(sortedProblems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProblems = sortedProblems.slice(startIndex, endIndex);


  // Dynamic navigation items based on user state
  const getNavItems = () => {
    const baseItems = [
      { label: 'Home', link: '/', ariaLabel: 'Navigate to Home' },
      { label: 'Problems', link: '/problems', ariaLabel: 'View coding problems' }
    ];

    if (user) {
      return [
        ...baseItems,
        { label: 'Logout', link: '/logout', ariaLabel: 'Sign out of your account' }
      ];
    } else {
      return [
        ...baseItems,
        { label: 'Login', link: '/login', ariaLabel: 'Sign in to your account' },
        { label: 'Sign Up', link: '/signup', ariaLabel: 'Create a new account' }
      ];
    }
  };

  // Logout component
  const LogoutPage = () => {
    useEffect(() => {
      handleLogout();
      window.location.href = '/';
    }, []);
    return null;
  };

  return (
    <div>
      {/* Staggered Menu Navigation */}
      <StaggeredMenu
        position="right"
        colors={['#B19EEF', '#5227FF']}
        items={getNavItems()}
        displaySocials={false}
        displayItemNumbering={false}
        className="staggered-menu-dark"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        accentColor="#5227FF"
        changeMenuColorOnOpen={true}
        isFixed={true}
      />

      {/* Routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/problems" element={
            <div className="container" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '24px 16px',
              width: '100%'
            }}>
              <div className="problems-header">
                <h1>Problems</h1>
              </div>


              {/* Loading/Error States */}
              {loading && (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Loading problems...</p>
                </div>
              )}
              
              {error && (
                <div className="error-container">
                  <p>Error: {error}</p>
                </div>
              )}

              {/* Problems Table */}
              {!loading && !error && (
                <div className="table-container" style={{
                  width: '100%',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  <div className="problems-grid" role="table" aria-label="Problems list">
                    <div className="grid-header cell center" role="columnheader">ID</div>
                    <div className="grid-header cell left" role="columnheader">Title</div>
                    <div
                      className="grid-header cell center sortable-header"
                      role="columnheader"
                      onClick={() => handleSort('acceptance')}
                      aria-sort={sortBy === 'acceptance' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Acceptance
                      <span className="sort-arrow">
                        {sortBy === 'acceptance' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                      </span>
                    </div>
                    <div
                      className="grid-header cell center sortable-header"
                      role="columnheader"
                      onClick={() => handleSort('difficulty')}
                      aria-sort={sortBy === 'difficulty' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Difficulty
                      <span className="sort-arrow">
                        {sortBy === 'difficulty' ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                      </span>
                    </div>

                    {currentProblems.map((problem) => (
                      <React.Fragment key={problem.id}>
                        <div className="cell center" role="cell">
                          <span className="problem-id">{problem.id}</span>
                        </div>
                        <div className="cell left" role="cell">
                          <Link to={`/problem/${problem.id}`} className="problem-link">
                            {problem.title}
                          </Link>
                        </div>
                        <div className="cell center" role="cell">
                          <span className="acceptance-rate">{problem.acceptance}</span>
                        </div>
                        <div className="cell center" role="cell">
                          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && (
                <div className="pagination" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '48px auto 32px auto',
                  flexWrap: 'wrap',
                  width: '100%',
                  maxWidth: '1200px'
                }}>
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </button>

            {/* Dynamic pagination buttons */}
            {(() => {
              const maxButtons = 3;
              let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
              let end = Math.min(totalPages, start + maxButtons - 1);
              
              // Adjust start if we're near the end
              if (end - start + 1 < maxButtons) {
                start = Math.max(1, end - maxButtons + 1);
              }
              
              const buttons = [];
              
              // Add "First" if we're not showing page 1
              if (start > 1) {
                buttons.push(
                  <button 
                    key="first"
                    onClick={() => handlePageChange(1)}
                    disabled={loading}
                    className="btn-outline"
                  >
                    First
                  </button>
                );
                if (start > 2) {
                  buttons.push(<span key="ellipsis1" className="ellipsis">...</span>);
                }
              }
              
              // Add page number buttons
              for (let i = start; i <= end; i++) {
                buttons.push(
                  <button 
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={loading}
                    className={currentPage === i ? 'active' : ''}
                  >
                    {i}
                  </button>
                );
              }
              
              // Add "Last" if we're not showing the last page
              if (end < totalPages) {
                if (end < totalPages - 1) {
                  buttons.push(<span key="ellipsis2" className="ellipsis">...</span>);
                }
                buttons.push(
                  <button 
                    key="last"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={loading}
                    className="btn-outline"
                  >
                    Last
                  </button>
                );
              }
              
              return buttons;
            })()}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          } />     
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route
            path="/problem/:problemId"
            element={<ProblemDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
