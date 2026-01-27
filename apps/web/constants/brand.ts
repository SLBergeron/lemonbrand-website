// Brand Core Values and Voice Guidelines

export interface CoreValue {
  id: string;
  name: string;
  meaning: string;
  shortDescription: string;
}

export const CORE_VALUES: CoreValue[] = [
  {
    id: "ownership",
    name: "You Own Everything",
    meaning: "No subscriptions, no vendor lock-in. Code runs on your infrastructure. Even if Simon disappeared, tools keep working.",
    shortDescription: "No subscriptions, no vendor lock-in",
  },
  {
    id: "fixed-pricing",
    name: "Fixed Pricing, No Surprises",
    meaning: "The quote is the price. Projects carefully scoped. No scope creep.",
    shortDescription: "The quote is the price",
  },
  {
    id: "ship-fast",
    name: "Ship Fast, Iterate Live",
    meaning: "Working prototype in 1-2 weeks. Iteration happens on real software, not wireframes. Proof over promises.",
    shortDescription: "Working prototype in 1-2 weeks",
  },
  {
    id: "plain-language",
    name: "Plain Language",
    meaning: "No jargon. Clear explanation of what's built and why. Transparent pricing.",
    shortDescription: "No jargon, clear communication",
  },
];

export const PHILOSOPHY = {
  principles: [
    "Outcomes over features",
    "Transparency over corporate speak",
    "Practical systems over theory",
    "Action over talk",
  ],
  motto: "Ship, don't talk",
} as const;

export const MISSION_STATEMENT =
  "Building AI Agent Businesses in Public — A designer-turned-developer-turned-AI entrepreneur who escaped the consulting trap by building productized systems that generate revenue without burning out.";

export const TAGLINE = "Automate your way to freedom.";

export const CORE_THESIS =
  "Businesses don't need to rent software anymore—the tools they need can be built fast and owned forever.";

// Brand Voice Guidelines

export const BRAND_VOICE = {
  tone: [
    "Direct and honest",
    "Action-oriented",
    "Practical over theoretical",
    "No jargon or buzzwords",
    "Builder mentality",
  ],
  keyPhrases: [
    "Tools you own. No subscriptions.",
    "Built with AI, delivered in weeks.",
    "Outcomes over features.",
    "Ship, don't talk.",
    "Working software, not mockups.",
  ],
  phrasesToAvoid: [
    "Revolutionary",
    "Game-changing",
    "Synergy",
    "Leverage",
    "Vague time estimates",
    "Feature lists without outcomes",
    "Enterprise-speak",
  ],
} as const;

// AI Positioning

export const AI_POSITIONING = {
  role: "AI is the enabler for rapid, affordable custom tool development—not the product itself.",
  messaging: [
    "Built with AI, delivered in weeks",
    "Custom software in 2-4 weeks instead of months",
    "1/4 to 1/3 the cost of traditional agencies",
  ],
  teachingPhilosophy:
    "If you can explain what you want clearly, you can learn to build it with AI. No coding background required.",
} as const;

// Value Proposition

export const VALUE_PROPOSITION = {
  problem: {
    title: "The Subscription Trap",
    description:
      "Software starts at $49/month, climbs to $99-$199. Features locked in enterprise tiers. After 3 years: $7,200-$28,800 paid, $0 owned.",
  },
  solution: {
    title: "Own Your Tools Forever",
    description:
      "One-time $4,500-$30,000 investment → 100% owned forever.",
  },
  differentiation: [
    {
      notThis: "Not a traditional agency",
      butThis: "Emphasizes ownership and teaching",
    },
    {
      notThis: "Not a bootcamp",
      butThis: "Focuses on practical building, not theoretical CS",
    },
    {
      notThis: "Not a SaaS",
      butThis: "One-time purchase, no subscriptions",
    },
  ],
} as const;

// Proof Points

export const PROOF_POINTS = {
  verifiedNode: {
    name: "VerifiedNode",
    metric: "58,000+ contractor records",
    description: "Trust layer for agentic web, paying customers",
  },
  caseStudies: {
    meetingsBooked: "+127%",
    reportingTime: "-87%",
    revenueSaved: "$45K",
  },
  credentials: [
    "Y Combinator alumni",
    "Maker School graduate",
    "13 years in startup ecosystem",
  ],
} as const;

// Frameworks

export const FRAMEWORKS = {
  buildStack: {
    name: "The Build Stack (3-Part Request Structure)",
    steps: [
      { name: "Context", description: "What exists, what you're trying to do, your constraints" },
      { name: "Task", description: "The specific thing you want built" },
      { name: "Constraints", description: "How you want it done" },
    ],
  },
  exchangePattern: {
    name: "The 2-3 Exchange Pattern",
    description:
      "The iterative cycle that closes the gap between 'what I got' and 'what I wanted.'",
    keyInsight: "Starting over is almost never the answer.",
  },
  communicationFramework: {
    name: "The Communication Framework",
    quote:
      "Two people can give Claude the exact same request and get completely different outputs. The difference isn't the prompt. It's the context.",
    insight: "The skill isn't coding—it's communication.",
  },
} as const;

// Competitive Moat

export const COMPETITIVE_MOAT = [
  "Builds real products (not just consulting)",
  "Teaches the methodology (creates advocates)",
  "Documents publicly (builds trust)",
  "Productizes client work (scales without burning out)",
  "Community retention (Builders Club)",
] as const;
