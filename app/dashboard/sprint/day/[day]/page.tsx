"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DayChecklist } from "@/components/sprint/DayChecklist";
import { Button } from "@/components/ui/button";
import { Loader2, Play, FileText, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

// Default Day 0 content (fallback if not in database)
const DEFAULT_DAY_0_CONTENT = {
  title: "Get Ready to Build",
  subtitle:
    "Before the Sprint officially starts, let's get your tools ready. This takes 30-45 minutes.",
  trainingVideoUrl: "",
  trainingDurationMinutes: 12,
  objectives: [
    "Set up Claude Code on your machine",
    "Configure your Anthropic API key",
    "Run your first Claude command",
    "Join the Discord and meet your cohort",
  ],
  deliverables: [
    "Working Claude Code installation",
    "Verified API connection",
    "Discord introduction posted",
  ],
  checklistItems: [
    {
      id: "watch-training",
      label: "Watch the Setup Video",
      description: "12-minute walkthrough of the setup process",
    },
    {
      id: "install-claude",
      label: "Install Claude Code",
      description: "Download and install Claude Code CLI on your machine",
    },
    {
      id: "setup-api",
      label: "Set up Anthropic API",
      description: "Create your API key and add it to your environment",
    },
    {
      id: "first-command",
      label: "Run your first command",
      description: "Verify everything works by running a test command",
    },
    {
      id: "post-progress",
      label: "Introduce yourself in Discord",
      description: "Post a quick intro - your name and what you want to build",
    },
  ],
};

export default function DayPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = parseInt(params.day as string, 10);
  const { data: session } = useSession();

  const user = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  const dayProgress = useQuery(
    api.sprintDayProgress.getByUserDay,
    user?._id ? { userId: user._id, day: dayNumber } : "skip"
  );

  const dayContent = useQuery(api.sprintContent.getByDay, { day: dayNumber });

  if (!user || dayProgress === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Check if day is locked
  if (dayProgress?.status === "locked") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Day {dayNumber} is Locked
          </h1>
          <p className="text-muted-foreground mb-6">
            Complete the previous day to unlock this content.
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  // Use content from database or default
  const content = dayContent || (dayNumber === 0 ? DEFAULT_DAY_0_CONTENT : null);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Content Coming Soon
          </h1>
          <p className="text-muted-foreground mb-6">
            Day {dayNumber} content is being prepared.
          </p>
          <Button variant="outline" onClick={() => router.push("/dashboard/sprint")}>
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleDayComplete = () => {
    // Navigate to next day if available
    if (dayNumber < 7) {
      router.push(`/dashboard/sprint/day/${dayNumber + 1}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-wider">
                Day {dayNumber}
              </p>
              <h1 className="text-xl font-display font-bold text-foreground">
                {content.title}
              </h1>
            </div>
            {dayProgress?.status === "completed" && (
              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                Completed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Subtitle */}
          {content.subtitle && (
            <p className="text-lg text-muted-foreground">{content.subtitle}</p>
          )}

          {/* Video Section */}
          {content.trainingVideoUrl && (
            <div className="rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center border border-border">
              {content.trainingVideoUrl.includes("youtube") ||
              content.trainingVideoUrl.includes("vimeo") ? (
                <iframe
                  src={content.trainingVideoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center">
                  <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Video: {content.trainingDurationMinutes} minutes
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Objectives */}
          {content.objectives && content.objectives.length > 0 && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Today&apos;s Objectives
              </h2>
              <ul className="space-y-2">
                {content.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Worksheet Link */}
          {'worksheetUrl' in content && content.worksheetUrl && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Day {dayNumber} Worksheet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Download and complete
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <a
                    href={content.worksheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Checklist */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
              Your Checklist
            </h2>
            <DayChecklist
              userId={user._id}
              day={dayNumber}
              items={content.checklistItems}
              trainingWatched={dayProgress?.trainingWatched}
              worksheetCompleted={dayProgress?.worksheetCompleted}
              progressPosted={dayProgress?.progressPosted}
              onComplete={handleDayComplete}
            />
          </div>

          {/* Next Day Teaser */}
          {dayProgress?.status === "completed" && dayNumber < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-accent/5 border border-accent/20 text-center"
            >
              <h3 className="font-semibold text-foreground mb-2">
                Ready for Day {dayNumber + 1}?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Great work completing Day {dayNumber}!
              </p>
              <Button
                variant="accent"
                onClick={() =>
                  router.push(`/dashboard/sprint/day/${dayNumber + 1}`)
                }
              >
                Continue to Day {dayNumber + 1}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
