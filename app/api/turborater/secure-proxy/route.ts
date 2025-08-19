import { NextRequest, NextResponse } from 'next/server'

/**
 * Secure TurboRater Proxy
 * SECURITY: This proxy adds the API key server-side
 * The frontend never sees or handles the API key
 */

// Get API credentials from environment variables (server-side only)
const TURBORATER_API_URL = process.env.TURBORATER_API_URL || 'https://api.turborater.com'
const TURBORATER_API_KEY = process.env.TURBORATER_API_KEY

// Allowed endpoints (whitelist for security)
const ALLOWED_ENDPOINTS = [
  '/quotes/generate',
  '/quotes/retrieve',
  '/rates/carriers',
  '/carriers/list',
  '/vehicles/decode',
  '/drivers/validate',
  '/coverage/options',
  '/discounts/available'
]

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!TURBORATER_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'TurboRater API key not configured',
          message: 'Please set TURBORATER_API_KEY in environment variables'
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { endpoint, data } = body

    // Validate endpoint is allowed (security measure)
    if (!endpoint || !ALLOWED_ENDPOINTS.includes(endpoint)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid or unauthorized endpoint',
          message: `Endpoint ${endpoint} is not allowed`
        },
        { status: 403 }
      )
    }

    // Log the request (without sensitive data)
    console.log(`[TurboRater Proxy] Calling ${endpoint}`)

    // Make the actual API call with the API key
    const apiResponse = await fetch(`${TURBORATER_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // SECURITY: API key is added here server-side only
        'Authorization': `Bearer ${TURBORATER_API_KEY}`,
        'X-API-Key': TURBORATER_API_KEY,
        // Add any other required headers
        'User-Agent': 'Quotely-TurboRater-Integration/1.0'
      },
      body: JSON.stringify(data)
    })

    // Parse the response
    const responseData = await apiResponse.json()

    // Check for API errors
    if (!apiResponse.ok) {
      console.error(`[TurboRater Proxy] API error:`, apiResponse.status, responseData)
      return NextResponse.json(
        { 
          success: false,
          error: 'TurboRater API error',
          message: responseData.message || 'API request failed',
          status: apiResponse.status
        },
        { status: apiResponse.status }
      )
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('[TurboRater Proxy] Error:', error)
    
    // Never expose internal errors to the client
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal proxy error',
        message: 'Failed to process request'
      },
      { status: 500 }
    )
  }
}

// GET endpoint for health checks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Only allow health check via GET
    if (action !== 'health') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid action',
          message: 'Only health checks are allowed via GET'
        },
        { status: 405 }
      )
    }

    // Check if API is configured
    const isConfigured = !!TURBORATER_API_KEY
    
    // Try to ping the actual API if configured
    if (isConfigured) {
      try {
        const apiResponse = await fetch(`${TURBORATER_API_URL}/health`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TURBORATER_API_KEY}`,
            'X-API-Key': TURBORATER_API_KEY
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        })

        return NextResponse.json({
          success: true,
          status: 'connected',
          apiConfigured: true,
          apiReachable: apiResponse.ok,
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        return NextResponse.json({
          success: true,
          status: 'configured',
          apiConfigured: true,
          apiReachable: false,
          message: 'API configured but not reachable',
          timestamp: new Date().toISOString()
        })
      }
    }

    return NextResponse.json({
      success: true,
      status: 'not_configured',
      apiConfigured: false,
      apiReachable: false,
      message: 'API key not configured',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('[TurboRater Proxy] Health check error:', error)
    return NextResponse.json(
      { 
        success: false,
        status: 'error',
        error: 'Health check failed'
      },
      { status: 500 }
    )
  }
}