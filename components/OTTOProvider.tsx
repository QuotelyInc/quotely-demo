'use client'

import { useEffect, createContext, useContext, ReactNode } from 'react'
import { OTTO_CONFIG, waitForOTTO } from '@/lib/otto'

interface OTTOContextType {
  trackQuoteGeneration: (quoteData: any) => void
  trackPolicyCreation: (policyData: any) => void
  trackUserAction: (action: string, data?: any) => void
  trackPageView: (pageName: string, metadata?: any) => void
}

const OTTOContext = createContext<OTTOContextType | null>(null)

export const OTTOProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (OTTO_CONFIG.enabled && typeof window !== 'undefined') {
      // Configure OTTO for insurance industry when ready
      waitForOTTO(() => {
        if (window.searchAtlas) {
          window.searchAtlas.configure({
            apiKey: '0881d3c546ed5294849fa12fcc4436f5',
            industry: 'insurance',
            businessType: 'insurtech',
            targetKeywords: [
              'insurance quotes',
              'auto insurance',
              'commercial insurance',
              'business insurance',
              'insurance agents',
              'insurance platform',
              'policy management',
              'insurance automation',
              'insurance technology'
            ],
            geography: 'United States',
            competitors: [
              'competitor',
              'applied systems',
              'vertafore',
              'nowcerts',
              'hawksoft',
              'agencybloc',
              'nexsure',
              'aim',
              'qqcatalyst'
            ],
            trackingEnabled: true,
            enhancedSEO: true,
            schemaMarkup: true,
            contentOptimization: true
          })
          
          console.log('OTTO SEO configured for Quotely')
        }
      })
    }
  }, [])

  const trackQuoteGeneration = (quoteData: any) => {
    if (typeof window !== 'undefined' && window.searchAtlas) {
      window.searchAtlas.track('quote_generated', {
        quote_type: quoteData.type,
        coverage_amount: quoteData.coverage,
        client_industry: quoteData.industry,
        carrier: quoteData.carrier,
        premium: quoteData.premium,
        timestamp: new Date().toISOString()
      })
    }
  }

  const trackPolicyCreation = (policyData: any) => {
    if (typeof window !== 'undefined' && window.searchAtlas) {
      window.searchAtlas.track('policy_created', {
        policy_type: policyData.type,
        premium_amount: policyData.premium,
        carrier: policyData.carrier,
        effective_date: policyData.effectiveDate,
        timestamp: new Date().toISOString()
      })
    }
  }

  const trackUserAction = (action: string, data?: any) => {
    if (typeof window !== 'undefined' && window.searchAtlas) {
      window.searchAtlas.track(action, {
        ...data,
        timestamp: new Date().toISOString()
      })
    }
  }

  const trackPageView = (pageName: string, metadata?: any) => {
    if (typeof window !== 'undefined' && window.searchAtlas) {
      window.searchAtlas.track('page_view', {
        page: pageName,
        ...metadata,
        timestamp: new Date().toISOString()
      })
    }
  }

  return (
    <OTTOContext.Provider 
      value={{ 
        trackQuoteGeneration, 
        trackPolicyCreation, 
        trackUserAction,
        trackPageView 
      }}
    >
      {children}
    </OTTOContext.Provider>
  )
}

export const useOTTOTracking = () => {
  const context = useContext(OTTOContext)
  if (!context) {
    // Return no-op functions if context is not available
    return {
      trackQuoteGeneration: () => {},
      trackPolicyCreation: () => {},
      trackUserAction: () => {},
      trackPageView: () => {}
    }
  }
  return context
}