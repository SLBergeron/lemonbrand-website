"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ProjectDiscoverySection } from "@/lib/lessons/types";
import { Button, cn } from "@lemonbrand/ui";
import {
  Loader2,
  ArrowRight,
  Download,
  Check,
  Sparkles,
  Mic,
  RotateCcw,
  Lightbulb,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAchievementContext } from "@/context/AchievementContext";
import { useVisitorId } from "@/hooks/useVisitorId";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import Image from "next/image";

// ---------- Types ----------

type IdeaClarity = "clear" | "rough" | "none";
type WhoIsItFor = "me" | "team" | "clients" | "public";
type TechComfort = "apps-daily" | "spreadsheets" | "some-code" | "professional";

type Step =
  | "fork"
  | "describe"
  | "ideafinder"
  | "context"
  | "optional"
  | "result";

interface DiscoveryData {
  ideaClarity: IdeaClarity | null;
  whatToBuild: string;
  whoIsItFor: WhoIsItFor | null;
  currentProcess: string;
  whyMatters: string;
  successLooksLike: string;
  // Path C only
  role: string;
  techComfort: TechComfort | null;
  ideaFinderAnswers: Record<string, string>;
}

interface IdeaSuggestion {
  name: string;
  oneLiner: string;
  whyItFits: string;
  complexity: string;
  suggestedTargetUser: string;
  suggestedCurrentProcess: string;
}

interface Props {
  section: ProjectDiscoverySection;
  isPreview: boolean;
  day: number;
}

// ---------- Constants ----------

const FORK_CARDS: {
  value: IdeaClarity;
  icon: string;
  label: string;
  subtext: string;
}[] = [
  {
    value: "clear",
    icon: "/assets/3dicons-bulb-dynamic-color.png",
    label: "I know what I want to build",
    subtext: "I can describe it",
  },
  {
    value: "rough",
    icon: "/assets/3dicons-notebook-dynamic-color.png",
    label: "I have a rough idea",
    subtext: "It's fuzzy, but it's something",
  },
  {
    value: "none",
    icon: "/assets/3dicons-explorer-dynamic-color.png",
    label: "Help me find one",
    subtext: "I'll figure it out here",
  },
];

const WHO_OPTIONS: { value: WhoIsItFor; label: string }[] = [
  { value: "me", label: "Just me" },
  { value: "team", label: "My team" },
  { value: "clients", label: "My clients" },
  { value: "public", label: "Public" },
];

const TECH_OPTIONS: { value: TechComfort; label: string }[] = [
  { value: "apps-daily", label: "I use apps daily but never built one" },
  { value: "spreadsheets", label: "Spreadsheets & no-code tools" },
  { value: "some-code", label: "I've written some code" },
  { value: "professional", label: "I write code professionally" },
];

const DISCOVERY_QUESTIONS = [
  {
    id: "annoyance",
    question: "What's something you do repeatedly that annoys you?",
    placeholder:
      "e.g., I have to manually copy data from emails into a spreadsheet every morning...",
  },
  {
    id: "magicWand",
    question:
      "If you could wave a magic wand and have one tool, what would it do?",
    placeholder:
      "e.g., It would automatically organize my client notes by project and highlight action items...",
  },
  {
    id: "dataDealtWith",
    question: "What kind of data do you deal with regularly?",
    placeholder:
      "e.g., Client invoices, project timelines, inventory counts, meeting notes...",
  },
];

const STATIC_FALLBACK_REFLECTION =
  "That sounds like a solid Sprint project. Clear enough to scope, practical enough to ship.";

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// ---------- Animation variants ----------

const slideVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// ---------- Main Component ----------

