"use client";

import { JoinForm } from "@/components/sprint/JoinForm";
import { SprintJourneyPreview } from "@/components/sprint/SprintJourneyPreview";
import { CohortCountdown } from "@/components/sprint/CohortCountdown";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinSprintPage() {
  const steps = [
    { number: 1, label: "Create your account", active: true },
    { number: 2, label: "Complete your enrollment ($297)", active: false },
    { number: 3, label: "Get immediate access to Day 0", active: false },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left: Form */}
          <div className="bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-display font-bold text-foreground">
                  You&apos;re in. Let&apos;s make it official.
                </h1>
                <p className="mt-3 text-muted-foreground">
                  In 7 days, you&apos;ll have built something real. First, let&apos;s
                  get you set up.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8"
              >
                <JoinForm />
              </motion.div>
            </div>
          </div>

          {/* Right: Reassurance */}
          <div className="relative hidden lg:flex border-l border-border overflow-hidden bg-muted/10 items-center justify-center">
            <div className="max-w-lg mx-auto px-8 py-12 relative z-40">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  What happens next:
                </h2>

                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.active
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.active ? (
                          <span className="text-xs font-bold">{step.number}</span>
                        ) : (
                          <span className="text-xs">{step.number}</span>
                        )}
                      </div>
                      <span
                        className={
                          step.active ? "text-foreground" : "text-muted-foreground"
                        }
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-10 p-6 rounded-xl bg-card border border-border"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-5">
                    Your Sprint Journey
                  </h3>
                  <SprintJourneyPreview />

                  <div className="pt-5 mt-5 border-t border-border">
                    <CohortCountdown />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-8 p-6 rounded-xl bg-card border border-border"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    What you&apos;ll get:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "7 daily trainings (video + worksheet)",
                      "Private Discord cohort channel",
                      "Daily feedback on your project",
                      "Ship Day call with live demos",
                      "CLAUDE.md template",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
