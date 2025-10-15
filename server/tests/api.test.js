// Basic API tests - Simple and practical
const request = require('supertest');

const API_URL = process.env.TEST_API_URL || 'http://localhost:3000';

describe('API Health & Basic Endpoints', () => {
  
  // Wait between test suites to avoid rate limits
  beforeEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
  });

  test('Health check endpoint works', async () => {
    const res = await request(API_URL).get('/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('database');
    expect(res.body).toHaveProperty('uptime');
  });

  test('Root endpoint returns welcome message', async () => {
    const res = await request(API_URL).get('/');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Praxis');
  });

  test('Problems list endpoint works', async () => {
    const res = await request(API_URL).get('/problems');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('problems');
    expect(Array.isArray(res.body.problems)).toBe(true);
    expect(res.body.problems.length).toBeGreaterThan(0);
  });

  test('Specific problem endpoint returns problem details', async () => {
    const res = await request(API_URL).get('/problems/1');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.problem).toHaveProperty('id');
    expect(res.body.problem).toHaveProperty('title');
    expect(res.body.problem).toHaveProperty('difficulty');
  });

  test('Non-existent problem returns 404', async () => {
    const res = await request(API_URL).get('/problems/99999');
    
    expect(res.statusCode).toBe(404);
  });
});
