@echo off
echo Building Quotely unified site...

echo Installing dependencies...
call npm install

echo Building the project...
call npm run build

echo Deploying to Vercel...
call vercel --prod

echo Deployment complete!
pause