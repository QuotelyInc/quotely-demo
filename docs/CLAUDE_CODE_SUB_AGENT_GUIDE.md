# 🤖 Claude CODE Sub Agent Instructions for .env.local Integration

## 📋 Complete Integration Guide

This guide provides Claude CODE Sub Agents with comprehensive instructions for managing environment variables and integrations in the Quotely platform.

## 1. File Structure Requirements

### Location & Format
- **Location**: `.env.local` (in project root: `/tryquotely/.env.local`)
- **Format**: Environment variable format (`KEY=value`)
- **Encoding**: UTF-8
- **Comments**: Lines starting with `#` are ignored
- **Never commit**: This file is gitignored and should NEVER be in version control

### Example Structure
```bash
# API Keys - AI Services
CLAUDE_API_KEY=sk-ant-api03-YOUR_KEY_HERE
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
GROK_API_KEY=xai-YOUR_KEY_HERE

# Insurance Quote APIs
TURBO_RATER_API_KEY=tr_live_YOUR_KEY_HERE
GAIL_API_KEY=gail_prod_YOUR_KEY_HERE
MOMENTUM_API_KEY=mom_api_YOUR_KEY_HERE

# Analytics & Tracking
NEXT_PUBLIC_GA_PROPERTY_ID=G-28RBK32B5C
NEXT_PUBLIC_OTTO_UUID=93fecead-4a44-4a94-8620-c45564441a5b
NEXT_PUBLIC_OTTO_ENABLED=true

# Application Settings
NEXT_PUBLIC_SITE_URL=https://tryquotely.com
NODE_ENV=development
```

## 2. Integration Patterns

### API Key Usage Pattern
```typescript
// ✅ CORRECT: Use environment variables
const apiKey = process.env.TURBO_RATER_API_KEY;

// ❌ WRONG: Never hardcode keys
const apiKey = "tr_live_abc123"; // NEVER DO THIS
```

### Client vs Server Variables
```typescript
// Client-side accessible (prefix with NEXT_PUBLIC_)
const gaId = process.env.NEXT_PUBLIC_GA_PROPERTY_ID;

// Server-side only (no prefix)
const secretKey = process.env.CLAUDE_API_KEY;
```

## 3. Required Environment Variables

### Core AI Services
| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `CLAUDE_API_KEY` | Anthropic Claude API | `sk-ant-api03-...` | Yes |
| `OPENAI_API_KEY` | OpenAI GPT API | `sk-proj-...` | Yes |
| `GROK_API_KEY` | Grok AI API | `xai-...` | Optional |

### Insurance Integrations
| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `TURBO_RATER_API_KEY` | TurboRater quotes | `tr_live_...` | Yes |
| `GAIL_API_KEY` | GAIL insurance API | `gail_prod_...` | Yes |
| `MOMENTUM_API_KEY` | Momentum rater | `mom_api_...` | Yes |

### Analytics & Tracking
| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `NEXT_PUBLIC_GA_PROPERTY_ID` | Google Analytics | `G-XXXXXXXXXX` | Yes |
| `NEXT_PUBLIC_OTTO_UUID` | OTTO SEO tracking | `93fecead-...` | Yes |
| `NEXT_PUBLIC_OTTO_ENABLED` | Enable OTTO | `true` | Yes |

## 4. Sub Agent Implementation Tasks

### Task 1: Verify Environment Setup
```bash
# Check if .env.local exists
test -f .env.local && echo "✅ .env.local exists" || echo "❌ Missing .env.local"

# Verify required variables
npm run env:check
```

### Task 2: Add New Integration
```typescript
// 1. Add to .env.local.example
EXTERNAL_SERVICE_API_KEY=your_api_key_here

// 2. Add to environment types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXTERNAL_SERVICE_API_KEY: string;
    }
  }
}

// 3. Create service integration
class ExternalService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.EXTERNAL_SERVICE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('EXTERNAL_SERVICE_API_KEY is required');
    }
  }
}
```

### Task 3: Secure API Calls
```typescript
// Always validate API keys exist
if (!process.env.TURBO_RATER_API_KEY) {
  console.error('TurboRater API key missing');
  return { error: 'Configuration error' };
}

// Use try-catch for API calls
try {
  const response = await fetch('https://api.turborater.com/v2/quote', {
    headers: {
      'Authorization': `Bearer ${process.env.TURBO_RATER_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
} catch (error) {
  console.error('API call failed:', error);
  // Handle gracefully
}
```

## 5. Security Best Practices

### DO's ✅
- Always use environment variables for sensitive data
- Validate API keys exist before using
- Use NEXT_PUBLIC_ prefix only for client-safe values
- Keep .env.local in .gitignore
- Provide .env.local.example as template
- Rotate keys regularly
- Use different keys for dev/staging/production

### DON'Ts ❌
- Never commit .env.local to git
- Never log API keys to console
- Never expose server-side keys to client
- Never hardcode sensitive values
- Never share .env.local contents in chat/email
- Never use production keys in development

## 6. Testing Integration

### Unit Test Pattern
```typescript
// Mock environment variables in tests
describe('TurboRater Integration', () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      TURBO_RATER_API_KEY: 'test_key_123'
    };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
  
  test('should use API key from environment', () => {
    const service = new TurboRaterService();
    expect(service.hasValidKey()).toBe(true);
  });
});
```

### Integration Test Pattern
```typescript
// Only run integration tests with real keys
if (process.env.RUN_INTEGRATION_TESTS === 'true') {
  describe('Live TurboRater Integration', () => {
    test('should fetch real quotes', async () => {
      const quotes = await turboRater.getQuotes({...});
      expect(quotes).toBeDefined();
    });
  });
}
```

## 7. Deployment Configuration

### Vercel Environment Variables
```bash
# Add to Vercel via CLI
vercel env add TURBO_RATER_API_KEY production
vercel env add GAIL_API_KEY production
vercel env add MOMENTUM_API_KEY production

