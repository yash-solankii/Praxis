# Environment Variables Setup Guide

## Overview
This project uses Vite environment variables to manage API URLs for different environments (development, production, etc.).

## Quick Start

### Development
1. Create `.env.development` file in the `client/` directory:
```bash
VITE_API_URL=http://localhost:3000
```

2. Start the dev server:
```bash
npm run dev
```

### Production
1. Create `.env.production` file in the `client/` directory:
```bash
VITE_API_URL=https://your-production-api.com
```

2. Build for production:
```bash
npm run build
```

## Environment Files

### `.env.development` (local development)
```env
VITE_API_URL=http://localhost:3000
```

### `.env.production` (production build)
```env
VITE_API_URL=https://your-production-api.com
```

### `.env.example` (template - commit this to git)
```env
# Backend API URL
VITE_API_URL=http://localhost:3000
```

## How It Works

1. **Vite Config**: The `vite.config.js` reads `VITE_API_URL` and sets up proxies for `/api` and `/problems` endpoints
2. **API Config**: The `src/config/api.js` centralizes all API endpoints
3. **Components**: All components import and use `getApiUrl()` and `API_ENDPOINTS`

## Usage in Code

```javascript
import { getApiUrl, API_ENDPOINTS } from '../config/api';

// Use predefined endpoints
const response = await fetch(getApiUrl(API_ENDPOINTS.LOGIN), {
  method: 'POST',
  // ...
});

// Or use custom endpoints
const response = await fetch(getApiUrl('/api/custom-endpoint'));
```

## Important Notes

- ✅ **Development**: Uses Vite proxy, so relative URLs work fine
- ✅ **Production**: Uses full API URL from environment variable
- ❌ **DON'T** hardcode `http://localhost:3000` anywhere in the code
- ✅ **DO** use `getApiUrl()` for all API calls
- 🔒 Don't commit `.env.development` or `.env.production` to git
- ✅ Commit `.env.example` as a template

## Git Configuration

Make sure your `.gitignore` includes:
```
.env.local
.env.development
.env.production
```

But NOT:
```
.env.example  # This should be committed
```

