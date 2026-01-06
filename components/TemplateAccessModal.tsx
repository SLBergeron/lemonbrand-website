"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";

interface Template {
  _id: Id<"templates">;
  title: string;
  description: string;
  category: string;
}

interface TemplateAccessModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

interface AccessResult {
  title: string;
  description: string;
  githubUrl: string;
  guideUrl?: string;
  prerequisites: string[];
}

export default function TemplateAccessModal({
  template,
  isOpen,
  onClose,
}: TemplateAccessModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");
  const [result, setResult] = useState<AccessResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !template) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/templates/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, templateId: template._id }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResult(data.template);
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong.");
    }
  };

  const handleClose = () => {
    setStatus("form");
    setEmail("");
    setResult(null);
    setError("");
    onClose();
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border border-border p-0">
        {status === "success" && result ? (
          // Success state - show template access
          <div className="p-6">
            <DialogTitle className="text-lg font-semibold mb-4">
              {result.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mb-6">
              {result.description}
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                  Prerequisites
                </p>
                <ul className="text-sm space-y-1">
                  {result.prerequisites.map((prereq) => (
                    <li key={prereq}>• {prereq}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <a
                  href={result.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Open on GitHub →
                </a>
              </div>

              <p className="text-xs text-muted-foreground">
                Check your email to confirm your subscription.
              </p>
            </div>
          </div>
        ) : (
          // Form state
          <div className="p-6">
            <DialogTitle className="text-lg font-semibold mb-2">
              Get {template.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your email to access this template.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="w-full px-4 py-2 text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground disabled:opacity-50"
              />

              {status === "error" && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Loading..." : "Get Template"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                You&apos;ll also get my weekly newsletter. Unsubscribe anytime.
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
