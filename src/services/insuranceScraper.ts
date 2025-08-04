import type {
  InsuranceQuote,
  ScraperConfig,
  ScrapingResult,
  CoverageOption,
  CompetitiveAnalysis
} from '../types/insurance';
import { InsuranceType, ScrapingStatus } from '../types/insurance';

export class InsuranceScraperService {
  private configs: Map<string, ScraperConfig> = new Map();

  constructor() {
    this.initializeDefaultConfigs();
  }

  private initializeDefaultConfigs(): void {
    const defaultConfigs: ScraperConfig[] = [
      {
        provider: 'Progressive',
        baseUrl: 'https://www.progressive.com',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME],
        requiresJavaScript: true,
        rateLimitCalls: 10,
        rateLimitPeriod: 60,
        selectors: {
          containers: ['.quote-result', '.pricing-card'],
          prices: ['.price', '.premium-amount'],
          coverage: ['.coverage-item', '.feature-list li'],
          urlTemplate: '{baseUrl}/quote/{insuranceType}'
        }
      },
      {
        provider: 'GEICO',
        baseUrl: 'https://www.geico.com',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME],
        requiresJavaScript: true,
        rateLimitCalls: 10,
        rateLimitPeriod: 60,
        selectors: {
          containers: ['.quote-box', '.rate-display'],
          prices: ['.rate', '.monthly-rate'],
          coverage: ['.coverage-details', '.policy-features']
        }
      },
      {
        provider: 'State Farm',
        baseUrl: 'https://www.statefarm.com',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME, InsuranceType.LIFE],
        requiresJavaScript: false,
        rateLimitCalls: 15,
        rateLimitPeriod: 60,
        selectors: {
          containers: ['.quote-container', '.premium-box'],
          prices: ['.premium', '.rate-amount'],
          coverage: ['.coverage-list', '.benefits']
        }
      },
      {
        provider: 'Allstate',
        baseUrl: 'https://www.allstate.com',
        insuranceTypes: [InsuranceType.AUTO, InsuranceType.HOME],
        requiresJavaScript: true,
        rateLimitCalls: 12,
        rateLimitPeriod: 60,
        selectors: {
          containers: ['.quote-card', '.estimate-card'],
          prices: ['.quote-price', '.monthly-premium'],
          coverage: ['.coverage-option', '.feature']
        }
      }
    ];

    defaultConfigs.forEach(config => {
      this.configs.set(config.provider, config);
    });
  }

  public addConfig(config: ScraperConfig): void {
    this.configs.set(config.provider, config);
  }

  public getConfigs(): ScraperConfig[] {
    return Array.from(this.configs.values());
  }

  // Simulate scraping (in production, this would use a backend service)
  public async scrapeProvider(
    provider: string,
    insuranceType: InsuranceType,
    _params?: Record<string, any>
  ): Promise<ScrapingResult> {
    const config = this.configs.get(provider);
    if (!config) {
      throw new Error(`No configuration found for provider: ${provider}`);
    }

    try {
      // Simulate API delay
      await this.delay(1000 + Math.random() * 2000);

      // In a real implementation, this would make actual HTTP requests
      // For demo purposes, we'll generate realistic mock data
      const quotes = this.generateMockQuotes(provider, insuranceType, config);

      return {
        provider,
        quotes,
        status: ScrapingStatus.SUCCESS,
        scrapedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        provider,
        quotes: [],
        status: ScrapingStatus.ERROR,
        error: error instanceof Error ? error.message : 'Unknown error',
        scrapedAt: new Date().toISOString()
      };
    }
  }

  public async scrapeMultipleProviders(
    providers: string[],
    insuranceType: InsuranceType,
    params?: Record<string, any>
  ): Promise<ScrapingResult[]> {
    const promises = providers.map(provider =>
      this.scrapeProvider(provider, insuranceType, params)
    );

    return Promise.all(promises);
  }

  public async scrapeAllProviders(
    insuranceType: InsuranceType,
    params?: Record<string, any>
  ): Promise<ScrapingResult[]> {
    const providers = Array.from(this.configs.keys()).filter(provider => {
      const config = this.configs.get(provider);
      return config?.insuranceTypes.includes(insuranceType);
    });

    return this.scrapeMultipleProviders(providers, insuranceType, params);
  }

  public analyzeCompetitiveData(results: ScrapingResult[]): CompetitiveAnalysis {
    const allQuotes = results.flatMap(result => result.quotes);
    
    if (allQuotes.length === 0) {
      return {
        totalQuotes: 0,
        averagePrice: 0,
        lowestPrice: { provider: '', price: 0 },
        highestPrice: { provider: '', price: 0 },
        priceRange: 0,
        marketPosition: 'competitive'
      };
    }

    const prices = allQuotes.map(quote => quote.totalPrice);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const lowestQuote = allQuotes.find(quote => quote.totalPrice === minPrice)!;
    const highestQuote = allQuotes.find(quote => quote.totalPrice === maxPrice)!;

    const priceRange = maxPrice - minPrice;
    const marketPosition = this.determineMarketPosition(averagePrice, minPrice, maxPrice);

    return {
      totalQuotes: allQuotes.length,
      averagePrice: Math.round(averagePrice * 100) / 100,
      lowestPrice: {
        provider: lowestQuote.provider,
        price: lowestQuote.totalPrice
      },
      highestPrice: {
        provider: highestQuote.provider,
        price: highestQuote.totalPrice
      },
      priceRange: Math.round(priceRange * 100) / 100,
      marketPosition,
      savings: averagePrice > minPrice ? Math.round((averagePrice - minPrice) * 100) / 100 : undefined
    };
  }

  private determineMarketPosition(avg: number, min: number, max: number): 'competitive' | 'premium' | 'budget' {
    const range = max - min;
    const lowerThird = min + (range * 0.33);
    const upperThird = min + (range * 0.67);

    if (avg <= lowerThird) return 'budget';
    if (avg >= upperThird) return 'premium';
    return 'competitive';
  }

  private generateMockQuotes(
    provider: string,
    insuranceType: InsuranceType,
    config: ScraperConfig
  ): InsuranceQuote[] {
    const basePrice = this.getBasePriceForType(insuranceType);
    const variationFactor = provider === 'GEICO' ? 0.85 : provider === 'Progressive' ? 1.1 : 1.0;
    
    const numQuotes = Math.floor(Math.random() * 3) + 1; // 1-3 quotes per provider
    const quotes: InsuranceQuote[] = [];

    for (let i = 0; i < numQuotes; i++) {
      const priceVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const totalPrice = Math.round(basePrice * variationFactor * priceVariation * 100) / 100;
      
      quotes.push({
        id: `${provider.toLowerCase()}-${insuranceType}-${i + 1}`,
        provider,
        insuranceType,
        basePrice: Math.round(totalPrice * 0.9 * 100) / 100,
        totalPrice,
        currency: 'USD',
        billingPeriod: 'monthly',
        coverageOptions: this.generateMockCoverage(insuranceType),
        deductible: insuranceType === InsuranceType.AUTO ? Math.floor(Math.random() * 1000) + 500 : undefined,
        coverageLimit: Math.floor(Math.random() * 500000) + 100000,
        timestamp: new Date().toISOString(),
        url: `${config.baseUrl}/quote/${insuranceType}`,
        metadata: {
          planName: `${provider} ${insuranceType === InsuranceType.AUTO ? 'Auto' : 'Home'} ${i === 0 ? 'Basic' : i === 1 ? 'Premium' : 'Elite'}`,
          rating: (4.0 + Math.random() * 1.0).toFixed(1),
          features: Math.floor(Math.random() * 5) + 3
        }
      });
    }

    return quotes;
  }

  private getBasePriceForType(insuranceType: InsuranceType): number {
    const basePrices = {
      [InsuranceType.AUTO]: 120,
      [InsuranceType.HOME]: 180,
      [InsuranceType.LIFE]: 45,
      [InsuranceType.HEALTH]: 350,
      [InsuranceType.BUSINESS]: 240
    };
    return basePrices[insuranceType];
  }

  private generateMockCoverage(insuranceType: InsuranceType): CoverageOption[] {
    const autoCoverage = [
      { name: 'Liability Coverage', value: 'Required', included: true },
      { name: 'Collision Coverage', value: 'Optional', included: Math.random() > 0.3 },
      { name: 'Comprehensive Coverage', value: 'Optional', included: Math.random() > 0.4 },
      { name: 'Uninsured Motorist', value: 'Recommended', included: Math.random() > 0.2 }
    ];

    const homeCoverage = [
      { name: 'Dwelling Coverage', value: 'Required', included: true },
      { name: 'Personal Property', value: 'Standard', included: true },
      { name: 'Liability Protection', value: 'Required', included: true },
      { name: 'Additional Living Expenses', value: 'Optional', included: Math.random() > 0.3 }
    ];

    return insuranceType === InsuranceType.AUTO ? autoCoverage : homeCoverage;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Export functionality
  public exportData(results: ScrapingResult[], format: 'json' | 'csv' | 'excel'): string | Blob {
    const allQuotes = results.flatMap(result => result.quotes);

    switch (format) {
      case 'json':
        return JSON.stringify({
          exportedAt: new Date().toISOString(),
          totalQuotes: allQuotes.length,
          providers: results.map(r => r.provider),
          quotes: allQuotes
        }, null, 2);

      case 'csv':
        const headers = ['Provider', 'Insurance Type', 'Total Price', 'Base Price', 'Billing Period', 'Deductible', 'Coverage Limit', 'Plan Name'];
        const csvData = [
          headers.join(','),
          ...allQuotes.map(quote => [
            quote.provider,
            quote.insuranceType,
            quote.totalPrice,
            quote.basePrice,
            quote.billingPeriod,
            quote.deductible || '',
            quote.coverageLimit || '',
            quote.metadata?.planName || ''
          ].join(','))
        ].join('\n');
        return csvData;

      default:
        return JSON.stringify(allQuotes, null, 2);
    }
  }
}