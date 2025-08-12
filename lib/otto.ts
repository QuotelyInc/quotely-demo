// OTTO SEO Configuration
export const OTTO_CONFIG = {
  uuid: process.env.NEXT_PUBLIC_OTTO_UUID || '93fecead-4a44-4a94-8620-c45564441a5b',
  scriptUrl: 'https://dashboard.searchatlas.com/scripts/dynamic_optimization.js',
  enabled: process.env.NEXT_PUBLIC_OTTO_ENABLED !== 'false'
}

// Type declarations for window.searchAtlas
declare global {
  interface Window {
    searchAtlas?: {
      configure: (config: any) => void
      track: (event: string, data?: any) => void
      ready: (callback: () => void) => void
    }
  }
}

// Helper to check if OTTO is ready
export const isOTTOReady = (): boolean => {
  return typeof window !== 'undefined' && !!window.searchAtlas
}

// Wait for OTTO to be ready
export const waitForOTTO = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    if (window.searchAtlas) {
      callback()
    } else {
      // Retry after a short delay
      setTimeout(() => waitForOTTO(callback), 100)
    }
  }
}