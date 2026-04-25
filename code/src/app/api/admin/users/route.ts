import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@/lib/server/auth";
import { requireAdminRequest } from "@/lib/adminGuard";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    const body = (await request.json()) as { 
      userId?: string; 
      role?: string; 
      plan?: string; 
      is_student?: boolean 
    };
    
    if (!body.userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    const updates: any = {};
    
    if (body.role) {
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(body.role)) {
        return NextResponse.json({ error: "Invalid role." }, { status: 400 });
      }
      updates.role = body.role;
    }

    if (body.plan) {
      updates.plan = body.plan;
    }

    if (typeof body.is_student === "boolean") {
      updates.is_student = body.is_student;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update." }, { status: 400 });
    }

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from("users")
      .update(updates)
      .eq("id", body.userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to update user:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}
