/**
 * API Route: Load Environment Variables
 * This endpoint reads and parses the .env.local file server-side
 * and returns the TurboRater credentials based on the selected environment
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to parse .env file content
function parseEnvFile(content: string): Record<string, string> {
  const envVars: Record<string, string> = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    // Parse KEY=value format
    const equalIndex = trimmedLine.indexOf('=');
    if (equalIndex === -1) continue;
    
    const key = trimmedLine.substring(0, equalIndex).trim();
    let value = trimmedLine.substring(equalIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    envVars[key] = value;
  }
  
  return envVars;
}

// Map credentials based on environment
function mapTurboRaterCredentials(envVars: Record<string, string>, environment: 'test' | 'live') {
  const prefix = environment === 'live' ? 'TURBO_RATER_LIVE_' : 'TURBO_RATER_TEST_';
  
  return {
    accountId: envVars[`${prefix}ACCOUNT_ID`] || '',
    accountNumber: envVars[`${prefix}ACCOUNT_NUMBER`] || '',
    agencyId: envVars[`${prefix}AGENCY_ID`] || '',
    accessId: envVars[`${prefix}ACCESS_ID`] || '',
    accountName: envVars.TURBO_RATER_ACCOUNT_NAME || 'Quotely',
    apiKey: envVars.TURBO_RATER_API_KEY || '',
    environment
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath = '.env.local', environment = 'test' } = body;
    
    // Construct full path
    const fullPath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(process.cwd(), filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      // Try .env.local.example as fallback
      const examplePath = path.join(process.cwd(), '.env.local.example');
      if (fs.existsSync(examplePath)) {
        const content = fs.readFileSync(examplePath, 'utf8');
        const envVars = parseEnvFile(content);
        const credentials = mapTurboRaterCredentials(envVars, environment);
        
        return NextResponse.json({
          success: true,
          message: 'Loaded from .env.local.example (template file)',
          credentials,
          totalVars: Object.keys(envVars).length,
          turboRaterVars: Object.keys(envVars).filter(k => k.includes('TURBO_RATER')).length
        });
      }
      
      return NextResponse.json({
        success: false,
        error: 'File not found',
        message: `Could not find ${filePath}. Please create .env.local from .env.local.example template.`
      }, { status: 404 });
    }
    
    // Read file content
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Parse environment variables
    const envVars = parseEnvFile(content);
    
    // Map credentials based on environment
    const credentials = mapTurboRaterCredentials(envVars, environment);
    
    // Validate required fields
    const requiredFields = ['accountId', 'agencyId'];
    const missingFields = requiredFields.filter(field => !credentials[field as keyof typeof credentials]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: `Missing required TurboRater credentials: ${missingFields.join(', ')}`,
        credentials
      }, { status: 400 });
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: `Successfully loaded ${environment} environment credentials`,
      credentials,
      totalVars: Object.keys(envVars).length,
      turboRaterVars: Object.keys(envVars).filter(k => k.includes('TURBO_RATER')).length
    });
    
  } catch (error: any) {
    console.error('Error loading environment file:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Server error',
      message: error.message || 'Failed to load environment file'
    }, { status: 500 });
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Environment loader API is running',
    endpoints: {
      POST: '/api/env/load',
      body: {
        filePath: 'Path to .env file (optional, default: .env.local)',
        environment: 'test | live (optional, default: test)'
      }
    }
  });
}