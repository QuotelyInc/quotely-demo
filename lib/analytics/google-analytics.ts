/**
 * Google Analytics Integration for Quotely
 * Tracks user interactions, conversions, and provides access reporting
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class GoogleAnalytics {
  private static instance: GoogleAnalytics;
  private propertyId: string;
  private initialized: boolean = false;

  constructor(propertyId: string) {
    this.propertyId = propertyId;
  }

  static getInstance(propertyId?: string): GoogleAnalytics {
    if (!GoogleAnalytics.instance && propertyId) {
      GoogleAnalytics.instance = new GoogleAnalytics(propertyId);
    }
    return GoogleAnalytics.instance;
  }

  /**
   * Initialize Google Analytics with gtag.js
   */
  async initialize(): Promise<void> {
    if (this.initialized || typeof window === 'undefined') return;

    // Add gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.propertyId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', this.propertyId, {
      page_path: window.location.pathname,
      cookie_flags: 'secure;samesite=strict'
    });

    this.initialized = true;
  }

  /**
   * Track page views
   */
  trackPageView(path?: string, title?: string): void {
    if (!this.initialized) return;
    
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.initialized) return;
    
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track quote generation events
   */
  trackQuoteGeneration(quoteData: {
    quoteId: string;
    carrier?: string;
    quoteTime?: number;
    quoteAmount?: number;
    lineOfBusiness?: string;
  }): void {
    this.trackEvent('generate_quote', {
      quote_id: quoteData.quoteId,
      carrier: quoteData.carrier,
      quote_time_seconds: quoteData.quoteTime,
      quote_amount: quoteData.quoteAmount,
      line_of_business: quoteData.lineOfBusiness,
      event_category: 'engagement',
      event_label: 'quote_generation'
    });
  }

  /**
   * Track conversions (sign-ups, purchases)
   */
  trackConversion(type: 'signup' | 'purchase' | 'demo_request', value?: number): void {
    this.trackEvent('conversion', {
      conversion_type: type,
      value: value,
      currency: 'USD',
      event_category: 'conversion',
      event_label: type
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, label?: string, value?: number): void {
    this.trackEvent('engagement', {
      engagement_action: action,
      engagement_label: label,
      engagement_value: value,
      event_category: 'engagement',
      event_label: action
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(feature: string, action: string): void {
    this.trackEvent('feature_usage', {
      feature_name: feature,
      feature_action: action,
      event_category: 'features',
      event_label: `${feature}_${action}`
    });
  }

  /**
   * Track API performance
   */
  trackApiPerformance(endpoint: string, duration: number, success: boolean): void {
    this.trackEvent('api_performance', {
      api_endpoint: endpoint,
      response_time_ms: duration,
      api_success: success,
      event_category: 'performance',
      event_label: endpoint
    });
  }

  /**
   * Set user properties for better segmentation
   */
  setUserProperties(properties: {
    userId?: string;
    agencySize?: string;
    plan?: string;
    accountType?: string;
  }): void {
    if (!this.initialized) return;
    
    window.gtag('set', 'user_properties', properties);
  }

  /**
   * Track timing events
   */
  trackTiming(category: string, variable: string, value: number, label?: string): void {
    this.trackEvent('timing_complete', {
      name: variable,
      value: Math.round(value),
      event_category: category,
      event_label: label
    });
  }
}

/**
 * React Hook for Google Analytics
 */
export function useGoogleAnalytics() {
  const ga = GoogleAnalytics.getInstance(process.env.NEXT_PUBLIC_GA_PROPERTY_ID!);
  
  return {
    trackPageView: ga.trackPageView.bind(ga),
    trackEvent: ga.trackEvent.bind(ga),
    trackQuoteGeneration: ga.trackQuoteGeneration.bind(ga),
    trackConversion: ga.trackConversion.bind(ga),
    trackEngagement: ga.trackEngagement.bind(ga),
    trackFeatureUsage: ga.trackFeatureUsage.bind(ga),
    trackApiPerformance: ga.trackApiPerformance.bind(ga),
    setUserProperties: ga.setUserProperties.bind(ga),
    trackTiming: ga.trackTiming.bind(ga)
  };
}

export default GoogleAnalytics;