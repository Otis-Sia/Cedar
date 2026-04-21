import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { AuthError, requireUser } from "@/lib/server/auth";
import { adminDb } from "@/lib/server/firebaseAdmin";

export const runtime = "nodejs";

interface CreateProjectBody {
  title?: unknown;
  templateId?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request);
    const body = (await request.json()) as CreateProjectBody;

    if (typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json({ error: "title is required." }, { status: 400 });
    }

    if (typeof body.templateId !== "string" || !body.templateId.trim()) {
      return NextResponse.json({ error: "templateId is required." }, { status: 400 });
    }

    const now = FieldValue.serverTimestamp();
    const docRef = adminDb.collection("projects").doc(randomUUID());

    await docRef.set({
      title: body.title.trim(),
      templateId: body.templateId.trim(),
      userId: user.uid,
      status: "draft",
      settings: {
        isPublic: false,
      },
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      project: {
        id: docRef.id,
        title: body.title.trim(),
        templateId: body.templateId.trim(),
        userId: user.uid,
        status: "draft",
        settings: { isPublic: false },
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
