"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FormStatus = "idle" | "loading" | "success" | "error";

const PAIN_POINT_OPTIONS = [
  { value: "proposals", label: "Writing proposals/quotes" },
  { value: "data-entry", label: "Manual data entry" },
  { value: "reporting", label: "Creating reports" },
  { value: "client-comms", label: "Client communication" },
  { value: "other", label: "Other" },
];

export function SubstackActivationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState("");
  const [role, setRole] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [painPointOther, setPainPointOther] = useState("");
  const [triedBefore, setTriedBefore] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !segment) {
      setErrorMessage("Please fill in all required fields");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const finalPainPoint = painPoint === "other" ? painPointOther : painPoint;

      const response = await fetch("/api/substack/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          segment,
          role: role || undefined,
          painPoint: finalPainPoint || undefined,
          triedBefore: triedBefore || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Check your email!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your Build Stack Starter Kit is on the way. Look for an email from Simon Bergeron.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 mb-6">
        <h3 className="font-display text-2xl font-semibold">Get the Template</h3>
        <p className="text-muted-foreground text-sm">
          Tell me what you&apos;re building so I can send you the right context file examples.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={status === "loading"}
          className="bg-background/50"
        />
      </div>

      {/* Segment - Required - Tappable Cards */}
      <div className="space-y-3">
        <Label>What are you trying to build first? *</Label>
        <div className="space-y-3">
          {[
            {
              value: "internal-tool",
              label: "Internal tool",
              description: "Replace a SaaS you're overpaying for, automate reporting, build a dashboard",
              icon: "/assets/3dicons/3dicons-tools-dynamic-color.png",
            },
            {
              value: "lead-gen",
              label: "Lead-gen utility",
              description: "Quote calculator, eligibility checker, mini-audit tool",
              icon: "/assets/3dicons/3dicons-calculator-dynamic-color.png",
            },
            {
              value: "offer-prototype",
              label: "Offer prototype",
              description: "Validate an idea before building fully, fake-door test, pre-sell",
              icon: "/assets/3dicons/3dicons-target-dynamic-color.png",
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSegment(option.value)}
              disabled={status === "loading"}
              className={cn(
                "w-full flex items-start gap-3 p-4 rounded-lg border transition-all text-left",
                "hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50",
                segment === option.value
                  ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                  : "border-border/50 bg-card"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors",
                  segment === option.value
                    ? "border-accent bg-accent"
                    : "border-muted-foreground/40"
                )}
              >
                {segment === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="relative w-8 h-8 flex-shrink-0 hidden xs:block">
                <Image
                  src={option.icon}
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium block">{option.label}</span>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Fields Group */}
      <div className="space-y-4 pt-4 border-t border-border/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Optional (Helps me create better content)
        </p>

        {/* Role - Optional */}
        <div className="space-y-2">
          <Label htmlFor="role">What&apos;s your role?</Label>
          <Input
            id="role"
            type="text"
            placeholder="e.g., Marketing consultant, Founder, Product manager"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={status === "loading"}
            autoComplete="organization-title"
            className="bg-background/50"
          />
        </div>

        {/* Pain Point - Optional - Now with selectable options */}
        <div className="space-y-3">
          <Label>What workflow takes up too much of your time?</Label>
          <div className="flex flex-wrap gap-2">
            {PAIN_POINT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPainPoint(option.value)}
                disabled={status === "loading"}
                className={cn(
                  "px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                  "hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50",
                  painPoint === option.value
                    ? "border-accent bg-accent/10 text-accent-foreground"
                    : "border-border/50 bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {painPoint === "other" && (
            <Input
              type="text"
              placeholder="Tell me more..."
              value={painPointOther}
              onChange={(e) => setPainPointOther(e.target.value)}
              disabled={status === "loading"}
              className="bg-background/50 mt-2"
              autoFocus
            />
          )}
        </div>

        {/* Tried Before - Optional - Large toggle buttons */}
        <div className="space-y-3">
          <Label>Have you tried building with AI before?</Label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTriedBefore("yes")}
              disabled={status === "loading"}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                "hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50",
                triedBefore === "yes"
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border/50 bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setTriedBefore("no")}
              disabled={status === "loading"}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                "hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50",
                triedBefore === "no"
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border/50 bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {status === "error" && errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full text-base py-6"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Get the Build Stack Starter Kit
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You&apos;ll get the CLAUDE.md template + a 5-email welcome sequence.
        <br />
        Unsubscribe anytime.
      </p>
    </form>
  );
}
