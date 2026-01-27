"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex";
import { Loader2 } from "lucide-react";

export default function SprintDashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const user = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  const currentDay = useQuery(
    api.sprintDayProgress.getCurrentDay,
    user?._id ? { userId: user._id } : "skip"
  );

  // Redirect to current day
  useEffect(() => {
    if (currentDay !== undefined) {
      const dayNumber = currentDay?.day ?? 0;
      router.replace(`/dashboard/sprint/day/${dayNumber}`);
    }
  }, [currentDay, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-accent" />
    </div>
  );
}
