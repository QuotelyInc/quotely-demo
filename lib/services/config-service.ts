// Configuration Service for TurboRater Integration
// This service handles secure configuration management

interface TurboRaterConfig {
  apiUrl: string
  hasApiKey: boolean
  environment: string
  features: {
    liveQuotes: boolean
    aiRecommendations: boolean
    carrierIntegration: boolean
    realtimeSync: boolean
  }
}

interface ConnectionTestResult {
  status: 'connected' | 'disconnected' | 'error'
  latency?: number
  timestamp: string
  error?: string
}

class ConfigService {
  private static instance: ConfigService
  private config: TurboRaterConfig | null = null
  private configFetchPromise: Promise<TurboRaterConfig> | null = null

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  /**
   * Fetch configuration from the API
   * Uses caching to avoid repeated API calls
   */
  async getConfig(): Promise<TurboRaterConfig> {
    // Return cached config if available
    if (this.config) {
      return this.config
    }

    // If already fetching, return the existing promise
    if (this.configFetchPromise) {
      return this.configFetchPromise
    }

    // Start new fetch
    this.configFetchPromise = this.fetchConfig()
    
    try {
      this.config = await this.configFetchPromise
      return this.config
    } finally {
      this.configFetchPromise = null
    }
  }

  /**
   * Force refresh the configuration
   */
  async refreshConfig(): Promise<TurboRaterConfig> {
    this.config = null
    this.configFetchPromise = null
    return this.getConfig()
  }

  /**
   * Test the TurboRater API connection
   */
  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'test-connection' }),
      })

      if (!response.ok) {
        const error = await response.json()
        return {
          status: 'error',
          timestamp: new Date().toISOString(),
          error: error.error || 'Connection test failed',
        }
      }

      const result = await response.json()
      return {
        status: result.status === 'connected' ? 'connected' : 'disconnected',
        latency: result.latency,
        timestamp: result.timestamp,
      }
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Validate configuration
   */
  async validateConfig(): Promise<{ valid: boolean; message: string }> {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'validate' }),
      })

      if (!response.ok) {
        return {
          valid: false,
          message: 'Configuration validation failed',
        }
      }

      const result = await response.json()
      return {
        valid: result.valid,
        message: result.valid 
          ? 'Configuration is valid' 
          : 'API key not configured',
      }
    } catch (error) {
      return {
        valid: false,
        message: error instanceof Error ? error.message : 'Validation error',
      }
    }
  }

  /**
   * Get feature availability
   */
  async getFeatures(): Promise<TurboRaterConfig['features']> {
    const config = await this.getConfig()
    return config.features
  }

  /**
   * Check if a specific feature is enabled
   */
  async isFeatureEnabled(feature: keyof TurboRaterConfig['features']): Promise<boolean> {
    const features = await this.getFeatures()
    return features[feature]
  }

  /**
   * Private method to fetch configuration
   */
  private async fetchConfig(): Promise<TurboRaterConfig> {
    try {
      const response = await fetch('/api/config')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        apiUrl: data.turboraterUrl || '',
        hasApiKey: data.hasApiKey || false,
        environment: data.environment || 'production',
        features: data.features || {
          liveQuotes: false,
          aiRecommendations: false,
          carrierIntegration: false,
          realtimeSync: false,
        },
      }
    } catch (error) {
      console.error('Failed to fetch configuration:', error)
      
      // Return default config on error
      return {
        apiUrl: '',
        hasApiKey: false,
        environment: 'production',
        features: {
          liveQuotes: false,
          aiRecommendations: false,
          carrierIntegration: false,
          realtimeSync: false,
        },
      }
    }
  }

  /**
   * Clear cached configuration
   */
  clearCache(): void {
    this.config = null
    this.configFetchPromise = null
  }
}

// Export singleton instance
export const configService = ConfigService.getInstance()

// Export types
export type { TurboRaterConfig, ConnectionTestResult }