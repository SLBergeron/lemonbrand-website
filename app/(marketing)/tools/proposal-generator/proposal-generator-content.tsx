"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  FileText,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
  Sparkles,
  Check,
  Download,
  Calendar,
  Building2,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react";
import { Section } from "@/components/shared/Section";

// Types
type ProjectType = "internal-tool" | "customer-portal" | "automation" | "dashboard" | "other";
type Complexity = "simple" | "moderate" | "complex";
type FormStep = "project" | "scope" | "features" | "results";

interface ProposalInput {
  projectType: ProjectType;
  projectDescription: string;
  complexity: Complexity;
  userCount: number;
  integrations: number;
  features: {
    authentication: boolean;
    payments: boolean;
    notifications: boolean;
    reporting: boolean;
    fileStorage: boolean;
    externalAPIs: boolean;
    mobileResponsive: boolean;
    multiTenant: boolean;
  };
  timeline: "standard" | "accelerated";
  companyName: string;
  email: string;
}

interface ProposalCalculations {
  basePrice: number;
  featureAddons: number;
  complexityMultiplier: number;
  timelineMultiplier: number;
  estimatedTotal: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  estimatedWeeks: number;
  monthlyMaintenance: number;
}

const PROJECT_TYPES: Record<ProjectType, { label: string; description: string }> = {
  "internal-tool": { label: "Internal Tool", description: "Streamline operations, HR, inventory, etc." },
  "customer-portal": { label: "Customer Portal", description: "Client-facing dashboards and self-service" },
  "automation": { label: "Workflow Automation", description: "Automate repetitive tasks and processes" },
  "dashboard": { label: "Analytics Dashboard", description: "Data visualization and reporting" },
  "other": { label: "Other / Custom", description: "Something unique to your business" },
};

const COMPLEXITY_OPTIONS: Record<Complexity, { label: string; description: string; basePrice: number }> = {
  simple: { label: "Simple", description: "Single purpose, few screens, basic logic", basePrice: 5000 },
  moderate: { label: "Moderate", description: "Multiple features, user roles, integrations", basePrice: 12000 },
  complex: { label: "Complex", description: "Enterprise-grade, advanced logic, high scale", basePrice: 22000 },
};

const FEATURE_PRICES: Record<keyof ProposalInput["features"], { label: string; price: number }> = {
  authentication: { label: "User Authentication & Roles", price: 1500 },
  payments: { label: "Payment Processing", price: 2500 },
  notifications: { label: "Email/SMS Notifications", price: 1000 },
  reporting: { label: "Reports & Exports", price: 1500 },
  fileStorage: { label: "File Upload/Storage", price: 1000 },
  externalAPIs: { label: "External API Integrations", price: 2000 },
  mobileResponsive: { label: "Mobile-Responsive Design", price: 1500 },
  multiTenant: { label: "Multi-Tenant Architecture", price: 3000 },
};

const FORM_STEPS: { id: FormStep; label: string; description: string }[] = [
  { id: "project", label: "Project Type", description: "What are you building?" },
  { id: "scope", label: "Scope & Scale", description: "How big is this project?" },
  { id: "features", label: "Features", description: "What capabilities do you need?" },
  { id: "results", label: "Your Quote", description: "Estimated investment" },
];

const stepIcons = {
  project: Briefcase,
  scope: Layers,
  features: Sparkles,
  results: FileText,
};

const defaultInput: ProposalInput = {
  projectType: "internal-tool",
  projectDescription: "",
  complexity: "moderate",
  userCount: 25,
  integrations: 2,
  features: {
    authentication: true,
    payments: false,
    notifications: true,
    reporting: true,
    fileStorage: false,
    externalAPIs: false,
    mobileResponsive: true,
    multiTenant: false,
  },
  timeline: "standard",
  companyName: "",
  email: "",
};

