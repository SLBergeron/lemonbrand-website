"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/sprint/Confetti";
import { Countdown } from "@/components/sprint/Countdown";
import {
  Mail,
  MessageSquare,
  Play,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

function WelcomeSprintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session, isPending: sessionPending } = useSession();

  const [showConfetti, setShowConfetti] = useState(true);

  const user = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  const enrollment = useQuery(
    api.sprintEnrollments.getWithCohort,
    user?._id ? { userId: user._id } : "skip"
  );

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated or no enrollment
  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/join/sprint");
    }
  }, [session, sessionPending, router]);

  if (sessionPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // If enrollment is still pending (webhook hasn't fired yet), show loading
  if (enrollment === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Confirming your enrollment...</p>
      </div>
    );
  }

  const firstName = user.name?.split(" ")[0] || "there";
  const cohortStartDate = enrollment?.cohort?.startDate || "";
  const discordUrl = enrollment?.cohort?.discordInviteUrl || "#";

  const whatHappensNow = [
    {
      icon: Mail,
      title: "Check Your Email",
      description: `Confirmation sent to ${user.email}`,
      subtext: "Includes calendar invite for Ship Day",
    },
    {
      icon: MessageSquare,
      title: "Join Discord",
      description: "Your cohort is waiting",
      action: discordUrl !== "#" ? (
        <Button variant="outline" size="sm" asChild className="mt-2">
          <a href={discordUrl} target="_blank" rel="noopener noreferrer">
            Join Discord
          </a>
        </Button>
      ) : null,
    },
    {
      icon: Play,
      title: "Start Day 0",
      description: "Get your tools ready",
      subtext: "Available now",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {showConfetti && <Confetti duration={3000} />}

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Welcome to the Sprint, {firstName}!
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
              You just did something most people only talk about.
              <br />
              In 7 days, you&apos;ll have built something real.
            </p>
          </motion.div>
        </motion.div>

        {/* What Happens Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            What Happens Now
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {whatHappensNow.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {item.subtext && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.subtext}
                  </p>
                )}
                {item.action}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cohort Info */}
        {enrollment?.cohort && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <div className="p-8 rounded-xl bg-card border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">
                  Enrolled in {enrollment.cohort.name} Cohort
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Your Sprint starts in:
              </p>

              <Countdown
                targetDate={cohortStartDate}
                className="mb-6"
              />

              <p className="text-xs text-muted-foreground">
                But you don&apos;t have to wait — Day 0 is ready now.
              </p>
            </div>
          </motion.div>
        )}

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button variant="accent" size="lg" asChild>
            <Link href="https://learn.lemonbrand.io/sprint">
              Start Day 0 Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">
            Get your tools set up while you&apos;re excited
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            Questions?{" "}
            <a
              href="mailto:simon@lemonbrand.io"
              className="text-accent hover:underline"
            >
              Email Simon
            </a>{" "}
            or ask in Discord.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function WelcomeSprintPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      }
    >
      <WelcomeSprintContent />
    </Suspense>
  );
}
