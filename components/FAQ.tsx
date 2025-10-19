"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    question: "Who owns the automations you build?",
    answer:
      "You do. Everything is built on your accounts. I don't hold anything hostage. You get full access, documentation, and control. If you want to take it in-house later, you can.",
  },
  {
    question: "How do you access my systems?",
    answer:
      "You provide access during our kickoff call. I work directly in your tools—CRM, marketing platforms, workflow apps. Once we're done, you can revoke access anytime. Your data stays yours.",
  },
  {
    question: "What's the typical timeline?",
    answer:
      "Discovery takes 1-2 weeks. Design and build depends on complexity—simple workflows deploy in 2-3 weeks, multi-system integrations can take 4-6 weeks. We set clear milestones upfront. No surprises.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Most clients stay on a monthly retainer for optimization, scaling, and new builds. Default SLA is 72 hours for fixes and updates, but we adapt this based on your needs. Some clients need same-day support—we handle that too.",
  },
  {
    question: "What if the automation breaks?",
    answer:
      "I fix it. Part of the deal. Automations need maintenance—APIs change, platforms update. Retainer clients get priority support. One-off projects include 30 days of fixes post-launch.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Depends on scope. Simple workflow automation starts around $5K. Multi-department systems with custom integrations run $15K-$30K+. Retainers start at $2K/month for ongoing optimization and support. Book a call and we'll scope it out.",
  },
  {
    question: "Do you work with our team or replace them?",
    answer:
      "I work with your team. Done-with-you, not for-you. Your people learn the systems as we build. Training is included. Goal is to make your team more effective, not dependent on me.",
  },
  {
    question: "What platforms do you integrate with?",
    answer:
      "CRMs (HubSpot, Salesforce), automation tools (Make, Zapier, n8n), AI platforms (OpenAI, Claude, custom agents), marketing tools (Google, Meta, LinkedIn), project management (ClickUp, Notion, Airtable), and more. If it has an API, we can connect it.",
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
