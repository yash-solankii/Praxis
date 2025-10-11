// Database schemas for the application
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Problem Schema
const problemSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'],
    required: true 
  },
  acceptance: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  examples: [{
    input: { type: String, required: true },
    output: { type: String, required: true }
  }],
  testCases: [{
    input: { type: String, required: true },
    expected: { type: String, required: true }
  }],
  hiddenTestCases: [{
    input: { type: String, required: true },
    expected: { type: String, required: true }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Submission Schema
const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'wrong_answer', 'time_limit_exceeded', 'runtime_error'],
    default: 'pending'
  },
  acceptance: {
    type: String,
    default: '0%'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});



// Create and export models
const User = mongoose.model('User', userSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const Problem = mongoose.model('Problem', problemSchema);

module.exports = {
  User,
  Problem,
  Submission
};
