import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request); // ✅ better-auth ki cookie
  const { pathname } = request.nextUrl;

  const isPublicPath =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/verify-email";

  const isProtectedPath = pathname.startsWith("/dashboard");

  // Logged in hai + public page kholne ki koshish → dashboard
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // Logged in nahi + protected page kholne ki koshish → sign-in
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-email",
    "/dashboard/:path*",
  ],
};