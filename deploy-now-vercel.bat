@echo off
echo ================================================
echo    DEPLOYING TO VERCEL - TRYQUOTELY
echo ================================================
echo.
echo Project ID: prj_U95RAe9qztUivooHEeL5WBpEzelV
echo.

cd /d "C:\Users\dusti\quotely-spa-today"

echo Building production version...
call npm run build

echo.
echo ================================================
echo    DEPLOYMENT OPTIONS
echo ================================================
echo.

echo Deploying with Vercel CLI...
echo.

REM Try to deploy with the project ID
npx vercel --prod --yes --scope quotely --project-id prj_U95RAe9qztUivooHEeL5WBpEzelV

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ================================================
    echo    ALTERNATIVE: Manual Token Deployment
    echo ================================================
    echo.
    echo If the above failed, please:
    echo 1. Go to: https://vercel.com/account/tokens
    echo 2. Create a new token
    echo 3. Run this command:
    echo.
    echo npx vercel --prod --token YOUR_TOKEN --yes
    echo.
)

echo.
echo ================================================
echo    DEPLOYMENT DETAILS
echo ================================================
echo.
echo Your site will be live at:
echo - https://tryquotely.vercel.app
echo - https://quotely-spa.vercel.app
echo.
echo Features deployed:
echo - Early signup form with Formspree
echo - Dark navy header (#1a3a6e)
echo - Orange buttons (#ff6600)
echo - Clean URLs (no .html extensions)
echo - React SPA with routing
echo.
pause