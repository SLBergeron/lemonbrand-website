"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, XCircle, Zap, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
            // Delay accounts for entrance animation (0.5s duration + 0.2s delay = 0.7s)
            // Plus 300ms buffer for smooth visual transition
            verificationTimer = setTimeout(() => {
              setInternalVerified(true);
            }, 1000);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px" // Trigger when card is 50px into viewport
      }
    );

    observer.observe(currentCard);

    return () => {
      if (verificationTimer) clearTimeout(verificationTimer);
      observer.disconnect();
    };
  }, [controlledVerified]);

  const activeColorClass = "text-emerald-500";
  const activeBgClass = "bg-emerald-500/10";
  const activeBorderClass = "border-emerald-500/20";

  return (
    <div ref={cardRef}>
      <Card
        className={cn(
          "w-full sm:max-w-[340px]",
          "bg-background dark:bg-background/60 dark:backdrop-blur-xl",
          "border border-border dark:border-white/10",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
          "relative overflow-hidden",
          "transition-all duration-300 ease-in-out",
          "hover:scale-[1.02] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.3)]",
          className
        )}
      >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <CardTitle className="text-base sm:text-lg font-semibold truncate">{companyName}</CardTitle>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Contractor Profile
            </span>
          </div>
          {showToggle && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isVerified ? "text-emerald-500" : "text-muted-foreground"
                )}
              >
                {isVerified ? "Live" : "Hidden"}
              </span>
              <Switch
                checked={isVerified}
                onCheckedChange={(checked) => {
                  if (controlledVerified === undefined) {
                    setInternalVerified(checked);
                  }
                }}
                aria-label="Toggle verification status"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 sm:gap-4 px-4 sm:px-6">
        {/* Status Banner */}
        <div
          className={cn(
            "flex items-center gap-3 sm:gap-4 rounded-lg border p-2.5 sm:p-3 shadow-sm transition-all duration-500 ease-in-out",
            isVerified ? activeBorderClass : "border-destructive/20 bg-destructive/5"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ease-in-out shrink-0",
              isVerified ? activeBgClass : "bg-destructive/10"
            )}
          >
            {isVerified ? (
              <ShieldCheck className={cn("h-5 w-5 transition-all duration-500", activeColorClass)} />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-none">
              {isVerified ? "Verified & Indexable" : "Unverified Node"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isVerified ? "Visible to AI search engines" : "Invisible to AI queries"}
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="space-y-3 pt-2">
          {/* License */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isVerified ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <FileCheck className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">State License</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isVerified ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {isVerified ? "Verified #9942A" : "Pending"}
              </span>
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  isVerified ? "bg-emerald-500" : "bg-slate-300"
                )}
              />
            </div>
          </div>

          {/* Insurance */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isVerified ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Insurance (COI)</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isVerified ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {isVerified ? "$2M Active" : "Pending"}
              </span>
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  isVerified ? "bg-emerald-500" : "bg-slate-300"
                )}
              />
            </div>
          </div>

          {/* Response Time */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isVerified ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
                )}
              >
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isVerified ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {isVerified ? "< 15 Seconds" : "Unknown"}
              </span>
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  isVerified ? "bg-amber-500" : "bg-slate-300"
                )}
              />
            </div>
          </div>
        </div>

        {/* AI Graph Simulation */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">AI Search Impressions</span>
            <span
              className={cn(
                "text-xs font-bold transition-all duration-500",
                isVerified ? "text-emerald-500" : "text-muted-foreground"
              )}
            >
              {isVerified ? "+420% Increase" : "Flatline"}
            </span>
          </div>
          <div className="h-16 flex items-end gap-1 justify-between px-1">
            {[20, 25, 22, 30, 28, 45, 60, 85, 95, 100].map((h, i) => (
              <div
                key={i}
                className={cn(
                  "w-full rounded-t-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isVerified ? "bg-primary/80" : "bg-muted",
                  isVerified && i > 4 && "bg-emerald-500"
                )}
                style={{
                  height: isVerified ? `${h}%` : "20%",
                  opacity: isVerified ? 1 : 0.3,
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
