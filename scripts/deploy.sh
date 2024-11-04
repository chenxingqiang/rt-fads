#!/bin/bash

# Configuration
ENVIRONMENT=$1
AWS_REGION="us-west-2"
ECR_REPOSITORY="rt-fads"
CLUSTER_NAME="rt-fads-${ENVIRONMENT}"
NAMESPACE="fraud-detection"

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check environment argument
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    error "Invalid environment. Use: dev, staging, or prod"
fi

# Check required tools
command -v aws >/dev/null 2>&1 || error "AWS CLI is required"
command -v kubectl >/dev/null 2>&1 || error "kubectl is required"
command -v docker >/dev/null 2>&1 || error "docker is required"

# Build and push Docker image
build_and_push_image() {
    log "Building Docker image..."
    docker build -t ${ECR_REPOSITORY}:${ENVIRONMENT} . || error "Docker build failed"

    log "Logging in to ECR..."
    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin \
        ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com || error "ECR login failed"

    log "Pushing image to ECR..."
    docker push ${ECR_REPOSITORY}:${ENVIRONMENT} || error "Failed to push image"
}

# Update Kubernetes configuration
update_kubernetes_config() {
    log "Updating kubeconfig..."
    aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${AWS_REGION} || \
        error "Failed to update kubeconfig"

    # Create namespace if it doesn't exist
    kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

    # Apply configurations
    log "Applying Kubernetes configurations..."
    kubectl apply -f deployment/k8s/${ENVIRONMENT}/ -n ${NAMESPACE} || \
        error "Failed to apply Kubernetes configurations"
}

# Deploy application
deploy_application() {
    log "Deploying application..."

    # Update deployment image
    kubectl set image deployment/rt-fads \
        rt-fads=${ECR_REPOSITORY}:${ENVIRONMENT} \
        -n ${NAMESPACE} || error "Failed to update deployment image"

    # Wait for rollout
    kubectl rollout status deployment/rt-fads -n ${NAMESPACE} || \
        error "Deployment rollout failed"
}

# Run database migrations
run_migrations() {
    log "Running database migrations..."
    kubectl apply -f deployment/k8s/jobs/migrations.yaml -n ${NAMESPACE} || \
        error "Failed to apply migration job"

    # Wait for migration job to complete
    kubectl wait --for=condition=complete job/db-migration -n ${NAMESPACE} --timeout=300s || \
        error "Migration job failed"
}

# Main deployment process
main() {
    log "Starting deployment to ${ENVIRONMENT} environment"

    # Build and push image
    build_and_push_image

    # Update Kubernetes config
    update_kubernetes_config

    # Run migrations
    run_migrations

    # Deploy application
    deploy_application

    log "Deployment completed successfully!"
}

# Run main function
main
