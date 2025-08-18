/**
 * TurboRater Frontend Configuration
 * SECURITY: This file should NEVER contain API keys or secrets
 * All sensitive operations must go through server-side API routes
 */

interface TurboRaterConfig {
  apiEndpoint: string
  hasApiKey: boolean
  features: {
    liveQuotes: boolean
    aiRecommendations: boolean
    carrierIntegration: boolean
    realtimeSync: boolean
  }
}

class TurboRaterConfigManager {
  private config: TurboRaterConfig | null = null
  private configPromise: Promise<TurboRaterConfig> | null = null

  /**
   * Initialize configuration from the server
   * SECURITY: Never receives or stores API keys
   */
  async initialize(): Promise<TurboRaterConfig> {
    if (this.config) {
      return this.config
    }

    if (this.configPromise) {
      return this.configPromise
    }

    this.configPromise = fetch('/api/config')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load configuration')
        }
        return res.json()
      })
      .then(data => {
        this.config = {
          apiEndpoint: data.turboraterUrl,
          hasApiKey: data.hasApiKey,
          features: data.features
        }
        
        // SECURITY WARNING: Never store API keys in frontend config
        // The following would be a security vulnerability:
        // this.config.apiKey = data.turboraterKey // ❌ NEVER DO THIS
        
        return this.config
      })
      .catch(error => {
        console.error('Failed to load TurboRater configuration:', error)
        // Return default config on error
        this.config = {
          apiEndpoint: '',
          hasApiKey: false,
          features: {
            liveQuotes: false,
            aiRecommendations: false,
            carrierIntegration: false,
            realtimeSync: false
          }
        }
        return this.config
      })
      .finally(() => {
        this.configPromise = null
      })

    return this.configPromise
  }

  /**
   * Get current configuration
   */
  getConfig(): TurboRaterConfig | null {
    return this.config
  }

  /**
   * Check if the API is configured
   */
  isConfigured(): boolean {
    return this.config?.hasApiKey ?? false
  }

  /**
   * Make a secure API call through the server-side proxy
   * SECURITY: All API calls go through our backend which adds the API key
   */
  async makeApiCall(endpoint: string, data: any): Promise<any> {
    if (!this.config) {
      await this.initialize()
    }

    if (!this.isConfigured()) {
      throw new Error('TurboRater API is not configured')
    }

    // SECURITY: API calls go through our proxy, not directly to TurboRater
    // The server-side proxy adds the API key
    const response = await fetch('/api/turborater/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint,
        data
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'API call failed')
    }

    return response.json()
  }

  /**
   * Generate a quote through the secure proxy
   */
  async generateQuote(quoteData: any): Promise<any> {
    return this.makeApiCall('/quotes/generate', quoteData)
  }

  /**
   * Get carrier rates through the secure proxy
   */
  async getCarrierRates(rateData: any): Promise<any> {
    return this.makeApiCall('/rates/carriers', rateData)
  }
}

// Export singleton instance
export const turboRaterConfig = new TurboRaterConfigManager()

// Export type
export type { TurboRaterConfig }

/**
 * Example usage in a React component:
 * 
 * import { turboRaterConfig } from '@/lib/config/turborater-config'
 * 
 * // In your component
 * useEffect(() => {
 *   turboRaterConfig.initialize().then(config => {
 *     console.log('TurboRater configured:', config.hasApiKey)
 *     // Never try to access config.apiKey - it doesn't exist for security
 *   })
 * }, [])
 * 
 * // To make API calls
 * const handleGenerateQuote = async () => {
 *   try {
 *     const quote = await turboRaterConfig.generateQuote({
 *       // quote data
 *     })
 *     console.log('Quote generated:', quote)
 *   } catch (error) {
 *     console.error('Failed to generate quote:', error)
 *   }
 * }
 */