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
    id: "outbound-engine",
    tabLabel: "Outbound Engine",
    headline: "40 hours saved. 127% more meetings. One AI that never sleeps.",
    problem: "Sales reps burned hours chasing cold lists and reply rates stayed flat.",
    solution:
      "We dropped in an AI seller that writes the first touch, keeps the follow-ups tight, and logs every reply so reps stay on live calls.",
    results:
      "Calendar filled itself, the team won back 40 hours a week, and replies jumped 34%.",
    metrics: [
      { label: "Meetings booked", value: "+127%" },
      { label: "Hours saved", value: "40 / week" },
      { label: "Reply lift", value: "+34%" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-1.webp",
      alt: "Outbound automation dashboard showing booked calls pipeline",
    },
    accent: {
      overlay: "#f97316",
      textClass: "text-orange-500 dark:text-orange-300",
    },
  },
  {
    id: "content-repurpose",
    tabLabel: "Content System",
    headline: "One writer. Six channels. 8x the output. Here&apos;s how.",
    problem: "Marketing rewrote every asset for each platform by hand and ran out of hours.",
    solution:
      "We trained an AI editor on the brand voice so one long-form post spins into shorts, emails, and captions in minutes.",
    results:
      "Output jumped 8x without hiring, and every channel stays on message.",
    metrics: [
      { label: "Content output", value: "8x" },
      { label: "Time per piece", value: "-85%" },
      { label: "Channels live", value: "6" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-2.webp",
      alt: "Content planner view with multi-channel assets",
    },
    accent: {
      overlay: "#eab308",
      textClass: "text-yellow-500 dark:text-yellow-300",
    },
  },
  {
    id: "ops-intelligence",
    tabLabel: "Ops Intelligence",
    headline: "Found $45K hiding in their data. Took 2 hours instead of 16.",
    problem: "Leadership stitched eight tools together just to see profit and risk each week.",
    solution:
      "We unified the data, built a live cockpit, and flagged at-risk work before it burned cash.",
    results:
      "Reporting fell to two hours and $45K stayed on the books.",
    metrics: [
      { label: "Reporting time", value: "-87%" },
      { label: "Revenue saved", value: "$45K" },
      { label: "Tools merged", value: "8 → 1" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-3.webp",
      alt: "Operations dashboard with profit and capacity gauges",
    },
    accent: {
      overlay: "#3b82f6",
      textClass: "text-blue-500 dark:text-blue-300",
    },
  },
  {
    id: "lead-qualification",
    tabLabel: "Lead Qualification",
    headline: "Close rate: 23%→46%. Sales cycle: 6 weeks→3. Same team.",
    problem: "Reps chased cold inbound leads and guessed who was ready to buy.",
    solution:
      "We scored every lead on fifteen live signals and routed hot buyers to sales in seconds.",
    results: "Close rate doubled and the cycle shrank by three weeks.",
    metrics: [
      { label: "Close rate", value: "23%→46%" },
      { label: "Sales cycle", value: "6w→3w" },
      { label: "Conversions", value: "+60%" },
    ],
    image: {
      src: "https://assets.aceternity.com/templates/startup-4.webp",
      alt: "Lead scoring interface highlighting qualified solar prospects",
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
            Systems that pay for themselves before we send the invoice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
            Four weeks. Four wins. Every client hit ROI before day 30. Here&apos;s the math.
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

