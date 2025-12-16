"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import { PagePlayer } from "@/components/sarah/PagePlayer";
import { pages, getPageById, getPageIndex } from "@/content/sarah-pages";
import type { StepProgress } from "@/components/sarah/steps/types";
import { useEffect, useState } from "react";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const pageId = params.pageId as string;

  const [startTime] = useState(Date.now());

  const page = getPageById(pageId);
  const pageIndex = getPageIndex(pageId);
  const isLastPage = pageIndex === pages.length - 1;

  const completePage = useMutation(api.pageProgress.completePage);

  // Handle page completion
  const handlePageComplete = async (
    completedPageId: string,
    stepAnswers: StepProgress[]
  ) => {
    if (!user?._id || !page) return;

    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      await completePage({
        userId: user._id,
        pageId: completedPageId,
        badgeName: page.badge.name,
        badgeIcon: page.badge.icon,
        xpReward: page.badge.xp,
        stepAnswers,
        timeSpentSeconds,
      });

      // Navigate after completion
      if (isLastPage) {
        // Course complete - go to dashboard
        router.push("/sarah/dashboard");
      } else {
        // Go to dashboard to celebrate and pick next
        router.push("/sarah/dashboard");
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      // Still navigate even if save fails
      router.push("/sarah/dashboard");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    router.push("/sarah");
    return null;
  }

  // Page not found
  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Page not found
          </h1>
          <p className="text-neutral-500 mb-4">
            This lesson doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/sarah/dashboard")}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <PagePlayer
      page={page}
      onPageComplete={handlePageComplete}
      isLastPage={isLastPage}
    />
  );
}
