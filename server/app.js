const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

// Load environment variables
dotenv.config();

// Import services
const TurboRaterAPI = require('./services/TurboRaterAPI');
const MomentumAPI = require('./services/MomentumAPI');
const GailAPI = require('./services/GailAPI');
const AIService = require('./services/AIService');
const CacheService = require('./services/CacheService');
const MetricsService = require('./services/MetricsService');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://tryquotely.com'],
  credentials: true
}));

// Rate limiting
const quoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many quote requests, please try again later.'
});

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Main quote generation endpoint
app.post('/api/quote/generate', quoteLimiter, async (req, res) => {
  const startTime = Date.now();
  const { vehicleData, driverData, coverage, sessionId } = req.body;
  
  try {
    // Validate input
    if (!vehicleData || !driverData || !coverage) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['vehicleData', 'driverData', 'coverage']
      });
    }

    // Check cache first
    const cacheKey = CacheService.generateKey({ vehicleData, driverData, coverage });
    const cachedResult = await CacheService.get(cacheKey);
    
    if (cachedResult && !req.body.forceRefresh) {
      MetricsService.recordCacheHit();
      return res.json({
        ...cachedResult,
        cached: true,
        responseTime: Date.now() - startTime
      });
    }

    // Fetch quotes from all providers in parallel
    console.log(`[${sessionId}] Fetching quotes from providers...`);
    
    const [turboRaterQuotes, momentumQuotes, gailQuotes] = await Promise.allSettled([
      TurboRaterAPI.getQuote(vehicleData, driverData, coverage),
      MomentumAPI.getQuote(vehicleData, driverData, coverage),
      GailAPI.getQuote(vehicleData, driverData, coverage)
    ]);

    // Process results even if some providers fail
    const quotes = {
      turboRater: turboRaterQuotes.status === 'fulfilled' ? turboRaterQuotes.value : [],
      momentum: momentumQuotes.status === 'fulfilled' ? momentumQuotes.value : [],
      gail: gailQuotes.status === 'fulfilled' ? gailQuotes.value : []
    };

    // Log any provider failures
    if (turboRaterQuotes.status === 'rejected') {
      console.error(`[${sessionId}] TurboRater API failed:`, turboRaterQuotes.reason);
    }
    if (momentumQuotes.status === 'rejected') {
      console.error(`[${sessionId}] Momentum API failed:`, momentumQuotes.reason);
    }
    if (gailQuotes.status === 'rejected') {
      console.error(`[${sessionId}] GAIL API failed:`, gailQuotes.reason);
    }

    // Check if we have any quotes
    const totalQuotes = quotes.turboRater.length + quotes.momentum.length + quotes.gail.length;
    if (totalQuotes === 0) {
      throw new Error('No quotes available from any provider');
    }

    // Rank and analyze quotes using AI
    console.log(`[${sessionId}] Analyzing ${totalQuotes} quotes with AI...`);
    const rankedQuotes = await AIService.rankAndAnalyze(quotes, { vehicleData, driverData, coverage });
    
    // Generate AI insights
    const insights = await AIService.generateInsights(rankedQuotes, { vehicleData, driverData });

    // Calculate statistics
    const statistics = {
      totalQuotes,
      averagePremium: calculateAveragePremium(rankedQuotes),
      lowestPremium: findLowestPremium(rankedQuotes),
      highestPremium: findHighestPremium(rankedQuotes),
      potentialSavings: calculatePotentialSavings(rankedQuotes),
      providersQueried: 3,
      providersResponded: [turboRaterQuotes, momentumQuotes, gailQuotes].filter(r => r.status === 'fulfilled').length
    };

    // Prepare response
    const response = {
      success: true,
      quotes: rankedQuotes,
      insights,
      statistics,
      metadata: {
        sessionId,
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        cached: false
      }
    };

    // Cache the result
    await CacheService.set(cacheKey, response, 300); // Cache for 5 minutes

    // Record metrics
    MetricsService.recordQuoteGeneration({
      responseTime: Date.now() - startTime,
      quoteCount: totalQuotes,
      providersResponded: statistics.providersResponded
    });

    res.json(response);

  } catch (error) {
    console.error(`[${sessionId}] Quote generation error:`, error);
    
    // Record error metrics
    MetricsService.recordError(error);

    res.status(500).json({ 
      success: false,
      error: 'Quote generation failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while generating quotes',
      sessionId,
      timestamp: new Date().toISOString()
    });
  }
});

