@echo off
echo ================================================
echo    DEPLOYING QUOTELY WITH NEW COLORS
echo ================================================
echo.

cd /d "C:\Users\dusti\quotely-spa-today"

echo Building production version...
call npm run build

echo.
echo ================================================
echo    DEPLOYMENT OPTIONS
echo ================================================
echo.
echo Choose your deployment method:
echo.
echo [1] Netlify Drop (Drag & Drop - NO LOGIN REQUIRED)
echo [2] Surge.sh (Simple deployment)
echo [3] Vercel
echo [4] GitHub Pages
echo [5] Open dist folder for manual upload
echo.

set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo ================================================
    echo    NETLIFY DROP - NO LOGIN REQUIRED!
    echo ================================================
    echo.
    echo 1. Opening https://app.netlify.com/drop
    echo 2. Opening your dist folder
    echo 3. Simply DRAG the dist folder onto the Netlify Drop page
    echo 4. Your site will be live instantly!
    echo.
    start https://app.netlify.com/drop
    explorer dist
    echo.
    echo Drag the 'dist' folder to the Netlify Drop page that just opened.
    echo Your site will be live immediately with a URL!
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Surge.sh...
    cd dist
    call surge
    echo.
    echo DEPLOYMENT COMPLETE!
) else if "%choice%"=="3" (
    echo.
    echo Deploying to Vercel...
    call vercel --prod
    echo.
    echo DEPLOYMENT COMPLETE!
) else if "%choice%"=="4" (
    echo.
    echo Deploying to GitHub Pages...
    call npx gh-pages -d dist
    echo.
    echo DEPLOYMENT COMPLETE!
) else if "%choice%"=="5" (
    echo.
    echo Opening dist folder...
    explorer dist
    echo.
    echo Upload all files from the 'dist' folder to your web server.
    echo Make sure to configure your server for SPA routing.
) else (
    echo.
    echo Opening Netlify Drop (no login required)...
    start https://app.netlify.com/drop
    explorer dist
)

echo.
echo ================================================
echo    YOUR SITE WITH NEW COLORS IS READY!
echo ================================================
echo.
echo Features:
echo - Dark navy header (#1a3a6e)
echo - Orange buttons (#ff6600)
echo - Professional color scheme restored
echo - Ready for production
echo.
pause