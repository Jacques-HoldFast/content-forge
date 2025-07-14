# Multi-stage Docker build for Content-Forge
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install all dependencies
RUN npm install
RUN cd client && npm install

# Copy source files
COPY client/src ./client/src
COPY client/public ./client/public
COPY client/tsconfig.json ./client/

# Build React app
RUN cd client && npm run build

# Production stage
FROM node:18-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy server files
COPY server/ ./server/
COPY public/ ./public/

# Copy built React app from builder stage
COPY --from=builder /app/client/build ./client/build

# Create upload directories
RUN mkdir -p public/uploads/logos public/uploads/heroes public/uploads/about

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "server/index.js"]