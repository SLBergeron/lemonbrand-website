"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  IconArrowLeft,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconMenu2,
  IconX,
  IconPlayerPlay,
  IconBulb,
  IconStar,
  IconTrophy,
  IconArrowRight
} from "@tabler/icons-react";

// --- Animated Markdown Components ---

const AnimatedBlockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01, x: 5 }}
      className="my-8 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 p-6 shadow-sm"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <IconBulb className="w-24 h-24 text-blue-500" />
      </div>
      <div className="relative z-10 flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <IconBulb className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
            Quick Win
          </h4>
          <div className="text-neutral-700 dark:text-neutral-200 italic leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedList = ({ children, ordered }: { children: React.ReactNode; ordered?: boolean }) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cn("my-6 space-y-3 ml-1", ordered && "list-none counter-reset-list")}>
      {children}
    </Tag>
  );
};

const AnimatedListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 items-start group"
    >
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
      <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        {children}
      </span>
    </motion.li>
  );
};

const AnimatedTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-neutral-100/50 dark:shadow-none"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    </motion.div>
  );
};

// Copyable Code Block Component
const CopyableCodeBlock = ({ children, className }: { children: string; className?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-6 relative group"
    >
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            copied
              ? "bg-green-500 text-white"
              : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          )}
        >
          {copied ? (
            <>
              <IconCheck className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <IconPlayerPlay className="w-3.5 h-3.5" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
      <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-5 pr-24 overflow-x-auto text-sm leading-relaxed border border-neutral-800">
        <code>{children}</code>
      </pre>
    </motion.div>
  );
};

// Interactive Table with hover states
const InteractiveTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none bg-white dark:bg-neutral-900"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    </motion.div>
  );
};

const MarkdownComponents = {
  h1: ({ children }: any) => (
    <motion.h1
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold mt-2 mb-8 text-neutral-900 dark:text-white tracking-tight"
    >
      {children}
    </motion.h1>
  ),
  h2: ({ children }: any) => (
    <motion.h2 
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-neutral-900 dark:text-white flex items-center gap-3"
    >
      {children}
    </motion.h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-100">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="mb-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
      {children}
    </p>
  ),
  blockquote: AnimatedBlockquote,
  ul: (props: any) => <AnimatedList {...props} />,
  ol: (props: any) => <AnimatedList {...props} ordered />,
  li: AnimatedListItem,
  table: InteractiveTable,
  code: ({ inline, children, className }: any) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-orange-600 dark:text-orange-400 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    // Extract text content from children
    const text = String(children).replace(/\n$/, '');
    return <CopyableCodeBlock>{text}</CopyableCodeBlock>;
  },
  pre: ({ children }: any) => {
    // The pre tag wraps code blocks - we handle this in code component
    return <>{children}</>;
  },
  thead: ({ children }: any) => (
    <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-xs uppercase font-bold text-neutral-500 tracking-wider">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 bg-white dark:bg-neutral-900/50">
      {children}
    </tbody>
  ),
  tr: ({ children }: any) => (
    <motion.tr 
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className="transition-colors"
    >
      {children}
    </motion.tr>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-4 whitespace-nowrap">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 whitespace-normal text-neutral-600 dark:text-neutral-300">{children}</td>
  ),
  hr: () => (
    <motion.hr 
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
      className="my-16 border-neutral-200 dark:border-neutral-800" 
    />
  ),
  img: ({ src, alt }: any) => (
    <motion.figure 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <img
        src={src}
        alt={alt}
        className="rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 w-full"
      />
      {alt && (
        <figcaption className="text-center text-sm text-neutral-500 mt-3 font-medium">
          {alt}
        </figcaption>
      )}
    </motion.figure>
  ),
};