// Bind specific quote endpoint
app.post('/api/quote/bind', async (req, res) => {
  const { quoteId, customerInfo, paymentMethod } = req.body;
  
  try {
    // Validate input
    if (!quoteId || !customerInfo || !paymentMethod) {
      return res.status(400).json({ 
        error: 'Missing required fields for binding',
        required: ['quoteId', 'customerInfo', 'paymentMethod']
      });
    }

    // Determine which provider to use based on quote source
    const result = await AIService.bindQuote(quoteId, customerInfo, paymentMethod);
    
    res.json({
      success: true,
      policyNumber: result.policyNumber,
      effectiveDate: result.effectiveDate,
      documents: result.documents,
      message: 'Policy successfully bound'
    });

  } catch (error) {
    console.error('Bind quote error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to bind quote',
      message: error.message
    });
  }
});

// Get quote details endpoint
app.get('/api/quote/:quoteId', async (req, res) => {
  const { quoteId } = req.params;
  
  try {
    const quoteDetails = await AIService.getQuoteDetails(quoteId);
    
    if (!quoteDetails) {
      return res.status(404).json({ 
        error: 'Quote not found',
        quoteId
      });
    }

    res.json({
      success: true,
      quote: quoteDetails
    });

  } catch (error) {
    console.error('Get quote details error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve quote details',
      message: error.message
    });
  }
});

// Compare quotes endpoint
app.post('/api/quote/compare', async (req, res) => {
  const { quoteIds, comparisonFactors } = req.body;
  
  try {
    if (!quoteIds || quoteIds.length < 2) {
      return res.status(400).json({ 
        error: 'At least 2 quote IDs required for comparison'
      });
    }

    const comparison = await AIService.compareQuotes(quoteIds, comparisonFactors);
    
    res.json({
      success: true,
      comparison,
      recommendation: comparison.recommendation
    });

  } catch (error) {
    console.error('Compare quotes error:', error);
    res.status(500).json({ 
      error: 'Failed to compare quotes',
      message: error.message
    });
  }
});

// Save quote for later endpoint
app.post('/api/quote/save', async (req, res) => {
  const { quotes, customerEmail, expirationDays = 30 } = req.body;
  
  try {
    const savedQuote = await AIService.saveQuoteSession(quotes, customerEmail, expirationDays);
    
    res.json({
      success: true,
      sessionId: savedQuote.sessionId,
      retrievalLink: `${process.env.BASE_URL}/quotes/${savedQuote.sessionId}`,
      expiresAt: savedQuote.expiresAt,
      message: 'Quotes saved successfully'
    });

  } catch (error) {
    console.error('Save quote error:', error);
    res.status(500).json({ 
      error: 'Failed to save quotes',
      message: error.message
    });
  }
});

// Metrics endpoint
app.get('/api/metrics', async (req, res) => {
  try {
    const metrics = await MetricsService.getMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve metrics' });
  }
});

// Helper functions
function calculateAveragePremium(quotes) {
  if (!quotes || quotes.length === 0) return 0;
  const total = quotes.reduce((sum, quote) => sum + quote.premium.annual, 0);
  return Math.round(total / quotes.length);
}

function findLowestPremium(quotes) {
  if (!quotes || quotes.length === 0) return null;
  return quotes.reduce((min, quote) => 
    quote.premium.annual < min.premium.annual ? quote : min
  );
}

function findHighestPremium(quotes) {
  if (!quotes || quotes.length === 0) return null;
  return quotes.reduce((max, quote) => 
    quote.premium.annual > max.premium.annual ? quote : max
  );
}

function calculatePotentialSavings(quotes) {
  if (!quotes || quotes.length < 2) return 0;
  const lowest = findLowestPremium(quotes);
  const highest = findHighestPremium(quotes);
  return highest.premium.annual - lowest.premium.annual;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Quotely API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});