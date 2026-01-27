// Products, Services, and Offer Structure

export type ProductCategory = "build" | "learn" | "free";
export type ProductStatus = "active" | "coming-soon";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  priceValue?: number;
  currency: "CAD" | "USD";
  description: string;
  status: ProductStatus;
  url?: string;
  features?: string[];
}

// Three-Path Flywheel Structure

export const OFFER_PATHS = {
  buildItForMe: {
    title: "Build It For Me",
    description: "Custom Tools ($5K-$30K) → Productized Tools ($4.5K-$15K)",
    audience: "Business owners who want results without learning to build",
  },
  teachMeToBuild: {
    title: "Teach Me To Build",
    description: "7-Day Sprint ($297) → 8-Week ($997+) → Builders Club ($97/mo)",
    audience: "Aspiring builders who want to learn the methodology",
  },
  letMeExploreFirst: {
    title: "Let Me Explore First",
    description: "Free Tools (Compliance Checker, Calculator, Quote Generator)",
    audience: "Anyone evaluating whether Lemonbrand is right for them",
  },
} as const;

// Current Products

export const PRODUCTS: Product[] = [
  // Build It For Me - Productized
  {
    id: "ats",
    name: "Lemonbrand ATS",
    category: "build",
    price: "$4,500",
    priceValue: 4500,
    currency: "CAD",
    description: "Ontario O. Reg. 476/24 compliant hiring system",
    status: "active",
    url: "/tools/ats",
    features: [
      "Ontario ESA-compliant",
      "One-time purchase",
      "Self-hosted option",
      "Source code included",
    ],
  },
  {
    id: "verifiednode",
    name: "VerifiedNode",
    category: "build",
    price: "Contact",
    currency: "CAD",
    description: "58,000+ contractor records, trust layer for agentic web",
    status: "active",
    features: [
      "58,000+ verified contractors",
      "API access",
      "Trust verification",
    ],
  },
  {
    id: "custom-tools",
    name: "Custom Tools",
    category: "build",
    price: "$5K-$30K",
    currency: "CAD",
    description: "Client-specific automation and dashboards",
    status: "active",
    url: "/custom",
    features: [
      "Fixed pricing",
      "2-4 week delivery",
      "You own the code",
      "30-day support included",
    ],
  },

  // Teach Me To Build
  {
    id: "sprint",
    name: "7-Day Sprint",
    category: "learn",
    price: "$297",
    priceValue: 297,
    currency: "USD",
    description: "Cohort-based build-your-first-tool program",
    status: "active",
    url: "/sprint",
    features: [
      "7 days, one working tool",
      "Cohort-based learning",
      "Live support",
      "Templates included",
    ],
  },
  {
    id: "8-week",
    name: "8-Week Program",
    category: "learn",
    price: "$997-$4,997",
    priceValue: 997,
    currency: "USD",
    description: "Production mastery curriculum",
    status: "active",
    url: "/8-week",
    features: [
      "8 weeks of guided building",
      "Multiple projects",
      "1:1 support",
      "Production-ready skills",
    ],
  },
  {
    id: "club",
    name: "Builders Club",
    category: "learn",
    price: "$97/mo",
    priceValue: 97,
    currency: "USD",
    description: "Ongoing community and accountability",
    status: "active",
    url: "/club",
    features: [
      "Monthly community calls",
      "Accountability partners",
      "Resource library",
      "Priority support",
    ],
  },

  // Free Tools
  {
    id: "compliance-checker",
    name: "Compliance Checker",
    category: "free",
    price: "Free",
    currency: "CAD",
    description: "Check Ontario O. Reg. 476/24 compliance",
    status: "active",
    url: "/tools/compliance-checker",
  },
  {
    id: "calculator",
    name: "SaaS Cost Calculator",
    category: "free",
    price: "Free",
    currency: "CAD",
    description: "Calculate your software subscription costs vs ownership",
    status: "active",
    url: "/tools/calculator",
  },
  {
    id: "proposal-generator",
    name: "Proposal Generator",
    category: "free",
    price: "Free",
    currency: "CAD",
    description: "Generate project proposals",
    status: "active",
    url: "/tools/proposal-generator",
  },
];

// Coming Soon Products

export const COMING_SOON: Product[] = [
  {
    id: "client-portal",
    name: "Client Portal",
    category: "build",
    price: "TBD",
    currency: "CAD",
    description: "White-labeled client access for agencies",
    status: "coming-soon",
  },
  {
    id: "desk-booking",
    name: "Desk Booking",
    category: "build",
    price: "TBD",
    currency: "CAD",
    description: "Workspace reservation system",
    status: "coming-soon",
  },
  {
    id: "proposal-system",
    name: "Proposal System",
    category: "build",
    price: "TBD",
    currency: "CAD",
    description: "Create, send, track proposals with e-signatures",
    status: "coming-soon",
  },
  {
    id: "project-management",
    name: "Project Management App",
    category: "build",
    price: "TBD",
    currency: "CAD",
    description: "Project management you own. Built for service businesses.",
    status: "coming-soon",
  },
  {
    id: "property-management",
    name: "Property Management App",
    category: "build",
    price: "TBD",
    currency: "CAD",
    description: "Property management without the subscription tax.",
    status: "coming-soon",
  },
];

// Build Cycle

export const BUILD_CYCLE = {
  steps: [
    { day: "Day 1", action: "Discovery Call", duration: "30 min" },
    { day: "48 hours", action: "Fixed Quote Delivered", duration: null },
    { day: "Week 1-2", action: "Working Prototype", note: "actual software, not mockups" },
    { day: "Week 2-4", action: "Full Deployment", note: "on client's infrastructure" },
    { day: "30 days", action: "Post-Launch Support Included", duration: null },
  ],
  pricingTiers: [
    { tier: "Small Tools", price: "$5K-$15K", timeline: "2-4 weeks" },
    { tier: "Complex Systems", price: "$15K-$30K", timeline: "4-8 weeks" },
    { tier: "Retainer", price: "$2.5K/month", timeline: "ongoing" },
  ],
} as const;

// Helper functions

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.status === "active");
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
