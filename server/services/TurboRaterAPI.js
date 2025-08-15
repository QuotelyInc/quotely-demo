const axios = require('axios');

class TurboRaterAPI {
  constructor() {
    this.baseURL = process.env.TURBORRATER_API_URL || 'https://api.turborrater.com/v1';
    this.apiKey = process.env.TURBORRATER_API_KEY;
    this.accountId = process.env.TURBORRATER_ACCOUNT_ID;
    this.agentId = process.env.TURBORRATER_AGENT_ID;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-API-Version': '2.0'
      }
    });
  }

  async getQuote(vehicleData, driverData, coverage) {
    try {
      const payload = this.transformToTurboRaterFormat(vehicleData, driverData, coverage);
      
      console.log('[TurboRater] Requesting quotes...');
      const response = await this.client.post('/quotes', payload);
      
      if (!response.data || !response.data.quotes) {
        throw new Error('Invalid response from TurboRater API');
      }

      const quotes = this.transformFromTurboRaterFormat(response.data.quotes, coverage);
      console.log(`[TurboRater] Retrieved ${quotes.length} quotes`);
      
      return quotes;
      
    } catch (error) {
      console.error('[TurboRater] API Error:', error.message);
      
      // Return mock data in development or if API fails
      if (process.env.NODE_ENV === 'development' || !this.apiKey) {
        console.log('[TurboRater] Using mock data');
        return this.getMockQuotes(coverage);
      }
      
      throw error;
    }
  }

  transformToTurboRaterFormat(vehicleData, driverData, coverage) {
    return {
      account: {
        accountId: this.accountId,
        agentId: this.agentId
      },
      drivers: driverData.map(driver => ({
        firstName: driver.firstName,
        lastName: driver.lastName,
        dateOfBirth: driver.dateOfBirth,
        gender: driver.gender,
        maritalStatus: driver.maritalStatus,
        licenseNumber: driver.licenseNumber,
        licenseState: driver.licenseState,
        licenseStatus: 'Valid',
        yearsLicensed: this.calculateYearsLicensed(driver.licenseDate)
      })),
      vehicles: vehicleData.map(vehicle => ({
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        vin: vehicle.vin,
        primaryUse: vehicle.usage,
        annualMiles: vehicle.annualMileage,
        garagingZip: vehicle.garagingZip || driverData[0].zipCode,
        ownership: vehicle.ownership || 'Owned'
      })),
      coverages: {
        bodilyInjuryLiability: this.parseLiabilityLimit(coverage.liability).bi,
        propertyDamageLiability: this.parseLiabilityLimit(coverage.liability).pd,
        collision: {
          deductible: coverage.collision,
          included: coverage.collision > 0
        },
        comprehensive: {
          deductible: coverage.comprehensive,
          included: coverage.comprehensive > 0
        },
        uninsuredMotorist: {
          included: coverage.uninsured,
          limits: coverage.uninsuredLimits
        },
        medicalPayments: {
          limit: coverage.medical,
          included: coverage.medical > 0
        },
        personalInjuryProtection: coverage.pip || 0,
        rentalReimbursement: coverage.rental || false,
        roadside: coverage.roadside || false
      },
      discounts: {
        multiPolicy: driverData[0].hasHomeInsurance || false,
        multiCar: vehicleData.length > 1,
        goodDriver: true,
        defensiveDriver: driverData[0].defensiveDriving || false,
        goodStudent: driverData.some(d => d.goodStudent) || false
      }
    };
  }

  transformFromTurboRaterFormat(turboRaterQuotes, originalCoverage) {
    return turboRaterQuotes.map(quote => ({
      carrier: quote.carrierName,
      carrierLogo: quote.carrierLogo,
      premium: {
        monthly: Math.round(quote.totalPremium / 12),
        sixMonth: Math.round(quote.totalPremium / 2),
        annual: quote.totalPremium,
        downPayment: quote.downPayment || Math.round(quote.totalPremium / 6)
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
      discounts: quote.appliedDiscounts || [],
      discountAmount: quote.totalDiscounts || 0,
      rating: quote.carrierRating || 'A',
      quoteId: `TR-${quote.quoteId}`,
      source: 'TurboRater',
      bindable: quote.bindable || false,
      expirationDate: quote.expirationDate,
      effectiveDate: quote.effectiveDate,
      timestamp: new Date().toISOString(),
      carrierInfo: {
        phone: quote.carrierPhone,
        website: quote.carrierWebsite,
        localAgent: quote.localAgent
      }
    }));
  }

  parseLiabilityLimit(limit) {
    const parts = limit.split('/');
    return {
      bi: parseInt(parts[0]) * 1000,
      pd: parseInt(parts[2] || parts[1]) * 1000
    };
  }

  calculateYearsLicensed(licenseDate) {
    if (!licenseDate) return 5; // Default
    const years = Math.floor((Date.now() - new Date(licenseDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return Math.max(0, years);
  }

  getMockQuotes(coverage) {
    return [
      {
        carrier: 'Progressive',
        carrierLogo: 'https://logo.clearbit.com/progressive.com',
        premium: { 
          monthly: 142, 
          sixMonth: 852, 
          annual: 1704,
          downPayment: 284
        },
        coverage: { ...coverage },
        discounts: ['Multi-car', 'Safe driver', 'Paperless', 'Pay in full'],
        discountAmount: 312,
        rating: 'A+',
        quoteId: `TR-MOCK-${Date.now()}-1`,
        source: 'TurboRater',
        bindable: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-776-4737',
          website: 'https://www.progressive.com',
          localAgent: null
        }
      },
      {
        carrier: 'GEICO',
        carrierLogo: 'https://logo.clearbit.com/geico.com',
        premium: { 
          monthly: 138, 
          sixMonth: 828, 
          annual: 1656,
          downPayment: 276
        },
        coverage: { ...coverage },
        discounts: ['Good driver', 'Anti-theft', 'Military'],
        discountAmount: 298,
        rating: 'A++',
        quoteId: `TR-MOCK-${Date.now()}-2`,
        source: 'TurboRater',
        bindable: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-861-8380',
          website: 'https://www.geico.com',
          localAgent: null
        }
      },
      {
        carrier: 'State Farm',
        carrierLogo: 'https://logo.clearbit.com/statefarm.com',
        premium: { 
          monthly: 155, 
          sixMonth: 930, 
          annual: 1860,
          downPayment: 310
        },
        coverage: { ...coverage },
        discounts: ['Loyalty', 'Multi-policy', 'Safe vehicle'],
        discountAmount: 245,
        rating: 'A++',
        quoteId: `TR-MOCK-${Date.now()}-3`,
        source: 'TurboRater',
        bindable: false,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-782-8332',
          website: 'https://www.statefarm.com',
          localAgent: {
            name: 'John Smith',
            phone: '555-0123',
            address: '123 Main St'
          }
        }
      },
      {
        carrier: 'Allstate',
        carrierLogo: 'https://logo.clearbit.com/allstate.com',
        premium: { 
          monthly: 149, 
          sixMonth: 894, 
          annual: 1788,
          downPayment: 298
        },
        coverage: { ...coverage },
        discounts: ['Safe driving bonus', 'Early signing', 'eSmart discount'],
        discountAmount: 267,
        rating: 'A+',
        quoteId: `TR-MOCK-${Date.now()}-4`,
        source: 'TurboRater',
        bindable: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-877-810-2920',
          website: 'https://www.allstate.com',
          localAgent: {
            name: 'Jane Doe',
            phone: '555-0456',
            address: '456 Oak Ave'
          }
        }
      },
      {
        carrier: 'Liberty Mutual',
        carrierLogo: 'https://logo.clearbit.com/libertymutual.com',
        premium: { 
          monthly: 161, 
          sixMonth: 966, 
          annual: 1932,
          downPayment: 322
        },
        coverage: { ...coverage },
        discounts: ['New customer', 'Safety features', 'Good credit'],
        discountAmount: 198,
        rating: 'A',
        quoteId: `TR-MOCK-${Date.now()}-5`,
        source: 'TurboRater',
        bindable: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-290-7933',
          website: 'https://www.libertymutual.com',
          localAgent: null
        }
      }
    ];
  }
}

module.exports = new TurboRaterAPI();