function calculateProposal(input: ProposalInput): ProposalCalculations {
  const basePrice = COMPLEXITY_OPTIONS[input.complexity].basePrice;

  // Feature add-ons
  let featureAddons = 0;
  Object.entries(input.features).forEach(([key, enabled]) => {
    if (enabled) {
      featureAddons += FEATURE_PRICES[key as keyof typeof FEATURE_PRICES].price;
    }
  });

  // Scale multiplier based on users
  let scaleMultiplier = 1;
  if (input.userCount > 100) scaleMultiplier = 1.15;
  else if (input.userCount > 50) scaleMultiplier = 1.1;

  // Integration complexity
  const integrationCost = input.integrations * 1500;

  // Timeline multiplier
  const timelineMultiplier = input.timeline === "accelerated" ? 1.25 : 1;

  // Calculate total
  const subtotal = (basePrice + featureAddons + integrationCost) * scaleMultiplier;
  const estimatedTotal = Math.round(subtotal * timelineMultiplier);

  // Range (±15%)
  const priceRangeLow = Math.round(estimatedTotal * 0.85);
  const priceRangeHigh = Math.round(estimatedTotal * 1.15);

  // Timeline estimate
  let baseWeeks = input.complexity === "simple" ? 3 : input.complexity === "moderate" ? 6 : 10;
  const estimatedWeeks = input.timeline === "accelerated" ? Math.ceil(baseWeeks * 0.7) : baseWeeks;

  // Monthly maintenance (10% of total annually = ~0.83% monthly)
  const monthlyMaintenance = Math.round(estimatedTotal * 0.01);

  return {
    basePrice,
    featureAddons,
    complexityMultiplier: scaleMultiplier,
    timelineMultiplier,
    estimatedTotal,
    priceRangeLow,
    priceRangeHigh,
    estimatedWeeks,
    monthlyMaintenance,
  };
}

