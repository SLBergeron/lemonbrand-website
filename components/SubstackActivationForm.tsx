"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function SubstackActivationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState("");
  const [role, setRole] = useState("");
  const [painPoint, setPainPoint] = useState("");
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
      const response = await fetch("/api/substack/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          segment,
          role: role || undefined,
          painPoint: painPoint || undefined,
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
          disabled={status === "loading"}
        />
      </div>

      {/* Segment - Required */}
      <div className="space-y-3">
        <Label>What are you trying to build first? *</Label>
        <RadioGroup
          value={segment}
          onValueChange={setSegment}
          className="space-y-3"
          disabled={status === "loading"}
        >
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="internal-tool" id="internal-tool" className="mt-0.5" />
            <div className="flex-1">
              <Label htmlFor="internal-tool" className="cursor-pointer font-medium">
                Internal tool
              </Label>
              <p className="text-sm text-muted-foreground">
                Replace a SaaS you&apos;re overpaying for, automate reporting, build a dashboard
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="lead-gen" id="lead-gen" className="mt-0.5" />
            <div className="flex-1">
              <Label htmlFor="lead-gen" className="cursor-pointer font-medium">
                Lead-gen utility
              </Label>
              <p className="text-sm text-muted-foreground">
                Quote calculator, eligibility checker, mini-audit tool
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="offer-prototype" id="offer-prototype" className="mt-0.5" />
            <div className="flex-1">
              <Label htmlFor="offer-prototype" className="cursor-pointer font-medium">
                Offer prototype
              </Label>
              <p className="text-sm text-muted-foreground">
                Validate an idea before building fully, fake-door test, pre-sell
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Role - Optional */}
      <div className="space-y-2">
        <Label htmlFor="role">What&apos;s your role? (optional)</Label>
        <Input
          id="role"
          type="text"
          placeholder="e.g., Marketing consultant, Founder, Product manager"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={status === "loading"}
        />
      </div>

      {/* Pain Point - Optional */}
      <div className="space-y-2">
        <Label htmlFor="painPoint">Biggest recurring workflow pain? (optional)</Label>
        <Input
          id="painPoint"
          type="text"
          placeholder="e.g., Spending hours on proposals, manual data entry"
          value={painPoint}
          onChange={(e) => setPainPoint(e.target.value)}
          disabled={status === "loading"}
        />
      </div>

      {/* Tried Before - Optional */}
      <div className="space-y-3">
        <Label>Have you tried building with AI before? (optional)</Label>
        <RadioGroup
          value={triedBefore}
          onValueChange={setTriedBefore}
          className="flex gap-4"
          disabled={status === "loading"}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="tried-yes" />
            <Label htmlFor="tried-yes" className="cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="tried-no" />
            <Label htmlFor="tried-no" className="cursor-pointer">No</Label>
          </div>
        </RadioGroup>
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
        className="w-full"
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
            <ArrowRight className="w-4 h-4 ml-2" />
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
