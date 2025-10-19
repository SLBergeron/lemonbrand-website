export interface CaseStudy {
  id: string;
  clientType: string;
  title: string;
  bottleneck: string;
  solution: string;
  result: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  color: string;
  skeletonType?: "avatars" | "timeline" | "beams" | "upload";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "outbound-marketing-agency",
    clientType: "Marketing Agency",
    title: "Automated Outbound Engine",
    bottleneck: "Sales team spending 60% of time on manual prospecting and follow-ups. Low response rates and inconsistent messaging across the team.",
    solution: "Built a multi-channel outreach system with AI-powered personalization, automated sequences, and intelligent follow-up triggers. Integrated directly with HubSpot CRM for seamless data flow and real-time tracking.",
    result: "Sales team reclaimed 40 hours per week while booking 127% more qualified meetings. Response rates jumped 34% with consistent, personalized messaging at scale.",
    metrics: [
      { label: "Meetings booked", value: "+127%" },
      { label: "Time saved", value: "40 hrs/week" },
      { label: "Response rate", value: "+34%" }
    ],
    tags: ["Sales", "Outbound", "AI Personalization", "HubSpot"],
    color: "orange-500",
    skeletonType: "timeline"
  },
  {
    id: "content-growth-agency",
    clientType: "Growth Agency",
    title: "Content Repurposing System",
    bottleneck: "Marketing team creating content for one channel at a time. Weeks spent manually adapting content for different platforms with inconsistent brand voice.",
    solution: "Deployed an AI content transformation pipeline that takes one piece of long-form content and automatically generates platform-optimized versions. Includes brand voice training, SEO optimization, and scheduling automation across 6 channels.",
    result: "One blog post now becomes 15+ pieces of content in under 2 hours. Content output increased 8x while maintaining brand consistency and quality.",
    metrics: [
      { label: "Content output", value: "8x increase" },
      { label: "Time per piece", value: "-85%" },
      { label: "Platform coverage", value: "6 channels" }
    ],
    tags: ["Marketing", "Content", "AI Generation", "Multi-channel"],
    color: "yellow-500",
    skeletonType: "upload"
  },
  {
    id: "ops-ad-agency",
    clientType: "Ad Management Firm",
    title: "Operations Intelligence Dashboard",
    bottleneck: "CEO spending 15+ hours per week manually pulling reports from 8 different tools to understand business health. No real-time visibility into project profitability or team capacity.",
    solution: "Created a unified operations intelligence system that aggregates data from project management, time tracking, invoicing, and CRM tools. Custom AI layer identifies bottlenecks, flags at-risk projects, and forecasts capacity issues before they become problems.",
    result: "Real-time visibility replaced weekly report hell. CEO now spends 2 hours per week on reporting. Caught 3 at-risk projects early, saving $45K in potential losses.",
    metrics: [
      { label: "Reporting time", value: "-87%" },
      { label: "Revenue saved", value: "$45K" },
      { label: "Systems unified", value: "8 → 1" }
    ],
    tags: ["Operations", "Dashboards", "Data Integration", "Forecasting"],
    color: "blue-500",
    skeletonType: "beams"
  },
  {
    id: "lead-gen-hvac",
    clientType: "HVAC Contractor",
    title: "Lead Qualification System",
    bottleneck: "Sales team wasting time on unqualified leads. No systematic way to prioritize inbound inquiries. 40% of calls going to leads that weren't ready to buy.",
    solution: "Built an AI-powered lead scoring and routing system that analyzes incoming leads across 15+ signals—property type, location, urgency indicators, buying timeline, and engagement patterns. Automatically prioritizes, enriches, and routes hot leads to sales while nurturing cold leads.",
    result: "Sales team now focuses on high-intent prospects. Close rate doubled, sales cycle shortened by 3 weeks, and team converted 60% more leads with the same headcount.",
    metrics: [
      { label: "Close rate", value: "+100%" },
      { label: "Sales cycle", value: "-3 weeks" },
      { label: "Conversions", value: "+60%" }
    ],
    tags: ["Sales", "Lead Scoring", "Automation", "AI Classification"],
    color: "purple-500",
    skeletonType: "avatars"
  }
];
