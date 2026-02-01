"use client";

import { FormSection, FormField } from "@/lib/lessons/types";
import { Download, Check, Loader2, Mic, Sparkles } from "lucide-react";
import { Button, cn } from "@lemonbrand/ui";
import { useState, useEffect, useRef } from "react";
import { useAchievementContext } from "@/context/AchievementContext";
import { useVisitorId } from "@/hooks/useVisitorId";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import { IdeaFinder } from "@/components/IdeaFinder";

interface Props {
  section: FormSection;
  isPreview: boolean;
  day: number;
}

// Helper to count words in a string
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function FormSectionComponent({ section, isPreview, day }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<string | null>(null);
  const [justGenerated, setJustGenerated] = useState(false);
  const [showIdeaFinder, setShowIdeaFinder] = useState(false);
  const { recordWordCount, recordFormEdit } = useAchievementContext();
  const hasSubmittedOnce = useRef(false);

  // Visitor ID for anonymous tracking
  const { visitorId } = useVisitorId();

  // Session and enrollment state
  const { data: session } = useSession();
  const betterAuthId = session?.user?.id;

  // Get user from Convex (for enrolled users)
  const convexUser = useQuery(
    api.users.getByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );

  // Check enrollment status
  const hasEnrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollmentByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );
  const isEnrolled = hasEnrollment === true;

  // Convex mutations
  const saveAnonymousProgress = useMutation(api.anonymousProgress.saveAnonymousProgress);
  const saveFormResponse = useMutation(api.sprintFormResponses.save);

  // Clear the "just generated" state after animation completes
  useEffect(() => {
    if (justGenerated) {
      const timer = setTimeout(() => setJustGenerated(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [justGenerated]);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // Trigger IdeaFinder when user selects "no idea" on Day 0
    if (fieldId === "has-idea" && value === "no-idea" && day === 0) {
      setShowIdeaFinder(true);
    }
  };

  const handleIdeaSelected = (idea: {
    projectIdea: string;
    targetUser: string;
    currentProcess: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      "has-idea": "rough",
      whatToBuild: idea.projectIdea,
      currentProcess: idea.currentProcess,
      ...(idea.targetUser && {
        whoIsItFor:
          idea.targetUser === "Just me"
            ? "me"
            : idea.targetUser === "My team"
              ? "team"
              : idea.targetUser === "My clients"
                ? "clients"
                : "public",
      }),
    }));
    setShowIdeaFinder(false);
  };

  const generateMarkdownFromTemplate = () => {
    if (!section.generateFile) return null;

    let content = section.generateFile.template;
    Object.entries(formData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, "g"), value || "");
    });
    return content;
  };

  const generateWithAI = async (): Promise<string | null> => {
    const aiConfig = section.generateFile?.aiGeneration;
    if (!aiConfig?.enabled) return null;

    try {
      const response = await fetch(aiConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        return null; // Fall back to template
      }

      const data = await response.json();

      // If rate limited or fallback triggered, return null to use template
      if (data.fallback) {
        return null;
      }

      return data.content;
    } catch (error) {
      console.error("AI generation failed:", error);
      return null; // Fall back to template
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const aiConfig = section.generateFile?.aiGeneration;

    if (aiConfig?.enabled) {
      setIsGenerating(true);
      try {
        // Try AI generation first
        const aiContent = await generateWithAI();

        if (aiContent) {
          setGeneratedFile(aiContent);
        } else {
          // Fallback to template silently
          const markdown = generateMarkdownFromTemplate();
          setGeneratedFile(markdown);
        }
      } finally {
        setIsGenerating(false);
      }
    } else {
      // No AI generation - use template
      const markdown = generateMarkdownFromTemplate();
      setGeneratedFile(markdown);
    }

    setSubmitted(true);
    setJustGenerated(true);

    // Always save to localStorage for preview days (fallback)
    if (isPreview) {
      const key = `sprint-day-${day}-form`;
      localStorage.setItem(key, JSON.stringify(formData));
    }

    // Save to Convex based on enrollment status
    try {
      if (isEnrolled && convexUser) {
        // Enrolled user: save to sprintFormResponses
        await saveFormResponse({
          userId: convexUser._id,
          day,
          responses: formData,
          generatedContent: generatedFile || undefined,
        });
      } else if (visitorId) {
        // Anonymous visitor: save to anonymousProgress
        await saveAnonymousProgress({
          visitorId,
          type: "form",
          day,
          data: {
            responses: formData,
            generatedContent: generatedFile || undefined,
          },
        });
      }
    } catch (error) {
      // Non-critical: localStorage backup exists, log and continue
      console.error("Failed to save form response to Convex:", error);
    }

    // Track word counts for verbose achievement (Day 0 project brief)
    if (day === 0) {
      // Track the "whatToBuild" field specifically for the verbose achievement
      const whatToBuildField = section.fields.find(
        (f) => f.id === "whatToBuild" || f.id === "projectBrief"
      );
      if (whatToBuildField) {
        const text = formData[whatToBuildField.id] || "";
        const wordCount = countWords(text);
        recordWordCount(whatToBuildField.id, wordCount);
      }

      // Also track any textarea fields for verbose
      section.fields
        .filter((f) => f.type === "textarea")
        .forEach((f) => {
          const text = formData[f.id] || "";
          const wordCount = countWords(text);
          recordWordCount(f.id, wordCount);
        });
    }

    hasSubmittedOnce.current = true;
  };

  const downloadFile = () => {
    if (!generatedFile || !section.generateFile) return;

    const blob = new Blob([generatedFile], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = section.generateFile.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isComplete = section.fields
    .filter((f) => {
      if (!f.required) return false;
      // Exclude hidden conditional fields from required check
      if (f.conditionalOn) {
        const { fieldId, operator, value: condValue } = f.conditionalOn;
        const currentValue = formData[fieldId] || "";
        const isVisible =
          operator === "eq"
            ? currentValue === condValue
            : currentValue !== condValue;
        if (!isVisible) return false;
      }
      return true;
    })
    .every((f) => formData[f.id]?.trim());

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">{section.title}</h2>
        {section.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {section.description}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {section.fields.map((field) => {
          // Handle conditional field visibility
          if (field.conditionalOn) {
            const { fieldId, operator, value: condValue } = field.conditionalOn;
            const currentValue = formData[fieldId] || "";
            const isVisible =
              operator === "eq"
                ? currentValue === condValue
                : currentValue !== condValue;
            if (!isVisible) return null;
          }

          return (
            <FormFieldComponent
              key={field.id}
              field={field}
              value={formData[field.id] || ""}
              onChange={(value) => handleChange(field.id, value)}
              disabled={submitted || isGenerating}
            />
          );
        })}

        {/* IdeaFinder inline for Day 0 "no idea" users */}
        {showIdeaFinder && day === 0 && (
          <IdeaFinder
            role={formData["role"] || ""}
            techComfort={formData["tech-comfort"] || ""}
            onIdeaSelected={handleIdeaSelected}
            onCancel={() => {
              setShowIdeaFinder(false);
              setFormData((prev) => ({ ...prev, "has-idea": "rough" }));
            }}
          />
        )}

        {!submitted && !isGenerating ? (
          <Button
            type="submit"
            variant="accent"
            disabled={!isComplete}
          >
            {section.submitLabel || "Submit"}
          </Button>
        ) : isGenerating ? (
          <Button variant="accent" disabled>
            <Loader2 className="size-4 mr-2 animate-spin" />
            {section.generateFile?.aiGeneration?.loadingText || "Generating your project brief..."}
          </Button>
        ) : (
          <div className="space-y-4">
            {justGenerated && (
              <div className="flex items-center gap-2 text-accent animate-fade-in">
                <Sparkles className="size-5 animate-sparkle" />
                <span className="text-sm font-medium">Your project brief is ready!</span>
              </div>
            )}

            {!justGenerated && (
              <p className="text-sm text-success flex items-center gap-2">
                <Check className="size-4" />
                Saved
              </p>
            )}

            {generatedFile && section.generateFile && (
              <div
                className={cn(
                  "border rounded-lg overflow-hidden transition-all duration-500",
                  justGenerated
                    ? "border-accent/50 shadow-[0_0_20px_rgba(var(--accent),0.3)] animate-pop-in"
                    : "border-border/50"
                )}
              >
                <div className={cn(
                  "flex items-center justify-between px-4 py-2 border-b transition-colors duration-500",
                  justGenerated
                    ? "bg-accent/10 border-accent/30"
                    : "bg-muted/30 border-border/50"
                )}>
                  <span className="text-sm font-mono">
                    {section.generateFile.filename}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                  >
                    <Download className="size-4 mr-1" />
                    Download
                  </Button>
                </div>
                <pre className="text-xs text-muted-foreground p-4 overflow-auto whitespace-pre-wrap">
                  {generatedFile}
                </pre>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                // Track form edit for revisionist achievement
                if (hasSubmittedOnce.current) {
                  recordFormEdit(`day-${day}-form`);
                }
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Edit
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

function FormFieldComponent({
  field,
  value,
  onChange,
  disabled,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const baseInputClass =
    "w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50";

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <span>
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </span>
        {field.voiceEnabled && (
          <span className="text-accent" title="Use your voice">
            <Mic className="size-4" />
          </span>
        )}
      </label>

      {field.type === "text" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          className={baseInputClass}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          rows={3}
          className={cn(baseInputClass, "resize-none")}
        />
      )}

      {field.type === "radio" && field.options && (
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors",
                value === option.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border hover:border-muted-foreground",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <input
                type="radio"
                name={field.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}

      {field.type === "select" && field.options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={baseInputClass}
        >
          <option value="">Select...</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {field.minLengthHint &&
        (field.type === "textarea" || field.type === "text") &&
        value.length > 0 &&
        value.length < field.minLengthHint && (
          <p className="text-xs text-amber-500">
            Add more detail for better personalized tips.
          </p>
        )}

      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}
    </div>
  );
}
