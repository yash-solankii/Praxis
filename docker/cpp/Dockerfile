# docker/cpp/Dockerfile
FROM ubuntu:22.04

# Set working directory
WORKDIR /app

# Install Python for the runner script, GCC for C++ compilation, and essential tools
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    g++ \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for security and performance
ENV COMPILATION_TIMEOUT=10
ENV EXECUTION_TIMEOUT=5
ENV PYTHONUNBUFFERED=1

# Copy our C++ execution script into the container
COPY runner.py .

# Default command when container starts
CMD ["python3", "runner.py"]