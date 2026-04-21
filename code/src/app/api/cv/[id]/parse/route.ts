import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { AuthError, requireUser } from "@/lib/server/auth";
import { adminDb } from "@/lib/server/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser(request);
    const { id } = await context.params;

    const uploadRef = adminDb.collection("cv_uploads").doc(id);
    const uploadSnapshot = await uploadRef.get();

    if (!uploadSnapshot.exists) {
      return NextResponse.json({ error: "Upload not found." }, { status: 404 });
    }

    const uploadData = uploadSnapshot.data();
    if (!uploadData || uploadData.userId !== user.uid) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    await uploadRef.update({
      status: "processing",
      updatedAt: FieldValue.serverTimestamp(),
    });

    // This endpoint is ready for an async job/queue worker. For now it marks
    // the upload complete with a placeholder parsed object to unblock local flow.
    const parsedData = {
      summary: "Parsing scheduled.",
      sourceFile: uploadData.fileName ?? null,
    };

    await uploadRef.update({
      status: "complete",
      parsedData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      upload: {
        id,
        status: "complete",
        parsedData,
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to parse upload." }, { status: 500 });
  }
}
