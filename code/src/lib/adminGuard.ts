import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { AuthError, requireUser } from "@/lib/server/auth";
import { getSessionUser, type SessionUser } from "@/lib/server/dataStore";

const ADMIN_SESSION_COOKIE = "cedar-auth-session";

export async function getCurrentSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return getSessionUser(token);
}

export async function requireAdminSession() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    redirect("/login?redirect=/admin/dashboard");
  }

  if (sessionUser.role !== "admin") {
    redirect("/");
  }

  return sessionUser;
}

export async function requireAdminRequest(request: NextRequest): Promise<SessionUser> {
  const user = await requireUser(request);

  if (user.role !== "admin") {
    throw new AuthError("Admin access required.", 403);
  }

  return user;
}

export const isCurrentUserAdmin = async () => {
  const user = await getCurrentSessionUser();
  return user?.role === "admin";
};

export const isAdminFromAuthorization = async (authorizationHeader?: string | null) => {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return { isAdmin: false, userId: null as string | null };
  }

  const token = authorizationHeader.slice("Bearer ".length);
  const user = getSessionUser(token);

  if (!user) {
    return { isAdmin: false, userId: null as string | null };
  }

  return { isAdmin: user.role === "admin", userId: user.uid };
};
