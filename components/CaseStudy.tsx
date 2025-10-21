"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

type TimelineEntry = {
  id: string;
  tabLabel: string;
  headline: string;
  problem: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  image: { src: string; alt: string };
  accent: { overlay: string; textClass: string };
};

const timelineEntries: TimelineEntry[] = [
  {
    id: "hvac-emergency",
    tabLabel: "HVAC Emergency",
    headline: "$23K captured in month 1. Zero after-hours calls to voicemail.",
    problem: "Emergency AC failures and heating outages went to voicemail after 6 PM. Customers called competitors who answered.",
    solution:
      "We built instant response automation that answers every call in under 2 minutes, confirms the emergency, and books the tech directly to the calendar—even at 2 AM.",
    results:
      "Captured 31 emergency calls in the first month worth $23K. Customer called back rate dropped to zero.",
    metrics: [
      { label: "Emergency calls captured", value: "31" },
      { label: "Revenue month 1", value: "$23K" },
      { label: "After-hours answer rate", value: "100%" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-1.webp",
      alt: "HVAC emergency call response dashboard",
    },
    accent: {
      overlay: "#f97316",
      textClass: "text-orange-500 dark:text-orange-300",
    },
  },
  {
    id: "plumbing-quote-followup",
    tabLabel: "Plumbing Quotes",
    headline: "Conversion rate: 22%→41%. No manual follow-up. Just closed jobs.",
    problem: "Quoted big-ticket water heater replacements and repiping jobs but never followed up. Estimates sat in email while customers ghosted.",
    solution:
      "We automated quote follow-up that sends reminders every 3 days, asks if they have questions, and books the install when they&apos;re ready—all without the owner lifting a finger.",
    results:
      "Quote-to-job conversion nearly doubled. Captured $47K in jobs that would have been lost.",
    metrics: [
      { label: "Conversion rate", value: "22%→41%" },
      { label: "Jobs recovered", value: "$47K" },
      { label: "Manual follow-ups", value: "0" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-2.webp",
      alt: "Plumbing quote follow-up automation dashboard",
    },
    accent: {
      overlay: "#eab308",
      textClass: "text-yellow-500 dark:text-yellow-300",
    },
  },
  {
    id: "electrician-reactivation",
    tabLabel: "Electrician Reactivation",
    headline: "18 past customers booked. $31K in panel upgrades. 11 days.",
    problem: "Hundreds of past commercial clients stopped calling. No system to re-engage them for annual inspections or code upgrades.",
    solution:
      "We built a reactivation sprint that finds dormant customers, sends personalized reminders about upcoming compliance deadlines, and books them back on the calendar.",
    results:
      "Reactivated 18 commercial accounts in 11 days. Generated $31K in panel upgrades and maintenance contracts.",
    metrics: [
      { label: "Customers reactivated", value: "18" },
      { label: "Revenue generated", value: "$31K" },
      { label: "Days to results", value: "11" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-3.webp",
      alt: "Electrician customer reactivation dashboard",
    },
    accent: {
      overlay: "#3b82f6",
      textClass: "text-blue-500 dark:text-blue-300",
    },
  },
  {
    id: "seasonal-surge",
    tabLabel: "Seasonal Surge",
    headline: "Handled 2x summer volume. Zero new hires. Same 4-person crew.",
    problem: "HVAC company drowned every summer when AC calls spiked. Either turned away jobs or paid overtime to keep up.",
    solution:
      "We automated intake, triage, and scheduling so emergency calls got instant response and routine maintenance auto-booked to open slots without burning staff hours.",
    results:
      "Handled double the summer call volume with the same team. Captured $89K in jobs that would have gone to competitors.",
    metrics: [
      { label: "Call volume handled", value: "2x" },
      { label: "New hires needed", value: "0" },
      { label: "Revenue captured", value: "$89K" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-4.webp",
      alt: "Seasonal surge automation dashboard showing call routing",
    },
    accent: {
      overlay: "#a855f7",
      textClass: "text-purple-500 dark:text-purple-300",
    },
  },
];

export function CaseStudy() {
  return (
    <section
      id="case-studies"
      className="w-full bg-white py-20 px-4 dark:bg-neutral-950 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Case Studies
          </p>
          <h2 className="mt-4 font-sans text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 md:text-4xl">
            Built for contractors. Proven by contractors.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
            Real automation systems generating revenue for HVAC, plumbing, and electrical contractors.
          </p>
        </div>

        <div className="w-full">
          <CaseStudyDesktop entries={timelineEntries} />
          <CaseStudyMobile entries={timelineEntries} />
        </div>
      </div>
    </section>
  );
}

type EntryWithAccent = TimelineEntry;

function Narrative({ entry }: { entry: EntryWithAccent }) {
  return (
    <div className="flex flex-col">
      <ImagePanel entry={entry} />
    </div>
  );
}

function ImagePanel({ entry }: { entry: EntryWithAccent }) {
  return (
    <MaskContainer
      className="mt-8 min-h-[32rem] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_68px_rgba(15,23,42,0.12)] transition dark:border-neutral-800 dark:bg-neutral-900"
      size={80}
      revealSize={1600}
      revealText={
        <div className="flex h-full w-full flex-col justify-between gap-8 p-8">
          <div className="space-y-8">
            <section>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Problem
              </h4>
              <p className="mt-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {entry.problem}
              </p>
            </section>
            <section>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Solution
              </h4>
              <p className="mt-3 text-base text-neutral-700 dark:text-neutral-200">
                {entry.solution}
              </p>
            </section>
            <section>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Results
              </h4>
              <p className="mt-3 text-base text-neutral-700 dark:text-neutral-200">
                {entry.results}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-neutral-700 dark:text-neutral-200 sm:grid-cols-3">
                {entry.metrics.map((metric) => (
                  <div
                    key={`${entry.id}-${metric.label}`}
                    className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      {metric.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-50">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Hover to see the automation in action.
          </p>
        </div>
      }
    >
      <Image
        src={entry.image.src}
        height={2000}
        width={2000}
        className="h-full w-full object-cover object-center"
        alt={entry.image.alt}
        fetchPriority="high"
      />
    </MaskContainer>
  );
}

function CaseStudyMobile({ entries }: { entries: EntryWithAccent[] }) {
  return (
    <div className="mx-auto block w-full max-w-7xl lg:hidden">
      {entries.map((entry) => (
        <div className="mb-12 flex flex-col gap-4" key={entry.id}>
          <div className="flex items-center rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-800/70">
            <span
              className={cn(
                "mr-4 flex-shrink-0 text-sm font-semibold",
                entry.accent.textClass
              )}
            >
              {entry.tabLabel}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
          </div>
          <ImagePanel entry={entry} />
        </div>
      ))}
    </div>
  );
}

function CaseStudyDesktop({ entries }: { entries: EntryWithAccent[] }) {
  const [active, setActive] = React.useState(entries[0]);
  const direction = useMotionValue(0);

  const isActive = (entry: EntryWithAccent) => entry.id === active.id;

  const handleSetActive = (entry: EntryWithAccent) => {
    const currentIndex = entries.findIndex((item) => item.id === active.id);
    const nextIndex = entries.findIndex((item) => item.id === entry.id);
    direction.set(nextIndex > currentIndex ? 1 : -1);
    setActive(entry);
  };

  return (
    <div className="mx-auto hidden w-full max-w-7xl lg:block">
      <div className="grid w-full grid-cols-4 gap-6">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => handleSetActive(entry)}
            className={cn(
              "flex items-center rounded-2xl border border-transparent p-4 text-left transition-colors",
              "hover:border-neutral-200 hover:bg-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60",
              isActive(entry)
                ? "border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
                : ""
            )}
            type="button"
          >
            <span
              className={cn(
                "mr-4 text-sm font-semibold",
                isActive(entry)
                  ? entry.accent.textClass
                  : "text-neutral-700 dark:text-neutral-100"
              )}
            >
              {entry.tabLabel}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
          </button>
        ))}
      </div>
      <div className="relative mt-10 w-full px-10 overflow-visible">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active.id}
            initial={{ x: direction.get() >= 0 ? 200 : -200, opacity: 0 }}
            exit={{ x: direction.get() >= 0 ? -200 : 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="w-full"
          >
            <Narrative entry={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

