"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, XCircle, Zap, FileCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContractorTrustCardProps {
  className?: string;
  isVerified?: boolean;
  companyName?: string;
  showToggle?: boolean;
}

export function ContractorTrustCard({
  className,
  isVerified: controlledVerified,
  companyName = "Apex Builders & HVAC",
  showToggle = true,
}: ContractorTrustCardProps) {
  const [internalVerified, setInternalVerified] = useState(false);
  const isVerified = controlledVerified !== undefined ? controlledVerified : internalVerified;

  const hasAnimatedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when card enters viewport
  useEffect(() => {
    if (controlledVerified !== undefined) return;

    let verificationTimer: NodeJS.Timeout | null = null;
    const currentCard = cardRef.current;

    if (!currentCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            verificationTimer = setTimeout(() => {
              setInternalVerified(true);
            }, 1000);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    observer.observe(currentCard);

    return () => {
      if (verificationTimer) clearTimeout(verificationTimer);
      observer.disconnect();
    };
  }, [controlledVerified]);

  return (
    <div ref={cardRef}>
      <div
        className={cn(
          "w-full sm:w-[360px]",
          "rounded-2xl",
          "bg-gradient-to-b from-background to-background/95",
          "dark:from-zinc-900 dark:to-zinc-950",
          "border border-border/60 dark:border-white/10",
          "shadow-xl dark:shadow-2xl dark:shadow-black/40",
          "relative overflow-hidden",
          "transition-all duration-500 ease-out",
          className
        )}
      >
        {/* Top accent line - subtle border highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

        {/* Card content */}
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold tracking-tight truncate">
                {companyName}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                Contractor Profile
              </p>
            </div>

            {showToggle && (
              <button
                onClick={() => {
                  if (controlledVerified === undefined) {
                    setInternalVerified(!internalVerified);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                  "border",
                  isVerified
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                )}
                aria-label="Toggle verification status"
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                  isVerified ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"
                )} />
                {isVerified ? "Live" : "Hidden"}
              </button>
            )}
          </div>

          {/* Status Banner */}
          <div
            className={cn(
              "relative rounded-xl p-4 mb-5 transition-all duration-500",
              "border",
              isVerified
                ? "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20"
                : "bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent border-destructive/20"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500",
                  isVerified
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-destructive/15 text-destructive"
                )}
              >
                {isVerified ? (
                  <ShieldCheck className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
              </div>
              <div>
                <p className="font-semibold text-base">
                  {isVerified ? "Verified & Indexable" : "Unverified Node"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isVerified ? "Visible to AI search engines" : "Invisible to AI queries"}
                </p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="space-y-3 mb-5">
            {[
              {
                icon: FileCheck,
                label: "State License",
                value: isVerified ? "#9942A" : "Pending",
                verified: isVerified,
                color: "primary"
              },
              {
                icon: ShieldCheck,
                label: "Insurance (COI)",
                value: isVerified ? "$2M Active" : "Pending",
                verified: isVerified,
                color: "primary"
              },
              {
                icon: Zap,
                label: "Response Time",
                value: isVerified ? "< 15 sec" : "Unknown",
                verified: isVerified,
                color: "amber"
              }
            ].map((signal, index) => (
              <div
                key={signal.label}
                className={cn(
                  "flex items-center justify-between py-2.5 px-3 rounded-lg transition-all duration-500",
                  "bg-muted/30 dark:bg-white/[0.02]",
                  isVerified && "bg-muted/50 dark:bg-white/[0.04]"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-all duration-500",
                      signal.verified
                        ? signal.color === "amber"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <signal.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{signal.label}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "text-sm font-medium tabular-nums transition-all duration-500",
                      signal.verified ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {signal.value}
                  </span>
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-500",
                      signal.verified
                        ? signal.color === "amber"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                        : "bg-muted-foreground/30"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Graph */}
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className={cn(
                  "h-4 w-4 transition-colors duration-500",
                  isVerified ? "text-emerald-500" : "text-muted-foreground"
                )} />
                <span className="text-sm font-medium text-muted-foreground">
                  AI Search Impressions
                </span>
              </div>
              <span
                className={cn(
                  "text-sm font-bold transition-all duration-500",
                  isVerified ? "text-emerald-500" : "text-muted-foreground"
                )}
              >
                {isVerified ? "+420%" : "—"}
              </span>
            </div>

            {/* Bar chart */}
            <div className="h-20 flex items-end gap-1 px-1">
              {[18, 22, 20, 28, 25, 42, 58, 78, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-t-sm transition-all duration-700",
                    "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isVerified
                      ? i > 4
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        : "bg-primary/70"
                      : "bg-muted"
                  )}
                  style={{
                    height: isVerified ? `${h}%` : "18%",
                    opacity: isVerified ? 1 : 0.4,
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-0.5">
              <span className="text-[10px] text-muted-foreground">Week 1</span>
              <span className="text-[10px] text-muted-foreground">Week 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
