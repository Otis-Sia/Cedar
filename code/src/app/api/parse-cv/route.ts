import { NextResponse } from 'next/server';
import { parseCVToPortfolio } from '@/lib/gemini';

export const runtime = 'nodejs';

const MAX_CV_TEXT_LENGTH = 30000;

interface ParseCVRequestBody {
  cvText?: unknown;
  fileName?: unknown;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ParseCVRequestBody;

    if (typeof body.cvText !== 'string' || !body.cvText.trim()) {
      return NextResponse.json(
        { error: 'cvText is required.' },
        { status: 400 }
      );
    }

    const portfolio = await parseCVToPortfolio(body.cvText.slice(0, MAX_CV_TEXT_LENGTH));

    return NextResponse.json({
      portfolio,
      source: typeof body.fileName === 'string' ? body.fileName : null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse CV.';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}