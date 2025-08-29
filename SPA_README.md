# Quotely Insurance SPA - React Single Page Application

## 🚀 Live Production Site
**URL:** https://quotely-7vxtqibgk-quotely.vercel.app

## 📋 Project Overview
Modern React-based Single Page Application (SPA) for Quotely Insurance Platform, featuring clean URL routing, early signup forms, and professional insurance agency tools.

## 🎨 Design System

### Color Palette
- **Primary (Navy):** `#1a3a6e`
- **Primary Dark:** `#112b50`
- **Accent (Blue):** `#0077cc`
- **CTA (Orange):** `#ff6600`
- **CTA Hover:** `#ff8533`
- **Success (Green):** `#28a745`
- **Text Primary:** `#212529`
- **Text Muted:** `#6c757d`

### Typography
- **Font Family:** 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings:** Font-weight 700
- **Body:** Font-weight 400

## 🏗️ Project Structure

```
quotely-spa-today/
├── src/
│   ├── components/
│   │   ├── Header/              # Navigation with signup CTA
│   │   ├── Hero/                # Landing section with early access
│   │   ├── Pricing/             # Pricing plans and tiers
│   │   ├── Calculator/          # ROI calculator component
│   │   ├── FAQ/                 # Frequently asked questions
│   │   ├── Footer/              # Site footer
│   │   └── EarlySignupForm/     # Lead capture form with Formspree
│   ├── pages/
│   │   ├── Home/                # Main landing page
│   │   ├── PricingPage/         # Dedicated pricing page
│   │   ├── CalculatorPage/      # ROI calculator page
│   │   └── ComparePage/         # Feature comparison page
│   ├── styles/
│   │   └── global.css           # Global styles and CSS variables
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── dist/                        # Production build output
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── vercel.json                 # Vercel deployment config
```

## 🛠️ Tech Stack

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.3
- **Routing:** React Router DOM 7.8.2
- **Deployment:** Vercel
- **Form Handler:** Formspree
- **Styling:** CSS-in-JS with inline styles

## 📦 Key Features

### 1. Early Signup Form
- **Integration:** Formspree (ID: xzzbgqka)
- **Fields:** Name, Email, Company, Phone, Agency Size, Current Software
- **Fallback:** mailto:signup@tryquotely.com
- **Conversion Tracking:** Google Analytics events
- **Offer:** 50% off first year for early access

### 2. Clean URL Structure
- `/` - Home page with all sections
- `/pricing` - Dedicated pricing page
- `/calculator` - Interactive ROI calculator
- `/compare` - Feature comparison matrix

### 3. Interactive Components
- **ROI Calculator:** Real-time calculations with React useState
- **Pricing Toggle:** Monthly/Yearly billing switch
- **FAQ Accordion:** Expandable Q&A sections
- **Mobile Navigation:** Responsive hamburger menu

## 🚀 Deployment

### Production Deployment (Vercel)
```bash
# Build for production
npm run build

# Deploy with Vercel CLI
npx vercel --prod --token YOUR_TOKEN --yes
```

### Current Production Details
- **Project ID:** prj_U95RAe9qztUivooHEeL5WBpEzelV
- **Deployment URL:** https://quotely-7vxtqibgk-quotely.vercel.app
- **Vercel Dashboard:** https://vercel.com/quotely/quotely-spa

### Alternative Deployment (Netlify Drop)
1. Build: `npm run build`
2. Visit: https://app.netlify.com/drop
3. Drag `dist` folder to browser

### Alternative Deployment (Surge.sh)
```bash
cd dist
npx surge
```

## 📝 Development

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Runs on: http://localhost:5178/

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Netlify
- `npm run deploy:vercel` - Deploy to Vercel
- `npm run deploy:gh-pages` - Deploy to GitHub Pages

## 📊 Performance Metrics

### Build Size
- **Total:** 328KB
- **Gzipped:** ~93KB
- **CSS:** 10.5KB
- **JavaScript:** 318KB

### Optimization Features
- Code splitting with React Router
- Minified production build
- Optimized asset loading
- Lazy loading for routes

## 🔧 Configuration Files

### vercel.json
```json
{
  "name": "quotely-spa",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### vite.config.js
- React plugin configuration
- Build optimizations
- Development server settings

## 📧 Form Submission Flow

1. **User fills form** → 
2. **Validates required fields** → 
3. **Submits to Formspree** → 
4. **Success confirmation** → 
5. **Analytics tracking**

### Formspree Endpoint
- **Form ID:** xzzbgqka
- **Endpoint:** https://formspree.io/f/xzzbgqka
- **Email Notifications:** Configured in Formspree dashboard

## 🔍 SEO Considerations

- Clean URL structure (no .html extensions)
- Proper heading hierarchy
- Meta tags in index.html
- Fast page load times
- Mobile-responsive design

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Dev server tries ports 5173-5178
   - Kill existing Node processes or use different port

2. **Vercel deployment fails**
   - Ensure valid token: `vercel login`
   - Check project permissions

3. **Form submissions not working**
   - Verify Formspree form ID
   - Check browser console for CORS errors
   - Test email fallback

## 📈 Analytics Integration

### Google Analytics
- Event tracking for form submissions
- Conversion tracking for early signups
- Page view tracking with React Router

## 🔐 Security

- No sensitive data in repository
- Environment variables for tokens
- Secure form submission via HTTPS
- Input validation on all forms

## 🤝 Support

### Contact
- **Email:** signup@tryquotely.com
- **Website:** https://tryquotely.com
- **Dashboard:** https://vercel.com/quotely

## 📄 License

© 2025 Quotely Insurance Platform. All rights reserved.

---

**Last Updated:** December 29, 2024
**Version:** 1.0.0
**Status:** Production Live