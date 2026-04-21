import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";
import { getUpload, updateUpload } from "@/lib/server/dataStore";

export const runtime = "nodejs";

export async function POST(
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

    updateUpload(id, { status: "uploaded" });

    return NextResponse.json({ ok: true, upload: { id, status: "uploaded" } });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to confirm upload." }, { status: 500 });
  }
}
