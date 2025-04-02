#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting build process..."

# Set production environment
export NODE_ENV=production

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

# Build backend
echo "📦 Building backend..."
cd ../backend
npm install

# Return to root directory
cd ..

echo "✅ Build completed successfully!" 