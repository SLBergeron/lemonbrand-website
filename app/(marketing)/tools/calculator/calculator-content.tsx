"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  Calculator,
  TrendingDown,
  Check,
  AlertTriangle,
  Users,
  Building2,
  HeadphonesIcon,
  ChevronRight,
  Info,
} from "lucide-react";
import { Section } from "@/components/shared/Section";

// Real SaaS product data with hidden costs
const productCategories = [
  {
    id: "ats",
    name: "Applicant Tracking (ATS)",
    icon: Users,
    description: "Hiring and recruitment software",
    examples: [
      {
        name: "Greenhouse",
        monthlyBase: 500,
        setupFee: 5000,
        perUserFee: 0,
        annualIncrease: 12,
        hiddenCosts: ["$3K-10K implementation", "Job board posting fees", "Background check integrations"],
      },
      {
        name: "Lever",
        monthlyBase: 600,
        setupFee: 5000,
        perUserFee: 0,
        annualIncrease: 10,
        hiddenCosts: ["Mandatory onboarding package", "ATS + CRM bundled pricing", "Nurture campaign add-on"],
      },
      {
        name: "Workable",
        monthlyBase: 149,
        setupFee: 0,
        perUserFee: 50,
        annualIncrease: 15,
        hiddenCosts: ["AI features locked to higher tier", "Video interview add-on", "Assessments extra"],
      },
      {
        name: "BambooHR",
        monthlyBase: 200,
        setupFee: 0,
        perUserFee: 8,
        annualIncrease: 10,
        hiddenCosts: ["ATS is separate from core HR", "Performance management extra", "Time tracking add-on"],
      },
    ],
    ourSolution: {
      name: "Lemonbrand ATS",
      oneTimeCost: 4500,
      monthlyHosting: 25,
      features: [
        "O. Reg. 476/24 compliant",
        "45-day notification tracking",
        "Salary validation built-in",
        "M365 integration",
        "Unlimited users forever",
      ],
      link: "/tools/ats",
    },
    defaultUsers: 3,
    defaultSaasIndex: 2, // Workable
  },
  {
    id: "portal",
    name: "Client Portal",
    icon: Building2,
    description: "Client communication and file sharing",
    examples: [
      {
        name: "Copilot",
        monthlyBase: 39,
        setupFee: 0,
        perUserFee: 39,
        annualIncrease: 10,
        hiddenCosts: ["Per-client pricing on higher tiers", "White-label costs extra", "Custom domain extra"],
      },
      {
        name: "SuiteDash",
        monthlyBase: 99,
        setupFee: 0,
        perUserFee: 0,
        annualIncrease: 8,
        hiddenCosts: ["Learning curve (complex)", "Limited customization on base", "Storage limits"],
      },
      {
        name: "Monday.com",
        monthlyBase: 36,
        setupFee: 0,
        perUserFee: 36,
        annualIncrease: 12,
        hiddenCosts: ["3-seat minimum", "Automations limited", "Integrations on higher tiers"],
      },
      {
        name: "Clinked",
        monthlyBase: 95,
        setupFee: 500,
        perUserFee: 5,
        annualIncrease: 10,
        hiddenCosts: ["White-label is premium tier", "API access extra", "Custom branding limited"],
      },
    ],
    ourSolution: {
      name: "Custom Client Portal",
      oneTimeCost: 8000,
      monthlyHosting: 50,
      features: [
        "Your brand, your domain",
        "Unlimited clients",
        "File sharing + messaging",
        "Invoice integration",
        "Built to your workflow",
      ],
      link: "/custom",
    },
    defaultUsers: 5,
    defaultSaasIndex: 0, // Copilot
  },
  {
    id: "helpdesk",
    name: "Help Desk / Support",
    icon: HeadphonesIcon,
    description: "Customer support and ticketing",
    examples: [
      {
        name: "Zendesk",
        monthlyBase: 0,
        setupFee: 2500,
        perUserFee: 89,
        annualIncrease: 15,
        hiddenCosts: ["Suite pricing jumps significantly", "AI add-on ($50/agent)", "Advanced analytics extra"],
      },
      {
        name: "Intercom",
        monthlyBase: 74,
        setupFee: 0,
        perUserFee: 74,
        annualIncrease: 18,
        hiddenCosts: ["Resolution-based AI pricing ($0.99/each)", "Product Tours extra", "Proactive support extra"],
      },
      {
        name: "Freshdesk",
        monthlyBase: 0,
        setupFee: 0,
        perUserFee: 49,
        annualIncrease: 12,
        hiddenCosts: ["Field service extra", "Freddy AI limited", "Canned responses limited on base"],
      },
      {
        name: "Help Scout",
        monthlyBase: 0,
        setupFee: 0,
        perUserFee: 40,
        annualIncrease: 10,
        hiddenCosts: ["AI features on Plus tier only", "Docs sites limited", "Light users count against seats"],
      },
    ],
    ourSolution: {
      name: "Custom Help Desk",
      oneTimeCost: 12000,
      monthlyHosting: 75,
      features: [
        "Unlimited agents",
        "Email + chat + forms",
        "Knowledge base included",
        "SLA tracking",
        "Your integrations",
      ],
      link: "/custom",
    },
    defaultUsers: 4,
    defaultSaasIndex: 3, // Help Scout
  },
];

