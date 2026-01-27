"use client";

import { AffirmationSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Check } from "lucide-react";

interface Props {
  section: AffirmationSection;
}

export function AffirmationSectionComponent({ section }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-12"
    >
      {/* Outer glow effect - green tones */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 rounded-3xl blur-xl" />

      {/* Main container */}
      <div className="relative bg-gradient-to-br from-card via-card to-emerald-500/5 border-2 border-emerald-500/20 rounded-2xl overflow-hidden">
        {/* Decorative corner gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-tr-full" />

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
                className="text-lg md:text-xl text-emerald-400 font-medium"
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
                  <strong className="text-emerald-300 font-semibold">
                    {children}
                  </strong>
                ),
              }}
            >
              {section.content}
            </ReactMarkdown>
          </motion.div>

          {/* Key points */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="space-y-3 mb-8"
          >
            {section.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
              >
                <div className="flex-shrink-0 size-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                  <Check className="size-4 text-emerald-400" />
                </div>
                <p className="text-foreground/90 leading-relaxed">{point}</p>
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent rounded-xl" />
            <p className="relative px-5 py-4 text-lg font-medium text-foreground border-l-4 border-emerald-500">
              {section.conclusion}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