# Or add via dashboard
# Project Settings → Environment Variables
```

### GitHub Actions Secrets
```yaml
# .github/workflows/deploy.yml
env:
  TURBO_RATER_API_KEY: ${{ secrets.TURBO_RATER_API_KEY }}
  GAIL_API_KEY: ${{ secrets.GAIL_API_KEY }}
  MOMENTUM_API_KEY: ${{ secrets.MOMENTUM_API_KEY }}
```

## 8. Common Integration Patterns

### Pattern 1: Quote Aggregation
```typescript
async function aggregateQuotes(customerData: CustomerData) {
  const results = await Promise.allSettled([
    turboRater.getQuote(customerData),
    gail.getQuote(customerData),
    momentum.getQuote(customerData)
  ]);
  
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}
```

### Pattern 2: Fallback Strategy
```typescript
async function getQuoteWithFallback(data: QuoteRequest) {
  try {
    return await primaryProvider.getQuote(data);
  } catch (primaryError) {
    console.warn('Primary provider failed, trying fallback');
    try {
      return await fallbackProvider.getQuote(data);
    } catch (fallbackError) {
      throw new Error('All quote providers failed');
    }
  }
}
```

### Pattern 3: Rate Limiting
```typescript
class RateLimitedAPI {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  
  async addToQueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task?.();
      await new Promise(r => setTimeout(r, 1000)); // Rate limit: 1 req/sec
    }
    this.processing = false;
  }
}
```

## 9. Error Handling

### API Key Validation
```typescript
function validateEnvironment() {
  const required = [
    'TURBO_RATER_API_KEY',
    'GAIL_API_KEY',
    'MOMENTUM_API_KEY',
    'NEXT_PUBLIC_GA_PROPERTY_ID'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Run on app start
validateEnvironment();
```

### Graceful Degradation
```typescript
class QuoteService {
  private providers: Map<string, boolean> = new Map();
  
  constructor() {
    this.providers.set('turboRater', !!process.env.TURBO_RATER_API_KEY);
    this.providers.set('gail', !!process.env.GAIL_API_KEY);
    this.providers.set('momentum', !!process.env.MOMENTUM_API_KEY);
  }
  
  async getQuotes(data: QuoteRequest) {
    const available = Array.from(this.providers.entries())
      .filter(([_, enabled]) => enabled)
      .map(([name]) => name);
    
    if (available.length === 0) {
      throw new Error('No quote providers configured');
    }
    
    // Use available providers only
    return this.fetchFromProviders(available, data);
  }
}
```

## 10. Monitoring & Logging

### Environment Health Check
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  const health = {
    status: 'ok',
    environment: process.env.NODE_ENV,
    integrations: {
      turboRater: !!process.env.TURBO_RATER_API_KEY,
      gail: !!process.env.GAIL_API_KEY,
      momentum: !!process.env.MOMENTUM_API_KEY,
      analytics: !!process.env.NEXT_PUBLIC_GA_PROPERTY_ID,
      otto: !!process.env.NEXT_PUBLIC_OTTO_UUID
    },
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(health);
}
```

### Integration Metrics
```typescript
import { trackEvent } from '@/lib/analytics';

async function trackIntegrationUsage(provider: string, success: boolean, duration: number) {
  trackEvent('integration_call', {
    provider,
    success,
    duration,
    timestamp: Date.now()
  });
}
```

## 📝 Quick Reference Card

```bash
# Setup new environment
cp .env.local.example .env.local
npm run env:setup

# Check environment
npm run env:check

# Test with environment
NODE_ENV=test npm test

# Deploy with environment
vercel --prod

# Debug environment
node -e "console.log(process.env)" | grep -E "(API|KEY|SECRET)"
```

## 🚨 Emergency Procedures

### If API Key is Exposed:
1. Immediately rotate the key in provider dashboard
2. Update .env.local with new key
3. Deploy updated configuration
4. Audit logs for unauthorized usage
5. Notify team of potential breach

### If Integration Fails:
1. Check environment variables exist
2. Verify API key is valid
3. Check provider service status
4. Review error logs
5. Implement fallback if needed

## 📞 Support Contacts

- **Environment Issues**: Check `/docs/ENVIRONMENT_SETUP.md`
- **Integration Help**: Review this guide
- **Security Concerns**: Follow security best practices section
- **Deployment Issues**: Check Vercel/GitHub Actions configuration

---

*Last Updated: 2024*
*Version: 1.0.0*
*Maintained by: Quotely Engineering Team*