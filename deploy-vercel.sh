#!/bin/bash

# Tucker Trips - Vercel Deployment Script
# This script helps you deploy Tucker Trips to Vercel

set -e

echo "🚀 Tucker Trips - Vercel Deployment"
echo "===================================="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

echo "📦 Vercel CLI version: $(vercel --version)"
echo ""

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo "🔑 Please login to Vercel:"
    vercel login
else
    echo "✅ Logged in as: $(vercel whoami)"
fi

echo ""
echo "🏗️  Running pre-deployment checks..."

# Test build locally
echo "📦 Testing build locally..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🌍 Ready to deploy!"
echo ""
echo "Choose deployment type:"
echo "1) Production deployment (main)"
echo "2) Preview deployment (testing)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to PRODUCTION..."
        vercel --prod
        ;;
    2)
        echo ""
        echo "🔍 Deploying PREVIEW..."
        vercel
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add environment variables in Vercel Dashboard"
echo "2. Visit https://vercel.com/dashboard"
echo "3. Go to Settings → Environment Variables"
echo "4. Add all required variables from .env.local"
echo "5. Redeploy if needed"
echo ""
echo "🎉 Your app is live!"
