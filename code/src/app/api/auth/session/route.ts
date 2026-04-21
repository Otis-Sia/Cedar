import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/server/dataStore";

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

    const token = createSession({
      uid: body.uid.trim(),
      email: typeof body.email === "string" ? body.email : null,
      name: typeof body.name === "string" ? body.name : null,
      picture: typeof body.picture === "string" ? body.picture : null,
    });

    const response = NextResponse.json({ ok: true });
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
