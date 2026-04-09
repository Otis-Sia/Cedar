import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'cedar-local-backend',
    timestamp: new Date().toISOString(),
  });
}