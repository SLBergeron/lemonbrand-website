"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    question: "Who owns the automations you build?",
    answer:
      "You do. Everything is built on your accounts. We don't hold anything hostage. You get full access, documentation, and control. If you want to take it in-house later, you can.",
  },
  {
    question: "How do you access my systems?",
    answer:
      "You provide access during our kickoff call. We work directly in your tools—CRM, marketing platforms, workflow apps. Once we're done, you can revoke access anytime. Your data stays yours.",
  },
  {
    question: "What's the typical timeline?",
    answer:
      "Express Core goes live in 72 hours. That's discovery, build, and deployment for all 3 core automations. Custom integrations and multi-system builds take 2-6 weeks depending on complexity. We set clear milestones upfront. No surprises.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Most clients stay on a monthly retainer for optimization, scaling, and new builds. Default SLA is 72 hours for fixes and updates, but we adapt this based on your needs. Some clients need same-day support—we handle that too.",
  },
  {
    question: "What if the automation breaks?",
    answer:
      "We fix it. Part of the deal. Automations need maintenance—APIs change, platforms update. Retainer clients get priority support. One-off projects include 30 days of fixes post-launch.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Express Core (our 3-automation booked-job engine) is $1,500 setup + $499/month. Goes live in 72 hours with a guarantee: 20+ qualified booked jobs in Month 1 or we work free. Custom integrations and enterprise systems run $15K-$30K+. Retainers start at $2K/month for ongoing optimization.",
  },
  {
    question: "Do you work with our team or replace them?",
    answer:
      "We work with your team. Done-with-you, not for-you. Your people learn the systems as we build. Training is included. Goal is to make your team more effective, not dependent on us.",
  },
  {
    question: "What's the 20+ booked jobs guarantee?",
    answer:
      "If Express Core doesn't generate at least 20 qualified booked jobs in Month 1, we work free until it does. That's 20+ real jobs on your calendar—not just leads or inquiries. Actual scheduled work. We track every booking in your Jobs Ledger so you can verify the count.",
  },
  {
    question: "What platforms do you integrate with?",
    answer:
      "Home services CRMs (ServiceTitan, Jobber, Housecall Pro), plus standard tools: HubSpot, Salesforce, Make, Zapier, n8n, OpenAI, Claude, Google, Meta, ClickUp, Notion, Airtable. If it has an API, we can connect it.",
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
