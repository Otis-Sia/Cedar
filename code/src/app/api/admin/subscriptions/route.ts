import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@/lib/server/auth";
import { requireAdminRequest } from "@/lib/adminGuard";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    const body = (await request.json()) as { 
      subscriptionId?: string; 
      status?: string; 
      amount?: number;
      plan?: string;
    };
    
    if (!body.subscriptionId) {
      return NextResponse.json({ error: "subscriptionId is required." }, { status: 400 });
    }

    const updates: any = {};
    
    if (body.status) {
      updates.status = body.status;
    }

    if (typeof body.amount === "number") {
      updates.amount = body.amount;
    }

    if (body.plan) {
      updates.plan = body.plan;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update." }, { status: 400 });
    }

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from("subscriptions")
      .update(updates)
      .eq("id", body.subscriptionId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to update subscription:", error);
    return NextResponse.json({ error: "Failed to update subscription." }, { status: 500 });
  }
}
