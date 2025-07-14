#!/bin/bash

# Content-Forge Google Cloud Deployment Script
# Make sure you have gcloud CLI installed and authenticated

set -e

PROJECT_ID="eloquent-ratio-465214-r9"  # Replace with your actual project ID
REGION="us-central1"
SERVICE_NAME="content-forge"

echo "🚀 Deploying Content-Forge to Google Cloud..."
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Get the script directory and navigate to it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📂 Working directory: $(pwd)"
echo "📋 Checking files..."
ls -la

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in current directory"
    exit 1
fi

if [ ! -d "client" ]; then
    echo "❌ client directory not found"
    exit 1
fi

if [ ! -d "server" ]; then
    echo "❌ server directory not found"
    exit 1
fi

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed"
    echo "Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and push to Container Registry
echo "🔨 Building container..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME .

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
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
echo ""
echo "💡 To update, run this script again or use:"
echo "   gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME"