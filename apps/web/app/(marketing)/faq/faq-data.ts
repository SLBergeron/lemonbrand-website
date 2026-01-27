// FAQ data shared between server (for JSON-LD schema) and client (for rendering)

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: "Tools & Products",
    questions: [
      {
        question: "What is O. Reg. 476/24 and do I need an Ontario-compliant ATS?",
        answer:
          "O. Reg. 476/24 is Ontario's new Employment Standards Act regulation effective January 1, 2026. If you hire in Ontario, you need to: notify applicants within 45 days, disclose salary ranges (max $50,000 spread), declare AI usage in bilingual notices, avoid Canadian experience requirements, and retain records for 3 years. Non-compliance risks ESA penalties. Our ATS handles all of this automatically.",
      },
      {
        question: "Why buy tools instead of subscribing to SaaS?",
        answer:
          "After 3 years of $500/month SaaS, you've paid $18,000 and own nothing. Cancel and you lose everything. Our tools are one-time purchase ($4,500-$15,000)—you own the code forever. Deploy to your own infrastructure. No vendor lock-in. No price increases. No feature gates.",
      },
      {
        question: "What's included in a custom build?",
        answer:
          "Fixed price quote within 48 hours. Working prototype in 1-2 weeks. Deployed to your infrastructure. You own every line of code. 30 days of included support. No surprises—we don't disappear after delivery. Custom builds typically run $5,000-$30,000 depending on complexity.",
      },
      {
        question: "Can I see what you've built?",
        answer:
          "Yes. VerifiedNode (58,000+ contractor records) and Lemonbrand ATS (Ontario-compliant hiring) are both products we built and operate ourselves. We use the same methods for client work. Check /tools to see our available products.",
      },
    ],
  },
  {
    name: "Getting Started",
    questions: [
      {
        question: "What if I don't know where to start?",
        answer:
          "Start with the Sprint. Day 1 helps you pick YOUR project—something you actually want to build. The cohort and daily structure keep you moving. By Day 7, you'll have shipped something real.",
      },
      {
        question: "Do I need technical skills?",
        answer:
          "No. The skill isn't coding—it's communication. If you can explain what you want clearly in English, you can learn to build with AI. That's the whole point of the Sprint.",
      },
      {
        question: "How long until I can build something?",
        answer:
          "The Sprint is 7 days. Most people have working code by Day 3. By Day 7, you ship a complete tool. The 8-Week goes deeper—databases, auth, APIs—but you're building real things the whole way.",
      },
    ],
  },
  {
    name: "About the Programs",
    questions: [
      {
        question: "What's the difference between Sprint and 8-Week?",
        answer:
          "The Sprint is 7 days, one project—prove you can build something. The 8-Week goes deeper: databases, authentication, APIs, deployment. Multiple projects. You build the skill permanently.",
      },
      {
        question: "What kinds of things can I build?",
        answer:
          "Personal tools (recipe trackers, workout logs), work automation (dashboards, document processing), business products (client portals, internal tools). Sprint participants have built everything from proposal generators to gym management systems.",
      },
      {
        question: "What happens after I finish?",
        answer:
          "You own everything you build. The skill is yours. Some people stop there—one tool was all they needed. Some go deeper with the 8-Week. Some join the Builder's Club to keep building with a community.",
      },
      {
        question: "Is this a cohort or self-paced?",
        answer:
          "The Sprint is cohort-based—7 days with a group, daily trainings, Discord channel, Ship Day at the end. The structure and accountability help people actually finish.",
      },
    ],
  },
  {
    name: "Pricing & Logistics",
    questions: [
      {
        question: "How does the Sprint credit work?",
        answer:
          "Complete all 7 days of the Sprint and your $297 becomes credit toward the 8-Week program. It's valid for 12 months and applies to any tier.",
      },
      {
        question: "What are the 8-Week tiers?",
        answer:
          "Foundation ($997): The curriculum and community. Accelerator ($2,497): Adds 1-on-1 calls and project review. Intensive ($4,997): Maximum support with direct Slack access and code review on demand.",
      },
      {
        question: "Can I just start with the Sprint?",
        answer:
          "Absolutely. Most people do. The Sprint is designed to be valuable on its own—you ship something real. If you want to go deeper afterward, the 8-Week is there.",
      },
      {
        question: "What if I get stuck?",
        answer:
          "You're not alone. The Sprint has a Discord cohort channel and daily check-ins. The 8-Week has weekly office hours and priority support on higher tiers. Help is built into the structure.",
      },
    ],
  },
];

// Flatten all FAQs for schema generation
export function getAllFAQs(): FAQQuestion[] {
  return faqCategories.flatMap((category) => category.questions);
}
