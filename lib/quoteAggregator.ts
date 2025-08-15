/**
 * Quote Aggregation and Ranking System
 * Combines quotes from multiple sources and ranks them based on various factors
 */

export interface Quote {
  carrier: string;
  premium: {
    monthly: number;
    sixMonth: number;
    annual: number;
  };
  coverage: {
    liability: string;
    collision: number;
    comprehensive: number;
    uninsured: boolean;
    medical: number;
  };
  discounts: string[];
  rating: string;
  quoteId: string;
  source: string;
  timestamp: string;
  aiScore?: number;
  recommendation?: string;
  bindable?: boolean;
  riskScore?: number;
}

export interface RankedQuote extends Quote {
  rank: number;
  score: number;
  reasons: string[];
  badge?: 'BEST VALUE' | 'LOWEST PRICE' | 'BEST COVERAGE' | 'AI RECOMMENDED';
}

/**
 * Fetch quotes from all available sources
 */
export async function fetchAllQuotes(formData: any): Promise<{
  turboRater: Quote[];
  momentum: Quote[];
  gail: Quote[];
}> {
  try {
    const [turboRaterResponse, momentumResponse, gailResponse] = await Promise.all([
      fetch('/api/turborrater/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }),
      fetch('/api/momentum/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }),
      fetch('/api/gail/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    ]);

    const [turboRaterData, momentumData, gailData] = await Promise.all([
      turboRaterResponse.json(),
      momentumResponse.json(),
      gailResponse.json()
    ]);

    return {
      turboRater: turboRaterData.quotes || [],
      momentum: momentumData.quotes || [],
      gail: gailData.quotes || []
    };
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return {
      turboRater: [],
      momentum: [],
      gail: []
    };
  }
}

/**
 * Combine and rank quotes from all sources
 */
export function combineAndRankQuotes(
  turboRaterQuotes: Quote[],
  momentumQuotes: Quote[],
  gailQuotes: Quote[]
): RankedQuote[] {
  // Combine all quotes
  const allQuotes = [
    ...turboRaterQuotes,
    ...momentumQuotes,
    ...gailQuotes
  ];

  // Remove duplicates (same carrier, similar price)
  const uniqueQuotes = removeDuplicateQuotes(allQuotes);

  // Calculate scores for each quote
  const scoredQuotes = uniqueQuotes.map(quote => ({
    ...quote,
    score: calculateQuoteScore(quote),
    reasons: generateReasons(quote)
  }));

  // Sort by score (higher is better)
  scoredQuotes.sort((a, b) => b.score - a.score);

  // Assign ranks and badges
  const rankedQuotes: RankedQuote[] = scoredQuotes.map((quote, index) => {
    const ranked: RankedQuote = {
      ...quote,
      rank: index + 1
    };

    // Assign badges
    if (index === 0) {
      ranked.badge = 'BEST VALUE';
    } else if (quote.premium.monthly === Math.min(...scoredQuotes.map(q => q.premium.monthly))) {
      ranked.badge = 'LOWEST PRICE';
    } else if (quote.aiScore && quote.aiScore >= 95) {
      ranked.badge = 'AI RECOMMENDED';
    } else if (hasBestCoverage(quote, scoredQuotes)) {
      ranked.badge = 'BEST COVERAGE';
    }

    return ranked;
  });

  return rankedQuotes;
}

/**
 * Remove duplicate quotes (same carrier with similar pricing)
 */
function removeDuplicateQuotes(quotes: Quote[]): Quote[] {
  const seen = new Map<string, Quote>();
  
  quotes.forEach(quote => {
    const key = quote.carrier.toLowerCase();
    const existing = seen.get(key);
    
    if (!existing) {
      seen.set(key, quote);
    } else {
      // Keep the quote with better price or AI score
      const existingScore = calculateQuoteScore(existing);
      const newScore = calculateQuoteScore(quote);
      
      if (newScore > existingScore) {
        seen.set(key, quote);
      }
    }
  });

  return Array.from(seen.values());
}

/**
 * Calculate a comprehensive score for ranking quotes
 */
function calculateQuoteScore(quote: Quote): number {
  let score = 0;

  // Price factor (40% weight) - lower is better
  const avgMonthlyPremium = 150; // baseline
  const priceFactor = (avgMonthlyPremium / quote.premium.monthly) * 40;
  score += Math.min(priceFactor, 40);

  // Coverage factor (20% weight)
  const coverageScore = calculateCoverageScore(quote.coverage);
  score += coverageScore * 20;

  // Carrier rating factor (20% weight)
  const ratingScore = calculateRatingScore(quote.rating);
  score += ratingScore * 20;

  // AI confidence factor (10% weight)
  if (quote.aiScore) {
    score += (quote.aiScore / 100) * 10;
  } else {
    score += 5; // Default middle score
  }

  // Discount factor (5% weight)
  const discountScore = Math.min(quote.discounts.length / 5, 1);
  score += discountScore * 5;

  // Source reliability factor (5% weight)
  const sourceScore = calculateSourceScore(quote.source);
  score += sourceScore * 5;

  // Risk score bonus (lower risk is better)
  if (quote.riskScore) {
    const riskBonus = Math.max(0, (50 - quote.riskScore) / 50) * 5;
    score += riskBonus;
  }

  return Math.round(score);
}

/**
 * Calculate coverage score
 */
function calculateCoverageScore(coverage: Quote['coverage']): number {
  let score = 0;

  // Liability limits
  const liabilityParts = coverage.liability.split('/');
  const bodilyInjury = parseInt(liabilityParts[0]);
  score += Math.min(bodilyInjury / 250, 1) * 0.4;

  // Deductibles (lower is better for customer)
  score += Math.max(0, (1000 - coverage.collision) / 1000) * 0.2;
  score += Math.max(0, (1000 - coverage.comprehensive) / 1000) * 0.2;

  // Additional coverage
  score += coverage.uninsured ? 0.1 : 0;
  score += coverage.medical > 0 ? 0.1 : 0;

  return score;
}

/**
 * Calculate rating score
 */
function calculateRatingScore(rating: string): number {
  const ratingMap: Record<string, number> = {
    'A++': 1.0,
    'A+': 0.9,
    'A': 0.8,
    'A-': 0.7,
    'B++': 0.6,
    'B+': 0.5,
    'B': 0.4,
    'B-': 0.3
  };

  return ratingMap[rating] || 0.5;
}

/**
 * Calculate source reliability score
 */
function calculateSourceScore(source: string): number {
  const sourceScores: Record<string, number> = {
    'GAIL': 1.0,      // AI-powered, most comprehensive
    'Momentum': 0.9,   // Real-time binding capability
    'TurboRater': 0.8  // Wide carrier network
  };

  return sourceScores[source] || 0.5;
}

/**
 * Check if quote has the best coverage
 */
function hasBestCoverage(quote: Quote, allQuotes: Quote[]): boolean {
  const liabilityParts = quote.coverage.liability.split('/');
  const quoteBi = parseInt(liabilityParts[0]);
  
  const maxBi = Math.max(...allQuotes.map(q => {
    const parts = q.coverage.liability.split('/');
    return parseInt(parts[0]);
  }));

  return quoteBi === maxBi && 
         quote.coverage.collision <= 500 && 
         quote.coverage.comprehensive <= 500;
}

/**
 * Generate reasons for quote ranking
 */
function generateReasons(quote: Quote): string[] {
  const reasons: string[] = [];

  // Price reasons
  if (quote.premium.monthly < 140) {
    reasons.push('Below average premium');
  }

  // Coverage reasons
  const liabilityParts = quote.coverage.liability.split('/');
  const bi = parseInt(liabilityParts[0]);
  if (bi >= 100) {
    reasons.push('Strong liability coverage');
  }

  // Carrier reasons
  if (quote.rating.includes('A+')) {
    reasons.push(`${quote.rating} financial strength`);
  }

  // Discount reasons
  if (quote.discounts.length >= 3) {
    reasons.push(`${quote.discounts.length} discounts applied`);
  }

  // AI reasons
  if (quote.aiScore && quote.aiScore >= 95) {
    reasons.push('AI confidence: ' + quote.aiScore + '%');
  }

  // Risk reasons
  if (quote.riskScore && quote.riskScore < 25) {
    reasons.push('Low risk profile');
  }

  return reasons.slice(0, 3); // Return top 3 reasons
}

/**
 * Generate real quotes using the aggregation system
 */
export async function generateRealQuotes(formData: any): Promise<RankedQuote[]> {
  const { turboRater, momentum, gail } = await fetchAllQuotes(formData);
  return combineAndRankQuotes(turboRater, momentum, gail);
}