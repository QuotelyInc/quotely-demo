@echo off
echo ================================================
echo    QUOTELY SPA - INSTANT DEPLOYMENT
echo ================================================
echo.

echo Building production version...
call npm run build

echo.
echo Build complete! Choose deployment:
echo.
echo [1] Netlify (Fastest - 2 min)
echo [2] Vercel
echo [3] GitHub Pages
echo [4] Manual (Open dist folder)
echo.

set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Deploying to Netlify...
    call npx netlify-cli deploy --prod --dir=dist
    echo.
    echo DEPLOYMENT COMPLETE!
    echo Your site is live!
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Vercel...
    call npx vercel --prod
    echo.
    echo DEPLOYMENT COMPLETE!
) else if "%choice%"=="3" (
    echo.
    echo Deploying to GitHub Pages...
    call npx gh-pages -d dist
    echo.
    echo DEPLOYMENT COMPLETE!
) else if "%choice%"=="4" (
    echo.
    echo Opening dist folder...
    explorer dist
    echo.
    echo Upload all files to your web server
) else (
    echo Invalid choice. Deploying to Netlify...
    call npx netlify-cli deploy --prod --dir=dist
)

echo.
echo ================================================
echo    YOUR REACT SPA IS LIVE!
echo ================================================
pause