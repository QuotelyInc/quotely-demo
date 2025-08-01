import { useState, useCallback, useRef } from 'react';
import {
  InsuranceType,
  ScrapingResult,
  ScrapingStatus,
  ScrapingSession,
  CompetitiveAnalysis
} from '../types/insurance';
import { InsuranceScraperService } from '../services/insuranceScraper';

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

  const addConfig = useCallback((config: any) => {
    scraperService.addConfig(config);
  }, [scraperService]);

  return {
    getConfigs,
    addConfig,
    configs: getConfigs()
  };
};