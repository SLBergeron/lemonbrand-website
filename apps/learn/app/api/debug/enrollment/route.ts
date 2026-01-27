import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    const convex = getConvexClient();

    // Test query for simon@lemonbrand.io
    const enrollmentCheck = await convex.query(
      api.sprintEnrollments.getEnrollmentByEmail,
      { email: "simon@lemonbrand.io" }
    );

    return NextResponse.json({
      convexUrl,
      enrollmentCheck,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL,
    }, { status: 500 });
  }
}
