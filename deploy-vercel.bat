@echo off
echo ================================================
echo    DEPLOYING TO VERCEL - QUOTELY ORGANIZATION
echo ================================================
echo.

cd /d "C:\Users\dusti\quotely-spa-today"

echo Checking Vercel login status...
vercel whoami

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ================================================
    echo    PLEASE LOGIN TO VERCEL FIRST
    echo ================================================
    echo.
    echo Running: vercel login
    echo.
    echo Choose your preferred login method:
    echo - Continue with GitHub (recommended)
    echo - Continue with Email
    echo.
    vercel login
    echo.
    echo After login, please run this script again.
    pause
    exit /b
)

echo.
echo ================================================
echo    DEPLOYING TO PRODUCTION
echo ================================================
echo.

echo Building production version...
call npm run build

echo.
echo Deploying to Vercel...
echo.

REM Deploy to Vercel with production flag
vercel --prod --yes --name quotely-spa

echo.
echo ================================================
echo    DEPLOYMENT COMPLETE!
echo ================================================
echo.
echo Your site is now LIVE with:
echo - Dark navy header (#1a3a6e)
echo - Orange buttons (#ff6600)
echo - Professional color scheme
echo.
echo Check your Vercel dashboard at: https://vercel.com/quotely
echo.
pause