const axios = require('axios');

class MomentumAPI {
  constructor() {
    this.baseURL = process.env.MOMENTUM_API_URL || 'https://api.momentum.com/v2';
    this.apiKey = process.env.MOMENTUM_API_KEY;
    this.clientId = process.env.MOMENTUM_CLIENT_ID;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'X-API-Key': this.apiKey,
        'X-Client-ID': this.clientId,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async getQuote(vehicleData, driverData, coverage) {
    try {
      const payload = this.transformToMomentumFormat(vehicleData, driverData, coverage);
      
      console.log('[Momentum] Requesting quotes...');
      const response = await this.client.post('/quotes/auto', payload);
      
      if (!response.data || !response.data.quoteResults) {
        throw new Error('Invalid response from Momentum API');
      }

      const quotes = this.transformFromMomentumFormat(response.data.quoteResults, coverage);
      console.log(`[Momentum] Retrieved ${quotes.length} quotes`);
      
      return quotes;
      
    } catch (error) {
      console.error('[Momentum] API Error:', error.message);
      
      // Return mock data in development or if API fails
      if (process.env.NODE_ENV === 'development' || !this.apiKey) {
        console.log('[Momentum] Using mock data');
        return this.getMockQuotes(coverage);
      }
      
      throw error;
    }
  }

  transformToMomentumFormat(vehicleData, driverData, coverage) {
    return {
      clientId: this.clientId,
      quoteRequest: {
        customers: driverData.map(driver => ({
          firstName: driver.firstName,
          lastName: driver.lastName,
          dateOfBirth: driver.dateOfBirth,
          gender: driver.gender,
          maritalStatus: driver.maritalStatus,
          contactInfo: {
            email: driver.email,
            phone: driver.phone,
            address: {
              line1: driver.address,
              city: driver.city,
              state: driver.state,
              postalCode: driver.zipCode,
              country: 'US'
            }
          },
          driverLicense: {
            number: driver.licenseNumber,
            state: driver.licenseState,
            status: 'Valid',
            yearLicensed: new Date(driver.licenseDate).getFullYear()
          }
        })),
        vehicleList: vehicleData.map((vehicle, index) => ({
          vehicleId: index + 1,
          modelYear: vehicle.year,
          manufacturer: vehicle.make,
          modelName: vehicle.model,
          vin: vehicle.vin,
          vehicleUse: this.mapVehicleUsage(vehicle.usage),
          annualMileage: vehicle.annualMileage,
          ownership: vehicle.ownership || 'OWNED',
          garagingAddress: {
            postalCode: vehicle.garagingZip || driverData[0].zipCode
          }
        })),
        requestedCoverages: {
          liabilityLimits: {
            bodilyInjury: this.parseLiability(coverage.liability).bi,
            propertyDamage: this.parseLiability(coverage.liability).pd
          },
          physicalDamage: {
            collision: coverage.collision > 0 ? {
              deductible: coverage.collision,
              included: true
            } : { included: false },
            comprehensive: coverage.comprehensive > 0 ? {
              deductible: coverage.comprehensive,
              included: true
            } : { included: false }
          },
          uninsuredMotorist: {
            included: coverage.uninsured,
            limits: coverage.uninsuredLimits
          },
          medicalPayments: {
            limit: coverage.medical,
            included: coverage.medical > 0
          },
          personalInjuryProtection: {
            limit: coverage.pip || 0,
            included: (coverage.pip || 0) > 0
          }
        }
      },
      options: {
        includeAllCarriers: true,
        returnBestMatches: 15,
        includeDiscounts: true,
        includeBindableQuotes: true
      }
    };
  }

  transformFromMomentumFormat(momentumQuotes, originalCoverage) {
    return momentumQuotes.map(quote => ({
      carrier: quote.carrier.name,
      carrierLogo: quote.carrier.logo,
      premium: {
        monthly: Math.round(quote.premium.monthly || quote.premium.total / 12),
        sixMonth: Math.round(quote.premium.sixMonth || quote.premium.total / 2),
        annual: quote.premium.total,
        downPayment: quote.premium.downPayment || Math.round(quote.premium.total / 6)
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
      discounts: quote.discounts?.map(d => d.name) || [],
      discountAmount: quote.totalDiscounts || 0,
      rating: quote.carrier.rating || 'A',
      quoteId: `MOM-${quote.referenceId}`,
      source: 'Momentum',
      bindable: quote.bindable || false,
      bindExpirationDate: quote.bindExpirationDate,
      effectiveDate: quote.effectiveDate,
      expirationDate: quote.expirationDate,
      timestamp: new Date().toISOString(),
      carrierInfo: {
        phone: quote.carrier.phone,
        website: quote.carrier.website,
        localAgent: quote.localAgent
      },
      additionalInfo: {
        paymentPlans: quote.paymentPlans,
        documents: quote.documents
      }
    }));
  }

  mapVehicleUsage(usage) {
    const usageMap = {
      'commute': 'COMMUTE',
      'pleasure': 'PLEASURE',
      'business': 'BUSINESS',
      'farm': 'FARM',
      'rideshare': 'RIDESHARE'
    };
    return usageMap[usage.toLowerCase()] || 'PLEASURE';
  }

  parseLiability(limit) {
    const parts = limit.split('/');
    return {
      bi: parseInt(parts[0]) * 1000,
      pd: parseInt(parts[2] || parts[1]) * 1000
    };
  }

  getMockQuotes(coverage) {
    return [
      {
        carrier: 'Travelers',
        carrierLogo: 'https://logo.clearbit.com/travelers.com',
        premium: { 
          monthly: 145, 
          sixMonth: 870, 
          annual: 1740,
          downPayment: 290
        },
        coverage: { ...coverage },
        discounts: ['Bundle discount', 'Early quote', 'IntelliDrive'],
        discountAmount: 285,
        rating: 'A++',
        quoteId: `MOM-MOCK-${Date.now()}-1`,
        source: 'Momentum',
        bindable: true,
        bindExpirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-252-4633',
          website: 'https://www.travelers.com',
          localAgent: null
        }
      },
      {
        carrier: 'Nationwide',
        carrierLogo: 'https://logo.clearbit.com/nationwide.com',
        premium: { 
          monthly: 139, 
          sixMonth: 834, 
          annual: 1668,
          downPayment: 278
        },
        coverage: { ...coverage },
        discounts: ['SmartRide', 'Multi-policy', 'Safety course'],
        discountAmount: 302,
        rating: 'A+',
        quoteId: `MOM-MOCK-${Date.now()}-2`,
        source: 'Momentum',
        bindable: true,
        bindExpirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-877-669-6877',
          website: 'https://www.nationwide.com',
          localAgent: {
            name: 'Robert Johnson',
            phone: '555-0789',
            address: '789 Insurance Blvd'
          }
        }
      },
      {
        carrier: 'Farmers',
        carrierLogo: 'https://logo.clearbit.com/farmers.com',
        premium: { 
          monthly: 152, 
          sixMonth: 912, 
          annual: 1824,
          downPayment: 304
        },
        coverage: { ...coverage },
        discounts: ['Signal app', 'Homeowner', 'Mature driver'],
        discountAmount: 256,
        rating: 'A',
        quoteId: `MOM-MOCK-${Date.now()}-3`,
        source: 'Momentum',
        bindable: false,
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-888-327-6335',
          website: 'https://www.farmers.com',
          localAgent: {
            name: 'Maria Garcia',
            phone: '555-0234',
            address: '234 Farm Road'
          }
        }
      },
      {
        carrier: 'American Family',
        carrierLogo: 'https://logo.clearbit.com/amfam.com',
        premium: { 
          monthly: 147, 
          sixMonth: 882, 
          annual: 1764,
          downPayment: 294
        },
        coverage: { ...coverage },
        discounts: ['Loyalty', 'Accident-free', 'Defensive driver'],
        discountAmount: 273,
        rating: 'A',
        quoteId: `MOM-MOCK-${Date.now()}-4`,
        source: 'Momentum',
        bindable: true,
        bindExpirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-800-692-6326',
          website: 'https://www.amfam.com',
          localAgent: null
        }
      },
      {
        carrier: 'Auto-Owners',
        carrierLogo: 'https://logo.clearbit.com/auto-owners.com',
        premium: { 
          monthly: 136, 
          sixMonth: 816, 
          annual: 1632,
          downPayment: 272
        },
        coverage: { ...coverage },
        discounts: ['Group discount', 'Paid in full', 'Multi-car'],
        discountAmount: 294,
        rating: 'A++',
        quoteId: `MOM-MOCK-${Date.now()}-5`,
        source: 'Momentum',
        bindable: true,
        bindExpirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-517-323-1200',
          website: 'https://www.auto-owners.com',
          localAgent: {
            name: 'David Wilson',
            phone: '555-0567',
            address: '567 Main Street'
          }
        }
      },
      {
        carrier: 'The Hartford',
        carrierLogo: 'https://logo.clearbit.com/thehartford.com',
        premium: { 
          monthly: 158, 
          sixMonth: 948, 
          annual: 1896,
          downPayment: 316
        },
        coverage: { ...coverage },
        discounts: ['AARP member', 'Lifetime renewability', 'RecoverCare'],
        discountAmount: 221,
        rating: 'A+',
        quoteId: `MOM-MOCK-${Date.now()}-6`,
        source: 'Momentum',
        bindable: true,
        bindExpirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
        carrierInfo: {
          phone: '1-860-547-5000',
          website: 'https://www.thehartford.com',
          localAgent: null
        }
      }
    ];
  }
}

module.exports = new MomentumAPI();