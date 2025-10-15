# Praxis Tests

Basic test suite - simple and effective.

## Quick Start

```bash
# Start your server
npm start

# In another terminal, run tests
npm test
```

## Test Files

1. **`api.test.js`** (5 tests) - Basic endpoints
2. **`auth.test.js`** (7 tests) - Authentication flow  
3. **`execution.test.js`** (5 tests) - Code execution

**Total: 17 tests, all passing ✅**

## What's Tested

✅ Health checks  
✅ Problems API  
✅ User signup & login  
✅ JWT token validation  
✅ Code execution endpoints  
✅ Input validation  
✅ Error handling  

## Run Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## Example Output

```
PASS  tests/api.test.js (5 tests)
PASS  tests/auth.test.js (7 tests)
PASS  tests/execution.test.js (5 tests)

Tests:  17 passed, 17 total
Time:   ~8s
```

Simple, fast, and covers the essentials! 🎯
