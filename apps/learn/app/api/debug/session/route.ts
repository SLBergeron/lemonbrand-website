import { NextRequest, NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { headers, cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    const convex = getConvexClient();

    // Get all cookies for debugging
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieNames = allCookies.map(c => c.name);

    // Try to get session from Better Auth cookie
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    // Check users table
    const users = await convex.query(api.users.getByEmail, { email: "simon@lemonbrand.io" });
    const gmailUser = await convex.query(api.users.getByEmail, { email: "simon.l.bergeron@gmail.com" });

    // Check enrollments
    let lemonbrandEnrollment = null;
    let gmailEnrollment = null;

    if (users?.betterAuthId) {
      lemonbrandEnrollment = await convex.query(
        api.sprintEnrollments.hasActiveEnrollmentByAuthId,
        { betterAuthId: users.betterAuthId }
      );
    }

    if (gmailUser?.betterAuthId) {
      gmailEnrollment = await convex.query(
        api.sprintEnrollments.hasActiveEnrollmentByAuthId,
        { betterAuthId: gmailUser.betterAuthId }
      );
    }

    return NextResponse.json({
      convexUrl,
      cookieNames,
      hasSessionToken: !!sessionToken,
      sessionTokenPreview: sessionToken ? sessionToken.substring(0, 10) + "..." : null,
      users: {
        "simon@lemonbrand.io": users ? {
          id: users._id,
          betterAuthId: users.betterAuthId,
          hasEnrollment: lemonbrandEnrollment,
        } : null,
        "simon.l.bergeron@gmail.com": gmailUser ? {
          id: gmailUser._id,
          betterAuthId: gmailUser.betterAuthId,
          hasEnrollment: gmailEnrollment,
        } : null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
