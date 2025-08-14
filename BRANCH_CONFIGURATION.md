# Branch Configuration for Quotely Platform

## Current Configuration Status ✅

This document confirms that the Quotely Platform repository and deployment pipeline are configured to use the **`master`** branch as the primary branch, following Claude Code conventions.

## Repository Configuration

### Local Git Configuration
- **Current Branch:** `master`
- **Remote:** `origin` → `https://github.com/QuotelyInc/quotely-platform.git`
- **HEAD Reference:** `refs/heads/master`

### GitHub Repository
- **Repository:** QuotelyInc/quotely-platform
- **Default Branch:** `master`
- **Push/Pull Target:** `origin/master`

## Vercel Configuration

### vercel.json Settings
```json
{
  "github": {
    "enabled": true
  },
  "git": {
    "deploymentEnabled": {
      "master": true
    }
  }
}
```

### Deployment Configuration
- **Production Branch:** `master`
- **Auto-Deploy:** Enabled for `master` branch
- **Project:** tryquotely
- **Domain:** https://tryquotely.com

## GitHub Actions

### Workflow Configuration (.github/workflows/vercel-deploy.yml)
- **Trigger Branch:** `master`
- **Branch Verification:** Validates deployment is from `master`
- **Auto-Deploy:** On push to `master`

## NPM Scripts

### package.json Scripts
- `npm run deploy` - Deploy to Vercel production (requires master branch)
- `npm run deploy:preview` - Deploy preview build
- `npm run check-branch` - Verify current branch is master

## Verification Commands

To verify the configuration is correct, run:

```bash
# Check current branch
git branch --show-current
# Expected output: master

# Check remote configuration
git remote -v
# Expected: origin pointing to GitHub repository

# Verify Vercel deployment
npm run check-branch && npm run deploy
# Will only deploy if on master branch
```

## Important Notes

1. **Always work on `master` branch** for production deployments
2. **All merges should target `master`** branch
3. **Vercel auto-deploys** when changes are pushed to `master`
4. **GitHub Actions** validate branch before deployment

## Deployment Flow

1. Make changes locally on `master` branch
2. Commit changes: `git commit -m "message"`
3. Push to GitHub: `git push origin master`
4. Vercel automatically deploys from `master`
5. GitHub Actions verify and log deployment

---

*Configuration verified and updated on: 2025-08-14*
*Following Claude Code conventions for branch naming*