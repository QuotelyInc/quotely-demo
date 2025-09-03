# Vercel GitHub Actions Setup Guide

## Required GitHub Secrets

You need to add these secrets to your GitHub repository settings:

### 1. VERCEL_TOKEN
- Go to: https://vercel.com/account/tokens
- Click "Create Token"
- Name it: "GitHub Actions Deploy"
- Copy the token value

### 2. VERCEL_ORG_ID
```
team_4wNCjLWeCdMg1uqHbaBp3d93
```

### 3. VERCEL_PROJECT_ID
```
prj_cirB1Zl02uicdNlitIQYdJcVLrFq
```

### 4. NEXT_PUBLIC_OTTO_UUID (Optional - for SEO)
```
93fecead-4a44-4a94-8620-c45564441a5b
```

## How to Add Secrets to GitHub

1. Go to your repository: https://github.com/QuotelyInc/quotely-platform
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret one by one:
   - Name: `VERCEL_TOKEN`
   - Value: (paste your token from Vercel)
   - Click "Add secret"
6. Repeat for:
   - `VERCEL_ORG_ID` = `team_4wNCjLWeCdMg1uqHbaBp3d93`
   - `VERCEL_PROJECT_ID` = `prj_cirB1Zl02uicdNlitIQYdJcVLrFq`
   - `NEXT_PUBLIC_OTTO_UUID` = `93fecead-4a44-4a94-8620-c45564441a5b`

## Workflow Files Status

✅ **deploy.yml** - Already configured correctly with:
- Vercel token authentication
- Environment variables
- Production/Preview deployment logic
- PR commenting

✅ **vercel-deploy.yml** - Simple notification workflow for master branch

## Testing the Deployment

After adding the secrets, you can test the deployment by:

1. Making a small change to any file
2. Committing and pushing to master:
```bash
git add .
git commit -m "Test GitHub Actions deployment"
git push origin master
```
3. Check the Actions tab in your GitHub repository to see the deployment progress

## Manual Deployment Commands

If you need to deploy manually from your local machine:

```bash
# Deploy to production (from master branch)
vercel --prod

# Deploy preview (from any branch)
vercel

# Deploy with specific token
vercel --prod --token YOUR_VERCEL_TOKEN
```

## Current Deployment Status

- Latest deployment: https://quotely-platform-nlqetmcbo-quotelys-projects-93b374b6.vercel.app
- Production domain: tryquotely.com (needs to be configured in Vercel dashboard)

## Troubleshooting

If the deployment fails:
1. Check that all secrets are added correctly
2. Verify you're on the master branch for production deploys
3. Check the GitHub Actions logs for specific errors
4. Ensure the Vercel token hasn't expired

## Support

For issues, contact:
- Email: support@tryquotely.com
- Phone: (918) 395-6335