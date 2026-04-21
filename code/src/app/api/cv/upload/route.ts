import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { AuthError, requireUser } from "@/lib/server/auth";
import { adminDb, adminStorage } from "@/lib/server/firebaseAdmin";

export const runtime = "nodejs";

interface UploadRequestBody {
  fileName?: unknown;
  mimeType?: unknown;
  sizeBytes?: unknown;
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request);
    const body = (await request.json()) as UploadRequestBody;

    if (typeof body.fileName !== "string" || !body.fileName.trim()) {
      return NextResponse.json({ error: "fileName is required." }, { status: 400 });
    }

    if (typeof body.mimeType !== "string" || !body.mimeType.trim()) {
      return NextResponse.json({ error: "mimeType is required." }, { status: 400 });
    }

    if (typeof body.sizeBytes !== "number" || body.sizeBytes <= 0) {
      return NextResponse.json({ error: "sizeBytes must be a positive number." }, { status: 400 });
    }

    if (body.sizeBytes > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `Max upload size is ${MAX_UPLOAD_BYTES} bytes.` },
        { status: 400 }
      );
    }

    const uploadId = randomUUID();
    const storagePath = `cv_uploads/${user.uid}/${uploadId}/${body.fileName}`;
    const bucket = adminStorage.bucket();
    const file = bucket.file(storagePath);

    const [signedUploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType: body.mimeType,
    });

    const now = FieldValue.serverTimestamp();

    await adminDb.collection("cv_uploads").doc(uploadId).set({
      id: uploadId,
      userId: user.uid,
      fileName: body.fileName,
      mimeType: body.mimeType,
      sizeBytes: body.sizeBytes,
      storagePath,
      status: "pending_upload",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      data: {
        signedUploadUrl,
        upload: {
          id: uploadId,
          status: "pending_upload",
          storagePath,
        },
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to create upload URL." }, { status: 500 });
  }
}
