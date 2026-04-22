import { NextResponse } from 'next/server';
import { parseCVToPortfolio } from '@/lib/gemini';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';

const MAX_CV_TEXT_LENGTH = 30000;

interface ParseCVRequestBody {
  cvText?: unknown;
  fileName?: unknown;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ParseCVRequestBody;
    logger.server('/api/parse-cv', 'POST', { fileName: body.fileName });

    if (typeof body.cvText !== 'string' || !body.cvText.trim()) {
      logger.warn('/api/parse-cv: Missing cvText');
      return NextResponse.json(
        { error: 'cvText is required.' },
        { status: 400 }
      );
    }

    const portfolio = await parseCVToPortfolio(body.cvText.slice(0, MAX_CV_TEXT_LENGTH));
    logger.info('/api/parse-cv: CV parsed successfully');

    return NextResponse.json({
      portfolio,
      source: typeof body.fileName === 'string' ? body.fileName : null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse CV.';
    logger.error('/api/parse-cv: Failed to parse CV', { error: message });

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}