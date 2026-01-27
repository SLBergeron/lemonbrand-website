"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@lemonbrand/ui";
import { ArrowLeft, Check, Lock, Shield, Zap, Mail, Loader2 } from "lucide-react";
import { signIn, useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";

const FEATURES = [
  "8 video lessons (Days 0-7)",
  "Step-by-step Build Stack framework",
  "CLAUDE.md templates for every day",
  "Discord community access",
  "Direct support from Simon",
  "$297 credit toward 8-Week Program",
];

const LOCAL_PROGRESS_KEY = "sprint-preview-progress";

function getLocalProgress() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCAL_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function CheckoutContent() {
  const { data: session, isPending: sessionLoading } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<"google" | "email" | null>(null);

  const canceled = searchParams.get("canceled") === "true";

  // Check if user is already enrolled
  const betterAuthId = session?.user?.id as string | undefined;
  const enrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollmentByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );

  // Redirect if already enrolled
  useEffect(() => {
    if (enrollment === true) {
      router.push("/sprint/day/2");
    }
  }, [enrollment, router]);

  // Pre-fill email if signed in
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session?.user?.email]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setAuthMethod("google");

    try {
      // Sign in with Google - after sign-in, user will be redirected back
      // and we can proceed with checkout
      await signIn.social({
        provider: "google",
        callbackURL: "/sprint/checkout",
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
      setAuthMethod(null);
    }
  };

  const handleEmailCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAuthMethod("email");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      setAuthMethod(null);
      return;
    }

    try {
      // Capture local progress before redirect
      const localProgress = getLocalProgress();

      const res = await fetch("/api/sprint/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          localProgress,
          userId: session?.user?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      // Redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start checkout. Please try again."
      );
      setLoading(false);
      setAuthMethod(null);
    }
  };

  const handleAuthenticatedCheckout = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError(null);
    setAuthMethod("email");

    try {
      const localProgress = getLocalProgress();

      const res = await fetch("/api/sprint/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email.toLowerCase(),
          localProgress,
          userId: session.user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start checkout. Please try again."
      );
      setLoading(false);
      setAuthMethod(null);
    }
  };

  // Show loading state while checking session
  if (sessionLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/sprint"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to course
      </Link>

      {/* Canceled notice */}
      {canceled && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 text-sm text-amber-600 dark:text-amber-400">
          Your checkout was canceled. You can try again when you&apos;re ready.
        </div>
      )}

      {/* Header */}
      <header className="space-y-4">
        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
          Enroll in 7-Day Sprint
        </h1>
        <p className="text-lg text-muted-foreground">
          Go from project idea to deployed AI tool in one week.
        </p>
      </header>

      {/* Product Card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">One-time payment</div>
            <div className="flex items-end gap-2">
              <span className="font-display text-4xl font-bold">$297</span>
              <span className="text-muted-foreground mb-1">USD</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-success">
            <Shield className="size-4" />
            Secure checkout
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="size-5 text-success shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Error message */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Auth options */}
        {session?.user ? (
          // User is signed in - show direct checkout
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Signed in as <span className="text-foreground">{session.user.email}</span>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleAuthenticatedCheckout}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Lock className="size-4 mr-2" />
              )}
              Continue to Payment
            </Button>
          </div>
        ) : (
          // User not signed in - show auth options
          <div className="space-y-4">
            {/* Google Sign In */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading && authMethod === "google" ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <svg className="size-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Email checkout */}
            <form onSubmit={handleEmailCheckout} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={loading}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={loading || !email}
              >
                {loading && authMethod === "email" ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="size-4 mr-2" />
                )}
                Continue to Payment
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              You&apos;ll create your password after payment
            </p>
          </div>
        )}

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="size-3" />
            SSL Encrypted
          </span>
          <span className="flex items-center gap-1">
            <Zap className="size-3" />
            Instant Access
          </span>
        </div>
      </div>

      {/* Money back guarantee */}
      <div className="text-center text-sm text-muted-foreground">
        <strong className="text-foreground">7-Day Money Back Guarantee</strong>
        <br />
        If you don&apos;t ship a working tool, get a full refund.
      </div>
    </div>
  );
}

function CheckoutLoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
