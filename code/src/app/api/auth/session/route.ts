import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/server/dataStore";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";

interface SessionBody {
  uid?: unknown;
  email?: unknown;
  name?: unknown;
  picture?: unknown;
}

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SessionBody;

    if (typeof body.uid !== "string" || !body.uid.trim()) {
      return NextResponse.json({ error: "uid is required." }, { status: 400 });
    }

    const uid = body.uid.trim();

    // Always fetch role from the database on the server — this is the only
    // reliable source of truth. Client-side RLS may block the same query.
    let role = "user";
    const adminClient = getAdminClient();
    if (adminClient) {
      const { data, error } = await adminClient
        .from("users")
        .select("role")
        .eq("id", uid)
        .maybeSingle();

      if (error) {
        console.error("[session] Failed to fetch user role:", error.message);
      }

      if (typeof data?.role === "string" && data.role.trim()) {
        role = data.role.trim();
      }
    }

    const token = createSession({
      uid,
      email: typeof body.email === "string" ? body.email : null,
      name: typeof body.name === "string" ? body.name : null,
      picture: typeof body.picture === "string" ? body.picture : null,
      role,
    });

    // Return the resolved role so the client can redirect to the right place
    const response = NextResponse.json({ ok: true, role });
    response.cookies.set("cedar-auth-session", token, {
      path: "/",
      sameSite: "lax",
      maxAge: MAX_AGE_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to start session." }, { status: 500 });
  }
}
