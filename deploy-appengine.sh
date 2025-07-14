#!/bin/bash

# Alternative: Deploy to Google App Engine (simpler, good for free tier)

set -e

PROJECT_ID="Multi-Site-Project"  # Replace with your actual project ID

echo "🚀 Deploying Content-Forge to Google App Engine..."
echo "Project: $PROJECT_ID"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed"
    echo "Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID

# Build React app
echo "🔨 Building React app..."
cd client && npm run build && cd ..

# Deploy to App Engine
echo "🚀 Deploying to App Engine..."
gcloud app deploy

# Get the service URL
SERVICE_URL="https://$PROJECT_ID.appspot.com"

echo ""
echo "✅ Deployment complete!"
echo "🌐 Service URL: $SERVICE_URL"
echo "📝 Admin: $SERVICE_URL"
echo "🌐 Site1: $SERVICE_URL/sites/site1"
echo "🌐 Site2: $SERVICE_URL/sites/site2"
echo ""
echo "💡 To update, run: gcloud app deploy"