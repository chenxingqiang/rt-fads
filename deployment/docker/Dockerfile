# Base image
FROM python:3.9-slim as builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY src/ src/
COPY setup.py .

# Install package
RUN pip install -e .

# Runtime image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy from builder
COPY --from=builder /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
COPY --from=builder /app/src/ /app/src/

# Copy configuration files
COPY config/ config/

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/app
ENV MODEL_PATH=/app/models/best_model.pt
ENV CONFIG_PATH=/app/config/production.yaml

# Start command
CMD ["uvicorn", "rt_fads.api.server:app", "--host", "0.0.0.0", "--port", "8000"]