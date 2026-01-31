"use client";

import { useState } from "react";
import { Button, cn } from "@lemonbrand/ui";
import { Loader2, Lightbulb, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IdeaSuggestion {
  name: string;
  oneLiner: string;
  whyItFits: string;
  complexity: string;
  suggestedTargetUser: string;
  suggestedCurrentProcess: string;
}

interface IdeaFinderProps {
  role: string;
  techComfort: string;
  onIdeaSelected: (idea: {
    projectIdea: string;
    targetUser: string;
    currentProcess: string;
  }) => void;
  onCancel: () => void;
}

const QUESTIONS = [
  {
    id: "annoyance",
    question:
      "What's something you do repeatedly at work or in life that annoys you?",
    placeholder:
      "e.g., I have to manually copy data from emails into a spreadsheet every morning...",
  },
  {
    id: "magicWand",
    question:
      "If you could wave a magic wand and have one tool that doesn't exist, what would it do?",
    placeholder:
      "e.g., It would automatically organize my client notes by project and highlight action items...",
  },
  {
    id: "dataDealtWith",
    question:
      "What kind of data or information do you deal with regularly?",
    placeholder:
      "e.g., Client invoices, project timelines, inventory counts, meeting notes...",
  },
];

export function IdeaFinder({
  role,
  techComfort,
  onIdeaSelected,
  onCancel,
}: IdeaFinderProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<IdeaSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = QUESTIONS[step];
  const isOnQuestions = step < QUESTIONS.length;

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      generateIdeas();
    }
  };

  const generateIdeas = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/sprint/idea-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          techComfort,
          annoyance: answers.annoyance || "",
          magicWand: answers.magicWand || "",
          dataDealtWith: answers.dataDealtWith || "",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate ideas. Try again.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setSuggestions(data.ideas);
      setStep(QUESTIONS.length);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectIdea = (idea: IdeaSuggestion) => {
    onIdeaSelected({
      projectIdea: `${idea.name}: ${idea.oneLiner}`,
      targetUser: idea.suggestedTargetUser,
      currentProcess: idea.suggestedCurrentProcess,
    });
  };

  return (
    <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="size-5 text-accent" />
        <h3 className="font-display font-semibold">Idea Finder</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Answer a few questions and we&apos;ll suggest Sprint-sized project ideas
        based on your background.
      </p>

      {/* Questions phase */}
      <AnimatePresence mode="wait">
        {isOnQuestions && !isLoading && (
          <motion.div
            key={`question-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= step ? "bg-accent" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <p className="font-medium text-foreground">
              {currentQuestion.question}
            </p>

            <textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: e.target.value,
                }))
              }
              placeholder={currentQuestion.placeholder}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I have my own idea
              </button>
              <Button
                type="button"
                variant="accent"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]?.trim()}
              >
                {step < QUESTIONS.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="size-4" />
                  </>
                ) : (
                  "Find ideas"
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-8 gap-3"
          >
            <Loader2 className="size-8 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">
              Finding project ideas based on your answers...
            </p>
          </motion.div>
        )}

        {/* Suggestions */}
        {suggestions && !isLoading && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-sm font-medium text-foreground">
              Here are some ideas based on what you told us:
            </p>

            <div className="space-y-3">
              {suggestions.map((idea, i) => (
                <motion.button
                  key={i}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => selectIdea(idea)}
                  className="w-full text-left p-4 rounded-lg border border-border bg-background hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-foreground">{idea.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent whitespace-nowrap">
                      {idea.complexity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {idea.oneLiner}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {idea.whyItFits}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I have my own idea
              </button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSuggestions(null);
                  setStep(0);
                  setAnswers({});
                }}
              >
                <RotateCcw className="size-3" />
                Try again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-sm text-destructive mt-3">{error}</p>}
    </div>
  );
}
