"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@lemonbrand/ui";
import {
  ArrowRight,
  CheckCircle2,
  PartyPopper,
  MessageCircle,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { signUp, useSession, getSession } from "@/lib/auth-client";

type PageState = "loading" | "needs_account" | "creating_account" | "success" | "error";

const LOCAL_PROGRESS_KEY = "sprint-preview-progress";

function clearLocalProgress() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_PROGRESS_KEY);
  }
}

function WelcomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const sessionId = searchParams.get("session_id");

  const [pageState, setPageState] = useState<PageState>("loading");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localProgress, setLocalProgress] = useState<unknown>(null);

  // Check purchase status when session_id is available
  useEffect(() => {
    if (!sessionId) {
      setPageState("error");
      setError("No session ID provided. Please try the checkout again.");
      return;
    }

    checkPurchaseStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Handle already-authenticated users
  useEffect(() => {
    if (session?.user && pageState === "needs_account") {
      // User is already signed in (e.g., Google auth) - complete enrollment
      completeEnrollment(session.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, pageState]);

  const checkPurchaseStatus = async () => {
    try {
      const res = await fetch(`/api/sprint/complete-signup?session_id=${sessionId}`);
      const data = await res.json();

      if (!res.ok) {
        // If payment not completed yet, it might still be processing
        if (data.error === "Payment not completed") {
          // Wait and retry
          setTimeout(checkPurchaseStatus, 2000);
          return;
        }
        throw new Error(data.error || "Failed to verify purchase");
      }

      setEmail(data.email);
      setLocalProgress(data.localProgress);

      // If user is already signed in, complete enrollment
      if (session?.user) {
        completeEnrollment(session.user.id);
      } else {
        setPageState("needs_account");
      }
    } catch (err) {
      console.error("Check purchase error:", err);
      setPageState("error");
      setError(err instanceof Error ? err.message : "Failed to verify your purchase");
    }
  };

  // Poll for session to be ready after account creation
  // This handles the race condition where Better Auth sets the session
  // but UserSyncProvider hasn't synced the user to Convex yet
  const waitForSessionAndComplete = async (maxAttempts = 10): Promise<void> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const sessionRes = await getSession();
        if (sessionRes.data?.user?.id) {
          console.log(`[Welcome] Session ready on attempt ${attempt + 1}, completing enrollment`);
          await completeEnrollment(sessionRes.data.user.id);
          return;
        }
      } catch (err) {
        console.log(`[Welcome] Session check attempt ${attempt + 1} failed:`, err);
      }
      // Wait before next attempt (500ms between attempts)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    // If we get here, session never became ready
    setPageState("error");
    setError("Account created but session not ready. Please refresh the page to continue.");
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setPageState("creating_account");
    setError(null);

    try {
      // Create account via Better Auth
      const result = await signUp.email({
        email,
        password,
        name: name || email.split("@")[0],
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to create account");
      }

      // Account created - poll for session to be ready
      // This gives UserSyncProvider time to sync the user to Convex
      console.log("[Welcome] Account created, polling for session...");
      await waitForSessionAndComplete();
    } catch (err) {
      console.error("Create account error:", err);
      setPageState("needs_account");
      setError(err instanceof Error ? err.message : "Failed to create account");
    }
  };

  const completeEnrollmentWithSession = async () => {
    // Get fresh session
    const res = await fetch("/api/sprint/complete-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        name: name || email.split("@")[0],
      }),
    });

    const data = await res.json();

    if (data.status === "pending_account") {
      // Still needs account - something went wrong
      setPageState("needs_account");
      setError("Account creation failed. Please try again.");
      return;
    }

    if (!res.ok) {
      throw new Error(data.error || "Failed to complete enrollment");
    }

    // Clear local progress after syncing
    clearLocalProgress();
    setPageState("success");
  };

  const completeEnrollment = async (userId: string, maxRetries = 5) => {
    setPageState("creating_account");

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`[Welcome] Completing enrollment attempt ${attempt + 1}/${maxRetries}`);

        const res = await fetch("/api/sprint/complete-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userId,
            name: session?.user?.name || name,
          }),
        });

        const data = await res.json();

        // Handle user sync pending - API returns 503 if user not yet in Convex
        if (res.status === 503 && data.code === "USER_SYNC_PENDING") {
          console.log(`[Welcome] User sync pending, retrying in ${500 * Math.pow(2, attempt)}ms...`);
          await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, attempt)));
          continue;
        }

        if (!res.ok) {
          throw new Error(data.error || "Failed to complete enrollment");
        }

        // Clear local progress after syncing
        clearLocalProgress();
        setPageState("success");
        return;
      } catch (err) {
        console.error(`Complete enrollment attempt ${attempt + 1} error:`, err);
        // If this is the last attempt, throw the error
        if (attempt === maxRetries - 1) {
          setPageState("error");
          setError(err instanceof Error ? err.message : "Failed to complete enrollment");
          return;
        }
        // Otherwise wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, attempt)));
      }
    }
  };

  // Loading state
  if (pageState === "loading" || sessionLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
        <Loader2 className="size-12 mx-auto animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Verifying your purchase...</p>
      </div>
    );
  }

  // Error state
  if (pageState === "error") {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
        <div className="size-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button asChild variant="outline">
          <Link href="/sprint/checkout">Back to Checkout</Link>
        </Button>
      </div>
    );
  }

  // Account creation form
  if (pageState === "needs_account" || pageState === "creating_account") {
    return (
      <div className="max-w-md mx-auto space-y-6 py-8">
        {/* Success badge */}
        <div className="text-center">
          <div className="size-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-8 text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Payment successful!</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>

        {/* Account form */}
        <form onSubmit={handleCreateAccount} className="space-y-4">
          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-muted-foreground"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              disabled={pageState === "creating_account"}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (8+ characters)"
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={pageState === "creating_account"}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full"
            disabled={pageState === "creating_account" || !password}
          >
            {pageState === "creating_account" ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="size-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
      {/* Success Icon */}
      <div className="size-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
        <PartyPopper className="size-10 text-success" />
      </div>

      {/* Header */}
      <header className="space-y-4">
        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
          Welcome to the Sprint!
        </h1>
        <p className="text-lg text-muted-foreground">
          You&apos;re officially enrolled. Let&apos;s build something amazing together.
        </p>
      </header>

      {/* Next Steps */}
      <div className="text-left rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-display font-semibold text-lg">Your Next Steps</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Join the Discord</div>
              <div className="text-sm text-muted-foreground">
                Connect with other builders and get support
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Continue to Day 2</div>
              <div className="text-sm text-muted-foreground">
                Pick up where you left off with full access
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Post Your Progress</div>
              <div className="text-sm text-muted-foreground">
                Share daily updates in #sprint-progress
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="accent" size="lg">
          <Link href="/sprint/day/2">
            Continue to Day 2
            <ArrowRight className="size-4 ml-1" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a
            href="https://discord.gg/lemonbrand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4 mr-2" />
            Join Discord
          </a>
        </Button>
      </div>

      {/* Support */}
      <p className="text-sm text-muted-foreground">
        Questions? Email{" "}
        <a href="mailto:support@lemonbrand.io" className="text-accent hover:underline">
          support@lemonbrand.io
        </a>
      </p>
    </div>
  );
}

function WelcomeLoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
      <Loader2 className="size-12 mx-auto animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<WelcomeLoadingFallback />}>
      <WelcomeContent />
    </Suspense>
  );
}
