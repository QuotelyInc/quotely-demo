import { NextRequest, NextResponse } from 'next/server';

interface QuoteRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  vehicles: Array<{
    year: number;
    make: string;
    model: string;
    vin?: string;
    usage: string;
    annualMileage: number;
  }>;
  coverage: {
    liability: string;
    collision: number;
    comprehensive: number;
    uninsured: boolean;
    medical: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData: QuoteRequest = await request.json();
    
    // Momentum API configuration
    const MOMENTUM_API_URL = process.env.MOMENTUM_API_URL || 'https://api.momentum.com/v2';
    const MOMENTUM_API_KEY = process.env.MOMENTUM_API_KEY;
    const MOMENTUM_CLIENT_ID = process.env.MOMENTUM_CLIENT_ID;
    
    if (!MOMENTUM_API_KEY) {
      throw new Error('Momentum API key not configured');
    }
    
    // Transform data to Momentum format
    const momentumPayload = {
      clientId: MOMENTUM_CLIENT_ID,
      quoteRequest: {
        customer: {
          first: formData.firstName,
          last: formData.lastName,
          dob: formData.dateOfBirth,
          contactInfo: {
            email: formData.email,
            phone: formData.phone
          },
          residenceAddress: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.zipCode,
            country: 'US'
          }
        },
        vehicleList: formData.vehicles.map((vehicle, index) => ({
          vehicleId: index + 1,
          modelYear: vehicle.year,
          manufacturer: vehicle.make,
          modelName: vehicle.model,
          vin: vehicle.vin || null,
          vehicleUse: mapVehicleUsage(vehicle.usage),
          annualMileage: vehicle.annualMileage,
          garagingAddress: {
            postalCode: formData.zipCode
          }
        })),
        requestedCoverages: {
          liabilityLimits: {
            bodilyInjury: parseLiabilityForMomentum(formData.coverage.liability).bi,
            propertyDamage: parseLiabilityForMomentum(formData.coverage.liability).pd
          },
          physicalDamage: {
            collision: formData.coverage.collision > 0 ? {
              deductible: formData.coverage.collision,
              included: true
            } : { included: false },
            comprehensive: formData.coverage.comprehensive > 0 ? {
              deductible: formData.coverage.comprehensive,
              included: true
            } : { included: false }
          },
          uninsuredMotorist: {
            included: formData.coverage.uninsured
          },
          medicalPayments: {
            limit: formData.coverage.medical,
            included: formData.coverage.medical > 0
          }
        }
      },
      options: {
        includeAllCarriers: true,
        returnBestMatches: 10,
        includeDiscounts: true
      }
    };
    
    // Call Momentum API
    const response = await fetch(`${MOMENTUM_API_URL}/quotes/auto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': MOMENTUM_API_KEY,
        'X-Client-ID': MOMENTUM_CLIENT_ID || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(momentumPayload)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Momentum API error:', error);
      throw new Error(`Momentum API error: ${response.status}`);
    }
    
    const momentumResponse = await response.json();
    
    // Transform Momentum response to standard format
    const quotes = momentumResponse.quoteResults?.map((quote: any) => ({
      carrier: quote.carrier.name,
      premium: {
        monthly: Math.round(quote.premium.total / 12),
        sixMonth: Math.round(quote.premium.sixMonth || quote.premium.total / 2),
        annual: quote.premium.total
      },
      coverage: {
        liability: formData.coverage.liability,
        collision: formData.coverage.collision,
        comprehensive: formData.coverage.comprehensive,
        uninsured: formData.coverage.uninsured,
        medical: formData.coverage.medical
      },
      discounts: quote.discounts?.map((d: any) => d.name) || [],
      rating: quote.carrier.rating || 'A',
      quoteId: quote.referenceId,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: quote.bindable || false,
      effectiveDate: quote.effectiveDate
    })) || [];
    
    return NextResponse.json({
      success: true,
      quotes,
      metadata: {
        source: 'Momentum',
        responseTime: Date.now(),
        quoteCount: quotes.length
      }
    });
    
  } catch (error) {
    console.error('Momentum quote error:', error);
    
    // Return mock data in development/error scenarios
    if (process.env.NODE_ENV === 'development' || !process.env.MOMENTUM_API_KEY) {
      return NextResponse.json({
        success: true,
        quotes: generateMockMomentumQuotes(),
        metadata: {
          source: 'Momentum',
          responseTime: Date.now(),
          quoteCount: 6,
          mock: true
        }
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate Momentum quotes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function mapVehicleUsage(usage: string): string {
  const usageMap: Record<string, string> = {
    'commute': 'COMMUTE',
    'pleasure': 'PLEASURE',
    'business': 'BUSINESS',
    'farm': 'FARM'
  };
  return usageMap[usage.toLowerCase()] || 'PLEASURE';
}

function parseLiabilityForMomentum(limit: string): { bi: number; pd: number } {
  // Parse limits like "100/300/50" to get BI and PD limits
  const parts = limit.split('/');
  return {
    bi: parseInt(parts[0]) * 1000,
    pd: parseInt(parts[2] || parts[1]) * 1000
  };
}

function generateMockMomentumQuotes() {
  return [
    {
      carrier: 'Travelers',
      premium: { monthly: 145, sixMonth: 870, annual: 1740 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Bundle', 'Early quote'],
      rating: 'A++',
      quoteId: `MOM-${Date.now()}-1`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: true,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    },
    {
      carrier: 'Nationwide',
      premium: { monthly: 139, sixMonth: 834, annual: 1668 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['SmartRide', 'Multi-policy'],
      rating: 'A+',
      quoteId: `MOM-${Date.now()}-2`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: true,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    },
    {
      carrier: 'Farmers',
      premium: { monthly: 152, sixMonth: 912, annual: 1824 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Mature driver'],
      rating: 'A',
      quoteId: `MOM-${Date.now()}-3`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: true,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    },
    {
      carrier: 'American Family',
      premium: { monthly: 147, sixMonth: 882, annual: 1764 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Loyalty', 'Accident-free'],
      rating: 'A',
      quoteId: `MOM-${Date.now()}-4`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: false,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    },
    {
      carrier: 'Auto-Owners',
      premium: { monthly: 136, sixMonth: 816, annual: 1632 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Group', 'Paid in full'],
      rating: 'A++',
      quoteId: `MOM-${Date.now()}-5`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: true,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    },
    {
      carrier: 'The Hartford',
      premium: { monthly: 158, sixMonth: 948, annual: 1896 },
      coverage: {
        liability: '100/300/50',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['AARP member'],
      rating: 'A+',
      quoteId: `MOM-${Date.now()}-6`,
      source: 'Momentum',
      timestamp: new Date().toISOString(),
      bindable: true,
      effectiveDate: new Date(Date.now() + 86400000).toISOString()
    }
  ];
}