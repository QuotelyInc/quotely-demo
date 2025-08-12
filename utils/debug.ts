// Debug utility for OTTO SEO
export const debugOTTO = () => {
  if (typeof window !== 'undefined') {
    const info = {
      scriptLoaded: !!document.getElementById('sa-dynamic-optimization'),
      searchAtlasAvailable: !!window.searchAtlas,
      uuid: '93fecead-4a44-4a94-8620-c45564441a5b',
      environment: process.env.NODE_ENV,
      ottEnabled: process.env.NEXT_PUBLIC_OTTO_ENABLED,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      timestamp: new Date().toISOString()
    }
    
    console.log('OTTO Debug Info:', info)
    return info
  }
  return null
}

// Add to window for browser console access
if (typeof window !== 'undefined') {
  (window as any).debugOTTO = debugOTTO
}