# 🚀 Quick Deploy Guide for OTTO on tryquotely.com

## Step 1: Login to Vercel (if needed)
```bash
vercel login
```
Choose GitHub authentication (recommended)

## Step 2: Deploy to Production
```bash
cd tryquotely
vercel --prod
```

When prompted:
- Setup and deploy? **Y**
- Which scope? **Choose your account**
- Link to existing project? **N** (first time) or **Y** (if exists)
- Project name? **tryquotely**
- Directory? **.** (current)

## Step 3: Add Environment Variables

### Option A: Via Command Line
```bash
# Add OTTO UUID
vercel env add NEXT_PUBLIC_OTTO_UUID production
# Enter: 93fecead-4a44-4a94-8620-c45564441a5b

# Add OTTO Enabled Flag
vercel env add NEXT_PUBLIC_OTTO_ENABLED production
# Enter: true

# Add Site URL
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://tryquotely.com
```

### Option B: Via Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **tryquotely** project
3. Go to **Settings** → **Environment Variables**
4. Add these:
   - `NEXT_PUBLIC_OTTO_UUID` = `93fecead-4a44-4a94-8620-c45564441a5b`
   - `NEXT_PUBLIC_OTTO_ENABLED` = `true`
   - `NEXT_PUBLIC_SITE_URL` = `https://tryquotely.com`

## Step 4: Force Redeploy with Env Variables
```bash
vercel --prod --force
```

## Step 5: Verify OTTO is Working

### Immediate Check (After Deployment)
1. Visit: https://tryquotely.com
2. Open DevTools Console (F12)
3. You should see: `🔍 OTTO Auto-Verification Running...`
4. Run: `debugOTTO()`
5. Expected output:
```javascript
{
  primaryScript: true,
  backupScript: true,
  searchAtlasReady: true,
  uuid: "93fecead-4a44-4a94-8620-c45564441a5b"
}
```

### Network Check
In DevTools Network tab, filter by "searchatlas" - you should see:
- `dynamic_optimization.js` loading from `dashboard.searchatlas.com`

### SearchAtlas Dashboard (24-48 hours)
1. Login to [dashboard.searchatlas.com](https://dashboard.searchatlas.com/)
2. Navigate to **OTTO & Audit** → **All Sites**
3. Look for **tryquotely.com**

## 🎯 What Happens Next?

### Hour 1-24
- OTTO script begins analyzing your site
- Technical SEO audit starts
- Initial data collection

### Day 1-7
- First optimizations applied
- Meta tags enhanced
- Schema markup added
- Image SEO improved

### Week 2-6
- **25-40% organic traffic increase**
- Better rankings for:
  - "insurance quotes"
  - "insurance platform"
  - "insurance technology"
- Outranking EZLynx and Applied Systems

## 🔧 Troubleshooting

### OTTO Script Not Loading?
```bash
# Check deployment URL
vercel ls

# Get deployment info
vercel inspect [deployment-url]

# Check logs
vercel logs
```

### Environment Variables Not Working?
```bash
# List all env variables
vercel env ls

# Pull env variables locally
vercel env pull
```

### Force Fresh Deployment
```bash
# Clear cache and redeploy
vercel --prod --force --no-cache
```

## 📱 Alternative: Deploy via GitHub

1. Push to GitHub:
```bash
git remote add origin https://github.com/[your-username]/tryquotely.git
git push -u origin master
```

2. Import to Vercel:
- Go to [vercel.com/new](https://vercel.com/new)
- Import GitHub repository
- Add environment variables during setup
- Deploy

## ✅ Success Indicators

- ✓ Console shows OTTO verification messages
- ✓ Network shows searchatlas.com requests
- ✓ debugOTTO() returns positive status
- ✓ No errors in console
- ✓ Page loads quickly with OTTO active

## 🆘 Need Help?

- **Vercel Issues**: [vercel.com/support](https://vercel.com/support)
- **OTTO/SearchAtlas**: Check dashboard or contact support
- **Project Issues**: Review this guide or check logs

---

**Your OTTO UUID**: `93fecead-4a44-4a94-8620-c45564441a5b`

**Remember**: OTTO will give you a significant competitive advantage over EZLynx and Applied Systems in organic search!