export default function LessonPlayerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const lessonSlugParam = searchParams.get("lesson");
  const { user } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLessonSlug, setActiveLessonSlug] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const moduleData = useQuery(
    api.modules.getBySlug,
    user?._id ? { slug, userId: user._id } : { slug }
  );

  const completeLessonMutation = useMutation(api.progress.completeLesson);

  // Set active lesson on load
  useEffect(() => {
    if (moduleData && !activeLessonSlug) {
      if (lessonSlugParam) {
        setActiveLessonSlug(lessonSlugParam);
      } else {
        const lessons = moduleData.lessons || [];
        const completedIds = moduleData.progress?.completedLessonIds || [];
        const firstIncomplete = lessons.find(
          (l: any) => !completedIds.includes(l._id)
        );
        setActiveLessonSlug(firstIncomplete ? firstIncomplete.slug : (lessons[0]?.slug || null));
      }
    }
  }, [moduleData, lessonSlugParam, activeLessonSlug]);

  // Update URL
  useEffect(() => {
    if (activeLessonSlug) {
      const newUrl = `/sarah/dashboard/modules/${slug}/learn?lesson=${activeLessonSlug}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [activeLessonSlug, slug]);

  const activeLesson = moduleData?.lessons?.find(
    (l: any) => l.slug === activeLessonSlug
  );
  
  const activeLessonIndex = moduleData?.lessons?.findIndex(
    (l: any) => l.slug === activeLessonSlug
  ) ?? -1;

  const handleComplete = async () => {
    if (!user?._id || !moduleData || !activeLesson) return;

    try {
      const result = await completeLessonMutation({
        userId: user._id,
        moduleId: moduleData._id,
        lessonId: activeLesson._id,
        timeSpentMinutes: activeLesson.estimatedMinutes || 10,
      });

      if (!result?.alreadyCompleted) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else {
        toast.info("Lesson already completed");
        handleNext();
      }

      // Auto-advance after celebration
      if (!result?.alreadyCompleted) {
        setTimeout(() => {
           handleNext();
        }, 2000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to complete lesson");
    }
  };

  const handleNext = () => {
    if (!moduleData?.lessons) return;
    if (activeLessonIndex < moduleData.lessons.length - 1) {
      const nextLesson = moduleData.lessons[activeLessonIndex + 1];
      setActiveLessonSlug(nextLesson.slug);
      // Reset scroll
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
        router.push(`/sarah/dashboard/modules/${slug}`);
    }
  };

  const handlePrev = () => {
    if (!moduleData?.lessons) return;
    if (activeLessonIndex > 0) {
      const prevLesson = moduleData.lessons[activeLessonIndex - 1];
      setActiveLessonSlug(prevLesson.slug);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  };

  if (!moduleData || !activeLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
             <p className="text-neutral-500">Loading your lesson...</p>
        </div>
      </div>
    );
  }

  const isCompleted = moduleData.progress?.completedLessonIds?.includes(activeLesson._id as any);
  const lessons = moduleData.lessons || [];

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-950 overflow-hidden relative">
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-12 text-center shadow-2xl max-w-sm mx-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 opacity-50" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <IconTrophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Lesson Complete!</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">+15 XP Earned</p>
                <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500" 
                    />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Lesson List */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-r border-neutral-200 dark:border-neutral-800 flex flex-col bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-xl z-20 absolute md:relative h-full"
          >
            <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Module {moduleData.order}</p>
                 <h2 className="font-bold text-neutral-900 dark:text-white truncate max-w-[200px]" title={moduleData.title}>
                    {moduleData.title}
                 </h2>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {lessons.map((lesson: any, index: number) => {
                const isDone = moduleData.progress?.completedLessonIds?.includes(lesson._id);
                const isActive = lesson.slug === activeLessonSlug;

                return (
                  <button
                    key={lesson._id}
                    onClick={() => setActiveLessonSlug(lesson.slug)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all relative overflow-hidden group",
                      isActive
                        ? "bg-white dark:bg-neutral-800 shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700"
                        : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                    )}
                  >
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />}
                    
                    <div
                      className={cn(
                        "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors",
                        isDone
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-orange-500 text-white"
                          : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600"
                      )}
                    >
                      {isDone ? <IconCheck className="w-3.5 h-3.5" /> : index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className={cn(
                        "text-sm font-medium leading-tight mb-1 transition-colors",
                        isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"
                      )}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {lesson.estimatedMinutes} min
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
               <div className="bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full transition-all duration-500" 
                    style={{ width: `${moduleData.progress?.percentComplete || 0}%` }}
                  />
               </div>
               <p className="text-xs text-center mt-2 text-neutral-500 font-medium">
                  {moduleData.progress?.percentComplete || 0}% Complete
               </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Progress Bar (Top) */}
        <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-900 z-20">
            <motion.div 
                className="h-full bg-orange-500 origin-left"
                style={{ scaleX }}
            />
        </div>

        {/* Top Bar */}
        <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-4 justify-between bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-neutral-600 dark:text-neutral-400"
            >
              {isSidebarOpen ? <IconArrowLeft className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
            </button>
            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {activeLesson.title}
            </span>
          </div>
          
          <Link 
            href={`/sarah/dashboard/modules/${slug}`}
            className="text-sm font-medium text-neutral-500 hover:text-orange-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20"
          >
            Exit Module
          </Link>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-6 py-16">
            <AnimatePresence mode="wait">
                <motion.div
                  key={activeLesson._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ReactMarkdown components={MarkdownComponents as any}>
                    {activeLesson.content}
                  </ReactMarkdown>

                  {/* Action Area */}
                  <div className="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      disabled={activeLessonIndex === 0}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all font-medium"
                    >
                      <IconChevronLeft className="w-5 h-5" />
                      Previous
                    </button>

                    {isCompleted ? (
                       <button
                        onClick={handleNext}
                        disabled={activeLessonIndex === lessons.length - 1}
                        className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                      >
                        Next Lesson
                        <IconArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleComplete}
                        className="group relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                            Complete & Continue
                            <IconCheck className="w-5 h-5" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Bottom spacer */}
          <div className="h-20" />
        </div>
      </main>
    </div>
  );
}