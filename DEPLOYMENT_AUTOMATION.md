# 🚀 Quotely Platform - Automated Deployment Setup

## ✅ Setup Completed

The automated deployment pipeline for Quotely has been successfully configured with Claude Code + Vercel + GitHub integration.

## 📦 What's Been Set Up

### 1. **Automation Scripts** (`/scripts/`)
- `claude-deploy.ts` - Main deployment script with build, test, and deploy
- `watch-and-deploy.ts` - File watcher for automatic deployments

### 2. **GitHub Actions** (`.github/workflows/deploy.yml`)
- Automatic deployment on push to master/main
- PR preview deployments
- Build and test validation

### 3. **Vercel Configuration** (`vercel.json`)
- Enhanced with enterprise-grade settings
- API route optimizations
- Security headers
- Auto-deployment from GitHub

### 4. **Git Hooks** (`.git/hooks/`)
- `post-commit` - Auto-push after commits
- `pre-push` - Build validation before pushing

### 5. **NPM Scripts** (`package.json`)
```bash
npm run deploy              # Run automated deployment
npm run watch-deploy        # Watch files and auto-deploy
npm run claude:setup        # One-time setup
npm run deploy:prod         # Direct Vercel production deploy
npm run test:ci            # Run CI tests
```

## 🎯 Quick Start

### One-Time Setup
```bash
# Install dependencies
npm install

# Set up Claude Code integration
npm run claude:setup

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Daily Workflow

#### Option 1: Manual Deployment
```bash
# Make your changes, then:
npm run deploy "Your commit message"
```

#### Option 2: Auto-Deployment (Recommended)
```bash
# Start the watcher - it will auto-deploy on file changes
npm run watch-deploy
```

#### Option 3: Direct Commands
```bash
# Build and test
npm run build

# Deploy to production
npm run deploy:prod

# Deploy preview
npm run deploy:preview
```

## 🔐 Required Environment Variables

Add these to your `.env.local`:
```
VERCEL_TOKEN=your_token
VERCEL_ORG_ID=team_3GeWKpLeV0mZbk1lO00enEGT
VERCEL_PROJECT_ID=prj_TZClMtVsPlUsIFhG3zG9kLPHBYbv
GITHUB_TOKEN=your_github_token
```

## 🚨 Current Deployment Status

### ⚠️ Manual Action Required
The automated deployment is configured but requires:
1. **Vercel Team Access**: Add `admin@quotely.com` to the Vercel team
2. **Or Manual Deploy**: Visit https://vercel.com/quotely/tryquotely and click "Redeploy"

### ✅ What's Working
- Code changes automatically pushed to GitHub
- GitHub Actions workflow ready
- Build and lint checks functioning
- Git hooks configured

### 🔧 Deployment Methods

1. **Automatic (once permissions granted)**
   ```bash
   npm run deploy
   ```

2. **GitHub Actions (on push)**
   - Pushes to master trigger automatic deployment
   - Requires VERCEL_TOKEN in GitHub Secrets

3. **Manual via Vercel Dashboard**
   - Visit: https://vercel.com/quotely/tryquotely
   - Click "Redeploy" → Select "master" branch

## 📊 Monitoring Deployments

- **Vercel Dashboard**: https://vercel.com/quotely/tryquotely
- **GitHub Actions**: https://github.com/QuotelyInc/quotely-platform/actions
- **Live Site**: https://www.tryquotely.com

## 🛠️ Troubleshooting

### Permission Error
```
Error: Git author must have access to the team
```
**Solution**: Add team access or use manual deployment

### Build Failures
```bash
# Check build locally
npm run build

# Check lint issues
npm run lint
```

### Environment Variables
```bash
# Verify all required vars are set
npm run env:check
```

## 📝 Notes

- The platform is configured for production deployment to `tryquotely.com`
- All commits to master branch trigger deployment workflows
- File watcher has 5-second debounce to batch changes
- Build process includes Next.js optimization and static generation

## 🔗 Resources

- [Vercel Dashboard](https://vercel.com/quotely)
- [GitHub Repository](https://github.com/QuotelyInc/quotely-platform)
- [Live Site](https://www.tryquotely.com)
- [Vercel CLI Docs](https://vercel.com/docs/cli)

---

*Last Updated: $(date)*
*Automated with Claude Code + Vercel + GitHub*