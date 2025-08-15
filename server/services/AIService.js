class AIService {
  constructor() {
    this.scoringWeights = {
      price: 0.40,
      coverage: 0.20,
      rating: 0.20,
      aiConfidence: 0.10,
      discounts: 0.05,
      reliability: 0.05
    };
  }

  async rankAndAnalyze(quotes, context) {
    try {
      // Flatten all quotes into single array
      const allQuotes = [
        ...(quotes.turboRater || []),
        ...(quotes.momentum || []),
        ...(quotes.gail || [])
      ];

      // Remove duplicates
      const uniqueQuotes = this.removeDuplicates(allQuotes);

      // Score each quote
      const scoredQuotes = uniqueQuotes.map(quote => ({
        ...quote,
        score: this.calculateScore(quote, context),
        analysis: this.analyzeQuote(quote, context)
      }));

      // Sort by score (highest first)
      scoredQuotes.sort((a, b) => b.score - a.score);

      // Add ranking and badges
      const rankedQuotes = scoredQuotes.map((quote, index) => ({
        ...quote,
        rank: index + 1,
        badge: this.assignBadge(quote, index, scoredQuotes)
      }));

      return rankedQuotes;

    } catch (error) {
      console.error('[AIService] Ranking error:', error);
      throw error;
    }
  }

  calculateScore(quote, context) {
    let score = 0;

    // Price score (lower is better)
    const avgPremium = 1800; // National average
    const priceRatio = avgPremium / quote.premium.annual;
    score += Math.min(priceRatio, 2) * this.scoringWeights.price * 100;

    // Coverage score
    const coverageScore = this.evaluateCoverage(quote.coverage);
    score += coverageScore * this.scoringWeights.coverage * 100;

    // Carrier rating score
    const ratingScore = this.evaluateRating(quote.rating);
    score += ratingScore * this.scoringWeights.rating * 100;

    // AI confidence (if available)
    if (quote.aiScore) {
      score += (quote.aiScore / 100) * this.scoringWeights.aiConfidence * 100;
    }

    // Discount score
    const discountScore = Math.min(quote.discounts?.length / 5, 1);
    score += discountScore * this.scoringWeights.discounts * 100;

    // Source reliability
    const reliabilityScore = this.evaluateSource(quote.source);
    score += reliabilityScore * this.scoringWeights.reliability * 100;

    // Bonus points for bindable quotes
    if (quote.bindable) {
      score += 5;
    }

    return Math.round(score);
  }

  evaluateCoverage(coverage) {
    let score = 0;

    // Evaluate liability limits
    const liabilityParts = coverage.liability.split('/');
    const biLimit = parseInt(liabilityParts[0]);
    
    if (biLimit >= 250) score += 0.4;
    else if (biLimit >= 100) score += 0.3;
    else if (biLimit >= 50) score += 0.2;
    else score += 0.1;

    // Evaluate deductibles (lower is better for customer)
    if (coverage.collision <= 500) score += 0.2;
    else if (coverage.collision <= 1000) score += 0.1;

    if (coverage.comprehensive <= 500) score += 0.2;
    else if (coverage.comprehensive <= 1000) score += 0.1;

    // Additional coverage
    if (coverage.uninsured) score += 0.1;
    if (coverage.medical > 0) score += 0.1;

    return score;
  }

  evaluateRating(rating) {
    const ratingMap = {
      'A++': 1.0,
      'A+': 0.9,
      'A': 0.8,
      'A-': 0.7,
      'B++': 0.6,
      'B+': 0.5,
      'B': 0.4
    };

    return ratingMap[rating] || 0.5;
  }

  evaluateSource(source) {
    const sourceReliability = {
      'GAIL': 1.0,
      'Momentum': 0.9,
      'TurboRater': 0.85
    };

    return sourceReliability[source] || 0.8;
  }

  analyzeQuote(quote, context) {
    const analysis = {
      strengths: [],
      considerations: [],
      suitability: this.assessSuitability(quote, context)
    };

    // Analyze strengths
    if (quote.premium.annual < 1600) {
      analysis.strengths.push('Below average premium');
    }
    
    if (quote.rating.includes('A+')) {
      analysis.strengths.push('Excellent financial stability');
    }

    if (quote.discounts?.length >= 3) {
      analysis.strengths.push(`${quote.discounts.length} discounts applied`);
    }

    if (quote.bindable) {
      analysis.strengths.push('Instantly bindable');
    }

    // Analyze considerations
    const liabilityParts = quote.coverage.liability.split('/');
    const biLimit = parseInt(liabilityParts[0]);
    
    if (biLimit < 100) {
      analysis.considerations.push('Consider higher liability limits');
    }

    if (quote.coverage.collision > 1000) {
      analysis.considerations.push('High collision deductible');
    }

    return analysis;
  }

  assessSuitability(quote, context) {
    // Assess based on driver profile
    const driverAge = this.calculateAge(context.driverData?.[0]?.dateOfBirth);
    
    if (driverAge < 25 && quote.carrier === 'GEICO') {
      return 'Excellent for young drivers';
    }
    
    if (driverAge > 50 && quote.carrier === 'The Hartford') {
      return 'Specialized in mature driver coverage';
    }

    if (context.vehicleData?.[0]?.year > 2020 && quote.coverage.comprehensive <= 500) {
      return 'Good coverage for newer vehicles';
    }

    return 'Well-suited for your profile';
  }

  calculateAge(dateOfBirth) {
    if (!dateOfBirth) return 35; // Default age
    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    return Math.floor(ageDiff / (365.25 * 24 * 60 * 60 * 1000));
  }

  assignBadge(quote, index, allQuotes) {
    if (index === 0) {
      return 'BEST VALUE';
    }

    const lowestPremium = Math.min(...allQuotes.map(q => q.premium.annual));
    if (quote.premium.annual === lowestPremium) {
      return 'LOWEST PRICE';
    }

    if (quote.aiScore >= 95) {
      return 'AI RECOMMENDED';
    }

    const liabilityParts = quote.coverage.liability.split('/');
    const biLimit = parseInt(liabilityParts[0]);
    const maxBiLimit = Math.max(...allQuotes.map(q => {
      const parts = q.coverage.liability.split('/');
      return parseInt(parts[0]);
    }));

    if (biLimit === maxBiLimit) {
      return 'BEST COVERAGE';
    }

    if (quote.bindable) {
      return 'INSTANT BIND';
    }

    return null;
  }

  removeDuplicates(quotes) {
    const seen = new Map();
    
    quotes.forEach(quote => {
      const key = `${quote.carrier}-${Math.round(quote.premium.annual / 100)}`;
      
      if (!seen.has(key) || quote.score > seen.get(key).score) {
        seen.set(key, quote);
      }
    });

    return Array.from(seen.values());
  }

  async generateInsights(quotes, context) {
    const insights = {
      summary: '',
      recommendations: [],
      savingsOpportunity: null,
      riskAssessment: null,
      marketAnalysis: null
    };

    if (!quotes || quotes.length === 0) {
      insights.summary = 'No quotes available for analysis';
      return insights;
    }

    // Summary
    const topQuote = quotes[0];
    const avgPremium = quotes.reduce((sum, q) => sum + q.premium.annual, 0) / quotes.length;
    
    insights.summary = `Based on ${quotes.length} quotes analyzed, ${topQuote.carrier} offers the best value at $${topQuote.premium.monthly}/month. Average premium across all carriers is $${Math.round(avgPremium / 12)}/month.`;

    // Recommendations
    if (topQuote.premium.annual < avgPremium * 0.8) {
      insights.recommendations.push({
        type: 'savings',
        message: `${topQuote.carrier} offers significant savings - ${Math.round((1 - topQuote.premium.annual / avgPremium) * 100)}% below average`,
        priority: 'high'
      });
    }

    const bindableQuotes = quotes.filter(q => q.bindable);
    if (bindableQuotes.length > 0) {
      insights.recommendations.push({
        type: 'convenience',
        message: `${bindableQuotes.length} quotes can be bound instantly online`,
        priority: 'medium'
      });
    }

    // Savings opportunity
    const lowestQuote = quotes.reduce((min, q) => q.premium.annual < min.premium.annual ? q : min);
    const highestQuote = quotes.reduce((max, q) => q.premium.annual > max.premium.annual ? q : max);
    
    insights.savingsOpportunity = {
      potential: highestQuote.premium.annual - lowestQuote.premium.annual,
      percentage: Math.round((1 - lowestQuote.premium.annual / highestQuote.premium.annual) * 100),
      bestOption: lowestQuote.carrier,
      comparison: `Save up to $${highestQuote.premium.annual - lowestQuote.premium.annual}/year by choosing ${lowestQuote.carrier} over ${highestQuote.carrier}`
    };

    // Risk assessment
    insights.riskAssessment = this.assessRisk(context);

    // Market analysis
    insights.marketAnalysis = {
      averageMarketPremium: Math.round(avgPremium),
      yourBestRate: lowestQuote.premium.annual,
      marketPosition: lowestQuote.premium.annual < avgPremium ? 'Below Market' : 'Above Market',
      carrierDiversity: quotes.length,
      topCarriersByValue: quotes.slice(0, 3).map(q => ({
        carrier: q.carrier,
        premium: q.premium.annual,
        rating: q.rating
      }))
    };

    return insights;
  }

  assessRisk(context) {
    const risk = {
      level: 'Standard',
      factors: [],
      score: 50
    };

    if (!context || !context.driverData) {
      return risk;
    }

    const driverAge = this.calculateAge(context.driverData[0]?.dateOfBirth);
    
    // Age factors
    if (driverAge < 25) {
      risk.factors.push('Young driver');
      risk.score += 20;
    } else if (driverAge > 65) {
      risk.factors.push('Senior driver');
      risk.score += 10;
    }

    // Vehicle factors
    if (context.vehicleData?.[0]?.year > 2020) {
      risk.factors.push('Newer vehicle');
      risk.score -= 10;
    }

    // Multi-vehicle
    if (context.vehicleData?.length > 1) {
      risk.factors.push('Multiple vehicles');
      risk.score -= 5;
    }

    // Determine risk level
    if (risk.score < 40) {
      risk.level = 'Low';
    } else if (risk.score > 60) {
      risk.level = 'High';
    }

    return risk;
  }

  async bindQuote(quoteId, customerInfo, paymentMethod) {
    // Simulate binding process
    console.log(`[AIService] Binding quote ${quoteId}`);
    
    // In production, this would call the appropriate carrier API
    return {
      policyNumber: `POL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      documents: [
        {
          type: 'policy',
          url: `/documents/policy-${quoteId}.pdf`
        },
        {
          type: 'id-card',
          url: `/documents/id-card-${quoteId}.pdf`
        }
      ]
    };
  }

  async getQuoteDetails(quoteId) {
    // In production, this would retrieve from database
    console.log(`[AIService] Retrieving quote ${quoteId}`);
    return null;
  }

  async compareQuotes(quoteIds, factors) {
    // Compare multiple quotes
    console.log(`[AIService] Comparing quotes: ${quoteIds.join(', ')}`);
    
    return {
      comparison: [],
      recommendation: 'Based on your priorities, we recommend option 1'
    };
  }

  async saveQuoteSession(quotes, email, expirationDays) {
    const sessionId = `QS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // In production, save to database
    console.log(`[AIService] Saving quote session ${sessionId} for ${email}`);
    
    return {
      sessionId,
      expiresAt: new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toISOString()
    };
  }
}

module.exports = new AIService();