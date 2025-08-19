/**
 * SECURE TurboRater API Usage Example
 * This example demonstrates the secure way to integrate with TurboRater API
 * without exposing API keys to the frontend
 */

import React, { useState, useEffect } from 'react'
import { turboRaterConfig } from '@/lib/config/turborater-config'

// ❌ NEVER DO THIS - Security Vulnerability
const INSECURE_EXAMPLE = () => {
  // NEVER store API keys in frontend code
  const API_KEY = 'your-api-key-here' // ❌ SECURITY VULNERABILITY
  
  // NEVER fetch API keys from config endpoint
  fetch('/api/config')
    .then(res => res.json())
    .then(config => {
      // ❌ NEVER DO THIS - API keys should never be in frontend
      const apiKey = config.turboraterKey // This should not exist
      
      // ❌ NEVER make direct API calls with keys from frontend
      fetch('https://api.turborater.com/quotes', {
        headers: {
          'Authorization': `Bearer ${apiKey}` // ❌ EXPOSED API KEY
        }
      })
    })
}

// ✅ SECURE EXAMPLE - The correct way
export const SecureTurboRaterComponent = () => {
  const [isConfigured, setIsConfigured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize configuration (no API keys involved)
    turboRaterConfig.initialize().then(config => {
      setIsConfigured(config.hasApiKey)
      console.log('TurboRater configured:', config.hasApiKey)
      console.log('API endpoint:', config.apiEndpoint)
      // Note: config.apiKey does not exist - this is intentional for security
    }).catch(err => {
      console.error('Failed to initialize:', err)
      setError('Failed to load configuration')
    })
  }, [])

  const generateQuote = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // ✅ SECURE: API call goes through our backend proxy
      // The backend adds the API key server-side
      const response = await fetch('/api/turborater/secure-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: '/quotes/generate',
          data: {
            // Quote data - no API key needed here
            drivers: [
              {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '1980-01-01',
                licenseNumber: 'D123456789'
              }
            ],
            vehicles: [
              {
                year: 2020,
                make: 'Toyota',
                model: 'Camry',
                vin: '1HGCM82633A123456'
              }
            ],
            coverage: {
              liability: '100/300/100',
              collision: 500,
              comprehensive: 500
            }
          }
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate quote')
      }

      const result = await response.json()
      setQuote(result.data)
      
    } catch (err) {
      console.error('Quote generation failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate quote')
    } finally {
      setLoading(false)
    }
  }

  // Alternative: Using the config service helper
  const generateQuoteWithHelper = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // ✅ SECURE: Using the helper method
      const quoteData = await turboRaterConfig.generateQuote({
        drivers: [/* driver data */],
        vehicles: [/* vehicle data */],
        coverage: {/* coverage options */}
      })
      
      setQuote(quoteData)
      
    } catch (err) {
      console.error('Quote generation failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate quote')
    } finally {
      setLoading(false)
    }
  }

  const checkApiHealth = async () => {
    try {
      // ✅ SECURE: Health check through proxy
      const response = await fetch('/api/turborater/secure-proxy?action=health')
      const health = await response.json()
      
      console.log('API Health:', health)
      return health
    } catch (err) {
      console.error('Health check failed:', err)
      return null
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Secure TurboRater Integration</h2>
      
      {/* Configuration Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Configuration Status</h3>
        <p className="text-sm">
          API Configured: {' '}
          <span className={isConfigured ? 'text-green-600' : 'text-red-600'}>
            {isConfigured ? '✅ Yes' : '❌ No'}
          </span>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Note: API key is stored securely server-side only
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-4">
        <button
          onClick={generateQuote}
          disabled={!isConfigured || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Quote (Secure)'}
        </button>

        <button
          onClick={checkApiHealth}
          className="px-4 py-2 bg-green-600 text-white rounded-lg ml-4"
        >
          Check API Health
        </button>
      </div>

      {/* Quote Display */}
      {quote && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2">Generated Quote</h3>
          <pre className="text-sm">{JSON.stringify(quote, null, 2)}</pre>
        </div>
      )}

      {/* Security Notes */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">🔐 Security Notes</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• API keys are never sent to or stored in the browser</li>
          <li>• All API calls go through our secure backend proxy</li>
          <li>• The backend adds authentication headers server-side</li>
          <li>• Frontend only receives non-sensitive configuration data</li>
          <li>• API endpoints are whitelisted for additional security</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * SECURITY BEST PRACTICES SUMMARY:
 * 
 * ✅ DO:
 * - Store API keys in environment variables (server-side only)
 * - Use backend proxy endpoints for all API calls
 * - Add authentication headers server-side
 * - Validate and whitelist allowed endpoints
 * - Return only non-sensitive data to frontend
 * 
 * ❌ DON'T:
 * - Never put API keys in frontend code
 * - Never send API keys to the browser
 * - Never make direct API calls from frontend with keys
 * - Never store keys in localStorage or cookies
 * - Never include keys in client-side configuration
 */