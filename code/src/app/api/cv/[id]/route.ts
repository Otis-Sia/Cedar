import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";
import { getUpload } from "@/lib/server/dataStore";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser(request);
    const { id } = await context.params;

    const upload = getUpload(id);

    if (!upload) {
      return NextResponse.json({ error: "Upload not found." }, { status: 404 });
    }

    if (upload.userId !== user.uid) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    return NextResponse.json({
      upload: {
        id,
        status: upload.status ?? "unknown",
        parsedData: upload.parsedData ?? null,
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to fetch upload." }, { status: 500 });
  }
}
