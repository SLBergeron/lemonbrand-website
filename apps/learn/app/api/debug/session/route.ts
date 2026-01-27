import { NextRequest, NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    // Verify the URL contains the expected deployment
    const expectedDeployment = "strong-crane-661";
    const urlContainsExpected = convexUrl?.includes(expectedDeployment);

    const convex = getConvexClient();

    // Get all cookies for debugging
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieNames = allCookies.map(c => c.name);

    // Get the actual session token
    const secureSessionToken = cookieStore.get("__Secure-better-auth.session_token")?.value;
    const regularSessionToken = cookieStore.get("better-auth.session_token")?.value;
    const sessionToken = secureSessionToken || regularSessionToken;

    // Check users table - wrap in try/catch
    let users = null;
    let gmailUser = null;
    let usersError = null;

    try {
      users = await convex.query(api.users.getByEmail, { email: "simon@lemonbrand.io" });
    } catch (e) {
      usersError = e instanceof Error ? e.message : "Unknown error";
    }

    try {
      gmailUser = await convex.query(api.users.getByEmail, { email: "simon.l.bergeron@gmail.com" });
    } catch (e) {
      // ignore
    }

    // Check enrollments
    let lemonbrandEnrollment = null;
    let gmailEnrollment = null;

    if (users?.betterAuthId) {
      try {
        lemonbrandEnrollment = await convex.query(
          api.sprintEnrollments.hasActiveEnrollmentByAuthId,
          { betterAuthId: users.betterAuthId }
        );
      } catch (e) {
        lemonbrandEnrollment = { error: e instanceof Error ? e.message : "Unknown" };
      }
    }

    if (gmailUser?.betterAuthId) {
      try {
        gmailEnrollment = await convex.query(
          api.sprintEnrollments.hasActiveEnrollmentByAuthId,
          { betterAuthId: gmailUser.betterAuthId }
        );
      } catch (e) {
        gmailEnrollment = { error: e instanceof Error ? e.message : "Unknown" };
      }
    }

    return NextResponse.json({
      convexUrl,
      urlContainsExpected,
      expectedDeployment,
      cookieNames,
      hasSecureSessionToken: !!secureSessionToken,
      hasRegularSessionToken: !!regularSessionToken,
      sessionTokenPreview: sessionToken ? sessionToken.substring(0, 20) + "..." : null,
      usersQueryError: usersError,
      users: {
        "simon@lemonbrand.io": users ? {
          id: users._id,
          email: users.email,
          betterAuthId: users.betterAuthId,
          hasEnrollment: lemonbrandEnrollment,
        } : null,
        "simon.l.bergeron@gmail.com": gmailUser ? {
          id: gmailUser._id,
          email: gmailUser.email,
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
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL,
    }, { status: 500 });
  }
}
