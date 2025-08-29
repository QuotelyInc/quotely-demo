# 🌐 Connect www.tryquotely.com to Your React SPA

## ✅ Your Deployment is Live!
- **Vercel Project:** https://vercel.com/quotely/tryquotely/
- **Current URL:** https://quotely-2v4td4psg-quotely.vercel.app
- **Target Domain:** www.tryquotely.com

## 📝 Steps to Connect Your Domain

### Step 1: Add Domain in Vercel
1. Go to: https://vercel.com/quotely/quotely-spa/settings/domains
2. Click "Add Domain"
3. Enter: `tryquotely.com`
4. Click "Add"
5. Also add: `www.tryquotely.com`

### Step 2: Get DNS Settings from Vercel
Vercel will show you:
```
For tryquotely.com:
Type: A
Name: @
Value: 76.76.21.21

For www.tryquotely.com:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Update Your Domain Provider DNS

#### If your domain is at GoDaddy:
1. Login to GoDaddy
2. Go to: My Products > Domains > tryquotely.com > DNS
3. Delete existing A records
4. Add new records:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

#### If your domain is at Namecheap:
1. Login to Namecheap
2. Go to: Domain List > Manage > Advanced DNS
3. Update records as above

#### If your domain is elsewhere:
1. Find DNS/Zone settings
2. Update A and CNAME records as shown above

### Step 4: Wait for DNS Propagation
- Usually takes 5-30 minutes
- Maximum 48 hours

## 🔍 Verify Domain Connection

### Check DNS Propagation:
```bash
nslookup tryquotely.com
nslookup www.tryquotely.com
```

### Expected Result:
- tryquotely.com should point to: 76.76.21.21
- www.tryquotely.com should point to: cname.vercel-dns.com

## 🚀 What Happens Next

Once DNS updates:
1. **www.tryquotely.com** will show your React SPA
2. **No more .html extensions** in URLs
3. **Automatic SSL certificate** from Vercel
4. **Every GitHub push** will auto-deploy

## 📊 Your New Site Features

### Clean URLs (No .html):
- www.tryquotely.com (home)
- www.tryquotely.com/pricing
- www.tryquotely.com/calculator
- www.tryquotely.com/compare

### Components:
- ✅ Early signup form (Formspree)
- ✅ Dark navy header (#1a3a6e)
- ✅ Orange buttons (#ff6600)
- ✅ ROI Calculator
- ✅ Mobile responsive

## 🔧 Troubleshooting

### Site still shows old HTML:
1. Clear browser cache (Ctrl+F5)
2. Check DNS propagation: https://dnschecker.org
3. Verify Vercel domain settings

### SSL Certificate Error:
- Wait 10 minutes after DNS update
- Vercel auto-provisions SSL

### 404 Errors on Routes:
- Already configured in vercel.json
- SPA routing is working

## 📞 Need Help?

- **Vercel Dashboard:** https://vercel.com/quotely/tryquotely/
- **GitHub Repo:** https://github.com/QuotelyInc/quotely-demo
- **Current Live Site:** https://quotely-2v4td4psg-quotely.vercel.app

---

**Last Step:** Update your DNS records now to make www.tryquotely.com show your new React SPA!