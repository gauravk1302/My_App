import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isProtectedPath = pathname.startsWith("/dashboard");
  const isPublicPath =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/verify-email" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password");

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-email",
    "/forgot-password",
    "/reset-password/:path*",
    "/dashboard/:path*",
  ],
};