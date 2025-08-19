import { NextRequest, NextResponse } from 'next/server';

// Local proxy server URL - adjust if running on different port
const PROXY_SERVER_URL = process.env.NEXT_PUBLIC_TURBORATER_PROXY_URL || 'http://localhost:3456';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // Forward request to local proxy server
    const proxyResponse = await fetch(`${PROXY_SERVER_URL}/api/turborater/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await proxyResponse.json();

    if (!proxyResponse.ok) {
      return NextResponse.json(result, { status: proxyResponse.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy request error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to TurboRater proxy server',
        message: 'Make sure the local proxy server is running on port 3456'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'health';

    // Forward request to local proxy server
    const proxyResponse = await fetch(`${PROXY_SERVER_URL}/${action}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await proxyResponse.json();

    if (!proxyResponse.ok) {
      return NextResponse.json(result, { status: proxyResponse.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy request error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to TurboRater proxy server',
        message: 'Make sure the local proxy server is running on port 3456'
      },
      { status: 500 }
    );
  }
}