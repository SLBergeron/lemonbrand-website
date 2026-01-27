"use client";

import { ParadigmSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Props {
  section: ParadigmSection;
}

export function ParadigmSectionComponent({ section }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-12"
    >
      {/* Outer glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-3xl blur-xl" />

      {/* Main container */}
      <div className="relative bg-gradient-to-br from-card via-card to-accent/5 border-2 border-accent/20 rounded-2xl overflow-hidden">
        {/* Decorative corner gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-full" />

        <div className="relative p-8 md:p-10">
          {/* Header with optional icon */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            {section.icon && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="flex-shrink-0"
              >
                <div className="relative size-24 md:size-28">
                  <Image
                    src={section.icon}
                    alt=""
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </motion.div>
            )}

            <div className="flex-1">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3"
              >
                {section.title}
              </motion.h2>

              {/* Hook */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-lg md:text-xl text-accent font-medium"
              >
                {section.hook}
              </motion.p>
            </div>
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="prose prose-invert prose-lg max-w-none mb-8"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">
                    {children}
                  </strong>
                ),
              }}
            >
              {section.content}
            </ReactMarkdown>
          </motion.div>

          {/* Examples grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid gap-3 mb-8"
          >
            {section.examples.map((example, i) => (
              <motion.div
                key={example.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                className="flex items-start gap-4 p-4 bg-background/50 border border-border/50 rounded-xl hover:border-accent/30 transition-colors"
              >
                <div className="flex-shrink-0 size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-mono text-sm font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">
                    {example.label}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-xl" />
            <p className="relative px-5 py-4 text-lg font-medium text-foreground/90 border-l-4 border-accent">
              {section.conclusion}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
