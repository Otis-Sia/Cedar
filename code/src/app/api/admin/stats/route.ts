import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@/lib/server/auth";
import { requireAdminRequest } from "@/lib/adminGuard";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    const adminClient = getAdminClient();

    const [usersResult, subscriptionsResult, studentDomainsResult, subscriptionDetailsResult] = await Promise.all([
      adminClient.from("users").select("id", { count: "exact", head: true }),
      adminClient.from("subscriptions").select("id", { count: "exact", head: true }),
      adminClient.from("student_domains").select("id", { count: "exact", head: true }),
      adminClient.from("subscriptions").select("amount,status"),
    ]);

    const subscriptions = subscriptionDetailsResult.data ?? [];
    const activeSubscriptions = subscriptions.filter((subscription) => {
      return String(subscription.status ?? "").toLowerCase() === "active";
    });

    const mrr = activeSubscriptions.reduce((total, subscription) => {
      const amount = Number(subscription.amount ?? 0);
      return total + (Number.isFinite(amount) ? amount : 0);
    }, 0);

    return NextResponse.json({
      users: usersResult.count ?? 0,
      subscriptions: subscriptionsResult.count ?? 0,
      studentDomains: studentDomainsResult.count ?? 0,
      activeSubscriptions: activeSubscriptions.length,
      mrr,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to load admin stats." }, { status: 500 });
  }
}
