#!/bin/bash

# Simplified deployment using simpler Dockerfile

set -e

PROJECT_ID="eloquent-ratio-465214-r9"
REGION="us-central1"
SERVICE_NAME="content-forge"

echo "🚀 Deploying Content-Forge with simplified Docker build..."
echo "Project: $PROJECT_ID"
echo ""

# Get the script directory and navigate to it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Set project
gcloud config set project $PROJECT_ID

# Use the simplified Dockerfile
echo "🔨 Building with simplified Dockerfile..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME --file=Dockerfile.simple .

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 1Gi \
    --cpu 1 \
    --max-instances 10 \
    --timeout 300

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format "value(status.url)")

echo ""
echo "✅ Deployment complete!"
echo "🌐 Service URL: $SERVICE_URL"
echo "📝 Admin: $SERVICE_URL"
echo "🌐 Site1: $SERVICE_URL/sites/site1" 
echo "🌐 Site2: $SERVICE_URL/sites/site2"