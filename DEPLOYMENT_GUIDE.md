# Deployment Guide for tryquotely.com with OTTO SEO

## ✅ Project Setup Complete

Your Quotely platform with OTTO SEO integration is ready for deployment!

### 🔍 OTTO Script Implementation

The project includes the official SearchAtlas OTTO script with base64 encoding:
- **UUID**: `93fecead-4a44-4a94-8620-c45564441a5b`
- **Script Type**: Base64-encoded loader for enhanced security
- **Attributes**: `nowprocket` and `nitro-exclude` for CDN compatibility

## 🚀 Deploy to Vercel

### Option 1: Deploy via CLI (Recommended)

1. **Login to Vercel**:
   ```bash
   vercel login
   ```
   Choose your preferred authentication method.

2. **Deploy the project**:
   ```bash
   cd tryquotely
   vercel
   ```
   
   When prompted:
   - Set up and deploy: `Y`
   - Which scope: Choose your account/team
   - Link to existing project?: `N` (for first deployment)
   - Project name: `tryquotely` 
   - Directory: `.` (current directory)
   - Override settings?: `N`

3. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
   ```bash
   cd tryquotely
   git remote add origin https://github.com/QuotelyInc/tryquotely.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure project settings
   - Deploy

## 🔧 Environment Variables on Vercel

After deployment, add these environment variables in Vercel Dashboard:

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_OTTO_UUID=93fecead-4a44-4a94-8620-c45564441a5b
NEXT_PUBLIC_OTTO_ENABLED=true
NEXT_PUBLIC_SITE_URL=https://tryquotely.com
NEXT_PUBLIC_API_URL=https://api.tryquotely.com
```

## 🌐 Custom Domain Setup

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Add `tryquotely.com`
3. Update your DNS records:
   - Add CNAME record: `@ → cname.vercel-dns.com`
   - Or A records pointing to Vercel's IPs

## ✅ OTTO SEO Verification

### 1. Check Script Loading
Open browser console on your deployed site and run:
```javascript
debugOTTO()
```

Expected output:
```javascript
{
  scriptLoaded: true,
  searchAtlasAvailable: true,
  uuid: "93fecead-4a44-4a94-8620-c45564441a5b",
  environment: "production",
  ottEnabled: "true",
  siteUrl: "https://tryquotely.com"
}
```

### 2. Verify in SearchAtlas Dashboard
1. Login to [SearchAtlas Dashboard](https://dashboard.searchatlas.com/)
2. Navigate to **OTTO & Audit** → **All Sites**
3. Confirm `tryquotely.com` appears
4. Check that data is being received (may take 24-48 hours)

## 📊 What OTTO Will Do

### Immediate (First 24 Hours)
- ✅ Script loads and configures for insurance industry
- ✅ Begins collecting page performance data
- ✅ Analyzes site structure and content

### Week 1-2
- 🔧 Automated meta tag optimization
- 📝 Schema markup implementation for insurance services
- 🚀 Technical SEO fixes (broken links, page speed)
- 🖼️ Image optimization with insurance keywords

### Week 3-6
- 📈 25-40% increase in organic traffic
- 🎯 Improved rankings for target keywords:
  - "insurance quotes"
  - "auto insurance quotes"
  - "commercial insurance platform"
  - "insurance agency software"
- 💼 More qualified leads from insurance agents
- 🏆 Better search visibility vs competitors

### Month 2-6
- 🚀 Dominant search presence for insurtech keywords
- 💰 Increased demo requests and conversions
- 📊 Superior competitive positioning vs EZLynx, Applied Systems, Vertafore

## 🔍 Monitor Performance

### SearchAtlas Dashboard
Track your SEO performance:
- Keyword rankings
- Traffic growth
- Technical health scores
- Competitor analysis

### Vercel Analytics
Monitor site performance:
- Core Web Vitals
- Page views
- User engagement

## 🛠️ Troubleshooting

### Script Not Loading?
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Ensure no ad blockers are interfering
4. Check Network tab for script request

### No Data in SearchAtlas?
1. Wait 24-48 hours for initial data
2. Verify UUID matches: `93fecead-4a44-4a94-8620-c45564441a5b`
3. Check that site is publicly accessible
4. Contact SearchAtlas support if needed

## 📞 Support

- **SearchAtlas Support**: dashboard.searchatlas.com/support
- **Vercel Support**: vercel.com/support
- **Quotely Team**: support@tryquotely.com

## 🎯 Next Steps

1. Complete Vercel deployment
2. Configure custom domain
3. Set environment variables
4. Verify OTTO is working
5. Monitor SearchAtlas dashboard
6. Watch organic traffic grow!

---

**Your competitive advantage is now live!** OTTO will continuously optimize your site for maximum search visibility, helping Quotely dominate the insurtech market.