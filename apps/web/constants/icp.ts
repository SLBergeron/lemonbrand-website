// Ideal Customer Profile (ICP) Definitions

export type ICPTier = "primary" | "secondary" | "tertiary";

export interface ICPDemographics {
  businessType: string;
  employeeCount: string;
  revenue: string;
  industries: string[];
  location: string;
  age?: string;
}

export interface ICPPsychographics {
  traits: string[];
}

export interface ICPProfile {
  id: string;
  tier: ICPTier;
  name: string;
  tagline: string;
  demographics: ICPDemographics;
  psychographics: ICPPsychographics;
  painPoints: string[];
  triggerEvents: string[];
  jobsToBeDone: string[];
  entryProducts: string[];
}

// Primary ICP: The Operator-Builder

export const OPERATOR_BUILDER: ICPProfile = {
  id: "operator-builder",
  tier: "primary",
  name: "The Operator-Builder",
  tagline: "Business owners who want to own their tools, not rent them",
  demographics: {
    businessType: "Small business owner",
    employeeCount: "2-50 employees",
    revenue: "$500K-$5M annually",
    industries: [
      "Agencies",
      "Contractors",
      "Consultants",
      "Gyms",
      "Property management",
    ],
    location: "North America (Ontario compliance angle for Canadian market)",
  },
  psychographics: {
    traits: [
      "Frustrated by SaaS sprawl ($500-$2K/month on software subscriptions)",
      "Values ownership and control over convenience",
      "Practical, not theoretical—wants results, not features",
      "Understands their business deeply but thinks they \"can't code\"",
      "Time-constrained, willing to pay for speed",
    ],
  },
  painPoints: [
    "Software that has 80% of needed features, with the 20% gap causing friction",
    "Vendor lock-in anxiety",
    "Escalating subscription costs",
    "Tools that don't integrate with each other",
    "Waiting months for custom development from traditional agencies",
  ],
  triggerEvents: [
    "Annual software renewal shock ($X00 → $X,000)",
    "Scaling past what current tools can handle",
    "New compliance requirements (e.g., O. Reg. 476/24)",
    "Competitor has better systems/automation",
  ],
  jobsToBeDone: [
    "Automate repetitive workflows that eat 5-20 hours/week",
    "Create unified dashboards instead of checking 8 tools",
    "Build client-facing portals that look professional",
    "Replace manual processes before hiring another person",
  ],
  entryProducts: ["custom-tools", "ats"],
};

// Secondary ICP: The Aspiring Builder

export const ASPIRING_BUILDER: ICPProfile = {
  id: "aspiring-builder",
  tier: "secondary",
  name: "The Aspiring Builder",
  tagline: "Solo operators who want to build their own tools",
  demographics: {
    businessType: "Solo consultant, freelancer, or side-project operator",
    employeeCount: "1",
    revenue: "$50K-$300K",
    industries: [
      "Consulting",
      "Freelancing",
      "Side projects",
      "Online business",
    ],
    location: "Global (English-speaking)",
    age: "30-50",
  },
  psychographics: {
    traits: [
      "Wants to build their own tools without hiring developers",
      "Values learning and self-sufficiency",
      "Active in online communities (Twitter/X, newsletters, Discord)",
      "Following \"build in public\" creators",
      "Technical curiosity but no formal coding background",
    ],
  },
  painPoints: [
    "Can't afford custom development",
    "Frustrated by no-code tool limitations",
    "Feels dependent on developers for simple changes",
    "Knows exactly what they need but can't build it",
    "Overwhelmed by traditional coding education",
  ],
  triggerEvents: [
    "Hit the wall with no-code tools",
    "Saw someone build something cool with AI",
    "Needs a specific tool that doesn't exist",
    "Got a quote from a developer that was too expensive",
  ],
  jobsToBeDone: [
    "Build a tool for their specific use case",
    "Automate a repetitive task",
    "Create a competitive advantage through custom tooling",
    "Learn a valuable skill without going back to school",
  ],
  entryProducts: ["sprint", "8-week", "club"],
};

// Tertiary ICP: The Agency Owner

export const AGENCY_OWNER: ICPProfile = {
  id: "agency-owner",
  tier: "tertiary",
  name: "The Agency Owner",
  tagline: "Agency owners who see custom tools as competitive advantage",
  demographics: {
    businessType: "Marketing, creative, or consulting agency",
    employeeCount: "5-20 employees",
    revenue: "$1M-$10M",
    industries: [
      "Marketing agencies",
      "Creative agencies",
      "Consulting firms",
      "Digital agencies",
    ],
    location: "North America",
  },
  psychographics: {
    traits: [
      "Sees custom tools as competitive advantage",
      "Wants to white-label or resell tools to clients",
      "Values efficiency gains that compound across clients",
      "Looking for ways to productize services",
      "Interested in recurring revenue models",
    ],
  },
  painPoints: [
    "Doing the same work repeatedly for different clients",
    "Can't differentiate from other agencies",
    "High overhead on client deliverables",
    "Clients asking for custom solutions",
    "Team productivity limited by off-the-shelf tools",
  ],
  triggerEvents: [
    "Lost a client to an agency with better systems",
    "Realized they're trading time for money",
    "Client asked for a custom tool",
    "Saw an opportunity to productize a service",
  ],
  jobsToBeDone: [
    "Create proprietary tools that differentiate the agency",
    "Build client-facing portals that increase perceived value",
    "Automate repetitive client work",
    "Develop productized services with custom tooling",
  ],
  entryProducts: ["custom-tools", "client-portal"],
};

// All ICPs

export const ALL_ICPS: ICPProfile[] = [
  OPERATOR_BUILDER,
  ASPIRING_BUILDER,
  AGENCY_OWNER,
];

// Future Product Fit Analysis

export const PRODUCT_FIT_ANALYSIS = {
  projectManagement: {
    productId: "project-management",
    targetICPs: ["operator-builder", "agency-owner"],
    positioning: "Project management you own. Built for service businesses.",
    idealFor: [
      "Use 3+ tools to manage projects (Notion, Asana, spreadsheets)",
      "Need client visibility without giving full system access",
      "Want integrated time tracking, invoicing, project status",
    ],
  },
  propertyManagement: {
    productId: "property-management",
    targetICPs: ["operator-builder"],
    positioning: "Property management without the subscription tax.",
    idealFor: [
      "Small landlords (5-50 units) currently using spreadsheets or expensive PM software",
      "Property management companies paying $500+/month for PM SaaS",
      "Real estate investors who want unified portfolio view",
    ],
    buildProductizeScalePath: [
      "Build for a single property manager client ($15K-$30K)",
      "Extract core features, productize at $4,500-$8,000",
      "Create sales page programmatically (like ATS)",
      "Teach property managers to customize via programs",
    ],
  },
} as const;

// Helper functions

export function getICPByTier(tier: ICPTier): ICPProfile[] {
  return ALL_ICPS.filter((icp) => icp.tier === tier);
}

export function getICPById(id: string): ICPProfile | undefined {
  return ALL_ICPS.find((icp) => icp.id === id);
}

export function getPrimaryICP(): ICPProfile {
  return OPERATOR_BUILDER;
}

export function getICPsForProduct(productId: string): ICPProfile[] {
  return ALL_ICPS.filter((icp) => icp.entryProducts.includes(productId));
}
