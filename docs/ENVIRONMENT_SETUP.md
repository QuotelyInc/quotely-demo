# Environment Variables Setup

## Quick Start

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Add your API keys to `.env.local`

3. Never commit `.env.local` to version control

## Required API Keys

### AI Services
- **CLAUDE_API_KEY**: Anthropic Claude API for AI-powered features
- **GROK_API_KEY**: Grok API for advanced analytics
- **OPENAI_API_KEY**: OpenAI ChatGPT Pro for fallback AI services

### Insurance Quote Integrations
- **TURBO_RATER_API_KEY**: TurboRater quote engine integration
- **GAIL_API_KEY**: GAIL insurance quotes API
- **MOMENTUM_API_KEY**: Momentum comparative rater API

## Environment Files

| File | Purpose | Git Status |
|------|---------|------------|
| `.env.local` | Local development secrets | ❌ Ignored |
| `.env.production` | Production secrets | ❌ Ignored |
| `.env.local.example` | Example template | ✅ Committed |

## Security Best Practices

1. **Never commit real API keys** to version control
2. **Use environment-specific files** (.env.local, .env.production)
3. **Rotate keys regularly** especially if exposed
4. **Use minimal permissions** for each API key
5. **Store production keys** in Vercel environment variables

## Vercel Deployment

Add environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each key-value pair
3. Select appropriate environments (Production/Preview/Development)

## API Key Sources

| Service | How to Get API Key |
|---------|-------------------|
| Claude | https://console.anthropic.com |
| Grok | https://grok.x.ai/api |
| OpenAI | https://platform.openai.com/api-keys |
| TurboRater | Contact TurboRater sales |
| GAIL | https://gail.com/developers |
| Momentum | Contact Momentum support |

## Troubleshooting

### Missing API Key Error
```
Error: Missing required environment variable: CLAUDE_API_KEY
```
**Solution**: Ensure `.env.local` exists and contains all required keys

### API Key Invalid
```
Error: Invalid API key for service: OpenAI
```
**Solution**: Verify the key is correct and has proper permissions

### Environment Variables Not Loading
```bash
# Restart the development server
npm run dev
```

## Testing Environment Setup

```javascript
// Test file: test-env.js
console.log('Environment check:');
console.log('CLAUDE_API_KEY:', process.env.CLAUDE_API_KEY ? '✅ Set' : '❌ Missing');
console.log('GROK_API_KEY:', process.env.GROK_API_KEY ? '✅ Set' : '❌ Missing');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');
```

Run with: `node test-env.js`