"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@lemonbrand/ui";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  Loader2,
  CheckCircle2,
  Play,
} from "lucide-react";

const FEATURES = [
  "8 video lessons (Days 0-7)",
  "Step-by-step Build Stack framework",
  "CLAUDE.md templates for every day",
  "Discord community access",
  "Direct support from Simon",
  "$297 credit toward 8-Week Program",
];

function WaitlistContent() {
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

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
      {/* Back link */}
      <Link
        href="/sprint"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to course
      </Link>

      {/* Header with badge */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
            <Play className="size-3" />
            Coming Soon
          </span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
          7-Day Sprint Waitlist
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Be the first to know when the course launches.
        </p>
      </header>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-premium-lg">
        {/* Atmospheric glow effects */}
        <div className="absolute -top-24 -right-24 size-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 size-32 rounded-full bg-success/15 blur-2xl" />

        <div className="relative p-6 lg:p-8 space-y-8">
          {/* Icon + Description */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* 3D Icon */}
            <div className="shrink-0">
              <Image
                src="/assets/3dicons-mail-dynamic-gradient.png"
                alt="Join the waitlist"
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold">7-Day Sprint</h2>
              <p className="text-muted-foreground leading-relaxed">
                The course is almost complete. I&apos;m finishing up the video
                lessons and will notify you the moment it launches.
              </p>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {FEATURES.map((feature, i) => (
              <li
                key={feature}
                className={`flex items-start gap-3 animate-fade-in-up stagger-${i + 1}`}
                style={{ opacity: 0 }}
              >
                <Check className="size-5 text-success shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive animate-pop-in">
              {error}
            </div>
          )}

          {/* Form or Success State */}
          {submitted ? (
            <div className="rounded-xl bg-success/10 border border-success/30 p-8 text-center space-y-4 animate-pop-in">
              <div className="size-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="size-8 text-success" />
              </div>
              <div className="space-y-2">
                <p className="font-display font-bold text-xl text-foreground">
                  You&apos;re on the list!
                </p>
                <p className="text-muted-foreground">
                  Check your email for a confirmation and a link to preview the
                  free lessons.
                </p>
              </div>
              <Button asChild variant="secondary" className="mt-4">
                <Link href="/sprint/preview/day/0">
                  Preview Days 0-1 Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all text-lg"
                  disabled={loading}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full text-base shadow-accent hover:shadow-glow transition-shadow"
                disabled={loading || !email}
              >
                {loading ? (
                  <Loader2 className="size-5 mr-2 animate-spin" />
                ) : null}
                Join Waitlist
                {!loading && <ArrowRight className="size-5 ml-2" />}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Preview CTA */}
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-display font-semibold text-foreground">
              Want a head start?
            </p>
            <p className="text-sm text-muted-foreground">
              Days 0-1 are free to preview while you wait.
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="shrink-0">
            <Link href="/sprint/preview/day/0">
              Start Free Preview
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function WaitlistLoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<WaitlistLoadingFallback />}>
      <WaitlistContent />
    </Suspense>
  );
}
