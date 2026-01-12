"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "default" | "wide" | "full";
}

export const Section = ({
  children,
  className,
  delay = 0,
  width = "default",
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn("py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6 relative overflow-x-clip", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto",
          width === "default" && "max-w-4xl",
          width === "wide" && "max-w-6xl",
          width === "full" && "max-w-full"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // easeOutExpo
              delay: delay,
            },
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};