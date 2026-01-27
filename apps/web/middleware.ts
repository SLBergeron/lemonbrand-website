import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get country from Vercel's geo headers (automatically populated on Vercel)
  const country = request.geo?.country || request.headers.get("x-vercel-ip-country") || "CA";

  // Set cookie for client-side access
  response.cookies.set("user-country", country, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*|sitemap.xml|robots.txt).*)",
  ],
};
