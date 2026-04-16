import { NextResponse } from 'next/server';
import { parseCVToPortfolio } from '@/lib/gemini';

export const runtime = 'nodejs';

// Allow requests from the static frontend as well
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_CV_TEXT_LENGTH = 30000;

interface ParseCVRequestBody {
  cvText?: unknown;
  fileName?: unknown;
}

// Handle preflight CORS requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ParseCVRequestBody;

    if (typeof body.cvText !== 'string' || !body.cvText.trim()) {
      return NextResponse.json(
        { error: 'cvText is required and must be a non-empty string.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const portfolio = await parseCVToPortfolio(body.cvText.slice(0, MAX_CV_TEXT_LENGTH));

    return NextResponse.json(
      {
        portfolio,
        source: typeof body.fileName === 'string' ? body.fileName : null,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse CV.';
    console.error('[parse-cv] Error:', message);

    return NextResponse.json(
      { error: message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}