/**
 * Bot Analytics Tracking System
 * Tracks and analyzes bot/crawler access patterns for SEO insights
 */

import { headers } from 'next/headers';

// Known bot patterns for classification
const BOT_PATTERNS = {
  // Search engines
  googlebot: /googlebot/i,
  bingbot: /bingbot/i,
  slurp: /slurp/i, // Yahoo
  duckduckbot: /duckduckbot/i,
  baiduspider: /baiduspider/i,
  yandexbot: /yandexbot/i,
  
  // SEO tools
  ahrefs: /ahrefsbot/i,
  semrush: /semrushbot/i,
  moz: /rogerbot|dotbot/i,
  majestic: /mj12bot|majestic/i,
  
  // Social media
  facebookbot: /facebookexternalhit|facebookcatalog/i,
  twitterbot: /twitterbot/i,
  linkedinbot: /linkedinbot/i,
  whatsapp: /whatsapp/i,
  telegram: /telegrambot/i,
  
  // Other crawlers
  uptimerobot: /uptimerobot/i,
  pingdom: /pingdom/i,
  gtmetrix: /gtmetrix/i,
  
  // Bad bots
  scrapy: /scrapy/i,
  python: /python-requests|python-urllib/i,
  curl: /curl/i,
  wget: /wget/i,
};

// Bot categories for analytics
export enum BotCategory {
  SEARCH_ENGINE = 'search_engine',
  SEO_TOOL = 'seo_tool',
  SOCIAL_MEDIA = 'social_media',
  MONITORING = 'monitoring',
  SCRAPER = 'scraper',
  UNKNOWN = 'unknown',
}

// Bot access data structure
export interface BotAccess {
  bot_name: string;
  category: BotCategory;
  user_agent: string;
  path: string;
  allowed: boolean;
  timestamp: string;
  ip_address?: string;
  referer?: string;
  country?: string;
}

/**
 * Identify bot from user agent string
 */
export function identifyBot(userAgent: string): { name: string; category: BotCategory } {
  const ua = userAgent.toLowerCase();
  
  // Search engines
  if (BOT_PATTERNS.googlebot.test(ua)) return { name: 'Googlebot', category: BotCategory.SEARCH_ENGINE };
  if (BOT_PATTERNS.bingbot.test(ua)) return { name: 'Bingbot', category: BotCategory.SEARCH_ENGINE };
  if (BOT_PATTERNS.slurp.test(ua)) return { name: 'Yahoo Slurp', category: BotCategory.SEARCH_ENGINE };
  if (BOT_PATTERNS.duckduckbot.test(ua)) return { name: 'DuckDuckBot', category: BotCategory.SEARCH_ENGINE };
  if (BOT_PATTERNS.baiduspider.test(ua)) return { name: 'Baiduspider', category: BotCategory.SEARCH_ENGINE };
  if (BOT_PATTERNS.yandexbot.test(ua)) return { name: 'YandexBot', category: BotCategory.SEARCH_ENGINE };
  
  // SEO tools
  if (BOT_PATTERNS.ahrefs.test(ua)) return { name: 'AhrefsBot', category: BotCategory.SEO_TOOL };
  if (BOT_PATTERNS.semrush.test(ua)) return { name: 'SemrushBot', category: BotCategory.SEO_TOOL };
  if (BOT_PATTERNS.moz.test(ua)) return { name: 'Moz', category: BotCategory.SEO_TOOL };
  if (BOT_PATTERNS.majestic.test(ua)) return { name: 'Majestic', category: BotCategory.SEO_TOOL };
  
  // Social media
  if (BOT_PATTERNS.facebookbot.test(ua)) return { name: 'FacebookBot', category: BotCategory.SOCIAL_MEDIA };
  if (BOT_PATTERNS.twitterbot.test(ua)) return { name: 'TwitterBot', category: BotCategory.SOCIAL_MEDIA };
  if (BOT_PATTERNS.linkedinbot.test(ua)) return { name: 'LinkedInBot', category: BotCategory.SOCIAL_MEDIA };
  if (BOT_PATTERNS.whatsapp.test(ua)) return { name: 'WhatsApp', category: BotCategory.SOCIAL_MEDIA };
  if (BOT_PATTERNS.telegram.test(ua)) return { name: 'TelegramBot', category: BotCategory.SOCIAL_MEDIA };
  
  // Monitoring
  if (BOT_PATTERNS.uptimerobot.test(ua)) return { name: 'UptimeRobot', category: BotCategory.MONITORING };
  if (BOT_PATTERNS.pingdom.test(ua)) return { name: 'Pingdom', category: BotCategory.MONITORING };
  if (BOT_PATTERNS.gtmetrix.test(ua)) return { name: 'GTmetrix', category: BotCategory.MONITORING };
  
  // Scrapers/Bad bots
  if (BOT_PATTERNS.scrapy.test(ua)) return { name: 'Scrapy', category: BotCategory.SCRAPER };
  if (BOT_PATTERNS.python.test(ua)) return { name: 'Python', category: BotCategory.SCRAPER };
  if (BOT_PATTERNS.curl.test(ua)) return { name: 'curl', category: BotCategory.SCRAPER };
  if (BOT_PATTERNS.wget.test(ua)) return { name: 'wget', category: BotCategory.SCRAPER };
  
  // Check if it's any kind of bot based on common patterns
  if (/bot|crawler|spider|scraper|crawl/i.test(ua)) {
    return { name: 'Unknown Bot', category: BotCategory.UNKNOWN };
  }
  
  return { name: 'Unknown', category: BotCategory.UNKNOWN };
}

