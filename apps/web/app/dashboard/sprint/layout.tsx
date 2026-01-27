"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import { DaySidebar } from "@/components/sprint/DaySidebar";
import { Loader2 } from "lucide-react";

export default function SprintDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  const user = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  const enrollment = useQuery(
    api.sprintEnrollments.getWithCohort,
    user?._id ? { userId: user._id } : "skip"
  );

  const dayProgress = useQuery(
    api.sprintDayProgress.getDayProgressByUser,
    user?._id ? { userId: user._id } : "skip"
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/join/sprint");
    }
  }, [session, sessionPending, router]);

  // Redirect if no active enrollment
  useEffect(() => {
    if (enrollment === null) {
      router.push("/sprint");
    }
  }, [enrollment, router]);

  if (sessionPending || !user || enrollment === undefined || !dayProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!enrollment) {
    return null; // Will redirect
  }

  // Transform day progress for sidebar
  const sidebarProgress = dayProgress
    .map((p: { day: number; status: string }) => ({
      day: p.day,
      status: p.status,
    }))
    .sort((a: { day: number }, b: { day: number }) => a.day - b.day);

  return (
    <div className="min-h-screen bg-background flex">
      <DaySidebar
        progress={sidebarProgress}
        discordUrl={enrollment.cohort?.discordInviteUrl}
        className="hidden lg:flex fixed left-0 top-0 bottom-0"
      />

      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
