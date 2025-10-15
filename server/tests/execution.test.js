// Code execution tests - Minimal and focused
const request = require('supertest');

const API_URL = process.env.TEST_API_URL || 'http://localhost:3000';

describe('Code Execution', () => {
  
  // Add delay between tests
  beforeEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  test('Docker health check endpoint works', async () => {
    const res = await request(API_URL).get('/api/execute/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('docker');
    expect(res.body).toHaveProperty('availableLanguages');
  });

  test('Execution endpoint rejects empty code', async () => {
    const res = await request(API_URL)
      .post('/api/execute')
      .send({
        code: '',
        testCases: [{ input: '5', expected: '5' }],
        language: 'python'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Code is required');
  });

  test('Execution endpoint rejects missing test cases', async () => {
    const res = await request(API_URL)
      .post('/api/execute')
      .send({
        code: 'print("hello")',
        language: 'python'
      });

    expect(res.statusCode).toBe(400);
  });

  test('Execution endpoint rejects unsupported language', async () => {
    const res = await request(API_URL)
      .post('/api/execute')
      .send({
        code: 'puts "hello"',
        testCases: [{ input: '5', expected: '5' }],
        language: 'ruby'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Invalid language');
  });

  test('Submission endpoint requires authentication', async () => {
    const res = await request(API_URL)
      .post('/api/submit')
      .send({
        problemId: 1,
        code: 'print("test")',
        language: 'python'
      });

    expect(res.statusCode).toBe(401);
  });
});
