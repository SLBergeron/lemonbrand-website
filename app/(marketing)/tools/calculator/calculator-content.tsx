"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator, TrendingDown, DollarSign, Check, AlertTriangle } from "lucide-react";
import { Section } from "@/components/shared/Section";

export default function CalculatorContent() {
  const [monthlyFee, setMonthlyFee] = useState(200);
  const [annualIncrease, setAnnualIncrease] = useState(10);
  const [oneTimeCost, setOneTimeCost] = useState(8000);
  const [maintenanceCost, setMaintenanceCost] = useState(50);

  const calculations = useMemo(() => {
    // SaaS costs over 3 years with annual price increases
    const year1SaaS = monthlyFee * 12;
    const year2SaaS = monthlyFee * (1 + annualIncrease / 100) * 12;
    const year3SaaS = monthlyFee * Math.pow(1 + annualIncrease / 100, 2) * 12;
    const totalSaaS = year1SaaS + year2SaaS + year3SaaS;

    // One-time purchase costs
    const totalOwn = oneTimeCost + (maintenanceCost * 36);

    // Savings
    const savings = totalSaaS - totalOwn;
    const savingsPercent = Math.round((savings / totalSaaS) * 100);

    return {
      year1SaaS: Math.round(year1SaaS),
      year2SaaS: Math.round(year2SaaS),
      year3SaaS: Math.round(year3SaaS),
      totalSaaS: Math.round(totalSaaS),
      totalOwn: Math.round(totalOwn),
      savings: Math.round(savings),
      savingsPercent,
      breakevenMonths: oneTimeCost > 0 ? Math.ceil(oneTimeCost / monthlyFee) : 0,
    };
  }, [monthlyFee, annualIncrease, oneTimeCost, maintenanceCost]);

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
            See what you&apos;re really paying for that &quot;affordable&quot; $99/month subscription over 3 years.
            Compare it to owning your software outright.
          </p>
        </div>
      </Section>

      {/* Calculator */}
      <section className="py-12 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-6">Your Current SaaS</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="monthlyFee">Monthly subscription</Label>
                    <span className="text-sm font-medium">${monthlyFee}/mo</span>
                  </div>
                  <Slider
                    id="monthlyFee"
                    value={[monthlyFee]}
                    onValueChange={([v]) => setMonthlyFee(v)}
                    min={50}
                    max={1000}
                    step={25}
                    className="mb-1"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$50</span>
                    <span>$1,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="annualIncrease">Expected annual price increase</Label>
                    <span className="text-sm font-medium">{annualIncrease}%</span>
                  </div>
                  <Slider
                    id="annualIncrease"
                    value={[annualIncrease]}
                    onValueChange={([v]) => setAnnualIncrease(v)}
                    min={0}
                    max={25}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-display text-xl font-semibold mb-6">Own It Instead</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="oneTimeCost">One-time purchase cost</Label>
                      <span className="text-sm font-medium">${oneTimeCost.toLocaleString()}</span>
                    </div>
                    <Slider
                      id="oneTimeCost"
                      value={[oneTimeCost]}
                      onValueChange={([v]) => setOneTimeCost(v)}
                      min={2000}
                      max={30000}
                      step={500}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$2,000</span>
                      <span>$30,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="maintenanceCost">Monthly hosting/maintenance</Label>
                      <span className="text-sm font-medium">${maintenanceCost}/mo</span>
                    </div>
                    <Slider
                      id="maintenanceCost"
                      value={[maintenanceCost]}
                      onValueChange={([v]) => setMaintenanceCost(v)}
                      min={0}
                      max={200}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* 3-Year Comparison */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-6">3-Year Total Cost</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">SaaS Subscription</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Year 1: ${calculations.year1SaaS.toLocaleString()} → Year 3: ${calculations.year3SaaS.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-display text-2xl font-bold text-destructive">
                      ${calculations.totalSaaS.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Own It</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        One-time + ${maintenanceCost}/mo hosting
                      </p>
                    </div>
                    <p className="font-display text-2xl font-bold text-success">
                      ${calculations.totalOwn.toLocaleString()}
                    </p>
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
                    {calculations.savingsPercent}% less over 3 years
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Break-even: {calculations.breakevenMonths} months
                  </p>
                </div>
              ) : (
                <div className="bg-muted rounded-lg border border-border p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    At these settings, SaaS might be cheaper.
                    But remember: you own nothing when you stop paying.
                  </p>
                </div>
              )}

              {/* What You Get */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-display font-semibold mb-4">With ownership you also get:</h3>
                <ul className="space-y-2">
                  {[
                    "No price increases ever",
                    "Full source code ownership",
                    "Runs on your infrastructure",
                    "No vendor lock-in",
                    "Works even if we disappear",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Ready to own your tools?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            See our pre-built tools or get a quote for something custom.
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
