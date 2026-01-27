"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

/**
 * Visual flow diagram showing: Trigger → Inputs → Tool → Outputs → Next Step
 * Used to help users understand what their HTML visualization should show
 */
export function FlowDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative py-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 rounded-2xl" />

      {/* Main flow - horizontal on desktop, vertical on mobile */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 px-4">
        {/* Before / Trigger */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
            Before
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-400/30 rounded-xl px-5 py-4 text-center min-w-[120px]">
              <div className="text-xs text-blue-400 font-medium mb-1">Trigger</div>
              <div className="text-sm text-foreground/80">What starts it?</div>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div variants={arrowVariants} className="text-muted-foreground/40 rotate-90 lg:rotate-0">
          <ArrowRight className="size-5" />
        </motion.div>

        {/* Inputs */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-transparent mb-2">.</div>
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-400/30 rounded-xl px-5 py-4 text-center min-w-[120px]">
              <div className="text-xs text-emerald-400 font-medium mb-1">Inputs</div>
              <div className="text-sm text-foreground/80">What goes in?</div>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div variants={arrowVariants} className="text-muted-foreground/40 rotate-90 lg:rotate-0">
          <ArrowRight className="size-5" />
        </motion.div>

        {/* Your Tool - Center, emphasized */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-accent mb-2 font-medium">
            Your Tool
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative bg-gradient-to-br from-accent/20 to-accent/30 border-2 border-accent/40 rounded-2xl px-8 py-6 text-center min-w-[140px]">
              <Zap className="size-6 text-accent mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">The Process</div>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div variants={arrowVariants} className="text-muted-foreground/40 rotate-90 lg:rotate-0">
          <ArrowRight className="size-5" />
        </motion.div>

        {/* Outputs */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-transparent mb-2">.</div>
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-violet-500/10 to-violet-600/20 border border-violet-400/30 rounded-xl px-5 py-4 text-center min-w-[120px]">
              <div className="text-xs text-violet-400 font-medium mb-1">Outputs</div>
              <div className="text-sm text-foreground/80">What comes out?</div>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div variants={arrowVariants} className="text-muted-foreground/40 rotate-90 lg:rotate-0">
          <ArrowRight className="size-5" />
        </motion.div>

        {/* After / Next Step */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
            After
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-rose-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-rose-500/10 to-rose-600/20 border border-rose-400/30 rounded-xl px-5 py-4 text-center min-w-[120px]">
              <div className="text-xs text-rose-400 font-medium mb-1">Next Step</div>
              <div className="text-sm text-foreground/80">What happens?</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-muted-foreground mt-6 px-4"
      >
        Your HTML visualization will show this flow for <span className="text-foreground font-medium">your specific project</span>
      </motion.p>
    </motion.div>
  );
}
