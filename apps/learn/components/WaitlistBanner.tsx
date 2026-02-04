"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@lemonbrand/ui";
import {
  ArrowRight,
  Mail,
  Loader2,
  CheckCircle2,
  Play,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface WaitlistBannerProps {
  /**
   * "homepage" - Compact version for Sprint overview page
   * "lesson" - Full version for end of Day 1 lesson (replaces TrialCTA)
   */
  variant?: "homepage" | "lesson";
}

export function WaitlistBanner({ variant = "homepage" }: WaitlistBannerProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/sprint/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Waitlist error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to join waitlist. Please try again."
      );
      setLoading(false);
    }
  };

  if (variant === "homepage") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
        {/* Accent glow */}
        <div className="absolute -top-24 -right-24 size-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 size-32 rounded-full bg-success/15 blur-2xl" />

        <div className="relative p-6 lg:p-8">
          {submitted ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-6 text-success" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">
                    You&apos;re on the list!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll notify you when the course launches.
                  </p>
                </div>
              </div>
              <Button asChild variant="secondary" className="shrink-0">
                <Link href="/sprint/preview/day/0">
                  Preview Days 0-1
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Play className="size-3" />
                  Coming Soon
                </div>
                <h2 className="font-display font-bold text-xl lg:text-2xl">
                  Join the Waitlist
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  The course is almost ready. Get notified the moment it
                  launches and lock in early access pricing.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 shrink-0 lg:w-auto"
              >
                <div className="relative flex-1 sm:w-64">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                    disabled={loading}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  disabled={loading || !email}
                  className="shrink-0"
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive mt-3">{error}</p>
          )}
        </div>
      </div>
    );
  }

  // Lesson variant - fuller design matching TrialCTA
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl"
    >
      {/* Background glows */}
      <div className="absolute -top-32 -right-32 size-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-success/10 blur-3xl" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        {submitted ? (
          <div className="text-center py-4">
            <div className="size-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="size-8 text-success" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-muted-foreground mb-6">
              Check your email for confirmation. We&apos;ll notify you the
              moment the course launches.
            </p>
            <Button asChild variant="secondary">
              <Link href="/sprint">
                Back to Course Overview
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-5">
              <Sparkles className="size-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Coming Soon
              </span>
            </div>

            {/* Header with icon */}
            <div className="flex gap-5 mb-6">
              <div className="hidden sm:block shrink-0">
                <Image
                  src="/assets/3dicons-mail-dynamic-gradient.png"
                  alt="Join waitlist"
                  width={64}
                  height={64}
                  className="drop-shadow-lg"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                  Preview Complete!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You&apos;ve finished the free lessons. The full course is
                  almost ready—join the waitlist to be first in line when it
                  launches.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="pt-5 border-t border-border/50">
              {error && (
                <p className="text-sm text-destructive mb-4">{error}</p>
              )}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-base"
                    disabled={loading}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={loading || !email}
                  className="shrink-0 shadow-accent"
                >
                  {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                No spam, ever. Get notified when the course launches + early
                access pricing.
              </p>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}
