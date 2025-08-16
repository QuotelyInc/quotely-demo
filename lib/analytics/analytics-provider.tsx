'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import GoogleAnalytics from './google-analytics';

interface AnalyticsContextType {
  ga: GoogleAnalytics | null;
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  trackPageView: (path?: string, title?: string) => void;
  trackQuoteGeneration: (data: any) => void;
  trackConversion: (type: 'signup' | 'purchase' | 'demo_request', value?: number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  ga: null,
  trackEvent: () => {},
  trackPageView: () => {},
  trackQuoteGeneration: () => {},
  trackConversion: () => {}
});

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const ga = typeof window !== 'undefined' 
    ? GoogleAnalytics.getInstance(process.env.NEXT_PUBLIC_GA_PROPERTY_ID!)
    : null;

  useEffect(() => {
    if (ga && process.env.NEXT_PUBLIC_GA_PROPERTY_ID) {
      ga.initialize().then(() => {
        // Track initial page view
        ga.trackPageView();
      });
    }
  }, []);

  const contextValue: AnalyticsContextType = {
    ga,
    trackEvent: (eventName, parameters) => ga?.trackEvent(eventName, parameters),
    trackPageView: (path, title) => ga?.trackPageView(path, title),
    trackQuoteGeneration: (data) => ga?.trackQuoteGeneration(data),
    trackConversion: (type, value) => ga?.trackConversion(type, value)
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);