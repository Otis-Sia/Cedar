import { NextRequest } from "next/server";

export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

interface SessionUser {
  uid: string;
  email?: string | null;
  name?: string | null;
  picture?: string | null;
}

function parseBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();
  return token || null;
}

export async function requireUser(request: NextRequest): Promise<SessionUser> {
  const uid = parseBearerToken(request);

  if (uid) {
    return {
      uid,
      email: null,
      name: null,
      picture: null,
    };
  }

  throw new AuthError("Missing authentication session.", 401);
}
