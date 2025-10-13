import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Default to localhost for development, empty string for production
  const isDev = mode === 'development';
  const apiUrl = process.env.VITE_API_URL || (isDev ? 'http://localhost:3000' : '');
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    // Define global constants that can be used in the app
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl)
    }
  }
})
