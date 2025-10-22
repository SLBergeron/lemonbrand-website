"use client";
import React from "react";
import { Button } from "./button";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";
import { motion } from "framer-motion";

const customAutomationExamples = [
  {
    icon: "🤖",
    title: "AI Voice Agents",
    description: "24/7 phone answering that sounds human",
  },
  {
    icon: "📋",
    title: "Custom Quote Builders",
    description: "Automated pricing based on job specs",
  },
  {
    icon: "🌐",
    title: "Landing Pages",
    description: "High-converting campaign pages",
  },
  {
    icon: "📢",
    title: "Ad Campaign Automation",
    description: "Set-and-forget lead generation",
  },
  {
    icon: "📊",
    title: "Custom Dashboards",
    description: "Real-time business metrics",
  },
  {
    icon: "⚡",
    title: "Workflow Integration",
    description: "Connect all your tools seamlessly",
  },
];

export function CustomAutomationCTA() {
  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
    theme: "auto",
  });

  return (
    <div className="relative isolate bg-white dark:bg-neutral-950 w-full px-4 py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100">
            Need More Than Express Core?
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400 mt-4">
            Custom automation built for your specific needs. From AI voice agents to complete workflow overhauls.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {customAutomationExamples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{example.icon}</div>
              <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-2">
                {example.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {example.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="font-bold text-2xl md:text-3xl text-neutral-800 dark:text-neutral-100 mb-4">
            Let's Build Something Custom
          </h3>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
            Have a specific workflow in mind? Book a call and we'll scope out exactly what you need—no cookie-cutter solutions.
          </p>
          <Button
            data-cal-namespace={calOptions.namespace}
            data-cal-link={CONSTANTS.CALCOM_LINK}
            data-cal-config={`{"layout":"${calOptions.layout}"}`}
            as="button"
            variant="primary"
            className="w-full sm:w-auto px-8"
          >
            Book a Scoping Call
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
