import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/server/firebaseAdmin";

export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

export async function requireUser(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthError("Missing Bearer token.", 401);
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) {
    throw new AuthError("Missing Firebase ID token.", 401);
  }

  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    throw new AuthError("Invalid Firebase ID token.", 401);
  }
}
