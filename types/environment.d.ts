/**
 * Environment Variable Type Definitions
 * This file provides TypeScript support for all environment variables
 * used in the Quotely platform.
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Node Environment
      NODE_ENV: 'development' | 'production' | 'test';
      
      // AI Service API Keys (Server-side only)
      CLAUDE_API_KEY?: string;
      OPENAI_API_KEY?: string;
      GROK_API_KEY?: string;
      
      // Insurance Quote API Keys (Server-side only)
      TURBO_RATER_API_KEY?: string;
      GAIL_API_KEY?: string;
      MOMENTUM_API_KEY?: string;
      
      // TurboRater Account Configuration - TEST
      TURBO_RATER_TEST_ACCOUNT_ID?: string;
      TURBO_RATER_TEST_ACCOUNT_NUMBER?: string;
      TURBO_RATER_TEST_AGENCY_ID?: string;
      TURBO_RATER_TEST_ACCESS_ID?: string;
      
      // TurboRater Account Configuration - LIVE
      TURBO_RATER_LIVE_ACCOUNT_ID?: string;
      TURBO_RATER_LIVE_ACCOUNT_NUMBER?: string;
      TURBO_RATER_LIVE_AGENCY_ID?: string;
      TURBO_RATER_LIVE_ACCESS_ID?: string;
      TURBO_RATER_ACCOUNT_NAME?: string;
      
      // Google Analytics (Client-safe)
      NEXT_PUBLIC_GA_PROPERTY_ID?: string;
      GOOGLE_ANALYTICS_API_KEY?: string;
      GA_SERVICE_ACCOUNT_EMAIL?: string;
      
      // OTTO SEO Tracking (Client-safe)
      NEXT_PUBLIC_OTTO_UUID?: string;
      NEXT_PUBLIC_OTTO_ENABLED?: string;
      NEXT_PUBLIC_OTTO_API_KEY?: string;
      
      // Application Configuration (Client-safe)
      NEXT_PUBLIC_SITE_URL?: string;
      NEXT_PUBLIC_API_URL?: string;
      NEXT_PUBLIC_APP_NAME?: string;
      NEXT_PUBLIC_APP_VERSION?: string;
      
      // Database URLs (Server-side only)
      DATABASE_URL?: string;
      REDIS_URL?: string;
      MONGODB_URI?: string;
      
      // Authentication (Server-side only)
      AUTH_SECRET?: string;
      NEXTAUTH_URL?: string;
      NEXTAUTH_SECRET?: string;
      JWT_SECRET?: string;
      
      // Email Service (Server-side only)
      SENDGRID_API_KEY?: string;
      EMAIL_FROM?: string;
      EMAIL_REPLY_TO?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
      
      // Payment Processing (Server-side only)
      STRIPE_SECRET_KEY?: string;
      STRIPE_WEBHOOK_SECRET?: string;
      STRIPE_PUBLISHABLE_KEY?: string;
      
      // Cloud Storage (Server-side only)
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_REGION?: string;
      S3_BUCKET?: string;
      
      // Monitoring & Logging (Server-side only)
      SENTRY_DSN?: string;
      SENTRY_AUTH_TOKEN?: string;
      DATADOG_API_KEY?: string;
      NEW_RELIC_LICENSE_KEY?: string;
      
      // Feature Flags (Client-safe)
      NEXT_PUBLIC_FEATURE_AI_QUOTES?: string;
      NEXT_PUBLIC_FEATURE_TURBO_RATER?: string;
      NEXT_PUBLIC_FEATURE_ANALYTICS?: string;
      NEXT_PUBLIC_MAINTENANCE_MODE?: string;
      
      // Testing
      RUN_INTEGRATION_TESTS?: string;
      TEST_API_KEY?: string;
      CI?: string;
      
      // Deployment
      VERCEL?: string;
      VERCEL_ENV?: 'production' | 'preview' | 'development';
      VERCEL_URL?: string;
      VERCEL_GIT_COMMIT_SHA?: string;
      VERCEL_GIT_COMMIT_MESSAGE?: string;
      VERCEL_GIT_COMMIT_AUTHOR_NAME?: string;
    }
  }
}

/**
 * Helper type for required environment variables
 */
export type RequiredEnvVars = {
  // Add required variables here
  TURBO_RATER_API_KEY: string;
  GAIL_API_KEY: string;
  MOMENTUM_API_KEY: string;
  NEXT_PUBLIC_GA_PROPERTY_ID: string;
  NEXT_PUBLIC_OTTO_UUID: string;
};

/**
 * Helper type for optional environment variables
 */
export type OptionalEnvVars = {
  // Add optional variables here
  CLAUDE_API_KEY?: string;
  OPENAI_API_KEY?: string;
  GROK_API_KEY?: string;
  DATABASE_URL?: string;
  REDIS_URL?: string;
};

/**
 * Combined environment configuration type
 */
export type EnvironmentConfig = RequiredEnvVars & OptionalEnvVars;


// Ensure file is treated as a module
export {};