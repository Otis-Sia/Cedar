import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/server/dataStore";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("cedar-auth-session")?.value;

  if (sessionToken) {
    deleteSession(sessionToken);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("cedar-auth-session", "", {
    path: "/",
    sameSite: "lax",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
