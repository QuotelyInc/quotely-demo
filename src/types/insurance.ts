// TypeScript interfaces for insurance scraper integration

export const InsuranceType = {
  AUTO: 'auto',
  HOME: 'home',
  LIFE: 'life',
  HEALTH: 'health',
  BUSINESS: 'business'
} as const;

export type InsuranceType = typeof InsuranceType[keyof typeof InsuranceType];

export const ScrapingStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export type ScrapingStatus = typeof ScrapingStatus[keyof typeof ScrapingStatus];

export interface CoverageOption {
  name: string;
  value: string;
  included: boolean;
  additionalCost?: number;
}

export interface InsuranceQuote {
  id: string;
  provider: string;
  insuranceType: InsuranceType;
  basePrice: number;
  totalPrice: number;
  currency: string;
  billingPeriod: string;
  coverageOptions: CoverageOption[];
  deductible?: number;
  coverageLimit?: number;
  timestamp: string;
  url?: string;
  metadata: Record<string, any>;
}

export interface ScraperConfig {
  provider: string;
  baseUrl: string;
  insuranceTypes: InsuranceType[];
  requiresJavaScript: boolean;
  rateLimitCalls: number;
  rateLimitPeriod: number;
  selectors: {
    containers?: string[];
    prices?: string[];
    coverage?: string[];
    urlTemplate?: string;
  };
  headers?: Record<string, string>;
}

export interface ScrapingResult {
  provider: string;
  quotes: InsuranceQuote[];
  status: ScrapingStatus;
  error?: string;
  scrapedAt: string;
}

export interface CompetitiveAnalysis {
  totalQuotes: number;
  averagePrice: number;
  lowestPrice: {
    provider: string;
    price: number;
  };
  highestPrice: {
    provider: string;
    price: number;
  };
  priceRange: number;
  marketPosition: 'competitive' | 'premium' | 'budget';
  savings?: number;
}

export interface ExportOptions {
  format: 'json' | 'csv' | 'excel';
  includeMetadata: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ScrapingSession {
  id: string;
  insuranceType: InsuranceType;
  results: ScrapingResult[];
  analysis: CompetitiveAnalysis;
  startedAt: string;
  completedAt?: string;
  status: ScrapingStatus;
}