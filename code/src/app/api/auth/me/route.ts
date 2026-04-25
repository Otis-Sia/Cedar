import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(request);

    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email ?? null,
        name: user.name ?? null,
        picture: user.picture ?? null,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to load user." }, { status: 500 });
  }
}
