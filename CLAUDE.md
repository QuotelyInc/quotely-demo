# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
cd tryquotely
npm run dev          # Start dev server with Turbopack (http://localhost:3000)

# Building & Deployment
npm run build        # Build for production
npm run lint         # Run ESLint
vercel --prod        # Deploy to production (must be on master branch)
vercel               # Deploy preview

# Git workflow
git branch --show-current  # Verify on master before deploying
git add -A && git commit -m "message" && git push origin master
```

## Critical Deployment Note
**ALWAYS deploy from master branch**: The production site (tryquotely.com) should only be deployed from master using `vercel --prod`

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Deployment**: Vercel
- **SEO**: OTTO by SearchAtlas (UUID: 93fecead-4a44-4a94-8620-c45564441a5b)

### Core Systems

#### 1. OTTO SEO Integration
The site uses OTTO for automated SEO optimization. Key files:
- `components/OTTOProvider.tsx` - Context provider for tracking
- `components/OTTOScript.tsx` - Script injection component
- `lib/otto.ts` - OTTO configuration and utilities
- All tracking calls go through `useOTTOTracking()` hook

OTTO is configured for InsurTech with:
- Target keywords: insurance quotes, auto insurance, commercial insurance
- Competitors tracked: ezlynx, applied systems, vertafore, hawksoft
- API Key: 0881d3c546ed5294849fa12fcc4436f5

#### 2. Page Structure
- `app/` - Next.js App Router pages
  - Core conversion pages: `/`, `/pricing`, `/demo`, `/get-started`, `/quad`
  - Competitor comparison: `/compare/vs-ezlynx`, etc.
  - Content pages: `/blog`, `/industry-insights`
  - AMS-specific pages: `/ams-agency-management-system`, `/ams-customer-support-experience`

#### 3. Component Architecture
- `components/Navigation.tsx` - Premium navigation with glassmorphism effect
- `components/Footer.tsx` - Site footer
- `components/ThemeProvider.tsx` - Theme management
- `components/QuoteFormPsychology.tsx` - Conversion-optimized quote form

### Strategic Focus Areas

#### Performance Targets
- Page speed: < 1.2 seconds
- Mobile score: 98/100
- Core Web Vitals: LCP < 1.2s, FID < 100ms, CLS < 0.1

#### Competitive Positioning
The site emphasizes being 60% faster than competitors:
- EZLynx: 4.2 min quote time vs Quotely's 1.8 min
- Applied Systems: $1140/mo vs Quotely's $679/mo (QUAD 1.0)
- Mobile score: 98/100 vs industry average 72/100

#### QUAD Pricing Tiers
- QUAD 1.0: $1,500 buy-in, $679/month
- QUAD 2.0: $3,000 buy-in, $979/month  
- QUAD 3.0: $5,000 buy-in, $1,529/month
Each tier includes state exclusivity options

### SEO & Marketing Configuration

#### Sitemap Strategy
- Competitor pages prioritized at 1.0 priority
- Excluded: /login, /dashboard/*, /admin/*, /settings/*
- Located at: `public/sitemap.xml`
- Auto-submission configured for Google and Bing

#### Conversion Optimization
- Target conversion rate: 15% (vs 2-3% industry standard)
- Psychological triggers implemented: urgency, scarcity, social proof
- Trust indicators: SOC 2 badges, testimonials, metrics

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_OTTO_UUID=93fecead-4a44-4a94-8620-c45564441a5b
NEXT_PUBLIC_OTTO_ENABLED=true
NEXT_PUBLIC_SITE_URL=https://tryquotely.com
```

### Claude Configuration
The project includes `.claude/` directory with:
- `config.yaml` - Project configuration and targets
- `agents/` - Specialized agents for sitemap, SEO, deployment
- `workflows/` - Automated deployment workflows

### Testing & Validation
```bash
# Verify OTTO is working (run in browser console)
debugOTTO()

# Check sitemap
curl -I https://tryquotely.com/sitemap.xml

# Validate build before deploy
npm run build && npm run lint
```

### Key Business Logic
- Quote generation emphasizes speed (1.8 min avg)
- Pricing uses psychological anchoring with buy-in amounts
- Competitive comparison pages target specific competitor keywords
- Industry insights and blog for content marketing
- AMS pages target agency management system searches