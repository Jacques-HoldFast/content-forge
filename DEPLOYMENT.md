# Google Cloud Deployment Guide

Deploy Content-Forge to your **Multi-Site-Project** Google Cloud project.

## Prerequisites

1. **Install Google Cloud CLI**
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate with Google Cloud**
   ```bash
   gcloud auth login
   gcloud config set project Multi-Site-Project
   ```

## Option 1: Cloud Run (Recommended)

**Best for**: Containerized apps, automatic scaling, pay-per-use

```bash
# Navigate to Content-Forge directory
cd /Users/jacquesfourie/HOLDFAST/NAMIBIA/simple-cms/Content-Forge

# Run deployment script
./deploy-to-gcloud.sh
```

**Manual deployment:**
```bash
# Enable APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build and deploy
gcloud builds submit --tag gcr.io/Multi-Site-Project/content-forge
gcloud run deploy content-forge \
  --image gcr.io/Multi-Site-Project/content-forge \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000
```

## Option 2: App Engine (Simpler)

**Best for**: Simple deployment, good for free tier

```bash
# Run App Engine deployment
./deploy-appengine.sh
```

**Manual deployment:**
```bash
# Build React app first
cd client && npm run build && cd ..

# Deploy to App Engine
gcloud app deploy
```

## Deployment URLs

After deployment, your URLs will be:

**Cloud Run:**
- `https://content-forge-[hash]-uc.a.run.app`

**App Engine:**
- `https://Multi-Site-Project.appspot.com`

## Free Tier Limits

- **Cloud Run**: 2 million requests/month
- **App Engine**: 28 instance hours/day
- **Container Registry**: 0.5GB storage

## Updating Your App

```bash
# For Cloud Run
gcloud builds submit --tag gcr.io/Multi-Site-Project/content-forge

# For App Engine  
gcloud app deploy
```

## Monitoring

```bash
# View logs
gcloud logs tail

# Monitor Cloud Run
gcloud run services list
```

## Troubleshooting

1. **Build fails**: Check Dockerfile and dependencies
2. **503 errors**: Check port configuration (should be 3000)
3. **File uploads fail**: Cloud Run has ephemeral storage, consider Cloud Storage
4. **Authentication issues**: Run `gcloud auth login`

## Production Considerations

1. **File Storage**: Use Cloud Storage for persistent uploads
2. **Database**: Consider Cloud Firestore for JSON data
3. **CDN**: Use Cloud CDN for better performance
4. **Custom Domain**: Map your domain to the service