export default function ProposalGeneratorContent() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<ProposalInput>(defaultInput);

  const currentStep = FORM_STEPS[currentStepIndex];

  const calculations = useMemo(() => calculateProposal(formData), [formData]);

  const updateField = useCallback(<K extends keyof ProposalInput>(field: K, value: ProposalInput[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleFeature = useCallback((feature: keyof ProposalInput["features"]) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature] },
    }));
  }, []);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < FORM_STEPS.length) {
      setCurrentStepIndex(index);
    }
  }, []);

  const nextStep = useCallback(() => goToStep(currentStepIndex + 1), [currentStepIndex, goToStep]);
  const prevStep = useCallback(() => goToStep(currentStepIndex - 1), [currentStepIndex, goToStep]);

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Free Tool
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Custom Tool Quote Generator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Get an instant estimate for your custom business tool. No sales calls, no waiting.
            Just answer a few questions and see your personalized quote.
          </p>
        </div>
      </Section>

      {/* Generator */}
      <section className="py-12 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-premium-lg border border-border overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-muted/50 border-b border-border px-6 py-4">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {FORM_STEPS.map((step, index) => {
                  const Icon = stepIcons[step.id];
                  const isActive = index === currentStepIndex;
                  const isCompleted = index < currentStepIndex;

                  return (
                    <button
                      key={step.id}
                      onClick={() => goToStep(index)}
                      className={`flex flex-col items-center gap-2 transition-colors ${
                        isActive
                          ? "text-accent"
                          : isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-accent/10 text-accent"
                            : isCompleted
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium hidden sm:block">{step.label}</span>
                    </button>
                  );
                })}
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-1 bg-border rounded-full overflow-hidden max-w-2xl mx-auto">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / FORM_STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold">{currentStep.label}</h2>
                <p className="text-muted-foreground mt-1">{currentStep.description}</p>
              </div>

              {/* Project Type Step */}
              {currentStep.id === "project" && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">What type of tool do you need?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(PROJECT_TYPES).map(([key, { label, description }]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => updateField("projectType", key as ProjectType)}
                          className={`p-4 rounded-lg border-2 transition-colors text-left ${
                            formData.projectType === key
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <span className="font-medium block">{label}</span>
                          <span className="text-sm text-muted-foreground">{description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="mb-2 block">
                      Brief description (optional)
                    </Label>
                    <textarea
                      id="description"
                      value={formData.projectDescription}
                      onChange={(e) => updateField("projectDescription", e.target.value)}
                      placeholder="Tell us a bit about what you want to build..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Scope Step */}
              {currentStep.id === "scope" && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Project Complexity</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {Object.entries(COMPLEXITY_OPTIONS).map(([key, { label, description, basePrice }]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => updateField("complexity", key as Complexity)}
                          className={`p-4 rounded-lg border-2 transition-colors text-left ${
                            formData.complexity === key
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <span className="font-medium block">{label}</span>
                          <span className="text-sm text-muted-foreground block mb-2">{description}</span>
                          <span className="text-xs text-accent font-medium">From ${basePrice.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Expected Users</Label>
                      <span className="text-sm font-medium text-accent">{formData.userCount} users</span>
                    </div>
                    <Slider
                      value={[formData.userCount]}
                      onValueChange={([v]) => updateField("userCount", v)}
                      min={5}
                      max={200}
                      step={5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5</span>
                      <span>200+</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>External Integrations</Label>
                      <span className="text-sm font-medium text-accent">{formData.integrations}</span>
                    </div>
                    <Slider
                      value={[formData.integrations]}
                      onValueChange={([v]) => updateField("integrations", v)}
                      min={0}
                      max={10}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>10+</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      CRM, ERP, payment gateways, email services, etc.
                    </p>
                  </div>

                  <div>
                    <Label className="mb-3 block">Timeline</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => updateField("timeline", "standard")}
                        className={`p-4 rounded-lg border-2 transition-colors text-left ${
                          formData.timeline === "standard"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <span className="font-medium block">Standard</span>
                        <span className="text-sm text-muted-foreground">Normal pace, best value</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("timeline", "accelerated")}
                        className={`p-4 rounded-lg border-2 transition-colors text-left ${
                          formData.timeline === "accelerated"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <span className="font-medium block">Accelerated</span>
                        <span className="text-sm text-muted-foreground">30% faster, +25% cost</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Features Step */}
              {currentStep.id === "features" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Select the features you need. Each adds to your quote.
                  </p>
                  {Object.entries(FEATURE_PRICES).map(([key, { label, price }]) => {
                    const featureKey = key as keyof ProposalInput["features"];
                    const isChecked = formData.features[featureKey];

                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border transition-colors ${
                          isChecked ? "border-accent/50 bg-accent/5" : "border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={key}
                              checked={isChecked}
                              onCheckedChange={() => toggleFeature(featureKey)}
                            />
                            <label htmlFor={key} className="cursor-pointer">
                              <span className="font-medium">{label}</span>
                            </label>
                          </div>
                          <span className="text-sm text-muted-foreground">+${price.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Results Step */}
              {currentStep.id === "results" && (
                <div className="space-y-6">
                  {/* Quote Card */}
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Investment</p>
                    <p className="font-display text-4xl sm:text-5xl font-bold text-accent mb-2">
                      ${calculations.priceRangeLow.toLocaleString()} - ${calculations.priceRangeHigh.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      One-time purchase. You own it forever.
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold">{calculations.estimatedWeeks}</p>
                      <p className="text-sm text-muted-foreground">weeks to deliver</p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <DollarSign className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold">${calculations.monthlyMaintenance}</p>
                      <p className="text-sm text-muted-foreground">optional hosting/mo</p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <Shield className="w-6 h-6 text-success mx-auto mb-2" />
                      <p className="text-2xl font-bold text-success">$0</p>
                      <p className="text-sm text-muted-foreground">subscription fees</p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-display font-semibold mb-4">What&apos;s Included</h3>
                    <ul className="space-y-2">
                      {[
                        "Full source code ownership",
                        "Deployment to your infrastructure",
                        "30 days of post-launch support",
                        "Documentation & training",
                        "No vendor lock-in",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-success shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Form */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-display font-semibold mb-4">Get Your Full Proposal</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your details to receive a detailed scope document and discuss your project.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => updateField("companyName", e.target.value)}
                          placeholder="Your company"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@company.com"
                          className="mt-1"
                        />
                      </div>
                      <Button variant="accent" className="w-full" asChild>
                        <Link href="/custom">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Discovery Call
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStepIndex === 0
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                {currentStepIndex < FORM_STEPS.length - 1 ? (
                  <Button onClick={nextStep} variant="accent">
                    Continue
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Ready to start your project?
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8 text-center">
            How Custom Builds Work
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Discovery Call",
                description: "We discuss your needs, timeline, and budget. No pressure, just conversation.",
              },
              {
                step: "2",
                title: "Detailed Proposal",
                description: "You receive a fixed-price quote with exact deliverables and timeline.",
              },
              {
                step: "3",
                title: "Build & Deliver",
                description: "We build, you review. At the end, you own the code completely.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Ready for a real conversation?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            This calculator gives you a ballpark. For an exact quote,
            let&apos;s talk about your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/custom">
                Book Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/tools">
                See Pre-Built Tools
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Back to Tools */}
      <Section className="py-12">
        <div className="text-center">
          <Link
            href="/tools"
            className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to all tools
          </Link>
        </div>
      </Section>
    </main>
  );
}
