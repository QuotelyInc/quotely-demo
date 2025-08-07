import { useState, useCallback, useRef } from 'react';
import {
  InsuranceType,
  ScrapingResult,
  ScrapingStatus,
  ScrapingSession,
  CompetitiveAnalysis,
  ScraperConfig,
  InsuranceQuote,
  CoverageOption
} from '../types/insurance';

class InsuranceScraperService {
  private configs: ScraperConfig[] = [];

  constructor() {
    // Initialize with default configurations matching the ScraperConfig interface
    this.configs = [
      {
        provider: 'Geico',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME],
        baseUrl: 'https://geico.com',
        requiresJavaScript: true,
        rateLimitCalls: 100,
        rateLimitPeriod: 3600,
        selectors: {
          containers: ['.quote-container'],
          prices: ['.price-display'],
          coverage: ['.coverage-options'],
          urlTemplate: '/quote/{insuranceType}'
        },
        headers: { 'User-Agent': 'Quotely-Bot/1.0' }
      },
      {
        provider: 'State Farm',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME, InsuranceType.LIFE],
        baseUrl: 'https://statefarm.com',
        requiresJavaScript: true,
        rateLimitCalls: 50,
        rateLimitPeriod: 3600,
        selectors: {
          containers: ['.quote-section'],
          prices: ['.premium-amount'],
          coverage: ['.coverage-details']
        }
      },
      {
        provider: 'Progressive',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME],
        baseUrl: 'https://progressive.com',
        requiresJavaScript: true,
        rateLimitCalls: 75,
        rateLimitPeriod: 3600,
        selectors: {
          containers: ['.rate-container'],
          prices: ['.quote-price'],
          coverage: ['.coverage-list']
        }
      },
      {
        provider: 'Allstate',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME, InsuranceType.LIFE],
        baseUrl: 'https://allstate.com',
        requiresJavaScript: true,
        rateLimitCalls: 60,
        rateLimitPeriod: 3600,
        selectors: {
          containers: ['.quote-widget'],
          prices: ['.rate-display'],
          coverage: ['.policy-options']
        }
      }
    ];
  }

  async scrapeAllProviders(insuranceType: InsuranceType): Promise<ScrapingResult[]> {
    const relevantConfigs = this.configs.filter(config => 
      config.insuranceTypes.includes(insuranceType)
    );
    
    const providers = relevantConfigs.map(config => config.provider);
    return this.scrapeMultipleProviders(providers, insuranceType);
  }

  async scrapeMultipleProviders(
    providers: string[], 
    insuranceType: InsuranceType
  ): Promise<ScrapingResult[]> {
    const results: ScrapingResult[] = [];
    
    for (const provider of providers) {
      try {
        const result = await this.scrapeProvider(provider, insuranceType);
        results.push(result);
      } catch (error) {
        // Add failed result for this provider
        results.push({
          provider,
          status: ScrapingStatus.ERROR,
          quotes: [],
          error: error instanceof Error ? error.message : 'Unknown error',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    
    return results;
  }

  private async scrapeProvider(
    provider: string, 
    insuranceType: InsuranceType
  ): Promise<ScrapingResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    
    // Mock data generation for demo purposes
    const mockQuotes = this.generateMockQuotes(provider, insuranceType);
    
    return {
      provider,
      status: ScrapingStatus.SUCCESS,
      quotes: mockQuotes,
      scrapedAt: new Date().toISOString()
    };
  }

  private generateMockQuotes(provider: string, insuranceType: InsuranceType): InsuranceQuote[] {
    const basePrice = this.getBasePriceForType(insuranceType);
    const providerMultiplier = this.getProviderMultiplier(provider);
    const numQuotes = Math.floor(Math.random() * 3) + 1; // 1-3 quotes
    
    return Array.from({ length: numQuotes }, (_, index) => {
      const calculatedBasePrice = Math.round(basePrice * providerMultiplier * (0.8 + Math.random() * 0.4));
      const totalPrice = Math.round(calculatedBasePrice * 1.1); // Add 10% for fees/taxes
      
      return {
        id: `${provider}-${insuranceType}-${index}`,
        provider,
        insuranceType,
        basePrice: calculatedBasePrice,
        totalPrice: totalPrice,
        currency: 'USD',
        billingPeriod: 'monthly',
        coverageOptions: this.getMockCoverageOptions(insuranceType),
        deductible: this.getMockDeductible(insuranceType),
        coverageLimit: this.getMockCoverageLimit(insuranceType),
        timestamp: new Date().toISOString(),
        url: `${this.configs.find(c => c.provider === provider)?.baseUrl}/quote/${insuranceType}`,
        metadata: {
          features: this.getMockFeatures(provider),
          discountsApplied: this.getMockDiscounts(),
          lastUpdated: new Date().toISOString()
        }
      };
    });
  }

  private getBasePriceForType(insuranceType: InsuranceType): number {
    const basePrices = {
      [InsuranceType.AUTO]: 150,
      [InsuranceType.HOME]: 120,
      [InsuranceType.LIFE]: 80,
      [InsuranceType.HEALTH]: 400,
      [InsuranceType.BUSINESS]: 300
    };
    return basePrices[insuranceType] || 150;
  }

  private getProviderMultiplier(provider: string): number {
    const multipliers: Record<string, number> = {
      'Geico': 0.9,
      'State Farm': 1.1,
      'Progressive': 0.95,
      'Allstate': 1.05
    };
    return multipliers[provider] || 1.0;
  }

  private getMockCoverageOptions(insuranceType: InsuranceType): CoverageOption[] {
    const coverageOptions: Record<InsuranceType, CoverageOption[]> = {
      [InsuranceType.AUTO]: [
        { name: 'Collision Coverage', value: '$500 deductible', included: true },
        { name: 'Comprehensive Coverage', value: '$500 deductible', included: true },
        { name: 'Liability Coverage', value: '$300k/$100k/$50k', included: true },
        { name: 'Rental Car Coverage', value: '$30/day', included: false, additionalCost: 25 }
      ],
      [InsuranceType.HOME]: [
        { name: 'Dwelling Coverage', value: '$300k', included: true },
        { name: 'Personal Property', value: '$150k', included: true },
        { name: 'Liability Protection', value: '$100k', included: true },
        { name: 'Flood Coverage', value: '$50k', included: false, additionalCost: 75 }
      ],
      [InsuranceType.LIFE]: [
        { name: 'Term Life Coverage', value: '$500k', included: true },
        { name: 'Accidental Death', value: '$100k', included: true },
        { name: 'Disability Waiver', value: 'Premium waiver', included: false, additionalCost: 50 }
      ],
      [InsuranceType.HEALTH]: [
        { name: 'Medical Coverage', value: 'PPO Network', included: true },
        { name: 'Prescription Coverage', value: 'Generic/Brand', included: true },
        { name: 'Dental Coverage', value: 'Basic/Preventive', included: false, additionalCost: 45 }
      ],
      [InsuranceType.BUSINESS]: [
        { name: 'General Liability', value: '$1M/$2M', included: true },
        { name: 'Property Coverage', value: '$500k', included: true },
        { name: 'Cyber Liability', value: '$100k', included: false, additionalCost: 150 }
      ]
    };
    
    return coverageOptions[insuranceType] || [];
  }

  private getMockCoverageLimit(insuranceType: InsuranceType): number {
    const limits = {
      [InsuranceType.AUTO]: 300000,
      [InsuranceType.HOME]: 500000,
      [InsuranceType.LIFE]: 500000,
      [InsuranceType.HEALTH]: 1000000,
      [InsuranceType.BUSINESS]: 1000000
    };
    return limits[insuranceType] || 300000;
  }

  private getMockDiscounts(): string[] {
    const discounts = ['Multi-Policy', 'Safe Driver', 'Good Student', 'Military', 'Senior'];
    const numDiscounts = Math.floor(Math.random() * 3);
    return discounts.slice(0, numDiscounts);
  }

  private getMockDeductible(insuranceType: InsuranceType): number {
    const deductibles = {
      [InsuranceType.AUTO]: 500,
      [InsuranceType.HOME]: 1000,
      [InsuranceType.LIFE]: 0,
      [InsuranceType.HEALTH]: 2500,
      [InsuranceType.BUSINESS]: 1000
    };
    return deductibles[insuranceType] || 500;
  }

  private getMockFeatures(provider: string): string[] {
    const features: Record<string, string[]> = {
      'Geico': ['24/7 Support', 'Mobile App', 'Accident Forgiveness'],
      'State Farm': ['Local Agent', 'Drive Safe & Save', 'Good Student Discount'],
      'Progressive': ['Snapshot Program', 'Name Your Price', 'Pet Coverage'],
      'Allstate': ['Drivewise', 'Claim-Free Bonus', 'Safe Driver Rewards']
    };
    return features[provider] || ['Standard Coverage', 'Customer Support'];
  }

  analyzeCompetitiveData(results: ScrapingResult[]): CompetitiveAnalysis {
    const successfulResults = results.filter(r => r.status === ScrapingStatus.SUCCESS);
    const allQuotes = successfulResults.flatMap(r => r.quotes);
    
    if (allQuotes.length === 0) {
      return {
        totalQuotes: 0,
        averagePrice: 0,
        lowestPrice: { provider: '', price: 0 },
        highestPrice: { provider: '', price: 0 },
        priceRange: 0,
        marketPosition: 'no-data' as any
      };
    }

    const prices = allQuotes.map(q => q.totalPrice);
    const averagePrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    const lowestQuote = allQuotes.find(q => q.totalPrice === minPrice)!;
    const highestQuote = allQuotes.find(q => q.totalPrice === maxPrice)!;

    return {
      totalQuotes: allQuotes.length,
      averagePrice,
      lowestPrice: { provider: lowestQuote.provider, price: minPrice },
      highestPrice: { provider: highestQuote.provider, price: maxPrice },
      priceRange: maxPrice - minPrice,
      marketPosition: this.determineMarketPosition(averagePrice, minPrice, maxPrice)
    };
  }

  private determineMarketPosition(avg: number, min: number, max: number): 'competitive' | 'premium' | 'budget' {
    const range = max - min;
    
    if (avg <= min + (range * 0.33)) return 'budget';
    if (avg >= max - (range * 0.33)) return 'premium';
    return 'competitive';
  }

  exportData(results: ScrapingResult[], format: 'json' | 'csv' | 'excel'): string {
    const allQuotes = results.flatMap(r => r.quotes);
    
    if (format === 'json') {
      return JSON.stringify({ results, quotes: allQuotes }, null, 2);
    }
    
    if (format === 'csv') {
      const headers = ['Provider', 'Insurance Type', 'Base Price', 'Total Price', 'Currency', 'Billing Period', 'Deductible', 'Coverage Limit', 'Timestamp'];
      const rows = allQuotes.map(quote => [
        quote.provider,
        quote.insuranceType,
        quote.basePrice.toString(),
        quote.totalPrice.toString(),
        quote.currency,
        quote.billingPeriod,
        quote.deductible?.toString() || 'N/A',
        quote.coverageLimit?.toString() || 'N/A',
        quote.timestamp
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    // For Excel format, return CSV for now (could be enhanced with a proper Excel library)
    return this.exportData(results, 'csv');
  }

  getConfigs(): ScraperConfig[] {
    return this.configs;
  }

  addConfig(config: ScraperConfig): void {
    this.configs.push(config);
  }
}

interface UseInsuranceScraperReturn {
  // State
  isLoading: boolean;
  currentSession: ScrapingSession | null;
  results: ScrapingResult[];
  analysis: CompetitiveAnalysis | null;
  error: string | null;
  
  // Actions
  startScraping: (insuranceType: InsuranceType, providers?: string[]) => Promise<void>;
  clearResults: () => void;
  exportData: (format: 'json' | 'csv' | 'excel') => void;
  
  // Computed
  successfulScrapesCount: number;
  totalQuotesFound: number;
}

export const useInsuranceScraper = (): UseInsuranceScraperReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ScrapingSession | null>(null);
  const [results, setResults] = useState<ScrapingResult[]>([]);
  const [analysis, setAnalysis] = useState<CompetitiveAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const scraperService = useRef(new InsuranceScraperService());

  const startScraping = useCallback(async (
    insuranceType: InsuranceType,
    providers?: string[]
  ) => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setAnalysis(null);

    const sessionId = `session-${Date.now()}`;
    const session: ScrapingSession = {
      id: sessionId,
      insuranceType,
      results: [],
      analysis: {
        totalQuotes: 0,
        averagePrice: 0,
        lowestPrice: { provider: '', price: 0 },
        highestPrice: { provider: '', price: 0 },
        priceRange: 0,
        marketPosition: 'competitive'
      },
      startedAt: new Date().toISOString(),
      status: ScrapingStatus.LOADING
    };

    setCurrentSession(session);

    try {
      let scrapingResults: ScrapingResult[];
      
      if (providers && providers.length > 0) {
        scrapingResults = await scraperService.current.scrapeMultipleProviders(
          providers,
          insuranceType
        );
      } else {
        scrapingResults = await scraperService.current.scrapeAllProviders(insuranceType);
      }

      const competitiveAnalysis = scraperService.current.analyzeCompetitiveData(scrapingResults);

      const completedSession: ScrapingSession = {
        ...session,
        results: scrapingResults,
        analysis: competitiveAnalysis,
        completedAt: new Date().toISOString(),
        status: ScrapingStatus.SUCCESS
      };

      setResults(scrapingResults);
      setAnalysis(competitiveAnalysis);
      setCurrentSession(completedSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      const failedSession: ScrapingSession = {
        ...session,
        completedAt: new Date().toISOString(),
        status: ScrapingStatus.ERROR
      };
      
      setCurrentSession(failedSession);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setAnalysis(null);
    setCurrentSession(null);
    setError(null);
  }, []);

  const exportData = useCallback((format: 'json' | 'csv' | 'excel') => {
    if (results.length === 0) {
      console.warn('No data to export');
      return;
    }

    try {
      const exportedData = scraperService.current.exportData(results, format);
      
      // Create and trigger download
      const blob = new Blob([exportedData], {
        type: format === 'json' ? 'application/json' : 'text/csv'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `insurance-quotes-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      setError('Failed to export data');
    }
  }, [results]);

  // Computed values
  const successfulScrapesCount = results.filter(
    result => result.status === ScrapingStatus.SUCCESS
  ).length;

  const totalQuotesFound = results.reduce(
    (total, result) => total + result.quotes.length,
    0
  );

  return {
    // State
    isLoading,
    currentSession,
    results,
    analysis,
    error,
    
    // Actions
    startScraping,
    clearResults,
    exportData,
    
    // Computed
    successfulScrapesCount,
    totalQuotesFound
  };
};

// Hook for managing scraper configurations
export const useScraperConfigs = () => {
  const [scraperService] = useState(() => new InsuranceScraperService());
  
  const getConfigs = useCallback(() => {
    return scraperService.getConfigs();
  }, [scraperService]);

  const addConfig = useCallback((config: ScraperConfig) => {
    scraperService.addConfig(config);
  }, [scraperService]);

  return {
    getConfigs,
    addConfig,
    configs: getConfigs()
  };
};