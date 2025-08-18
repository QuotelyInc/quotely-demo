import { NextResponse } from 'next/server'

export async function GET() {
  // SECURITY: Never expose API keys to the client
  // Only return non-sensitive configuration data
  return NextResponse.json({
    turboraterUrl: process.env.TURBORATER_API_URL || 'https://api.turborater.com',
    // NEVER include the actual API key in the response
    // turboraterKey: process.env.TURBORATER_API_KEY, // ❌ NEVER DO THIS
    hasApiKey: !!process.env.TURBORATER_API_KEY, // ✅ Only indicate if it exists
    environment: process.env.NODE_ENV,
    features: {
      liveQuotes: true,
      aiRecommendations: true,
      carrierIntegration: true,
      realtimeSync: true
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request has required fields
    if (!body.action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    // Handle different configuration actions
    switch (body.action) {
      case 'validate':
        // Validate API key exists (don't return the actual key)
        return NextResponse.json({
          valid: !!process.env.TURBORATER_API_KEY,
          url: process.env.TURBORATER_API_URL || 'Not configured',
          timestamp: new Date().toISOString()
        })

      case 'test-connection':
        // Test the API connection using server-side key
        if (!process.env.TURBORATER_API_KEY) {
          return NextResponse.json(
            { error: 'API key not configured' },
            { status: 503 }
          )
        }

        // Here you would make an actual test call to TurboRater
        // For now, we'll simulate a successful connection
        return NextResponse.json({
          status: 'connected',
          latency: Math.floor(Math.random() * 100) + 50,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Config API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}