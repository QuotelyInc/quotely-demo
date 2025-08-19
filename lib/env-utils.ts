/**
 * Environment Variable Utility Functions
 */

/**
 * Type guard to check if a variable is defined
 */
export function isEnvVarDefined(key: keyof NodeJS.ProcessEnv): boolean {
  return process.env[key] !== undefined && process.env[key] !== '';
}

/**
 * Get environment variable with type safety
 */
export function getEnvVar<K extends keyof NodeJS.ProcessEnv>(
  key: K,
  defaultValue?: string
): string {
  return process.env[key] || defaultValue || '';
}

/**
 * Get required environment variable (throws if missing)
 */
export function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Type guard to check if all required variables are defined
 */
export function hasRequiredEnvVars(): boolean {
  const required = [
    'TURBO_RATER_API_KEY',
    'GAIL_API_KEY',
    'MOMENTUM_API_KEY',
    'NEXT_PUBLIC_GA_PROPERTY_ID',
    'NEXT_PUBLIC_OTTO_UUID'
  ];
  
  return required.every(key => isEnvVarDefined(key as keyof NodeJS.ProcessEnv));
}