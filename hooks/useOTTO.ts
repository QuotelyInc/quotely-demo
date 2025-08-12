'use client'

import { useEffect } from 'react'
import { OTTO_CONFIG } from '@/lib/otto'

export const useOTTO = () => {
  useEffect(() => {
    if (OTTO_CONFIG.enabled && typeof window !== 'undefined') {
      // Check if script is already loaded
      const existingScript = document.getElementById('sa-dynamic-optimization')
      
      if (!existingScript) {
        const script = document.createElement('script')
        script.id = 'sa-dynamic-optimization'
        script.setAttribute('nowprocket', '')
        script.setAttribute('nitro-exclude', '')
        script.src = OTTO_CONFIG.scriptUrl
        script.dataset.uuid = OTTO_CONFIG.uuid
        script.async = true
        
        document.head.appendChild(script)
        
        // Add load event listener
        script.onload = () => {
          console.log('OTTO SEO script loaded successfully')
          
          // Dispatch custom event when OTTO is ready
          window.dispatchEvent(new CustomEvent('otto-ready'))
        }
        
        script.onerror = () => {
          console.error('Failed to load OTTO SEO script')
        }
        
        return () => {
          // Cleanup on unmount if needed
          if (script.parentNode) {
            script.parentNode.removeChild(script)
          }
        }
      }
    }
  }, [])
  
  return {
    isEnabled: OTTO_CONFIG.enabled,
    uuid: OTTO_CONFIG.uuid
  }
}