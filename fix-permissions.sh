#!/bin/bash

# Fix Google Cloud permissions for Content-Forge deployment

set -e

PROJECT_ID="eloquent-ratio-465214-r9"
USER_EMAIL="jlwfourie@gmail.com"

echo "🔧 Fixing Google Cloud permissions..."
echo "Project: $PROJECT_ID"
echo "User: $USER_EMAIL"
echo ""

# Set the correct project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID

# Check current user
echo "👤 Current authenticated user:"
gcloud auth list

# Enable required APIs (this might need billing enabled)
echo "🔧 Enabling required APIs..."
echo "Note: This requires billing to be enabled on your project"

gcloud services enable cloudbuild.googleapis.com || echo "❌ Failed to enable Cloud Build API - billing might not be enabled"
gcloud services enable run.googleapis.com || echo "❌ Failed to enable Cloud Run API"
gcloud services enable containerregistry.googleapis.com || echo "❌ Failed to enable Container Registry API"

# Check IAM permissions
echo "🔍 Checking your IAM roles..."
gcloud projects get-iam-policy $PROJECT_ID --flatten="bindings[].members" --format="table(bindings.role)" --filter="bindings.members:$USER_EMAIL"

echo ""
echo "💡 If APIs failed to enable, you need to:"
echo "   1. Enable billing for your project at: https://console.cloud.google.com/billing"
echo "   2. Go to: https://console.cloud.google.com/apis/library"
echo "   3. Manually enable: Cloud Build, Cloud Run, Container Registry APIs"
echo ""
echo "🔑 If you need more permissions, ask the project owner to grant you:"
echo "   - Cloud Build Editor"
echo "   - Cloud Run Admin" 
echo "   - Storage Admin"
echo "   - Service Account User"