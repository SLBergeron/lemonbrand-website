"use client";

import { motion } from "framer-motion";
import { MessageSquare, Wrench, Eye, GitBranch, RefreshCw } from "lucide-react";

/**
 * Visual diagram showing the iteration cycle as a circular flow
 * Describe → Fix → Test → Push/Repeat
 */
export function IterationCycleDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const steps = [
    {
      icon: MessageSquare,
      label: "Describe",
      detail: "the problem",
      color: "blue",
    },
    {
      icon: Wrench,
      label: "Claude fixes",
      detail: "it",
      color: "violet",
    },
    {
      icon: Eye,
      label: "Test",
      detail: "locally",
      color: "emerald",
    },
    {
      icon: GitBranch,
      label: "Push",
      detail: "to GitHub",
      color: "amber",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative py-10"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 rounded-2xl" />

      <div className="relative px-4">
        {/* Circular layout for desktop, vertical for mobile */}
        <div className="hidden md:block relative w-[320px] h-[320px] mx-auto">
          {/* Center icon */}
          <motion.div
            variants={itemVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/30 border border-accent/40 rounded-full flex items-center justify-center">
                <RefreshCw className="size-6 text-accent" />
              </div>
            </div>
          </motion.div>

          {/* Circular path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
            <motion.circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="text-muted-foreground/20"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Steps positioned around the circle */}
          {steps.map((step, index) => {
            const angle = (index * 90 - 90) * (Math.PI / 180); // Start from top
            const radius = 120;
            const x = 160 + radius * Math.cos(angle);
            const y = 160 + radius * Math.sin(angle);

            const colorClasses = {
              blue: "from-blue-500/10 to-blue-600/20 border-blue-400/30 text-blue-400",
              violet: "from-violet-500/10 to-violet-600/20 border-violet-400/30 text-violet-400",
              emerald: "from-emerald-500/10 to-emerald-600/20 border-emerald-400/30 text-emerald-400",
              amber: "from-amber-500/10 to-amber-600/20 border-amber-400/30 text-amber-400",
            };

            const glowClasses = {
              blue: "bg-blue-500/20",
              violet: "bg-violet-500/20",
              emerald: "bg-emerald-500/20",
              amber: "bg-amber-500/20",
            };

            return (
              <motion.div
                key={step.label}
                variants={itemVariants}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
              >
                <div className="relative group">
                  <div className={`absolute inset-0 ${glowClasses[step.color as keyof typeof glowClasses]} rounded-xl blur-lg group-hover:blur-xl transition-all`} />
                  <div className={`relative bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} border rounded-xl px-3 py-2 text-center min-w-[90px]`}>
                    <step.icon className="size-4 mx-auto mb-1" />
                    <div className="text-xs font-medium text-foreground">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">{step.detail}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile layout - vertical with arrows */}
        <div className="md:hidden flex flex-col items-center gap-2">
          {steps.map((step, index) => {
            const colorClasses = {
              blue: "from-blue-500/10 to-blue-600/20 border-blue-400/30 text-blue-400",
              violet: "from-violet-500/10 to-violet-600/20 border-violet-400/30 text-violet-400",
              emerald: "from-emerald-500/10 to-emerald-600/20 border-emerald-400/30 text-emerald-400",
              amber: "from-amber-500/10 to-amber-600/20 border-amber-400/30 text-amber-400",
            };

            return (
              <motion.div key={step.label} variants={itemVariants} className="flex flex-col items-center">
                <div className={`bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} border rounded-xl px-4 py-3 text-center min-w-[140px]`}>
                  <step.icon className="size-4 mx-auto mb-1" />
                  <div className="text-sm font-medium text-foreground">{step.label} {step.detail}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="h-4 w-0.5 bg-muted-foreground/30 my-1" />
                )}
              </motion.div>
            );
          })}
          {/* Loop back arrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mt-2 text-muted-foreground">
            <RefreshCw className="size-4" />
            <span className="text-xs">Repeat until it's right</span>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          <span className="text-foreground font-medium">3-5 cycles today.</span> Each one makes your project better.
        </motion.p>
      </div>
    </motion.div>
  );
}
