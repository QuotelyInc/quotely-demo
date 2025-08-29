# DEPLOY YOUR QUOTELY SPA LIVE - INSTANT DEPLOYMENT
Clear-Host
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "    DEPLOYING YOUR SITE LIVE NOW! 🚀" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\dusti\quotely-spa-today"

Write-Host "✅ Your React SPA is built and ready!" -ForegroundColor Green
Write-Host "   Location: C:\Users\dusti\quotely-spa-today\dist" -ForegroundColor White
Write-Host ""

Write-Host "📦 Site Features:" -ForegroundColor Yellow
Write-Host "   • No .html extensions" -ForegroundColor White
Write-Host "   • Clean URLs (/pricing, /calculator, /compare)" -ForegroundColor White
Write-Host "   • Dark navy header + Orange buttons" -ForegroundColor White
Write-Host "   • Replaces all your old HTML pages" -ForegroundColor White
Write-Host ""

Write-Host "🌐 INSTANT DEPLOYMENT - CHOOSE ONE:" -ForegroundColor Cyan
Write-Host ""
Write-Host "[1] Netlify Drop (NO LOGIN - Drag & Drop)" -ForegroundColor Green
Write-Host "[2] Surge.sh (Simple command line)" -ForegroundColor Yellow
Write-Host ""

$choice = Read-Host "Enter 1 or 2"

if ($choice -eq "1") {
    Write-Host "`n🚀 Opening Netlify Drop..." -ForegroundColor Green
    Start-Process "https://app.netlify.com/drop"
    Start-Process explorer "C:\Users\dusti\quotely-spa-today\dist"
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "    DRAG THE 'dist' FOLDER TO NETLIFY" -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. Netlify Drop is now open in your browser" -ForegroundColor White
    Write-Host "2. Your dist folder is now open" -ForegroundColor White
    Write-Host "3. DRAG the entire 'dist' folder onto the Netlify page" -ForegroundColor Yellow
    Write-Host "4. Your site will be LIVE in 5 seconds!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your new React site will replace all old HTML pages!" -ForegroundColor Cyan
} else {
    Write-Host "`n🚀 Deploying with Surge..." -ForegroundColor Yellow
    Write-Host "Enter any email and password when prompted:" -ForegroundColor White
    Set-Location dist
    npx surge
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")