export default function CalculatorContent() {
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);
  const [selectedSaasIndex, setSelectedSaasIndex] = useState(selectedCategory.defaultSaasIndex);
  const [numUsers, setNumUsers] = useState(selectedCategory.defaultUsers);
  const [years, setYears] = useState(3);

  const selectedSaas = selectedCategory.examples[selectedSaasIndex];

  const calculations = useMemo(() => {
    // SaaS costs with compounding increases and hidden costs
    let saasTotalByYear: number[] = [];
    let runningTotal = 0;

    for (let year = 1; year <= years; year++) {
      const multiplier = Math.pow(1 + selectedSaas.annualIncrease / 100, year - 1);
      const yearlyBase = selectedSaas.monthlyBase * 12 * multiplier;
      const yearlyPerUser = selectedSaas.perUserFee * numUsers * 12 * multiplier;
      const yearTotal = yearlyBase + yearlyPerUser;
      runningTotal += yearTotal;
      saasTotalByYear.push(Math.round(runningTotal));
    }

    // Add setup fee
    const totalSaas = Math.round(selectedSaas.setupFee + saasTotalByYear[years - 1]);
    const year1Saas = Math.round(selectedSaas.setupFee + (selectedSaas.monthlyBase + selectedSaas.perUserFee * numUsers) * 12);

    // Our solution costs
    const totalOwn = selectedCategory.ourSolution.oneTimeCost + (selectedCategory.ourSolution.monthlyHosting * 12 * years);

    // Savings
    const savings = totalSaas - totalOwn;
    const savingsPercent = totalSaas > 0 ? Math.round((savings / totalSaas) * 100) : 0;
    const monthlyEquivalent = Math.round(totalOwn / (years * 12));
    const breakeven = selectedSaas.monthlyBase + selectedSaas.perUserFee * numUsers > 0
      ? Math.ceil(selectedCategory.ourSolution.oneTimeCost / (selectedSaas.monthlyBase + selectedSaas.perUserFee * numUsers))
      : 0;

    return {
      year1Saas,
      totalSaas,
      totalOwn,
      savings,
      savingsPercent,
      monthlyEquivalent,
      breakeven,
      effectiveMonthly: Math.round(totalSaas / (years * 12)),
    };
  }, [selectedSaas, selectedCategory, numUsers, years]);

  const handleCategoryChange = (category: typeof productCategories[0]) => {
    setSelectedCategory(category);
    setSelectedSaasIndex(category.defaultSaasIndex);
    setNumUsers(category.defaultUsers);
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            Free Tool
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            SaaS vs Own Calculator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Compare real subscription costs (including hidden fees) against owning your software.
            Select your tool category to see an honest breakdown.
          </p>
        </div>
      </Section>

      {/* Category Selector */}
      <section className="px-3 sm:px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          <Label className="text-sm text-muted-foreground mb-3 block">What type of tool are you looking at?</Label>
          <div className="grid sm:grid-cols-3 gap-4">
            {productCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory.id === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-accent bg-accent/5 ring-1 ring-accent"
                      : "border-border bg-card hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-accent/20" : "bg-muted"
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className={`font-semibold ${isSelected ? "text-accent" : ""}`}>{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              {/* SaaS Selection */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Compare Against</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a popular {selectedCategory.name.toLowerCase()} solution to compare:
                </p>

                <div className="space-y-2">
                  {selectedCategory.examples.map((saas, index) => (
                    <button
                      key={saas.name}
                      onClick={() => setSelectedSaasIndex(index)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedSaasIndex === index
                          ? "border-destructive/50 bg-destructive/5"
                          : "border-border hover:border-destructive/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{saas.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {saas.monthlyBase > 0 && `$${saas.monthlyBase}/mo`}
                          {saas.monthlyBase > 0 && saas.perUserFee > 0 && " + "}
                          {saas.perUserFee > 0 && `$${saas.perUserFee}/user`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hidden costs warning */}
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Hidden costs for {selectedSaas.name}:
                      </p>
                      <ul className="mt-1 space-y-1">
                        {selectedSaas.hiddenCosts.map((cost) => (
                          <li key={cost} className="text-xs text-amber-700 dark:text-amber-300">• {cost}</li>
                        ))}
                      </ul>
                      {selectedSaas.setupFee > 0 && (
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 font-medium">
                          + ${selectedSaas.setupFee.toLocaleString()} setup/implementation fee
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-6">Your Setup</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Number of users/seats</Label>
                      <span className="text-sm font-medium">{numUsers} users</span>
                    </div>
                    <Slider
                      value={[numUsers]}
                      onValueChange={([v]) => setNumUsers(v)}
                      min={1}
                      max={20}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Time horizon</Label>
                      <span className="text-sm font-medium">{years} years</span>
                    </div>
                    <Slider
                      value={[years]}
                      onValueChange={([v]) => setYears(v)}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1 year</span>
                      <span>5 years</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Calculation includes {selectedSaas.annualIncrease}% annual price increase (industry average for {selectedSaas.name}).
                      Most SaaS products increase prices 8-20% yearly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Cost Comparison */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-6">{years}-Year Total Cost</h2>

                <div className="space-y-4">
                  {/* SaaS */}
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-destructive">{selectedSaas.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Year 1: ${calculations.year1Saas.toLocaleString()}
                          {selectedSaas.setupFee > 0 && ` (incl. $${selectedSaas.setupFee.toLocaleString()} setup)`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Effective: ${calculations.effectiveMonthly}/mo average
                        </p>
                      </div>
                      <p className="font-display text-2xl font-bold text-destructive">
                        ${calculations.totalSaas.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Our Solution */}
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-success">{selectedCategory.ourSolution.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${selectedCategory.ourSolution.oneTimeCost.toLocaleString()} one-time + ${selectedCategory.ourSolution.monthlyHosting}/mo hosting
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Effective: ${calculations.monthlyEquivalent}/mo average
                        </p>
                      </div>
                      <p className="font-display text-2xl font-bold text-success">
                        ${calculations.totalOwn.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings */}
              {calculations.savings > 0 ? (
                <div className="bg-success/10 rounded-lg border border-success/30 p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-success mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">You save</p>
                  <p className="font-display text-4xl font-bold text-success mb-2">
                    ${calculations.savings.toLocaleString()}
                  </p>
                  <p className="text-sm text-success">
                    {calculations.savingsPercent}% less over {years} years
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Break-even in {calculations.breakeven} months • Then it&apos;s free forever
                  </p>
                </div>
              ) : (
                <div className="bg-muted rounded-lg border border-border p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    At {years} year{years > 1 ? "s" : ""}, SaaS is cheaper upfront.
                    <br />But you own nothing when you stop paying.
                  </p>
                </div>
              )}

              {/* What You Get */}
              <div className="bg-card rounded-lg border border-accent/30 p-6">
                <h3 className="font-display font-semibold mb-4">
                  What you get with {selectedCategory.ourSolution.name}:
                </h3>
                <ul className="space-y-2 mb-6">
                  {selectedCategory.ourSolution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="accent" className="w-full" asChild>
                  <Link href={selectedCategory.ourSolution.link}>
                    Learn More About {selectedCategory.ourSolution.name}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Cost Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              The hidden costs they don&apos;t show you
            </h2>
            <p className="text-muted-foreground">
              That &quot;$49/month&quot; tool rarely stays $49/month.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Setup Fees",
                description: "Many enterprise tools charge $2K-10K for \"implementation\" and \"onboarding.\"",
                examples: "Greenhouse, Zendesk, Clinked",
              },
              {
                title: "Per-Seat Scaling",
                description: "Costs multiply as you grow. 10 users at $50/seat = $500/month.",
                examples: "Zendesk, Intercom, Monday.com",
              },
              {
                title: "Feature Gating",
                description: "The feature you need is always on the next tier up. Then the next.",
                examples: "Most SaaS products",
              },
              {
                title: "Annual Increases",
                description: "8-20% price increases yearly. Your $99/mo becomes $145/mo in 3 years.",
                examples: "Industry standard",
              },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-lg border border-border p-5">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <p className="text-xs text-muted-foreground/70">Common in: {item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Ready to own your tools?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Check out our pre-built tools or get a quote for something custom.
            Same model: one-time purchase, you own it forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/tools">
                See Our Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/custom">
                Get a Custom Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Tools */}
      <Section className="py-12">
        <div className="text-center">
          <Link
            href="/tools#free"
            className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to free tools
          </Link>
        </div>
      </Section>
    </main>
  );
}
