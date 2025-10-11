FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies (needed for some Python packages)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install comprehensive Python packages that LeetCode users need
RUN pip install --no-cache-dir \
    numpy==1.24.3 \
    pandas==2.0.3 \
    scipy==1.10.1 \
    sympy==1.12 \
    networkx==3.1 \
    sortedcontainers==2.4.0 \
    more-itertools==9.1.0

# Copy our Python execution script into the container
COPY runner.py .

# Set Python environment variables for better performance and security
ENV PYTHONHASHSEED=0
ENV PYTHONUNBUFFERED=1

# Default command when container starts
CMD ["python", "runner.py"]