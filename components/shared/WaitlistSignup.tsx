"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Bell } from "lucide-react";

interface WaitlistSignupProps {
  productName: string;
  productSlug: string;
  className?: string;
}

export function WaitlistSignup({ productName, productSlug, className = "" }: WaitlistSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `waitlist-${productSlug}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(`We'll notify you when ${productName} launches!`);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-sm text-success ${className}`}>
        <Check className="w-4 h-4" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 text-sm"
          disabled={status === "loading"}
          required
        />
        <Button
          type="submit"
          size="sm"
          variant="outline"
          className="shrink-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Bell className="w-4 h-4 mr-1" />
              Notify Me
            </>
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-xs text-destructive">{message}</p>
      )}
    </form>
  );
}
