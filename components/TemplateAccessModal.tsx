"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, Play, ExternalLink, ArrowRight } from "lucide-react";
import { Template } from "./TemplateCard";

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

const categoryConfig = {
  process: {
    label: "Process",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    icon: "📋",
  },
  code: {
    label: "Code",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    icon: "💻",
  },
  ai: {
    label: "AI",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    icon: "🤖",
  },
};

export default function TemplateAccessModal({
  template,
  isOpen,
  onClose,
}: TemplateAccessModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"preview" | "form" | "loading" | "success" | "error">("preview");
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
    setStatus("preview");
    setEmail("");
    setResult(null);
    setError("");
    onClose();
  };

  if (!template) return null;

  const category = categoryConfig[template.category];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background border border-border p-0 overflow-hidden">
        {status === "success" && result ? (
          // Success state - show template access
          <div className="p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <DialogTitle className="font-display text-xl font-semibold tracking-tight mb-2">
              You&apos;re in!
            </DialogTitle>
            <p className="text-muted-foreground mb-6">
              Here&apos;s your access to {result.title}
            </p>

            <div className="space-y-4">
              {result.prerequisites.length > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                    Before you start
                  </p>
                  <ul className="text-sm space-y-1">
                    {result.prerequisites.map((prereq) => (
                      <li key={prereq} className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={result.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
              >
                Open on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-xs text-muted-foreground text-center">
                Check your email to confirm your subscription and get future templates.
              </p>
            </div>
          </div>
        ) : status === "form" || status === "loading" || status === "error" ? (
          // Email form state
          <div className="p-6">
            <button
              onClick={() => setStatus("preview")}
              className="text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              ← Back to details
            </button>

            <DialogTitle className="font-display text-xl font-semibold tracking-tight mb-2">
              Get {template.title}
            </DialogTitle>
            <p className="text-muted-foreground text-sm mb-6">
              Enter your email to access. You&apos;ll also get my weekly newsletter with new templates and lessons.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoFocus
                disabled={status === "loading"}
                className="w-full px-4 py-3 text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
              />

              {status === "error" && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-4 py-3 text-sm font-medium bg-accent text-accent-foreground rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Getting your access..." : "Get Free Access"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>
        ) : (
          // Preview state - show full template details
          <div>
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${category.color}`}>
                  <span>{category.icon}</span>
                  {category.label}
                </span>
                {template.videoUrl && (
                  <a
                    href={template.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-full transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Watch video
                  </a>
                )}
              </div>

              <DialogTitle className="font-display text-2xl font-semibold tracking-tight mb-1">
                {template.title}
              </DialogTitle>
              {template.tagline && (
                <p className="text-accent font-medium mb-3">
                  {template.tagline}
                </p>
              )}
              <p className="text-muted-foreground">
                {template.description}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto">
              {/* Who is this for */}
              {template.whoIsThisFor && (
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-xs font-medium uppercase tracking-wide text-accent mb-1">
                    Who this is for
                  </p>
                  <p className="text-sm">{template.whoIsThisFor}</p>
                </div>
              )}

              {/* What you'll get */}
              {template.whatYoullGet && template.whatYoullGet.length > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    What you&apos;ll get
                  </p>
                  <ul className="space-y-2">
                    {template.whatYoullGet.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prerequisites */}
              {template.prerequisites.length > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Prerequisites
                  </p>
                  <ul className="space-y-1">
                    {template.prerequisites.map((prereq, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span>•</span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="p-6 pt-4 border-t border-border/50 bg-muted/30">
              <button
                onClick={() => setStatus("form")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
              >
                Get Free Access
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Free forever. Enter email to access.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
