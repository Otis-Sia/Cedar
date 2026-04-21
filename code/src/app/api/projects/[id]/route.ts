import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";
import { getProject, updateProjectStatus } from "@/lib/server/dataStore";

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

    const project = getProject(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    if (project.userId !== user.uid) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (body.action === "publish") {
      updateProjectStatus(id, "published");
      return NextResponse.json({ ok: true, projectId: id, status: "published" });
    }

    if (body.action === "unpublish") {
      updateProjectStatus(id, "draft");
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
