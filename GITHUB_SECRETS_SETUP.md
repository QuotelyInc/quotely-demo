# GitHub Secrets Setup for Auto-Deployment

## Required Secrets

Add these secrets to your GitHub repository:
https://github.com/QuotelyInc/quotely-demo/settings/secrets/actions

### 1. VERCEL_TOKEN
Value: `wXV372P9mHbX0A62BRZT0zjv`

### 2. VERCEL_PROJECT_ID  
Value: `prj_U95RAe9qztUivooHEeL5WBpEzelV`

### 3. VERCEL_ORG_ID
To get this:
1. Go to: https://vercel.com/account
2. Find your Team ID or User ID
3. Add it as VERCEL_ORG_ID secret

## How to Add Secrets

1. Go to: https://github.com/QuotelyInc/quotely-demo/settings/secrets/actions
2. Click "New repository secret"
3. Add each secret with name and value
4. Click "Add secret"

## Verifying Auto-Deployment

After adding secrets:
1. Make any change to the code
2. Push to GitHub
3. Check Actions tab: https://github.com/QuotelyInc/quotely-demo/actions
4. Your site will auto-deploy to Vercel

## Connect Custom Domain

To connect www.tryquotely.com:
1. Go to: https://vercel.com/quotely/quotely-spa/settings/domains
2. Add domain: `tryquotely.com`
3. Add domain: `www.tryquotely.com`
4. Update DNS records at your domain provider:
   - A Record: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com

## Alternative: Direct Vercel Import

1. Visit: https://vercel.com/import/git
2. Import: https://github.com/QuotelyInc/quotely-demo
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

Once connected, every push to GitHub will automatically deploy to your live site!