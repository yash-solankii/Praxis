FROM node:18-slim

# Set working directory inside the container
WORKDIR /app

# Set Node.js environment variables for better performance and security
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=256"

# Copy our JavaScript execution script into the container
COPY runner.js .

# Default command when container starts
CMD ["node", "runner.js"]