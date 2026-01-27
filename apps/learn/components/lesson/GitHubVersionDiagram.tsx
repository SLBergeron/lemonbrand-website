"use client";

import { motion } from "framer-motion";
import { GitBranch, RotateCcw, Check, AlertCircle } from "lucide-react";

/**
 * Visual diagram showing GitHub version control as a save point system
 * Shows progression: v1 → v2 → v3 → v4 (broken) with ability to revert
 */
export function GitHubVersionDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const versions = [
    {
      label: "v1",
      day: "Monday",
      status: "It works",
      color: "emerald",
      icon: Check,
    },
    {
      label: "v2",
      day: "Tuesday",
      status: "Added form",
      color: "emerald",
      icon: Check,
    },
    {
      label: "v3",
      day: "Wednesday",
      status: "Styled it",
      color: "emerald",
      icon: Check,
    },
    {
      label: "v4",
      day: "Thursday",
      status: "Broke it",
      color: "red",
      icon: AlertCircle,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative py-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-red-500/5 rounded-2xl" />

      <div className="relative px-4 space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-muted-foreground">
          <GitBranch className="size-4" />
          <span className="text-sm font-medium">Your project timeline</span>
        </motion.div>

        {/* Version timeline */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-0">
          {versions.map((version, index) => (
            <motion.div
              key={version.label}
              variants={itemVariants}
              className="flex items-center"
            >
              {/* Version node */}
              <div className="relative group">
                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-xl blur-lg transition-all ${
                    version.color === "emerald"
                      ? "bg-emerald-500/20 group-hover:bg-emerald-500/30"
                      : "bg-red-500/30 group-hover:bg-red-500/40"
                  }`}
                />
                {/* Card */}
                <div
                  className={`relative rounded-xl px-4 py-3 text-center min-w-[100px] border ${
                    version.color === "emerald"
                      ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border-emerald-400/30"
                      : "bg-gradient-to-br from-red-500/10 to-red-600/20 border-red-400/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <version.icon
                      className={`size-3.5 ${
                        version.color === "emerald" ? "text-emerald-400" : "text-red-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        version.color === "emerald" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {version.label}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mb-0.5">
                    {version.day}
                  </div>
                  <div className="text-xs text-foreground/80">{version.status}</div>
                </div>
              </div>

              {/* Arrow to next */}
              {index < versions.length - 1 && (
                <div className="hidden lg:block w-8 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/30 mx-1" />
              )}
              {index < versions.length - 1 && (
                <div className="lg:hidden h-6 w-0.5 bg-gradient-to-b from-muted-foreground/30 to-muted-foreground/30 my-1" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Revert illustration */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 pt-4"
        >
          <div className="flex items-center gap-2 text-sm">
            <RotateCcw className="size-4 text-emerald-400" />
            <span className="text-muted-foreground">Broke something?</span>
            <span className="text-emerald-400 font-medium">Revert to any previous version</span>
          </div>

          {/* Visual of reverting */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
            <span className="text-xs text-red-400 line-through">v4 broken</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-xs text-emerald-400 font-medium">Back to v3. Safe.</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
