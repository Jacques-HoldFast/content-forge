#!/bin/bash

# Simplified deployment using App Engine (no Cloud Build required)
# This should work with basic permissions on free tier

set -e

PROJECT_ID="eloquent-ratio-465214-r9"

echo "🚀 Deploying Content-Forge to App Engine (simpler approach)..."
echo "Project: $PROJECT_ID"
echo ""

# Set project
gcloud config set project $PROJECT_ID

# Check if App Engine app exists, create if not
echo "📋 Checking App Engine..."
if ! gcloud app describe &>/dev/null; then
    echo "🔧 Creating App Engine app..."
    gcloud app create --region=us-central
fi

# Build React app
echo "🔨 Building React frontend..."
cd client
npm install
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --only=production

# Create a simplified package.json for deployment
cat > deploy-package.json << EOF
{
  "name": "content-forge",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  },
  "engines": {
    "node": "18"
  }
}
EOF

# Move files to root for App Engine
cp deploy-package.json package.json

# Deploy to App Engine
echo "🚀 Deploying to App Engine..."
gcloud app deploy --quiet

# Get the URL
echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://$PROJECT_ID.appspot.com"
echo "📝 Admin: https://$PROJECT_ID.appspot.com"
echo "🌐 Site1: https://$PROJECT_ID.appspot.com/sites/site1"
echo "🌐 Site2: https://$PROJECT_ID.appspot.com/sites/site2"

# Cleanup
rm deploy-package.json