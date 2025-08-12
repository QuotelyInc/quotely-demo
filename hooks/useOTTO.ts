'use client'

import { useEffect, useState } from 'react'
import { OTTO_CONFIG } from '@/lib/otto'

interface OTTOStatus {
  isLoaded: boolean
  isReady: boolean
  hasError: boolean
  errorMessage?: string
}

export const useOTTO = () => {
  const [status, setStatus] = useState<OTTOStatus>({
    isLoaded: false,
    isReady: false,
    hasError: false
  })

  useEffect(() => {
    if (OTTO_CONFIG.enabled && typeof window !== 'undefined') {
      let retryCount = 0
      const maxRetries = 3
      
      const loadOTTO = () => {
        // Check if script is already loaded
        const existingLoader = document.getElementById('sa-dynamic-optimization-loader')
        const existingScript = document.getElementById('sa-dynamic-optimization')
        
        if (existingLoader || existingScript) {
          console.log('OTTO script already present, checking status...')
          checkOTTOReady()
          return
        }

        console.log(`Loading OTTO script (attempt ${retryCount + 1}/${maxRetries})...`)
        
        // Create the script element
        const script = document.createElement('script')
        script.id = 'sa-dynamic-optimization'
        script.setAttribute('nowprocket', '')
        script.setAttribute('nitro-exclude', '')
        script.src = OTTO_CONFIG.scriptUrl
        script.dataset.uuid = OTTO_CONFIG.uuid
        script.async = true
        
        // Add load event listener
        script.onload = () => {
          console.log('✅ OTTO SEO script loaded successfully')
          setStatus(prev => ({ ...prev, isLoaded: true }))
          
          // Dispatch custom event when OTTO is ready
          window.dispatchEvent(new CustomEvent('otto-ready'))
          
          // Check if SearchAtlas object is available
          checkOTTOReady()
        }
        
        script.onerror = (error) => {
          console.error('❌ Failed to load OTTO SEO script:', error)
          retryCount++
          
          if (retryCount < maxRetries) {
            console.log(`Retrying OTTO script load in 2 seconds...`)
            setTimeout(loadOTTO, 2000)
          } else {
            setStatus({
              isLoaded: false,
              isReady: false,
              hasError: true,
              errorMessage: 'Failed to load OTTO script after multiple attempts'
            })
          }
        }
        
        document.head.appendChild(script)
      }
      
      const checkOTTOReady = () => {
        let checkCount = 0
        const maxChecks = 10
        
        const checkInterval = setInterval(() => {
          if (typeof (window as any).searchAtlas !== 'undefined') {
            console.log('✅ SearchAtlas object is ready')
            setStatus({
              isLoaded: true,
              isReady: true,
              hasError: false
            })
            clearInterval(checkInterval)
          } else {
            checkCount++
            if (checkCount >= maxChecks) {
              console.log('⚠️ SearchAtlas object not available after waiting')
              setStatus(prev => ({ ...prev, isReady: false }))
              clearInterval(checkInterval)
            }
          }
        }, 500)
      }
      
      // Start loading process
      loadOTTO()
      
      // Cleanup function
      return () => {
        const script = document.getElementById('sa-dynamic-optimization')
        if (script && script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])
  
  return {
    isEnabled: OTTO_CONFIG.enabled,
    uuid: OTTO_CONFIG.uuid,
    status,
    verify: () => {
      if (typeof window !== 'undefined' && (window as any).debugOTTO) {
        return (window as any).debugOTTO()
      }
      return null
    }
  }
}