// Dynamic robots.txt route handler for Next.js
// This replaces the static robots.txt file with environment-aware content

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tryquotely.com';
  
  // Production robots.txt - optimized for search engines
  const productionRobots = `# Robots.txt for ${siteUrl}
# Generated dynamically
# Last updated: ${new Date().toISOString().split('T')[0]}

# Main rule - Allow all content by default
User-agent: *
Allow: /

# Only block truly sensitive areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/image
Disallow: /*.json$

# Explicitly allow important pages
Allow: /login
Allow: /compare/
Allow: /pricing
Allow: /demo
Allow: /get-started
Allow: /quad/
Allow: /blog/
Allow: /features/
Allow: /industry-insights/
Allow: /about
Allow: /ams-agency-management-system
Allow: /ams-customer-support-experience
Allow: /ams-sitemap
Allow: /ai-agents
Allow: /auto-insurance
Allow: /modern
Allow: /clean
Allow: /details
Allow: /turborater-hub
Allow: /turborater-hub-v2
Allow: /turborater-live
Allow: /turborater-demo
Allow: /turborater-env-demo

# Allow static assets
Allow: /_next/static/
Allow: /images/
Allow: /favicon.ico
Allow: /sitemap.xml
Allow: /robots.txt

# Search engine specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Block bad bots completely
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: Majestic-12
Disallow: /

User-agent: Majestic-SEO
Disallow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml`;

  // Development/staging robots.txt - block all crawlers
  const developmentRobots = `# Development/Staging Environment
# All crawling disabled

User-agent: *
Disallow: /

# Development notice
# This is a development/staging environment.
# Please visit ${siteUrl} for the production site.`;

  // Select appropriate robots.txt based on environment
  const robotsTxt = isProduction ? productionRobots : developmentRobots;
  
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': isProduction 
        ? 'public, max-age=86400, s-maxage=86400' // Cache for 24 hours in production
        : 'no-store, no-cache, must-revalidate', // No caching in development
      'X-Robots-Environment': isProduction ? 'production' : 'development',
    },
  });
}