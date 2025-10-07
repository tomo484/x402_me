import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'x402-web-client',
      version: '0.1.0',
      environment: process.env.NODE_ENV || 'development'
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
} 