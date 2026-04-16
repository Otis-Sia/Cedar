import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "cedar-auth-session";

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get(AUTH_COOKIE)?.value;

  if (!authSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${request.nextUrl.pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};