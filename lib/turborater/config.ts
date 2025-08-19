/**
 * TurboRater Configuration Service
 * Manages TurboRater API credentials and environment switching
 */

import { isProduction, isDevelopment } from '../env-validator';

export interface TurboRaterConfig {
  accountId: string;
  accountNumber: string;
  agencyId: string;
  accessId: string;
  accountName: string;
  apiKey?: string;
  environment: 'test' | 'live';
}

export class TurboRaterConfigService {
  private static instance: TurboRaterConfigService;
  private config: TurboRaterConfig | null = null;

  private constructor() {}

  static getInstance(): TurboRaterConfigService {
    if (!TurboRaterConfigService.instance) {
      TurboRaterConfigService.instance = new TurboRaterConfigService();
    }
    return TurboRaterConfigService.instance;
  }

  /**
   * Get the current TurboRater configuration
   */
  getConfig(): TurboRaterConfig {
    if (this.config) {
      return this.config;
    }

    const environment = this.determineEnvironment();
    this.config = this.loadConfiguration(environment);
    return this.config;
  }

  /**
   * Determine which environment to use
   */
  private determineEnvironment(): 'test' | 'live' {
    // Use LIVE in production, TEST in development
    if (isProduction()) {
      return 'live';
    }
    
    // Allow override via environment variable
    if (process.env.TURBO_RATER_ENV === 'live') {
      return 'live';
    }
    
    return 'test';
  }

  /**
   * Load configuration for the specified environment
   */
  private loadConfiguration(environment: 'test' | 'live'): TurboRaterConfig {
    if (environment === 'live') {
      return {
        accountId: process.env.TURBO_RATER_LIVE_ACCOUNT_ID || '',
        accountNumber: process.env.TURBO_RATER_LIVE_ACCOUNT_NUMBER || '',
        agencyId: process.env.TURBO_RATER_LIVE_AGENCY_ID || '',
        accessId: process.env.TURBO_RATER_LIVE_ACCESS_ID || '',
        accountName: process.env.TURBO_RATER_ACCOUNT_NAME || 'Quotely',
        apiKey: process.env.TURBO_RATER_API_KEY,
        environment: 'live'
      };
    }

    // Default to test environment
    return {
      accountId: process.env.TURBO_RATER_TEST_ACCOUNT_ID || '',
      accountNumber: process.env.TURBO_RATER_TEST_ACCOUNT_NUMBER || '',
      agencyId: process.env.TURBO_RATER_TEST_AGENCY_ID || '',
      accessId: process.env.TURBO_RATER_TEST_ACCESS_ID || '',
      accountName: process.env.TURBO_RATER_ACCOUNT_NAME || 'Quotely',
      apiKey: process.env.TURBO_RATER_API_KEY,
      environment: 'test'
    };
  }

  /**
   * Validate that all required configuration is present
   */
  validateConfig(): { isValid: boolean; errors: string[] } {
    const config = this.getConfig();
    const errors: string[] = [];

    if (!config.accountId) {
      errors.push(`Missing TURBO_RATER_${config.environment.toUpperCase()}_ACCOUNT_ID`);
    }
    if (!config.accountNumber) {
      errors.push(`Missing TURBO_RATER_${config.environment.toUpperCase()}_ACCOUNT_NUMBER`);
    }
    if (!config.agencyId) {
      errors.push(`Missing TURBO_RATER_${config.environment.toUpperCase()}_AGENCY_ID`);
    }
    if (!config.accessId) {
      errors.push(`Missing TURBO_RATER_${config.environment.toUpperCase()}_ACCESS_ID`);
    }

    // Validate UUIDs format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (config.accountId && !uuidRegex.test(config.accountId)) {
      errors.push('Invalid ACCOUNT_ID format (should be UUID)');
    }
    if (config.accountNumber && !uuidRegex.test(config.accountNumber)) {
      errors.push('Invalid ACCOUNT_NUMBER format (should be UUID)');
    }
    if (config.agencyId && !uuidRegex.test(config.agencyId)) {
      errors.push('Invalid AGENCY_ID format (should be UUID)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get API endpoint for current environment
   */
  getApiEndpoint(): string {
    const config = this.getConfig();
    
    if (config.environment === 'live') {
      return 'https://api.turborater.com/v2';
    }
    
    return 'https://test-api.turborater.com/v2';
  }

  /**
   * Get headers for API requests
   */
  getApiHeaders(): Record<string, string> {
    const config = this.getConfig();
    
    return {
      'Content-Type': 'application/json',
      'X-Account-ID': config.accountId,
      'X-Account-Number': config.accountNumber,
      'X-Agency-ID': config.agencyId,
      'X-Access-ID': config.accessId,
      'X-Account-Name': config.accountName,
      ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
    };
  }

  /**
   * Switch to a different environment (useful for testing)
   */
  switchEnvironment(environment: 'test' | 'live'): void {
    this.config = this.loadConfiguration(environment);
  }

  /**
   * Get a summary of the current configuration (safe for logging)
   */
  getSummary(): object {
    const config = this.getConfig();
    
    return {
      environment: config.environment,
      accountName: config.accountName,
      accessId: config.accessId,
      hasApiKey: !!config.apiKey,
      endpoint: this.getApiEndpoint(),
      accountIdPrefix: config.accountId.substring(0, 8) + '...',
      isValid: this.validateConfig().isValid
    };
  }
}

// Singleton instance
export const turboRaterConfig = TurboRaterConfigService.getInstance();

/**
 * Quick access functions
 */
export function getTurboRaterConfig(): TurboRaterConfig {
  return turboRaterConfig.getConfig();
}

export function getTurboRaterHeaders(): Record<string, string> {
  return turboRaterConfig.getApiHeaders();
}

export function getTurboRaterEndpoint(): string {
  return turboRaterConfig.getApiEndpoint();
}

export function validateTurboRaterConfig(): { isValid: boolean; errors: string[] } {
  return turboRaterConfig.validateConfig();
}