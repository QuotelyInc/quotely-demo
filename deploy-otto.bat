@echo off
echo 🚀 Deploying tryquotely.com with OTTO SEO Integration
echo ======================================================

REM Step 1: Deploy to Vercel
echo.
echo 📦 Step 1: Deploying to Vercel...
call vercel --prod

REM Step 2: Check if deployment was successful
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Deployment failed. Please run 'vercel login' first.
    exit /b 1
)

REM Step 3: List current environment variables
echo.
echo ⚙️ Step 2: Checking environment variables...
call vercel env ls

REM Step 4: Provide instructions for env variables
echo.
echo 📝 Step 3: Add these environment variables in Vercel Dashboard:
echo.
echo NEXT_PUBLIC_OTTO_UUID = 93fecead-4a44-4a94-8620-c45564441a5b
echo NEXT_PUBLIC_OTTO_ENABLED = true
echo NEXT_PUBLIC_SITE_URL = https://tryquotely.com
echo.
echo Or run these commands:
echo vercel env add NEXT_PUBLIC_OTTO_UUID production
echo (enter: 93fecead-4a44-4a94-8620-c45564441a5b)
echo.
echo vercel env add NEXT_PUBLIC_OTTO_ENABLED production
echo (enter: true)
echo.
echo vercel env add NEXT_PUBLIC_SITE_URL production
echo (enter: https://tryquotely.com)
echo.

REM Step 5: Verification instructions
echo ✅ After adding environment variables, redeploy:
echo vercel --prod --force
echo.
echo 🔍 Verification Steps:
echo 1. Visit: https://tryquotely.com
echo 2. Open DevTools Console (F12)
echo 3. Run: debugOTTO()
echo 4. Check Network tab for dashboard.searchatlas.com requests
echo.
echo 📊 SearchAtlas Dashboard:
echo Check https://dashboard.searchatlas.com/ in 24-48 hours
echo.
echo UUID: 93fecead-4a44-4a94-8620-c45564441a5b
pause