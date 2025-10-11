const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const codeExecutor = require('./services/codeExecutor');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const { authenticateToken } = require('./middleware/auth');


// Import modular components
const { User, Problem , Submission } = require('./models/schemas');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

// MongoDB connection with environment variables
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Praxis API - Execute, Test, Master!' });
});

// Get all problems from MongoDB
app.get('/problems', async (req, res) => {
  try {
    const problems = await Problem.find({}, {
      id: 1,
      title: 1,
      difficulty: 1,
      acceptance: 1
    }).sort({ id: 1 });

    res.json({ 
      problems: problems,
      message: 'Problems loaded from MongoDB'
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch problems from database' });
  }
});

// Get specific problem from MongoDB
app.get('/problems/:id', async (req, res) => {
  try {
    const problemId = parseInt(req.params.id);
    const problem = await Problem.findOne({ id: problemId });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    res.json({ 
      problem: problem,
      message: 'Problem loaded from MongoDB'
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch problem from database' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log('User created:', email);
     // Generate JWT token
     const token = jwt.sign(
      { userId: newUser._id, email: newUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );

    res.status(201).json({
      message: 'User created successfully', 
      token: token,  // Add this
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation FIRST
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    // Find user by email O
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { userId: user._id,
        email: user.email
       }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );

    console.log('User logged in:', email);
    
    
    res.json({ 
      message: 'Login successful from MongoDB!',
      token: token,
      user: { id: user._id, email: user.email }
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Token validation endpoint
app.get('/api/validate-token', authenticateToken, async (req, res) => {
  try {
    // If we reach here, the token is valid (authenticateToken middleware passed)
    res.json({ 
      message: 'Token is valid',
      user: { id: req.user.userId, email: req.user.email },
      valid: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Token validation failed' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    // Get all users from MongoDB (without passwords)
    const users = await User.find({}, { password: 0 }); 
    res.json({ 
      users: users, 
      count: users.length,
      message: 'Users loaded from MongoDB'
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/submit', authenticateToken, async (req, res) => {
  const { problemId, code, language, testCases } = req.body;
  const userId = req.user.userId;
  
  try {
    const submission = new Submission({
      userId,
      problemId,
      code,
      language: language || 'python'
    });

    await submission.save();

    // For submission, get ALL test cases (visible + hidden) from the problem
    const problem = await Problem.findOne({ id: problemId });
    let allTestCases = [];
    
    if (problem) {
      // Combine visible test cases and hidden test cases
      allTestCases = [
        ...(problem.testCases || []),
        ...(problem.hiddenTestCases || [])
      ];
    console.log(`Submission will test against ${allTestCases.length} total test cases (${problem.testCases?.length || 0} visible + ${problem.hiddenTestCases?.length || 0} hidden)`);
    } else {
      // Fallback to provided test cases if problem not found
      allTestCases = testCases || [];
      console.log(`Problem not found, using provided test cases: ${allTestCases.length}`);
    }

    // If test cases are available and code execution is available, run them
    let result;
    if (allTestCases && allTestCases.length > 0 && ['python', 'javascript', 'cpp', 'csharp'].includes(language)) {
      try {
        console.log(`Running submission against ${allTestCases.length} test cases`);
        
        // Check Docker health first
        const dockerHealth = await codeExecutor.checkDockerHealth();
        if (dockerHealth.healthy) {
          // Execute the code against test cases
          result = await codeExecutor.executeCode(code, allTestCases, language);
          
          if (result.success) {
            const passedTests = result.results.filter(r => r.passed).length;
            const totalTests = result.results.length;
            const acceptance = Math.round((passedTests / totalTests) * 100);
            
            submission.status = passedTests === totalTests ? 'accepted' : 'wrong_answer';
            submission.acceptance = `${acceptance}%`;
            
            console.log(`Submission tested: ${passedTests}/${totalTests} tests passed (${acceptance}%)`);
          } else {
            submission.status = 'runtime_error';
            submission.acceptance = '0%';
            console.log('Submission failed with runtime error');
          }
        } else {
          // Fallback to mock result if Docker is not available
          console.log('Docker unavailable, using mock result');
          const mockResult = {
            status: Math.random() < 0.7 ? 'accepted' : 'wrong_answer',
            acceptance: Math.floor(Math.random() * 100) + '%'
          };
          submission.status = mockResult.status;
          submission.acceptance = mockResult.acceptance;
        }
      } catch (executionError) {
        console.error('Execution error during submission:', executionError);
        submission.status = 'runtime_error';
        submission.acceptance = '0%';
      }
    } else {
      // Fallback to mock result if no test cases or unsupported language
      const mockResult = {
        status: Math.random() < 0.7 ? 'accepted' : 'wrong_answer',
        acceptance: Math.floor(Math.random() * 100) + '%'
      };
      submission.status = mockResult.status;
      submission.acceptance = mockResult.acceptance;
    }

    await submission.save();

    res.json({
      message: 'Submission received and evaluated',
      submission: {
        id: submission._id,
        status: submission.status,
        acceptance: submission.acceptance,
        testResults: result ? {
          totalTests: result.results ? result.results.length : 0,
          passedTests: result.results ? result.results.filter(r => r.passed).length : 0
        } : null
      }
    });
    
  } catch (error) {
    console.error('Detailed submission error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to submit',
      details: error.message 
    });
  }
});

app.get('/api/submissions', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const submissions = await Submission.find({ userId })
      .populate('userId', 'email')
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

app.post('/api/execute', async (req, res) => {
  try{ 
    const { code, testCases, language = 'python' } = req.body;
    console.log(`Code execution request received: ${language}`);

    //Validate Request
    if (!code){
      return res.status(400).json({ error: 'Code is required', success: false });
    }
    if (!testCases || !Array.isArray(testCases) || testCases.length === 0){
      return res.status(400).json({ error: 'Test cases are required', success: false });
    }
    if (!language || !['python', 'javascript', 'cpp', 'csharp'].includes(language)){
      return res.status(400).json({ error: 'Invalid language', success: false });
    }

    //Check Docker health
    const dockerHealth = await codeExecutor.checkDockerHealth();
    if (!dockerHealth.healthy){
      return res.status(503).json({ error: 'Docker is not healthy', success: false });
    }

    console.log(`Executing code with ${testCases.length} test cases`);

    //Execute Code
    const result = await codeExecutor.executeCode(code, testCases, language);
    res.json(result);
  } catch (error) {
    console.error('Error executing code:', error.message);
    res.status(500).json({ 
      error: error.message, 
      success: false ,
      language : req.body.language
    });
  }
  });

// Get individual problem with test cases
app.get('/api/problems/:id', async (req, res) => {
  try {
    const problemId = parseInt(req.params.id);
    
    const problem = await Problem.findOne({ id: problemId });
    
    if (!problem) {
      return res.status(404).json({ 
        error: 'Problem not found',
        success: false 
      });
    }

    // Return problem with test cases
    res.json({
      success: true,
      problem: problem,
      testCases: problem.testCases || [],
      hiddenTestCases: problem.hiddenTestCases || []
    });
    
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      success: false 
    });
  }
});
  // Health check endpoint for Docker
app.get('/api/execute/health', async (req, res) => {
  try {
    const health = await codeExecutor.checkDockerHealth();
    const languages = codeExecutor.getAvailableLanguages();

    res.json({
      docker: health,
      availableLanguages: languages,
      status: health.healthy ? 'ready' : 'unavailable'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
});

// Serve static files from the React app (for production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve React app for any non-API routes
// Express 5: use a regex instead of '*' to avoid path-to-regexp errors
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})