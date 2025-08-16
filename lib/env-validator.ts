/**
 * Environment Variable Validator
 * Ensures all required environment variables are properly configured
 */

import { getEnvVar, isEnvVarDefined } from '@/types/environment';

export interface EnvValidationResult {
  isValid: boolean;
  missing: string[];
  warnings: string[];
  info: {
    environment: string;
    isProduction: boolean;
    isVercel: boolean;
    timestamp: string;
  };
}

export class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private validationCache: EnvValidationResult | null = null;

  private constructor() {}

  static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }

  /**
   * Validate all environment variables
   */
  validate(): EnvValidationResult {
    if (this.validationCache) {
      return this.validationCache;
    }

    const missing: string[] = [];
    const warnings: string[] = [];

    // Check required API keys
    const requiredKeys = this.getRequiredKeys();
    requiredKeys.forEach(key => {
      if (!isEnvVarDefined(key as keyof NodeJS.ProcessEnv)) {
        missing.push(key);
      }
    });

    // Check optional but recommended keys
    const recommendedKeys = this.getRecommendedKeys();
    recommendedKeys.forEach(key => {
      if (!isEnvVarDefined(key as keyof NodeJS.ProcessEnv)) {
        warnings.push(`${key} is not configured (optional but recommended)`);
      }
    });

    // Additional validation checks
    this.validateApiKeyFormats();
    this.validateUrls();
    this.validateFeatureFlags();

    const result: EnvValidationResult = {
      isValid: missing.length === 0,
      missing,
      warnings,
      info: {
        environment: process.env.NODE_ENV || 'development',
        isProduction: process.env.NODE_ENV === 'production',
        isVercel: !!process.env.VERCEL,
        timestamp: new Date().toISOString()
      }
    };

    this.validationCache = result;
    return result;
  }

  /**
   * Get list of required environment variables based on context
   */
  private getRequiredKeys(): string[] {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseKeys = [
      'NEXT_PUBLIC_GA_PROPERTY_ID',
      'NEXT_PUBLIC_OTTO_UUID',
      'NEXT_PUBLIC_SITE_URL'
    ];

    if (isProduction) {
      return [
        ...baseKeys,
        'TURBO_RATER_API_KEY',
        'GAIL_API_KEY',
        'MOMENTUM_API_KEY',
        'AUTH_SECRET'
      ];
    }

    return baseKeys;
  }

  /**
   * Get list of recommended environment variables
   */
  private getRecommendedKeys(): string[] {
    return [
      'CLAUDE_API_KEY',
      'OPENAI_API_KEY',
      'DATABASE_URL',
      'SENDGRID_API_KEY',
      'SENTRY_DSN'
    ];
  }

  /**
   * Validate API key formats
   */
  private validateApiKeyFormats(): void {
    // Validate Claude API key format
    const claudeKey = getEnvVar('CLAUDE_API_KEY');
    if (claudeKey && !claudeKey.startsWith('sk-ant-')) {
      this.validationCache?.warnings.push('CLAUDE_API_KEY format appears incorrect');
    }

    // Validate OpenAI API key format
    const openaiKey = getEnvVar('OPENAI_API_KEY');
    if (openaiKey && !openaiKey.startsWith('sk-')) {
      this.validationCache?.warnings.push('OPENAI_API_KEY format appears incorrect');
    }

    // Validate Google Analytics ID format
    const gaId = getEnvVar('NEXT_PUBLIC_GA_PROPERTY_ID');
    if (gaId && !gaId.match(/^G-[A-Z0-9]+$/)) {
      this.validationCache?.warnings.push('GA_PROPERTY_ID format appears incorrect');
    }
  }

  /**
   * Validate URL formats
   */
  private validateUrls(): void {
    const siteUrl = getEnvVar('NEXT_PUBLIC_SITE_URL');
    if (siteUrl && !this.isValidUrl(siteUrl)) {
      this.validationCache?.warnings.push('NEXT_PUBLIC_SITE_URL is not a valid URL');
    }

    const apiUrl = getEnvVar('NEXT_PUBLIC_API_URL');
    if (apiUrl && !this.isValidUrl(apiUrl)) {
      this.validationCache?.warnings.push('NEXT_PUBLIC_API_URL is not a valid URL');
    }
  }

  /**
   * Validate feature flags
   */
  private validateFeatureFlags(): void {
    const booleanFlags = [
      'NEXT_PUBLIC_OTTO_ENABLED',
      'NEXT_PUBLIC_FEATURE_AI_QUOTES',
      'NEXT_PUBLIC_FEATURE_TURBO_RATER',
      'NEXT_PUBLIC_MAINTENANCE_MODE'
    ];

    booleanFlags.forEach(flag => {
      const value = getEnvVar(flag as keyof NodeJS.ProcessEnv);
      if (value && !['true', 'false', '1', '0'].includes(value.toLowerCase())) {
        this.validationCache?.warnings.push(`${flag} should be 'true' or 'false'`);
      }
    });
  }

  /**
   * Check if a string is a valid URL
   */
  private isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear validation cache (useful for testing)
   */
  clearCache(): void {
    this.validationCache = null;
  }

  /**
   * Get a formatted report of the validation results
   */
  getReport(): string {
    const result = this.validate();
    let report = '🔍 Environment Validation Report\n';
    report += '================================\n\n';

    report += `📊 Status: ${result.isValid ? '✅ VALID' : '❌ INVALID'}\n`;
    report += `🌍 Environment: ${result.info.environment}\n`;
    report += `🚀 Production: ${result.info.isProduction ? 'Yes' : 'No'}\n`;
    report += `▲ Vercel: ${result.info.isVercel ? 'Yes' : 'No'}\n`;
    report += `🕐 Timestamp: ${result.info.timestamp}\n\n`;

    if (result.missing.length > 0) {
      report += '❌ Missing Required Variables:\n';
      result.missing.forEach(key => {
        report += `   - ${key}\n`;
      });
      report += '\n';
    }

    if (result.warnings.length > 0) {
      report += '⚠️ Warnings:\n';
      result.warnings.forEach(warning => {
        report += `   - ${warning}\n`;
      });
      report += '\n';
    }

    if (result.isValid && result.warnings.length === 0) {
      report += '✨ All environment variables are properly configured!\n';
    }

    return report;
  }
}

/**
 * Singleton instance for easy access
 */
export const envValidator = EnvironmentValidator.getInstance();

/**
 * Quick validation function
 */
export function validateEnvironment(): EnvValidationResult {
  return envValidator.validate();
}

/**
 * Console log the validation report
 */
export function logEnvironmentReport(): void {
  console.log(envValidator.getReport());
}

/**
 * Throw error if environment is invalid (useful for app startup)
 */
export function requireValidEnvironment(): void {
  const result = validateEnvironment();
  if (!result.isValid) {
    const errorMessage = `
Environment validation failed!
Missing required variables: ${result.missing.join(', ')}

Please ensure all required environment variables are set in your .env.local file.
Run 'npm run env:check' for more details.
    `.trim();
    
    throw new Error(errorMessage);
  }
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

/**
 * Get safe public environment variables for client
 */
export function getPublicEnvVars(): Record<string, string | undefined> {
  const publicVars: Record<string, string | undefined> = {};
  
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      publicVars[key] = process.env[key];
    }
  });
  
  return publicVars;
}