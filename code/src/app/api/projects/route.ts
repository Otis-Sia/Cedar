import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";
import { createProject } from "@/lib/server/dataStore";

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

    const project = createProject({
      title: body.title.trim(),
      templateId: body.templateId.trim(),
      userId: user.uid,
    });

    return NextResponse.json({ project });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
