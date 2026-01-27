"use client";

import { useEffect } from "react";
import { notFound, useRouter, useParams } from "next/navigation";
import { LessonPage } from "@/components/LessonPage";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import { Loader2 } from "lucide-react";

// Days 0-1 redirect to preview, 2-7 require enrollment
const PAID_DAYS = [2, 3, 4, 5, 6, 7];
const PREVIEW_DAYS = [0, 1];

export default function DayPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const day = params?.day as string;
  const dayNum = parseInt(day);

  // Validate day number
  const isValidDay = !isNaN(dayNum) && dayNum >= 0 && dayNum <= 7;

  // Check enrollment if user is logged in
  const betterAuthId = session?.user?.id;
  const hasEnrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollmentByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );

  // Redirect preview days to preview route
  useEffect(() => {
    if (isValidDay && PREVIEW_DAYS.includes(dayNum)) {
      router.replace(`/sprint/preview/day/${dayNum}`);
    }
  }, [dayNum, isValidDay, router]);

  // Redirect to checkout if accessing paid days without enrollment
  useEffect(() => {
    // Skip while loading
    if (sessionLoading) return;
    if (!isValidDay || PREVIEW_DAYS.includes(dayNum)) return;

    // If not logged in, redirect to checkout
    if (!session?.user) {
      router.replace("/sprint/checkout");
      return;
    }

    // If logged in but enrollment query hasn't loaded yet, wait
    if (hasEnrollment === undefined) return;

    // If no enrollment, redirect to checkout
    if (!hasEnrollment) {
      router.replace("/sprint/checkout");
    }
  }, [dayNum, isValidDay, session, sessionLoading, hasEnrollment, router]);

  // Show 404 for invalid day
  if (!isValidDay) {
    notFound();
  }

  // Show loading while checking auth/enrollment
  if (sessionLoading || (PAID_DAYS.includes(dayNum) && hasEnrollment === undefined)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Don't render content for preview days (they redirect)
  if (PREVIEW_DAYS.includes(dayNum)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Don't render if no enrollment (will redirect)
  if (!hasEnrollment) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // User is enrolled - render the lesson
  return <LessonPage day={dayNum} isPreview={false} />;
}
