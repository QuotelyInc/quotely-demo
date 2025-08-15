import { NextRequest, NextResponse } from 'next/server';

interface QuoteRequest {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Vehicle Information
  vehicles: Array<{
    year: number;
    make: string;
    model: string;
    vin?: string;
    usage: string;
    annualMileage: number;
  }>;
  
  // Coverage Requirements
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
    
    // TurboRater API configuration
    const TURBORRATER_API_URL = process.env.TURBORRATER_API_URL || 'https://api.turborrater.com/v1';
    const TURBORRATER_API_KEY = process.env.TURBORRATER_API_KEY;
    
    if (!TURBORRATER_API_KEY) {
      throw new Error('TurboRater API key not configured');
    }
    
    // Transform data to TurboRater format
    const turboRaterPayload = {
      account: {
        accountId: process.env.TURBORRATER_ACCOUNT_ID,
        agentId: process.env.TURBORRATER_AGENT_ID
      },
      applicant: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zipCode
        }
      },
      vehicles: formData.vehicles.map(vehicle => ({
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        vin: vehicle.vin,
        primaryUse: vehicle.usage,
        annualMiles: vehicle.annualMileage,
        garagingZip: formData.zipCode
      })),
      coverages: {
        bodilyInjuryLiability: parseLiabilityLimit(formData.coverage.liability),
        propertyDamageLiability: parseLiabilityLimit(formData.coverage.liability),
        collision: {
          deductible: formData.coverage.collision,
          included: formData.coverage.collision > 0
        },
        comprehensive: {
          deductible: formData.coverage.comprehensive,
          included: formData.coverage.comprehensive > 0
        },
        uninsuredMotorist: formData.coverage.uninsured,
        medicalPayments: formData.coverage.medical
      }
    };
    
    // Call TurboRater API
    const response = await fetch(`${TURBORRATER_API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TURBORRATER_API_KEY}`,
        'X-API-Version': '2.0'
      },
      body: JSON.stringify(turboRaterPayload)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('TurboRater API error:', error);
      throw new Error(`TurboRater API error: ${response.status}`);
    }
    
    const turboRaterResponse = await response.json();
    
    // Transform TurboRater response to standard format
    const quotes = turboRaterResponse.quotes?.map((quote: any) => ({
      carrier: quote.carrierName,
      premium: {
        monthly: Math.round(quote.totalPremium / 12),
        sixMonth: Math.round(quote.totalPremium / 2),
        annual: quote.totalPremium
      },
      coverage: {
        liability: formData.coverage.liability,
        collision: formData.coverage.collision,
        comprehensive: formData.coverage.comprehensive,
        uninsured: formData.coverage.uninsured,
        medical: formData.coverage.medical
      },
      discounts: quote.appliedDiscounts || [],
      rating: quote.carrierRating || 'A',
      quoteId: quote.quoteId,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    })) || [];
    
    return NextResponse.json({
      success: true,
      quotes,
      metadata: {
        source: 'TurboRater',
        responseTime: Date.now(),
        quoteCount: quotes.length
      }
    });
    
  } catch (error) {
    console.error('TurboRater quote error:', error);
    
    // Return mock data in development/error scenarios
    if (process.env.NODE_ENV === 'development' || !process.env.TURBORRATER_API_KEY) {
      return NextResponse.json({
        success: true,
        quotes: generateMockTurboRaterQuotes(),
        metadata: {
          source: 'TurboRater',
          responseTime: Date.now(),
          quoteCount: 5,
          mock: true
        }
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate TurboRater quotes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function parseLiabilityLimit(limit: string): number {
  // Parse limits like "100/300" to get per-person limit
  const parts = limit.split('/');
  return parseInt(parts[0]) * 1000;
}

function generateMockTurboRaterQuotes() {
  return [
    {
      carrier: 'Progressive',
      premium: { monthly: 142, sixMonth: 852, annual: 1704 },
      coverage: {
        liability: '100/300',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Multi-car', 'Safe driver'],
      rating: 'A+',
      quoteId: `TR-${Date.now()}-1`,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    },
    {
      carrier: 'GEICO',
      premium: { monthly: 138, sixMonth: 828, annual: 1656 },
      coverage: {
        liability: '100/300',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Good driver', 'Paperless'],
      rating: 'A++',
      quoteId: `TR-${Date.now()}-2`,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    },
    {
      carrier: 'State Farm',
      premium: { monthly: 155, sixMonth: 930, annual: 1860 },
      coverage: {
        liability: '100/300',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Loyalty', 'Multi-policy'],
      rating: 'A++',
      quoteId: `TR-${Date.now()}-3`,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    },
    {
      carrier: 'Allstate',
      premium: { monthly: 149, sixMonth: 894, annual: 1788 },
      coverage: {
        liability: '100/300',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['Safe driving bonus'],
      rating: 'A+',
      quoteId: `TR-${Date.now()}-4`,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    },
    {
      carrier: 'Liberty Mutual',
      premium: { monthly: 161, sixMonth: 966, annual: 1932 },
      coverage: {
        liability: '100/300',
        collision: 500,
        comprehensive: 500,
        uninsured: true,
        medical: 5000
      },
      discounts: ['New customer'],
      rating: 'A',
      quoteId: `TR-${Date.now()}-5`,
      source: 'TurboRater',
      timestamp: new Date().toISOString()
    }
  ];
}