export function ProjectDiscovery({ section, isPreview, day }: Props) {
  const [step, setStep] = useState<Step>("fork");
  const [data, setData] = useState<DiscoveryData>({
    ideaClarity: null,
    whatToBuild: "",
    whoIsItFor: null,
    currentProcess: "",
    whyMatters: "",
    successLooksLike: "",
    role: "",
    techComfort: null,
    ideaFinderAnswers: {},
  });

  // AI states
  const [reflection, setReflection] = useState<string | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);

  // IdeaFinder sub-states
  const [ideaFinderStep, setIdeaFinderStep] = useState(0);
  const [suggestions, setSuggestions] = useState<IdeaSuggestion[] | null>(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [ideaFinderError, setIdeaFinderError] = useState("");

  // Tracking
  const { recordWordCount, recordFormEdit } = useAchievementContext();
  const hasSubmittedOnce = useRef(false);
  const { visitorId } = useVisitorId();
  const { data: session } = useSession();
  const betterAuthId = session?.user?.id;
  const convexUser = useQuery(
    api.users.getByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );
  const hasEnrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollmentByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );
  const isEnrolled = hasEnrollment === true;
  const saveAnonymousProgress = useMutation(
    api.anonymousProgress.saveAnonymousProgress
  );
  const saveFormResponse = useMutation(api.sprintFormResponses.save);

  // Clear justGenerated after animation
  useEffect(() => {
    if (justGenerated) {
      const timer = setTimeout(() => setJustGenerated(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [justGenerated]);

  // ---------- Data helpers ----------

  const updateData = useCallback(
    <K extends keyof DiscoveryData>(key: K, value: DiscoveryData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateIdeaFinderAnswer = useCallback((id: string, value: string) => {
    setData((prev) => ({
      ...prev,
      ideaFinderAnswers: { ...prev.ideaFinderAnswers, [id]: value },
    }));
  }, []);

  // ---------- Step 1: Fork ----------

  const handleForkSelect = (clarity: IdeaClarity) => {
    updateData("ideaClarity", clarity);
    if (clarity === "none") {
      setStep("ideafinder");
    } else {
      setStep("describe");
    }
  };

  // ---------- Step 2A/B: Describe ----------

  const handleDescribeContinue = () => {
    fetchReflection();
    setStep("context");
    // Save project idea for the bonus section prompt
    if (data.whatToBuild.trim()) {
      localStorage.setItem("sprint-project-idea", data.whatToBuild.trim());
    }
  };

  // ---------- Step 2C: IdeaFinder ----------

  const handleIdeaFinderNext = () => {
    if (ideaFinderStep < DISCOVERY_QUESTIONS.length - 1) {
      setIdeaFinderStep((s) => s + 1);
    } else {
      generateIdeas();
    }
  };

  const generateIdeas = async () => {
    setIsLoadingIdeas(true);
    setIdeaFinderError("");
    try {
      const res = await fetch("/api/sprint/idea-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: data.role,
          techComfort: data.techComfort || "",
          annoyance: data.ideaFinderAnswers.annoyance || "",
          magicWand: data.ideaFinderAnswers.magicWand || "",
          dataDealtWith: data.ideaFinderAnswers.dataDealtWith || "",
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        setIdeaFinderError(d.error || "Failed to generate ideas. Try again.");
        return;
      }

      const d = await res.json();
      setSuggestions(d.ideas);
      setIdeaFinderStep(DISCOVERY_QUESTIONS.length); // show suggestions
    } catch {
      setIdeaFinderError("Something went wrong. Try again.");
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const selectIdea = (idea: IdeaSuggestion) => {
    const whoMap: Record<string, WhoIsItFor> = {
      "Just me": "me",
      "My team": "team",
      "My clients": "clients",
      Public: "public",
    };
    const ideaText = `${idea.name}: ${idea.oneLiner}`;
    setData((prev) => ({
      ...prev,
      whatToBuild: ideaText,
      whoIsItFor: whoMap[idea.suggestedTargetUser] || "me",
      currentProcess: idea.suggestedCurrentProcess || "",
    }));
    // Save project idea for the bonus section prompt
    localStorage.setItem("sprint-project-idea", ideaText);
    // If currentProcess was pre-filled by IdeaFinder, skip straight to context
    // but still fetch reflection
    fetchReflectionWith(
      ideaText,
      whoMap[idea.suggestedTargetUser] || "me"
    );
    setStep("context");
  };

  const handleIdeaFinderEscape = () => {
    updateData("ideaClarity", "rough");
    setStep("describe");
  };

  // ---------- Step 3: Context (AI Reflection + manual process) ----------

  const fetchReflection = () => {
    fetchReflectionWith(data.whatToBuild, data.whoIsItFor);
  };

  const fetchReflectionWith = async (
    whatToBuild: string,
    whoIsItFor: WhoIsItFor | null
  ) => {
    setIsReflecting(true);
    try {
      const res = await fetch("/api/sprint/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatToBuild, whoIsItFor: whoIsItFor || "me" }),
      });
      const d = await res.json();
      if (d.fallback || !d.reflection) {
        setReflection(STATIC_FALLBACK_REFLECTION);
      } else {
        setReflection(d.reflection);
      }
    } catch {
      setReflection(STATIC_FALLBACK_REFLECTION);
    } finally {
      setIsReflecting(false);
    }
  };

  const handleContextContinue = () => {
    setStep("optional");
  };

  // ---------- Step 4: Optional ----------

  const handleOptionalContinue = (skip: boolean) => {
    if (skip) {
      updateData("whyMatters", "");
      updateData("successLooksLike", "");
    }
    handleGenerateBrief();
  };

  // ---------- Step 5: Result ----------

  const handleGenerateBrief = async () => {
    setStep("result");
    setIsGenerating(true);

    const formData: Record<string, string> = {
      whatToBuild: data.whatToBuild,
      whoIsItFor: data.whoIsItFor || "me",
      currentProcess: data.currentProcess,
      "why-matters": data.whyMatters,
      "success-looks-like": data.successLooksLike,
      role: data.role,
      "tech-comfort": data.techComfort || "",
    };

    try {
      // Try AI generation
      const aiConfig = section.generateFile?.aiGeneration;
      if (aiConfig?.enabled) {
        const res = await fetch(aiConfig.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const d = await res.json();
          if (!d.fallback && d.content) {
            setGeneratedFile(d.content);
            setIsGenerating(false);
            setJustGenerated(true);
            await saveResponses(formData, d.content);
            trackAchievements();
            hasSubmittedOnce.current = true;
            return;
          }
        }
      }

      // Fallback to template
      let content = section.generateFile.template;
      Object.entries(formData).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), value || "");
      });
      setGeneratedFile(content);
      await saveResponses(formData, content);
      trackAchievements();
    } catch (error) {
      console.error("Brief generation failed:", error);
      // Last resort template fallback
      let content = section.generateFile.template;
      Object.entries(formData).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), value || "");
      });
      setGeneratedFile(content);
    } finally {
      setIsGenerating(false);
      setJustGenerated(true);
      hasSubmittedOnce.current = true;
    }
  };

  const saveResponses = async (
    formData: Record<string, string>,
    generatedContent: string
  ) => {
    // Add ideaClarity to saved responses
    const responses = {
      ...formData,
      ideaClarity: data.ideaClarity || "",
    };

    // localStorage backup
    if (isPreview) {
      localStorage.setItem(`sprint-day-${day}-form`, JSON.stringify(responses));
    }

    try {
      if (isEnrolled && convexUser) {
        await saveFormResponse({
          userId: convexUser._id,
          day,
          responses,
          generatedContent,
        });
      } else if (visitorId) {
        await saveAnonymousProgress({
          visitorId,
          type: "form",
          day,
          data: { responses, generatedContent },
        });
      }
    } catch (error) {
      console.error("Failed to save form response to Convex:", error);
    }
  };

  const trackAchievements = () => {
    const text = data.whatToBuild || "";
    const wordCount = countWords(text);
    recordWordCount("whatToBuild", wordCount);
  };

  const downloadFile = () => {
    if (!generatedFile) return;
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

  const handleEditAnswers = () => {
    if (hasSubmittedOnce.current) {
      recordFormEdit(`day-${day}-form`);
    }
    setGeneratedFile(null);
    setReflection(null);
    if (data.ideaClarity === "none") {
      setStep("ideafinder");
    } else {
      setStep("describe");
    }
  };

  // ---------- Render ----------

  return (
    <section className="space-y-6">
      <AnimatePresence mode="wait">
        {step === "fork" && (
          <ForkStep key="fork" onSelect={handleForkSelect} />
        )}

        {step === "describe" && (
          <DescribeStep
            key="describe"
            clarity={data.ideaClarity!}
            whatToBuild={data.whatToBuild}
            whoIsItFor={data.whoIsItFor}
            onWhatChange={(v) => updateData("whatToBuild", v)}
            onWhoChange={(v) => updateData("whoIsItFor", v)}
            onContinue={handleDescribeContinue}
            onBack={() => setStep("fork")}
          />
        )}

        {step === "ideafinder" && (
          <IdeaFinderStep
            key="ideafinder"
            data={data}
            ideaFinderStep={ideaFinderStep}
            suggestions={suggestions}
            isLoading={isLoadingIdeas}
            error={ideaFinderError}
            onUpdateRole={(v) => updateData("role", v)}
            onUpdateTechComfort={(v) => updateData("techComfort", v)}
            onUpdateAnswer={updateIdeaFinderAnswer}
            onNext={handleIdeaFinderNext}
            onSelectIdea={selectIdea}
            onEscape={handleIdeaFinderEscape}
            onBack={() => setStep("fork")}
            onRetry={() => {
              setSuggestions(null);
              setIdeaFinderStep(0);
              setData((prev) => ({ ...prev, ideaFinderAnswers: {} }));
            }}
          />
        )}

        {step === "context" && (
          <ContextStep
            key="context"
            reflection={reflection}
            isReflecting={isReflecting}
            currentProcess={data.currentProcess}
            onProcessChange={(v) => updateData("currentProcess", v)}
            onContinue={handleContextContinue}
          />
        )}

        {step === "optional" && (
          <OptionalStep
            key="optional"
            whyMatters={data.whyMatters}
            successLooksLike={data.successLooksLike}
            onWhyChange={(v) => updateData("whyMatters", v)}
            onSuccessChange={(v) => updateData("successLooksLike", v)}
            onContinue={handleOptionalContinue}
          />
        )}

        {step === "result" && (
          <ResultStep
            key="result"
            isGenerating={isGenerating}
            justGenerated={justGenerated}
            generatedFile={generatedFile}
            filename={section.generateFile.filename}
            loadingText={
              section.generateFile.aiGeneration?.loadingText ||
              "Generating your project brief..."
            }
            onDownload={downloadFile}
            onEdit={handleEditAnswers}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------- Sub-components ----------

function ForkStep({ onSelect }: { onSelect: (c: IdeaClarity) => void }) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-xl font-bold">
          What are you building this week?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          You&apos;ve set up your tools. Now the fun part — let&apos;s figure
          out what you&apos;re building.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {FORK_CARDS.map((card) => (
          <button
            key={card.value}
            type="button"
            onClick={() => onSelect(card.value)}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 text-center transition-all hover:border-accent/50 hover:shadow-md hover:shadow-accent/5 active:scale-[0.98]"
          >
            <Image
              src={card.icon}
              alt=""
              width={64}
              height={64}
              className="transition-transform group-hover:scale-110"
            />
            <div>
              <p className="font-display font-semibold text-foreground">
                {card.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {card.subtext}
              </p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function DescribeStep({
  clarity,
  whatToBuild,
  whoIsItFor,
  onWhatChange,
  onWhoChange,
  onContinue,
  onBack,
}: {
  clarity: IdeaClarity;
  whatToBuild: string;
  whoIsItFor: WhoIsItFor | null;
  onWhatChange: (v: string) => void;
  onWhoChange: (v: WhoIsItFor) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const isComplete = whatToBuild.trim().length > 0 && whoIsItFor !== null;

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
        <h2 className="font-display text-xl font-bold">
          {clarity === "clear" ? "Tell me about it." : "Describe whatever's in your head."}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {clarity === "clear"
            ? "What are you building?"
            : "A rough idea is all you need. We'll sharpen it together."}
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            What do you want to build?
            <span className="text-accent" title="Use your voice">
              <Mic className="size-4" />
            </span>
          </label>
          <textarea
            value={whatToBuild}
            onChange={(e) => onWhatChange(e.target.value)}
            placeholder={
              clarity === "clear"
                ? "e.g., A proposal generator that takes client details and outputs a formatted proposal"
                : "e.g., Something to help me track my client projects... maybe a dashboard?"
            }
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Who is it for?</label>
          <div className="flex flex-wrap gap-2">
            {WHO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onWhoChange(opt.value)}
                className={cn(
                  "px-3 py-1.5 rounded-md border text-sm transition-colors",
                  whoIsItFor === opt.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border hover:border-muted-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="accent"
        disabled={!isComplete}
        onClick={onContinue}
      >
        Continue
        <ArrowRight className="size-4" />
      </Button>
    </motion.div>
  );
}

function IdeaFinderStep({
  data,
  ideaFinderStep,
  suggestions,
  isLoading,
  error,
  onUpdateRole,
  onUpdateTechComfort,
  onUpdateAnswer,
  onNext,
  onSelectIdea,
  onEscape,
  onBack,
  onRetry,
}: {
  data: DiscoveryData;
  ideaFinderStep: number;
  suggestions: IdeaSuggestion[] | null;
  isLoading: boolean;
  error: string;
  onUpdateRole: (v: string) => void;
  onUpdateTechComfort: (v: TechComfort) => void;
  onUpdateAnswer: (id: string, value: string) => void;
  onNext: () => void;
  onSelectIdea: (idea: IdeaSuggestion) => void;
  onEscape: () => void;
  onBack: () => void;
  onRetry: () => void;
}) {
  const isOnContextScreen = ideaFinderStep === 0 && !suggestions;
  const isOnQuestions =
    ideaFinderStep < DISCOVERY_QUESTIONS.length && !suggestions && !isLoading;
  const showSuggestions = suggestions && !isLoading;

  // Context screen: role + tech comfort + first question
  // Subsequent screens: discovery questions 2 & 3
  // After questions: loading → suggestions

  // For the combined first screen, we need role + techComfort + first answer
  const contextScreenComplete =
    data.role.trim().length > 0 &&
    data.techComfort !== null &&
    (data.ideaFinderAnswers.annoyance || "").trim().length > 0;

  const currentQ = DISCOVERY_QUESTIONS[ideaFinderStep];
  const currentAnswer = currentQ
    ? data.ideaFinderAnswers[currentQ.id] || ""
    : "";

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="size-5 text-accent" />
          <h2 className="font-display text-xl font-bold">
            Let&apos;s find your project
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Answer a few questions and we&apos;ll suggest Sprint-sized project
          ideas.
        </p>
      </div>

      {/* Progress bar */}
      {!showSuggestions && !isLoading && (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= ideaFinderStep ? "bg-accent" : "bg-muted"
              )}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* First screen: role + comfort + Q1 */}
        {isOnContextScreen && (
          <motion.div
            key="context-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                What do you do for work?
              </label>
              <input
                type="text"
                value={data.role}
                onChange={(e) => onUpdateRole(e.target.value)}
                placeholder="e.g., Product manager at a marketing agency"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                How comfortable with technology?
              </label>
              <div className="flex flex-wrap gap-2">
                {TECH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateTechComfort(opt.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-md border text-sm transition-colors text-left",
                      data.techComfort === opt.value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                {DISCOVERY_QUESTIONS[0].question}
                <span className="text-accent" title="Use your voice">
                  <Mic className="size-4" />
                </span>
              </label>
              <textarea
                value={data.ideaFinderAnswers.annoyance || ""}
                onChange={(e) => onUpdateAnswer("annoyance", e.target.value)}
                placeholder={DISCOVERY_QUESTIONS[0].placeholder}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onEscape}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I have my own idea
              </button>
              <Button
                type="button"
                variant="accent"
                disabled={!contextScreenComplete}
                onClick={() => {
                  // Advance to Q2 (index 1)
                  onNext();
                }}
              >
                Next
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Questions 2 and 3 */}
        {isOnQuestions && ideaFinderStep > 0 && (
          <motion.div
            key={`q-${ideaFinderStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="font-medium text-foreground">{currentQ.question}</p>
            <textarea
              value={currentAnswer}
              onChange={(e) => onUpdateAnswer(currentQ.id, e.target.value)}
              placeholder={currentQ.placeholder}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onEscape}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I have my own idea
              </button>
              <Button
                type="button"
                variant="accent"
                disabled={!currentAnswer.trim()}
                onClick={onNext}
              >
                {ideaFinderStep < DISCOVERY_QUESTIONS.length - 1 ? (
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
        {showSuggestions && (
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
                  onClick={() => onSelectIdea(idea)}
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
                onClick={onEscape}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I have my own idea
              </button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
              >
                <RotateCcw className="size-3" />
                Try again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-sm text-destructive mt-3">{error}</p>}
    </motion.div>
  );
}

function ContextStep({
  reflection,
  isReflecting,
  currentProcess,
  onProcessChange,
  onContinue,
}: {
  reflection: string | null;
  isReflecting: boolean;
  currentProcess: string;
  onProcessChange: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* AI Reflection */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
        {isReflecting ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        ) : (
          <p className="text-sm text-foreground italic">
            &ldquo;{reflection || STATIC_FALLBACK_REFLECTION}&rdquo;
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          What do you do manually today that this would replace?
          <span className="text-accent" title="Use your voice">
            <Mic className="size-4" />
          </span>
        </label>
        <textarea
          value={currentProcess}
          onChange={(e) => onProcessChange(e.target.value)}
          placeholder="e.g., Every week I spend 2 hours copying client info into a Google Doc template, adjusting the pricing section, and reformatting it"
          rows={4}
          className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
        />
      </div>

      <Button
        type="button"
        variant="accent"
        disabled={!currentProcess.trim()}
        onClick={onContinue}
      >
        Almost done
        <ArrowRight className="size-4" />
      </Button>
    </motion.div>
  );
}

function OptionalStep({
  whyMatters,
  successLooksLike,
  onWhyChange,
  onSuccessChange,
  onContinue,
}: {
  whyMatters: string;
  successLooksLike: string;
  onWhyChange: (v: string) => void;
  onSuccessChange: (v: string) => void;
  onContinue: (skip: boolean) => void;
}) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-xl font-bold">
          Two optional questions
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Skip if you want — they help personalize your Sprint.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            Why does this matter to you?
            <span className="text-accent" title="Use your voice">
              <Mic className="size-4" />
            </span>
          </label>
          <textarea
            value={whyMatters}
            onChange={(e) => onWhyChange(e.target.value)}
            placeholder="e.g., I'm tired of wasting time on this every week..."
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            What does success look like at the end of the week?
            <span className="text-accent" title="Use your voice">
              <Mic className="size-4" />
            </span>
          </label>
          <textarea
            value={successLooksLike}
            onChange={(e) => onSuccessChange(e.target.value)}
            placeholder="I'd be happy if..."
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onContinue(true)}
          className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
        >
          Skip — generate my brief
        </button>
        <Button
          type="button"
          variant="accent"
          onClick={() => onContinue(false)}
        >
          Generate my brief
          <Sparkles className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function ResultStep({
  isGenerating,
  justGenerated,
  generatedFile,
  filename,
  loadingText,
  onDownload,
  onEdit,
}: {
  isGenerating: boolean;
  justGenerated: boolean;
  generatedFile: string | null;
  filename: string;
  loadingText: string;
  onDownload: () => void;
  onEdit: () => void;
}) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {isGenerating && (
        <div className="flex flex-col items-center py-12 gap-3">
          <Loader2 className="size-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">{loadingText}</p>
        </div>
      )}

      {!isGenerating && generatedFile && (
        <>
          {justGenerated && (
            <div className="flex items-center gap-2 text-accent animate-fade-in">
              <Sparkles className="size-5 animate-sparkle" />
              <span className="text-sm font-medium">
                Your project brief is ready
              </span>
            </div>
          )}

          {!justGenerated && (
            <p className="text-sm text-success flex items-center gap-2">
              <Check className="size-4" />
              Saved
            </p>
          )}

          <div
            className={cn(
              "border rounded-lg overflow-hidden transition-all duration-500",
              justGenerated
                ? "border-accent/50 shadow-[0_0_20px_rgba(var(--accent),0.3)] animate-pop-in"
                : "border-border/50"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between px-4 py-2 border-b transition-colors duration-500",
                justGenerated
                  ? "bg-accent/10 border-accent/30"
                  : "bg-muted/30 border-border/50"
              )}
            >
              <span className="text-sm font-mono">{filename}</span>
              <Button variant="ghost" size="sm" onClick={onDownload}>
                <Download className="size-4 mr-1" />
                Download
              </Button>
            </div>
            <pre className="text-xs text-muted-foreground p-4 overflow-auto whitespace-pre-wrap">
              {generatedFile}
            </pre>
          </div>

          <p className="text-sm text-muted-foreground">
            This is your starting point for Day 1. Download it and you&apos;re
            ready.
          </p>

          <button
            type="button"
            onClick={onEdit}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Edit answers
          </button>
        </>
      )}
    </motion.div>
  );
}
