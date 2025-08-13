#!/bin/bash

echo "🚀 Deploying tryquotely.com with OTTO SEO Integration"
echo "======================================================"

# Step 1: Deploy to Vercel
echo "📦 Step 1: Deploying to Vercel..."
vercel --prod

# Step 2: Set environment variables
echo ""
echo "⚙️ Step 2: Setting environment variables..."
echo "Adding OTTO UUID..."
vercel env add NEXT_PUBLIC_OTTO_UUID production <<< "93fecead-4a44-4a94-8620-c45564441a5b"

echo "Adding OTTO enabled flag..."
vercel env add NEXT_PUBLIC_OTTO_ENABLED production <<< "true"

echo "Adding site URL..."
vercel env add NEXT_PUBLIC_SITE_URL production <<< "https://tryquotely.com"

# Step 3: Force redeploy with env variables
echo ""
echo "🔄 Step 3: Redeploying with environment variables..."
vercel --prod --force

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔍 Verification Steps:"
echo "1. Visit: https://tryquotely.com"
echo "2. Open DevTools Console (F12)"
echo "3. Run: debugOTTO()"
echo "4. Check Network tab for dashboard.searchatlas.com requests"
echo ""
echo "📊 SearchAtlas Dashboard:"
echo "Check https://dashboard.searchatlas.com/ in 24-48 hours"
echo ""
echo "UUID: 93fecead-4a44-4a94-8620-c45564441a5b"