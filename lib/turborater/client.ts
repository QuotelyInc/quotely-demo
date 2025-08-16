/**
 * TurboRater API Client
 * Handles all interactions with TurboRater API
 */

import { 
  getTurboRaterConfig, 
  getTurboRaterEndpoint, 
  getTurboRaterHeaders,
  validateTurboRaterConfig 
} from './config';

export interface QuoteRequest {
  // Customer Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Vehicle Information
  vehicles?: Array<{
    year: number;
    make: string;
    model: string;
    vin?: string;
    usage?: 'personal' | 'business' | 'farm';
    annualMileage?: number;
  }>;
  
  // Coverage Options
  coverageType?: 'liability' | 'full' | 'comprehensive';
  deductible?: number;
  
  // Additional Options
  drivers?: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    licenseNumber?: string;
    licenseState?: string;
  }>;
}

export interface QuoteResponse {
  quoteId: string;
  status: 'success' | 'error' | 'pending';
  quotes: Array<{
    carrier: string;
    premium: number;
    coverage: string;
    deductible: number;
    term: string;
    discounts?: string[];
  }>;
  metadata?: {
    generatedAt: string;
    expiresAt: string;
    accountName: string;
  };
  errors?: Array<{
    code: string;
    message: string;
    field?: string;
  }>;
}

export class TurboRaterClient {
  private static instance: TurboRaterClient;
  private baseUrl: string;
  private headers: Record<string, string>;

  private constructor() {
    const validation = validateTurboRaterConfig();
    if (!validation.isValid) {
      console.warn('TurboRater configuration is invalid:', validation.errors);
    }
    
    this.baseUrl = getTurboRaterEndpoint();
    this.headers = getTurboRaterHeaders();
  }

  static getInstance(): TurboRaterClient {
    if (!TurboRaterClient.instance) {
      TurboRaterClient.instance = new TurboRaterClient();
    }
    return TurboRaterClient.instance;
  }

  /**
   * Generate a quote
   */
  async generateQuote(request: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/quotes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(this.formatRequest(request))
      });

      if (!response.ok) {
        throw new Error(`TurboRater API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.formatResponse(data);
    } catch (error) {
      console.error('TurboRater quote generation failed:', error);
      
      // Return mock data in development
      if (process.env.NODE_ENV === 'development') {
        return this.getMockQuote(request);
      }
      
      throw error;
    }
  }

  /**
   * Get quote by ID
   */
  async getQuote(quoteId: string): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/quotes/${quoteId}`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`TurboRater API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.formatResponse(data);
    } catch (error) {
      console.error('TurboRater quote retrieval failed:', error);
      throw error;
    }
  }

  /**
   * Update a quote
   */
  async updateQuote(quoteId: string, updates: Partial<QuoteRequest>): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`TurboRater API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.formatResponse(data);
    } catch (error) {
      console.error('TurboRater quote update failed:', error);
      throw error;
    }
  }

  /**
   * Get available carriers
   */
  async getCarriers(): Promise<Array<{ id: string; name: string; active: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/carriers`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`TurboRater API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TurboRater carrier fetch failed:', error);
      
      // Return mock carriers in development
      if (process.env.NODE_ENV === 'development') {
        return this.getMockCarriers();
      }
      
      throw error;
    }
  }

  /**
   * Validate configuration
   */
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    return validateTurboRaterConfig();
  }

  /**
   * Format request for TurboRater API
   */
  private formatRequest(request: QuoteRequest): any {
    const config = getTurboRaterConfig();
    
    return {
      account: {
        accountId: config.accountId,
        accountNumber: config.accountNumber,
        agencyId: config.agencyId,
        accessId: config.accessId
      },
      customer: {
        firstName: request.firstName,
        lastName: request.lastName,
        dateOfBirth: request.dateOfBirth,
        email: request.email,
        phone: request.phone,
        address: request.address
      },
      vehicles: request.vehicles || [],
      coverage: {
        type: request.coverageType || 'full',
        deductible: request.deductible || 500
      },
      drivers: request.drivers || [{
        firstName: request.firstName,
        lastName: request.lastName,
        dateOfBirth: request.dateOfBirth
      }]
    };
  }

  /**
   * Format response from TurboRater API
   */
  private formatResponse(data: any): QuoteResponse {
    return {
      quoteId: data.quoteId || data.id,
      status: data.status || 'success',
      quotes: data.quotes || data.results || [],
      metadata: {
        generatedAt: data.generatedAt || new Date().toISOString(),
        expiresAt: data.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        accountName: getTurboRaterConfig().accountName
      },
      errors: data.errors
    };
  }

  /**
   * Get mock quote for development
   */
  private getMockQuote(request: QuoteRequest): QuoteResponse {
    const mockQuotes = [
      {
        carrier: 'State Farm',
        premium: 1247,
        coverage: 'Full Coverage',
        deductible: 500,
        term: '6 months',
        discounts: ['Safe Driver', 'Multi-Policy', 'Good Student']
      },
      {
        carrier: 'GEICO',
        premium: 1189,
        coverage: 'Full Coverage',
        deductible: 500,
        term: '6 months',
        discounts: ['Safe Driver', 'Anti-Theft Device']
      },
      {
        carrier: 'Progressive',
        premium: 1356,
        coverage: 'Full Coverage',
        deductible: 500,
        term: '6 months',
        discounts: ['Snapshot', 'Multi-Vehicle']
      },
      {
        carrier: 'Allstate',
        premium: 1425,
        coverage: 'Full Coverage',
        deductible: 500,
        term: '6 months',
        discounts: ['Safe Driving Bonus', 'New Car']
      }
    ];

    return {
      quoteId: `MOCK-${Date.now()}`,
      status: 'success',
      quotes: mockQuotes,
      metadata: {
        generatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        accountName: 'Quotely (Development)'
      }
    };
  }

  /**
   * Get mock carriers for development
   */
  private getMockCarriers() {
    return [
      { id: 'state-farm', name: 'State Farm', active: true },
      { id: 'geico', name: 'GEICO', active: true },
      { id: 'progressive', name: 'Progressive', active: true },
      { id: 'allstate', name: 'Allstate', active: true },
      { id: 'farmers', name: 'Farmers', active: true },
      { id: 'nationwide', name: 'Nationwide', active: true },
      { id: 'liberty-mutual', name: 'Liberty Mutual', active: true },
      { id: 'travelers', name: 'Travelers', active: true }
    ];
  }
}

// Singleton instance
export const turboRaterClient = TurboRaterClient.getInstance();

/**
 * Quick access functions
 */
export async function generateTurboRaterQuote(request: QuoteRequest): Promise<QuoteResponse> {
  return turboRaterClient.generateQuote(request);
}

export async function getTurboRaterQuote(quoteId: string): Promise<QuoteResponse> {
  return turboRaterClient.getQuote(quoteId);
}

export async function getTurboRaterCarriers() {
  return turboRaterClient.getCarriers();
}