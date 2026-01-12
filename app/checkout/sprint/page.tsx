"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { SpotsBadge } from "@/components/spots-counter";
import { Check, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutSprintPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  const cohort = useQuery(api.sprintCohorts.getActive);
  const user = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wasCanceled = searchParams.get("canceled") === "true";

  // Redirect to join if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/join/sprint");
    }
  }, [session, isPending, router]);

  const handleCheckout = async () => {
    if (!user || !cohort) return;

    setIsLoading(true);
    setError(null);

    try {
      // Get project idea from session storage
      const projectIdea = sessionStorage.getItem("sprintProjectIdea") || "";

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          email: user.email,
          name: user.name,
          cohortId: cohort.cohortId,
          projectIdea,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tight"
          >
            LemonBrand
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Sprint Enrollment</span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8">
            {[
              { step: 1, label: "Account", done: true },
              { step: 2, label: "Payment", active: true },
              { step: 3, label: "Welcome", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    item.done
                      ? "bg-success text-success-foreground"
                      : item.active
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.done ? <Check className="w-3 h-3" /> : item.step}
                </div>
                <span
                  className={
                    item.active ? "text-foreground font-medium" : "text-muted-foreground"
                  }
                >
                  {item.label}
                </span>
                {i < 2 && (
                  <div className="w-12 h-px bg-border ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {wasCanceled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-muted border border-border flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Payment was canceled</p>
              <p className="text-sm text-muted-foreground">
                No worries! You can try again when you&apos;re ready.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Payment Info */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Complete Your Enrollment
              </h1>
              <p className="text-muted-foreground mb-8">
                You&apos;re one step away from building your first AI tool.
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h2 className="font-semibold text-foreground mb-4">
                    Secure Payment
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout to complete
                    your payment. We accept all major credit cards.
                  </p>

                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isLoading || !cohort || !user}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirecting to payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay $297 and Start
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span>Secure payment via Stripe</span>
                  </div>
                  <span>•</span>
                  <span>48-hour refund policy</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-8"
            >
              <div className="p-6 rounded-xl bg-card border-2 border-accent/20">
                <h2 className="font-semibold text-foreground mb-4">
                  Your Sprint
                </h2>

                <div className="space-y-4 pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-foreground">7-Day Claude Code Sprint</span>
                    <span className="font-semibold">$297</span>
                  </div>
                </div>

                <ul className="py-4 space-y-2">
                  {[
                    "7 daily trainings",
                    "Private Discord cohort",
                    "Daily project feedback",
                    "Ship Day demo call",
                    "CLAUDE.md template",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="py-4 border-t border-border">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$297</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-medium text-foreground">
                    Complete = $297 credit
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Finish all 7 days and this becomes credit toward the 8-Week
                    program.
                  </p>
                </div>

                {cohort && (
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Next cohort</p>
                      <p className="font-medium text-sm">{cohort.name}</p>
                    </div>
                    <SpotsBadge remaining={cohort.spotsRemaining} />
                  </div>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                By enrolling, you agree to our{" "}
                <Link href="/legal/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
