"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    question: "Who is this for?",
    answer:
      "Agency owners, entrepreneurs, and AI builders who want to learn how to build productized AI businesses. This is NOT for contractors needing websites—if that's you, check out GetMyWebsite.io instead. This site is for people who want to build the systems themselves.",
  },
  {
    question: "What's in the free templates?",
    answer:
      "Implementation guides, code components, and frameworks I actually use to build my businesses. The 48-Hour Website Launch System, React component library, AI agent architectures. Real code and processes, not theoretical frameworks. Everything is immediately usable.",
  },
  {
    question: "Do you offer consulting?",
    answer:
      "Yes, but it's limited and selective. I only take projects with agency owners and entrepreneurs building AI systems. Projects start at $5k, complex builds run $15-30k, retainers start at $2.5k/month. This is done-with-you guidance, not done-for-you execution. If you want pure execution, hire an agency.",
  },
  {
    question: "Why build in public?",
    answer:
      "Two reasons: accountability and better content. Building in public forces me to ship and document everything. You get real insights from actual builds, not theory. Plus, you can learn from my mistakes without making them yourself. It's more valuable than another course about AI possibilities.",
  },
  {
    question: "What businesses are you building right now?",
    answer:
      "GetMyWebsite.io (productized websites for trades, $249 + $99/mo), CodeBrain (AI coding assistant), and Agent Modules (reusable AI components). Check the Projects page for full breakdowns, tech stacks, and weekly progress updates. Everything is documented as I build.",
  },
  {
    question: "Can you build my AI product for me?",
    answer:
      "Maybe. I only take projects where I can add strategic value beyond just coding. If you need pure execution, hire an agency—they're built for that. If you want done-with-you guidance where you learn the systems and can maintain them, let's talk on the Work with Me page.",
  },
  {
    question: "What's your background?",
    answer:
      "Designer turned developer turned AI entrepreneur. Y Combinator alum, built and sold multiple businesses. Escaped the consulting trap by building productized systems. Now building AI businesses in public and teaching agency owners how to do the same.",
  },
  {
    question: "How do I stay updated on what you're building?",
    answer:
      "Join the newsletter. I send weekly updates on what I'm building, lessons learned, new templates, and behind-the-scenes breakdowns. No fluff, just practical insights. You can also follow progress on the Projects page for real-time updates.",
  },
];
export function FrequentlyAskedQuestionsAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div id="faq" className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-20 md:grid-cols-2 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-bold tracking-tight text-neutral-600 md:text-left md:text-6xl dark:text-neutral-50">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {FAQs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string;
  answer: string;
  open: string | null;
  setOpen: (open: string | null) => void;
}) => {
  const isOpen = open === question;

  return (
    <div
      className="cursor-pointer py-4"
      onClick={() => {
        if (isOpen) {
          setOpen(null);
        } else {
          setOpen(question);
        }
      }}
    >
      <div className="flex items-start">
        <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
          <IconPlus
            className={cn(
              "absolute inset-0 h-6 w-6 transform text-orange-500 transition-all duration-200",
              isOpen && "rotate-90 scale-0",
            )}
          />
          <IconMinus
            className={cn(
              "absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-orange-500 transition-all duration-200",
              isOpen && "rotate-0 scale-100",
            )}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">
            {question}
          </h3>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden text-neutral-500 dark:text-neutral-400"
              >
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
