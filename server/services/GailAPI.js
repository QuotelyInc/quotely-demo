const axios = require('axios');

class GailAPI {
  constructor() {
    this.baseURL = process.env.GAIL_API_URL || 'https://api.gail-insurance.com/v3';
    this.apiKey = process.env.GAIL_API_KEY;
    this.partnerId = process.env.GAIL_PARTNER_ID;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Partner-ID': this.partnerId,
        'X-AI-Model': 'auto-quote-v3',
        'Content-Type': 'application/json'
      }
    });
  }

  async getQuote(vehicleData, driverData, coverage) {
    try {
      const payload = this.transformToGailFormat(vehicleData, driverData, coverage);
      
      console.log('[GAIL] Requesting AI-powered quotes...');
      const response = await this.client.post('/intelligent-quote', payload);
      
      if (!response.data || !response.data.intelligentQuotes) {
        throw new Error('Invalid response from GAIL API');
      }

      const quotes = this.transformFromGailFormat(response.data.intelligentQuotes, coverage);
      console.log(`[GAIL] Retrieved ${quotes.length} AI-analyzed quotes`);
      
      // Store AI insights for later use
      this.lastAIInsights = response.data.aiAnalysis;
      
      return quotes;
      
    } catch (error) {
      console.error('[GAIL] API Error:', error.message);
      
      // Return mock data in development or if API fails
      if (process.env.NODE_ENV === 'development' || !this.apiKey) {
        console.log('[GAIL] Using mock AI-generated data');
        return this.getMockQuotes(coverage);
      }
      
      throw error;
    }
  }

  transformToGailFormat(vehicleData, driverData, coverage) {
    return {
      partnerId: this.partnerId,
      aiModel: 'auto-quote-v3',
      insured: {
        drivers: driverData.map(driver => ({
          personalInfo: {
            firstName: driver.firstName,
            lastName: driver.lastName,
            dateOfBirth: driver.dateOfBirth,
            gender: driver.gender,
            maritalStatus: driver.maritalStatus,
            contact: {
              email: driver.email,
              phone: driver.phone
            }
          },
          location: {
            street: driver.address,
            city: driver.city,
            state: driver.state,
            zip: driver.zipCode,
            country: 'USA'
          },
          drivingProfile: {
            licenseNumber: driver.licenseNumber,
            licenseState: driver.licenseState,
            yearsLicensed: this.calculateYearsLicensed(driver.licenseDate),
            violations: driver.violations || [],
            claims: driver.claims || [],
            creditScore: driver.creditScore || 'Good'
          }
        }))
      },
      risks: {
        vehicles: vehicleData.map((vehicle, idx) => ({
          id: `VEH-${idx + 1}`,
          specifications: {
            year: vehicle.year,
            make: vehicle.make,
            model: vehicle.model,
            vin: vehicle.vin,
            trim: vehicle.trim,
            safetyFeatures: vehicle.safetyFeatures || []
          },
          usage: {
            primary: vehicle.usage,
            annualMiles: vehicle.annualMileage,
            garageZip: vehicle.garagingZip || driverData[0].zipCode,
            parkingType: vehicle.parkingType || 'Garage'
          },
          ownership: {
            type: vehicle.ownership || 'Owned',
            lienHolder: vehicle.lienHolder
          }
        }))
      },
      coverageRequirements: {
        liability: {
          limits: coverage.liability,
          required: true
        },
        physicalDamage: {
          collision: coverage.collision > 0 ? {
            deductible: coverage.collision,
            enabled: true
          } : { enabled: false },
          comprehensive: coverage.comprehensive > 0 ? {
            deductible: coverage.comprehensive,
            enabled: true
          } : { enabled: false }
        },
        uninsuredMotorist: {
          enabled: coverage.uninsured,
          limits: coverage.uninsuredLimits
        },
        medicalPayments: {
          limit: coverage.medical,
          enabled: coverage.medical > 0
        },
        personalInjuryProtection: {
          limit: coverage.pip || 0,
          enabled: (coverage.pip || 0) > 0
        },
        additionalCoverages: {
          rental: coverage.rental || false,
          roadside: coverage.roadside || false,
          gapInsurance: coverage.gap || false
        }
      },
      aiPreferences: {
        optimizeFor: 'best-value',
        includeRecommendations: true,
        predictFutureRates: true,
        analyzeRiskProfile: true,
        compareMarketAverage: true,
        suggestCoverageOptimizations: true
      }
    };
  }

  transformFromGailFormat(gailQuotes, originalCoverage) {
    return gailQuotes.map(quote => ({
      carrier: quote.insurer.name,
      carrierLogo: quote.insurer.logo,
      premium: {
        monthly: Math.round(quote.pricing.monthly),
        sixMonth: Math.round(quote.pricing.sixMonth),
        annual: Math.round(quote.pricing.annual),
        downPayment: Math.round(quote.pricing.downPayment || quote.pricing.monthly * 2)
      },
      coverage: {
        liability: originalCoverage.liability,
        collision: originalCoverage.collision,
        comprehensive: originalCoverage.comprehensive,
        uninsured: originalCoverage.uninsured,
        medical: originalCoverage.medical,
        pip: originalCoverage.pip || 0,
        rental: originalCoverage.rental || false,
        roadside: originalCoverage.roadside || false
      },
      discounts: quote.optimizations?.discounts || [],
      discountAmount: quote.optimizations?.totalSavings || 0,
      rating: quote.insurer.financialRating || 'A',
      quoteId: `GAIL-${quote.quoteIdentifier}`,
      source: 'GAIL',
      bindable: quote.bindable || false,
      effectiveDate: quote.effectiveDate,
      expirationDate: quote.expirationDate,
      timestamp: new Date().toISOString(),
      
      // AI-specific fields
      aiScore: quote.aiConfidenceScore || 95,
      aiRecommendation: quote.aiRecommendation,
      predictedRenewal: quote.predictedRenewalRate,
      riskScore: quote.riskAnalysis?.score,
      marketComparison: quote.marketComparison,
      
      carrierInfo: {
        phone: quote.insurer.phone,
        website: quote.insurer.website,
        localAgent: quote.localAgent,
        customerSatisfaction: quote.insurer.customerSatisfactionScore
      },
      
      aiInsights: {
        strengthScore: quote.aiAnalysis?.strengthScore,
        valueRating: quote.aiAnalysis?.valueRating,
        coverageOptimality: quote.aiAnalysis?.coverageOptimality,
        futureRateProjection: quote.aiAnalysis?.futureRateProjection
      }
    }));
  }

  calculateYearsLicensed(licenseDate) {
    if (!licenseDate) return 5;
    const years = Math.floor((Date.now() - new Date(licenseDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return Math.max(0, years);
  }

  getAIInsights() {
    return this.lastAIInsights || null;
  }

  getMockQuotes(coverage) {
    return [
      {
        carrier: 'USAA',
        carrierLogo: 'https://logo.clearbit.com/usaa.com',
        premium: { 
          monthly: 132, 
          sixMonth: 792, 
          annual: 1584,
          downPayment: 264
        },
        coverage: { ...coverage },
        discounts: ['Military', 'Multi-vehicle', 'Safe driver', 'Loyalty'],
        discountAmount: 356,
        rating: 'A++',
        quoteId: `GAIL-MOCK-${Date.now()}-1`,
        source: 'GAIL',
        bindable: true,
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        aiScore: 98,
        aiRecommendation: 'Exceptional value with comprehensive coverage and outstanding service',
        predictedRenewal: 1608,
        riskScore: 22,
        marketComparison: '28% below market average',
        carrierInfo: {
          phone: '1-800-531-8722',
          website: 'https://www.usaa.com',
          localAgent: null,
          customerSatisfaction: 4.8
        },
        aiInsights: {
          strengthScore: 95,
          valueRating: 'Excellent',
          coverageOptimality: 92,
          futureRateProjection: '+1.5% annually'
        }
      },
      {
        carrier: 'Erie Insurance',
        carrierLogo: 'https://logo.clearbit.com/erieinsurance.com',
        premium: { 
          monthly: 129, 
          sixMonth: 774, 
          annual: 1548,
          downPayment: 258
        },
        coverage: { ...coverage },
        discounts: ['Multi-policy', 'Safety features', 'Good credit', 'Early quote'],
        discountAmount: 342,
        rating: 'A+',
        quoteId: `GAIL-MOCK-${Date.now()}-2`,
        source: 'GAIL',
        bindable: true,
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        aiScore: 96,
        aiRecommendation: 'Lowest premium with strong regional presence and excellent claims handling',
        predictedRenewal: 1572,
        riskScore: 25,
        marketComparison: '31% below market average',
        carrierInfo: {
          phone: '1-800-458-0811',
          website: 'https://www.erieinsurance.com',
          localAgent: {
            name: 'Thomas Anderson',
            phone: '555-0911',
            address: '911 Erie Plaza'
          },
          customerSatisfaction: 4.7
        },
        aiInsights: {
          strengthScore: 93,
          valueRating: 'Excellent',
          coverageOptimality: 89,
          futureRateProjection: '+2.1% annually'
        }
      },
      {
        carrier: 'Chubb',
        carrierLogo: 'https://logo.clearbit.com/chubb.com',
        premium: { 
          monthly: 168, 
          sixMonth: 1008, 
          annual: 2016,
          downPayment: 336
        },
        coverage: { ...coverage },
        discounts: ['Premium client', 'Home security', 'Accident forgiveness'],
        discountAmount: 298,
        rating: 'A++',
        quoteId: `GAIL-MOCK-${Date.now()}-3`,
        source: 'GAIL',
        bindable: true,
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        aiScore: 94,
        aiRecommendation: 'Premium coverage with exceptional limits and white-glove service',
        predictedRenewal: 2040,
        riskScore: 18,
        marketComparison: '15% above market average',
        carrierInfo: {
          phone: '1-866-324-2822',
          website: 'https://www.chubb.com',
          localAgent: null,
          customerSatisfaction: 4.9
        },
        aiInsights: {
          strengthScore: 98,
          valueRating: 'Good',
          coverageOptimality: 98,
          futureRateProjection: '+0.8% annually'
        }
      },
      {
        carrier: 'Amica',
        carrierLogo: 'https://logo.clearbit.com/amica.com',
        premium: { 
          monthly: 141, 
          sixMonth: 846, 
          annual: 1692,
          downPayment: 282
        },
        coverage: { ...coverage },
        discounts: ['Loyalty', 'Claim-free', 'Anti-lock brakes', 'Full payment'],
        discountAmount: 318,
        rating: 'A+',
        quoteId: `GAIL-MOCK-${Date.now()}-4`,
        source: 'GAIL',
        bindable: false,
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        aiScore: 95,
        aiRecommendation: 'Top-rated customer service with competitive pricing',
        predictedRenewal: 1716,
        riskScore: 24,
        marketComparison: '22% below market average',
        carrierInfo: {
          phone: '1-800-242-6422',
          website: 'https://www.amica.com',
          localAgent: null,
          customerSatisfaction: 4.9
        },
        aiInsights: {
          strengthScore: 91,
          valueRating: 'Very Good',
          coverageOptimality: 88,
          futureRateProjection: '+1.8% annually'
        }
      }
    ];
  }
}

module.exports = new GailAPI();