/**
 * Check if a path should be allowed based on robots.txt rules
 */
export function isPathAllowed(path: string, userAgent: string = '*'): boolean {
  // Disallowed paths for all bots
  const disallowedPaths = [
    '/api/',
    '/admin/',
    '/_next/image',
  ];
  
  // Check if path matches any disallowed pattern
  for (const pattern of disallowedPaths) {
    if (path.startsWith(pattern)) {
      return false;
    }
  }
  
  // Check for JSON files
  if (path.endsWith('.json')) {
    return false;
  }
  
  // Special rules for specific bots
  const bot = identifyBot(userAgent);
  
  // Block SEO tools completely
  if (bot.category === BotCategory.SEO_TOOL) {
    return false;
  }
  
  // Block scrapers completely
  if (bot.category === BotCategory.SCRAPER) {
    return false;
  }
  
  // Allow everything else
  return true;
}

/**
 * Track bot access to robots.txt
 */
export async function trackBotAccess(
  userAgent: string,
  path: string,
  requestHeaders?: Headers
): Promise<void> {
  try {
    const bot = identifyBot(userAgent);
    const allowed = isPathAllowed(path, userAgent);
    
    const accessData: BotAccess = {
      bot_name: bot.name,
      category: bot.category,
      user_agent: userAgent,
      path,
      allowed,
      timestamp: new Date().toISOString(),
      ip_address: requestHeaders?.get('x-forwarded-for') || requestHeaders?.get('x-real-ip') || undefined,
      referer: requestHeaders?.get('referer') || undefined,
      country: requestHeaders?.get('cf-ipcountry') || undefined, // Cloudflare geo header
    };
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Bot Access:', accessData);
    }
    
    // Send to analytics service (implement based on your analytics provider)
    await sendToAnalytics(accessData);
    
    // Store in database for analysis (optional)
    if (process.env.ENABLE_BOT_DB_TRACKING === 'true') {
      await storeBotAccess(accessData);
    }
  } catch (error) {
    console.error('Error tracking bot access:', error);
    // Don't throw - we don't want tracking errors to break the request
  }
}

/**
 * Send bot access data to analytics service
 */
async function sendToAnalytics(data: BotAccess): Promise<void> {
  // Implementation depends on your analytics provider
  // Examples: Google Analytics, Mixpanel, Amplitude, custom solution
  
  // For OTTO integration (if enabled)
  if (typeof window !== 'undefined' && (window as any).OTTO?.track) {
    (window as any).OTTO.track('bot_crawl', data);
    return;
  }
  
  // For server-side analytics
  if (process.env.ANALYTICS_ENDPOINT) {
    try {
      await fetch(process.env.ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
        },
        body: JSON.stringify({
          event: 'bot_crawl',
          properties: data,
        }),
      });
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }
}

/**
 * Store bot access in database for long-term analysis
 */
async function storeBotAccess(data: BotAccess): Promise<void> {
  // This would connect to your database
  // Example implementation for a hypothetical database
  
  /*
  try {
    await db.botAccess.create({
      data: {
        botName: data.bot_name,
        category: data.category,
        userAgent: data.user_agent,
        path: data.path,
        allowed: data.allowed,
        timestamp: new Date(data.timestamp),
        ipAddress: data.ip_address,
        referer: data.referer,
        country: data.country,
      },
    });
  } catch (error) {
    console.error('Failed to store bot access:', error);
  }
  */
  
  // For now, just log it
  console.log('Would store bot access:', data);
}

/**
 * Get bot access statistics
 */
export async function getBotStats(timeRange: 'hour' | 'day' | 'week' | 'month' = 'day') {
  // This would query your database or analytics service
  // Returns aggregated statistics about bot access patterns
  
  return {
    total_requests: 0,
    unique_bots: 0,
    blocked_requests: 0,
    top_bots: [],
    top_paths: [],
    category_breakdown: {},
  };
}