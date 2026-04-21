import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { AuthError, requireUser } from "@/lib/server/auth";
import { adminDb } from "@/lib/server/firebaseAdmin";

export const runtime = "nodejs";

interface UpdateProjectBody {
  action?: unknown;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser(request);
    const { id } = await context.params;
    const body = (await request.json()) as UpdateProjectBody;

    if (typeof body.action !== "string") {
      return NextResponse.json({ error: "action is required." }, { status: 400 });
    }

    const projectRef = adminDb.collection("projects").doc(id);
    const projectSnapshot = await projectRef.get();

    if (!projectSnapshot.exists) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const projectData = projectSnapshot.data();
    if (!projectData || projectData.userId !== user.uid) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (body.action === "publish") {
      await projectRef.update({
        status: "published",
        "settings.isPublic": true,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({ ok: true, projectId: id, status: "published" });
    }

    if (body.action === "unpublish") {
      await projectRef.update({
        status: "draft",
        "settings.isPublic": false,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({ ok: true, projectId: id, status: "draft" });
    }

    return NextResponse.json(
      { error: "Unsupported action. Use publish or unpublish." },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}
