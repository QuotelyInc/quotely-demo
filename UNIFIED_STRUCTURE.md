# Quotely Unified Site Structure

This repository contains the unified site structure for tryquotely.com, integrating all public pages and blog content into a cohesive Next.js application.

## Site Architecture

### Pages Structure
```
/                   - Home page (landing with QUAD pricing)
/blog              - Blog with industry insights and articles
/pricing           - Dedicated pricing page with all QUAD levels
/demo              - Demo request and video content
/about             - Company information and team
```

### Components Structure
```
components/
├── Navigation.tsx     - Shared navigation header
├── Footer.tsx        - Shared footer with links
├── OTTOProvider.tsx  - OTTO SEO tracking provider
└── OTTOScript.tsx    - OTTO SEO script loader
```

### Key Features

1. **Unified Navigation**: All pages use the same navigation component with active states
2. **OTTO SEO Integration**: Site-wide OTTO SEO tracking for insurance industry optimization
3. **Responsive Design**: Mobile-first responsive design across all pages
4. **Consistent Styling**: Shared design system and CSS variables
5. **Performance Optimized**: Fast loading with Next.js optimization

### OTTO Tracking

The site includes comprehensive OTTO SEO tracking:
- Page view tracking
- User action tracking
- Insurance industry-specific keywords
- Competitor analysis integration
- Real-time SEO optimization

### Content Pages

#### Home Page (`/`)
- Hero section with value propositions
- Feature comparison table
- Testimonials and social proof
- Pricing overview
- CTA sections

#### Blog (`/blog`)
- Article grid with categories
- Featured posts
- Newsletter signup
- SEO-optimized content structure

#### Pricing (`/pricing`)
- Complete QUAD pricing structure (1.0 - 7.0)
- Early access pricing
- Feature comparison
- ROI calculator integration

#### Demo (`/demo`)
- Demo request form
- Video content placeholder
- Feature walkthrough
- Contact information

#### About (`/about`)
- Company mission and values
- Team profiles
- Company statistics
- Career opportunities

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Deployment

Use the provided `deploy.bat` script for automated deployment:
```bash
deploy.bat
```

This will:
1. Install dependencies
2. Build the project
3. Deploy to Vercel production

### SEO Features

- Comprehensive meta tags
- Open Graph integration
- Twitter Card support
- Structured data (JSON-LD)
- OTTO SEO dynamic optimization
- Insurance industry keyword targeting

### Performance

- Next.js 15 with Turbopack
- Optimized images and fonts
- Critical CSS inlining
- Lazy loading for non-critical content
- Compressed assets

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement
- Accessible design (WCAG compliant)

## Navigation Flow

The unified navigation ensures users can seamlessly move between:
- Home → Features → Pricing → Demo flow
- Blog → Individual articles → Newsletter signup
- About → Team → Careers → Contact
- Consistent header/footer across all pages

## Tracking & Analytics

All user interactions are tracked through OTTO SEO:
- Navigation clicks
- CTA button clicks
- Form submissions
- Scroll depth
- Page engagement time
- Conversion funnel tracking

This provides comprehensive insights for optimization and conversion improvement.