"use client";

import { motion } from "framer-motion";

/**
 * Visual showing a web app working on both desktop browser and mobile device
 * Demonstrates that modern web apps are responsive and work everywhere
 */
export function ResponsiveDevicesVisual() {
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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5 rounded-2xl" />

      <div className="relative px-4">
        {/* Devices container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {/* Desktop Browser */}
          <motion.div variants={itemVariants} className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-2xl" />

            {/* Browser window */}
            <div className="relative w-[280px] sm:w-[320px] bg-card border border-border rounded-xl overflow-hidden shadow-lg">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                </div>
                {/* URL bar */}
                <div className="flex-1 mx-2 px-3 py-1 bg-background/50 rounded-md text-[10px] text-muted-foreground truncate">
                  yourapp.vercel.app
                </div>
              </div>

              {/* Browser content - app mockup */}
              <div className="p-4 space-y-3 min-h-[140px] bg-background/30">
                {/* Header mockup */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-3 bg-foreground/20 rounded" />
                  <div className="flex gap-2">
                    <div className="w-8 h-2 bg-muted-foreground/20 rounded" />
                    <div className="w-8 h-2 bg-muted-foreground/20 rounded" />
                  </div>
                </div>
                {/* Content mockup */}
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-foreground/15 rounded" />
                  <div className="w-full h-2 bg-muted-foreground/10 rounded" />
                  <div className="w-5/6 h-2 bg-muted-foreground/10 rounded" />
                </div>
                {/* Button mockup */}
                <div className="w-20 h-6 bg-accent/30 rounded-md" />
              </div>
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <span className="text-xs font-medium text-blue-400">Desktop</span>
            </div>
          </motion.div>

          {/* Equals sign / Same app indicator */}
          <motion.div variants={itemVariants} className="text-2xl text-muted-foreground/50 font-light">
            =
          </motion.div>

          {/* Mobile Device */}
          <motion.div variants={itemVariants} className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-violet-500/10 rounded-3xl blur-2xl" />

            {/* Phone frame */}
            <div className="relative w-[140px] bg-card border-2 border-muted rounded-[24px] overflow-hidden shadow-lg">
              {/* Notch area */}
              <div className="flex justify-center py-2 bg-muted/30">
                <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
              </div>

              {/* Phone content - same app mockup, mobile layout */}
              <div className="p-3 space-y-2.5 min-h-[180px] bg-background/30">
                {/* Header mockup - stacked on mobile */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-2.5 bg-foreground/20 rounded" />
                  <div className="w-4 h-4 bg-muted-foreground/20 rounded" />
                </div>
                {/* Content mockup */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-foreground/15 rounded" />
                  <div className="w-full h-1.5 bg-muted-foreground/10 rounded" />
                  <div className="w-3/4 h-1.5 bg-muted-foreground/10 rounded" />
                </div>
                {/* Button mockup - full width on mobile */}
                <div className="w-full h-5 bg-accent/30 rounded-md" />
              </div>

              {/* Home indicator */}
              <div className="flex justify-center py-2">
                <div className="w-16 h-1 bg-muted-foreground/30 rounded-full" />
              </div>
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <span className="text-xs font-medium text-violet-400">Mobile</span>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.div variants={itemVariants} className="mt-6 text-center space-y-1">
          <p className="text-sm text-foreground/80">
            <span className="font-medium">Same code. Both devices.</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Many apps start as web apps, then become native apps later.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
