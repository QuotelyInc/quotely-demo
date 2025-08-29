const fs = require('fs');
const path = require('path');
const https = require('https');

// IMPORTANT: Replace with your actual Vercel token
const VERCEL_TOKEN = 'YOUR_VERCEL_TOKEN_HERE';
const PROJECT_NAME = 'tryquotely';

// Function to read all files from dist directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to create file objects for Vercel API
function createFileObjects() {
  const distPath = path.join(__dirname, 'dist');
  const files = getAllFiles(distPath);
  const fileObjects = [];

  files.forEach(filePath => {
    const relativePath = path.relative(distPath, filePath).replace(/\\/g, '/');
    const fileContent = fs.readFileSync(filePath);
    
    fileObjects.push({
      file: relativePath,
      data: fileContent.toString('base64'),
      encoding: 'base64'
    });
  });

  return fileObjects;
}

// Function to deploy to Vercel
async function deployToVercel() {
  console.log('🚀 Starting Vercel deployment...');
  console.log('📦 Preparing files from dist folder...');
  
  const files = createFileObjects();
  console.log(`✅ Found ${files.length} files to deploy`);

  const deploymentData = {
    name: PROJECT_NAME,
    files: files,
    target: 'production',
    projectSettings: {
      framework: 'vite',
      outputDirectory: 'dist',
      buildCommand: 'npm run build',
      devCommand: 'npm run dev'
    }
  };

  const data = JSON.stringify(deploymentData);

  const options = {
    hostname: 'api.vercel.com',
    port: 443,
    path: '/v13/deployments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(responseData);
        
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Deployment successful!');
          console.log(`🌐 URL: https://${response.url}`);
          console.log(`🔗 Alias: https://${PROJECT_NAME}.vercel.app`);
          resolve(response);
        } else {
          console.error('❌ Deployment failed:', response);
          reject(response);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Simple deployment using Vercel CLI (alternative method)
function createSimpleDeployScript() {
  const scriptContent = `
#!/bin/bash
echo "================================================"
echo "    DEPLOYING TO VERCEL WITH TOKEN"
echo "================================================"
echo ""

cd "${__dirname}"

# Build the project
echo "Building project..."
npm run build

# Deploy using Vercel CLI with token
echo "Deploying to Vercel..."
npx vercel --prod --token ${VERCEL_TOKEN} --yes --name ${PROJECT_NAME}

echo ""
echo "================================================"
echo "    DEPLOYMENT COMPLETE!"
echo "================================================"
`;

  fs.writeFileSync(path.join(__dirname, 'deploy-with-token.sh'), scriptContent);
  console.log('✅ Created deploy-with-token.sh script');
}

// Main execution
if (VERCEL_TOKEN === 'YOUR_VERCEL_TOKEN_HERE') {
  console.log('⚠️  Please update the VERCEL_TOKEN in this file first!');
  console.log('');
  console.log('To get your token:');
  console.log('1. Go to: https://vercel.com/account/tokens');
  console.log('2. Click "Create Token"');
  console.log('3. Name it: "Quotely Deployment"');
  console.log('4. Copy the token and replace YOUR_VERCEL_TOKEN_HERE in this file');
  console.log('');
  console.log('Then run: node deploy-vercel-api.js');
  
  // Create alternative deployment script
  createSimpleDeployScript();
} else {
  // Run deployment
  deployToVercel()
    .then(() => {
      console.log('🎉 Your site is now live!');
      console.log('Features:');
      console.log('✅ Early signup form');
      console.log('✅ Dark navy header (#1a3a6e)');
      console.log('✅ Orange buttons (#ff6600)');
      console.log('✅ Clean URLs (no .html)');
    })
    .catch((error) => {
      console.error('Deployment failed. Please check your token and try again.');
    });
}