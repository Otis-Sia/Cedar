import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";
import { createUpload } from "@/lib/server/dataStore";

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

    const upload = createUpload({
      userId: user.uid,
      fileName: body.fileName,
      mimeType: body.mimeType,
      sizeBytes: body.sizeBytes,
      storagePath: `cv_uploads/${user.uid}/${body.fileName}`,
    });

    return NextResponse.json({
      data: {
        // Keep signedUploadUrl for backward compatibility with existing client calls.
        // New clients should use uploadUrl; remove signedUploadUrl in a follow-up cleanup.
        // TODO(v2.0.0): Drop signedUploadUrl once all clients migrate to uploadUrl.
        uploadUrl: `/api/cv/${upload.id}/file`,
        signedUploadUrl: `/api/cv/${upload.id}/file`,
        upload: {
          id: upload.id,
          status: upload.status,
          storagePath: upload.storagePath,
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
