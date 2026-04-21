import { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/server/dataStore";

export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

export interface SessionUser {
  uid: string;
  email?: string | null;
  name?: string | null;
  picture?: string | null;
}

export async function requireUser(request: NextRequest): Promise<SessionUser> {
  const sessionToken = request.cookies.get("cedar-auth-session")?.value;
  if (!sessionToken) {
    throw new AuthError("Missing authentication session.", 401);
  }

  const user = getSessionUser(sessionToken);
  if (!user) {
    throw new AuthError("Invalid authentication session.", 401);
  }

  return user;
}
