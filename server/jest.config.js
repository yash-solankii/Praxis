module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    'index.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'models/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/data/'
  ],
  testTimeout: 20000,
  verbose: true,
  maxWorkers: 1 // Run tests sequentially to avoid rate limits
};

