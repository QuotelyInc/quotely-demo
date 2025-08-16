import { NextResponse } from 'next/server';
import { validateEnvironment, getPublicEnvVars } from '@/lib/env-validator';

/**
 * Health Check API Endpoint
 * GET /api/health - Returns environment and integration health status
 */
export async function GET() {
  try {
    const validation = validateEnvironment();
    const publicVars = getPublicEnvVars();
    
    // Check integration status
    const integrations = {
      turboRater: !!process.env.TURBO_RATER_API_KEY,
      gail: !!process.env.GAIL_API_KEY,
      momentum: !!process.env.MOMENTUM_API_KEY,
      claude: !!process.env.CLAUDE_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      grok: !!process.env.GROK_API_KEY,
      analytics: !!process.env.NEXT_PUBLIC_GA_PROPERTY_ID,
      otto: !!process.env.NEXT_PUBLIC_OTTO_UUID,
      database: !!process.env.DATABASE_URL,
      email: !!process.env.SENDGRID_API_KEY,
      stripe: !!process.env.STRIPE_SECRET_KEY,
    };

    // Count active integrations
    const activeIntegrations = Object.values(integrations).filter(Boolean).length;
    const totalIntegrations = Object.keys(integrations).length;
    
    // Determine overall health status
    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (validation.isValid && activeIntegrations >= 5) {
      status = 'healthy';
    } else if (validation.isValid || activeIntegrations >= 3) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    const response = {
      status,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        isProduction: process.env.NODE_ENV === 'production',
        isVercel: !!process.env.VERCEL,
        vercelEnv: process.env.VERCEL_ENV,
      },
      validation: {
        isValid: validation.isValid,
        missingCount: validation.missing.length,
        warningCount: validation.warnings.length,
        missing: process.env.NODE_ENV === 'development' ? validation.missing : undefined,
        warnings: process.env.NODE_ENV === 'development' ? validation.warnings : undefined,
      },
      integrations: {
        summary: `${activeIntegrations}/${totalIntegrations} active`,
        details: process.env.NODE_ENV === 'development' ? integrations : undefined,
      },
      publicConfig: process.env.NODE_ENV === 'development' ? {
        siteUrl: publicVars.NEXT_PUBLIC_SITE_URL,
        ottoEnabled: publicVars.NEXT_PUBLIC_OTTO_ENABLED === 'true',
        gaConfigured: !!publicVars.NEXT_PUBLIC_GA_PROPERTY_ID,
      } : undefined,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    return NextResponse.json(response, {
      status: status === 'unhealthy' ? 503 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': status,
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Health-Status': 'error',
        }
      }
    );
  }
}