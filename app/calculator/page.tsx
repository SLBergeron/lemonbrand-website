"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

interface CalculatorInputs {
  hoursPerWeek: number;
  hourlyRate: number;
  teamMembers: number;
  painPoints: string[];
  industry: string;
}

const painPointOptions = [
  { id: "slow-response", label: "Slow response times losing deals", dealImpact: 12000 },
  { id: "manual-errors", label: "Manual data entry errors", dealImpact: 15000 },
  { id: "bottlenecks", label: "Bottlenecks in lead handling", dealImpact: 18000 },
  { id: "admin-tasks", label: "Repetitive admin tasks", dealImpact: 8000 },
  { id: "content-creation", label: "Content creation takes forever", dealImpact: 10000 },
  { id: "no-visibility", label: "No visibility into operations", dealImpact: 12000 },
];

const industries = [
  "Home Services (HVAC, Plumbing, Electrical)",
  "Professional Services (Legal, Accounting, Consulting)",
  "Healthcare & Wellness",
  "Real Estate & Property Management",
  "Manufacturing & Distribution",
  "Retail & E-commerce",
  "Construction & Trades",
  "Technology & SaaS",
  "Marketing & Creative Agencies",
  "Financial Services",
  "Education & Training",
  "Other",
];

const industryCoefficients: Record<string, { timeRecovery: number; dealImpact: number }> = {
  // High automation potential (1.2x-1.3x)
  "Home Services (HVAC, Plumbing, Electrical)": {
    timeRecovery: 1.3,
    dealImpact: 1.2,
  },
  "Real Estate & Property Management": {
    timeRecovery: 1.25,
    dealImpact: 1.3,
  },
  // Medium-high potential (1.1x-1.2x)
  "Professional Services (Legal, Accounting, Consulting)": {
    timeRecovery: 1.2,
    dealImpact: 1.0,
  },
  "Healthcare & Wellness": {
    timeRecovery: 1.15,
    dealImpact: 1.1,
  },
  "Construction & Trades": {
    timeRecovery: 1.2,
    dealImpact: 1.15,
  },
  // Medium potential (1.0x-1.1x)
  "Marketing & Creative Agencies": {
    timeRecovery: 1.1,
    dealImpact: 0.9,
  },
  "Technology & SaaS": {
    timeRecovery: 1.0,
    dealImpact: 1.1,
  },
  "Financial Services": {
    timeRecovery: 1.15,
    dealImpact: 1.0,
  },
  // Standard potential (0.9x-1.0x)
  "Manufacturing & Distribution": {
    timeRecovery: 0.95,
    dealImpact: 0.85,
  },
  "Retail & E-commerce": {
    timeRecovery: 1.0,
    dealImpact: 0.9,
  },
  "Education & Training": {
    timeRecovery: 1.1,
    dealImpact: 0.85,
  },
  "Other": {
    timeRecovery: 1.0,
    dealImpact: 1.0,
  },
};

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hoursPerWeek: 20,
    hourlyRate: 75,
    teamMembers: 3,
    painPoints: [],
    industry: "Home Services (HVAC, Plumbing, Electrical)",
  });

  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
    theme: "auto",
  });

  // Get industry coefficients
  const selectedIndustry = industryCoefficients[inputs.industry] || { timeRecovery: 1.0, dealImpact: 1.0 };

  // Calculate ROI metrics with industry coefficients
  const timeRecovered = Math.round(inputs.hoursPerWeek * 0.7 * inputs.teamMembers * selectedIndustry.timeRecovery);
  const yearlyHours = timeRecovered * 52;
  const monthlyHours = Math.round(timeRecovered * 4.33); // Average weeks per month
  const directSavings = monthlyHours * inputs.hourlyRate;
  const yearlySavings = directSavings * 12;

  const dealImpact = inputs.painPoints.reduce((total, pointId) => {
    const point = painPointOptions.find(p => p.id === pointId);
    return total + ((point?.dealImpact || 0) * selectedIndustry.dealImpact);
  }, 0);

  const totalOpportunity = yearlySavings + dealImpact;

  // Degressive investment rate based on total opportunity
  const getInvestmentRate = (totalOpportunity: number): number => {
    if (totalOpportunity < 50000) return 0.35;      // 35% for small projects
    if (totalOpportunity < 100000) return 0.30;     // 30% for medium projects
    if (totalOpportunity < 200000) return 0.25;     // 25% for large projects
    if (totalOpportunity < 300000) return 0.22;     // 22% for very large
    return 0.20;                                     // 20% for enterprise
  };

  const investmentCost = Math.round(totalOpportunity * getInvestmentRate(totalOpportunity));
  const paybackWeeks = Math.round((investmentCost / totalOpportunity) * 52);
  const roi = Math.round(((totalOpportunity - investmentCost) / investmentCost) * 100);

  const handlePainPointToggle = (pointId: string) => {
    setInputs(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(pointId)
        ? prev.painPoints.filter(id => id !== pointId)
        : [...prev.painPoints, pointId]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            ROI Calculator
          </p>
          <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 md:text-5xl">
            See what you&apos;re leaving on the table
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
            Calculate your exact savings. Every manual task costs you money. Let&apos;s see how much.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-0 items-start overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-3xl">
          {/* Left: Inputs */}
          <div className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-12 shadow-[8px_0_24px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_24px_rgba(0,0,0,0.3)] relative z-10 rounded-l-3xl">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
              Your Current State
            </h3>

            {/* Hours per week */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Hours spent on manual tasks per week
                </label>
                <span className="text-2xl font-bold text-orange-500 dark:text-orange-400 tabular-nums">
                  {inputs.hoursPerWeek}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={inputs.hoursPerWeek}
                onChange={(e) => setInputs(prev => ({ ...prev, hoursPerWeek: Number(e.target.value) }))}
                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>0 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

            {/* Hourly rate and Team members - side by side */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Hourly rate ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                  <input
                    type="number"
                    min="25"
                    max="200"
                    step="5"
                    value={inputs.hourlyRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Team members
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={inputs.teamMembers}
                  onChange={(e) => setInputs(prev => ({ ...prev, teamMembers: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Pain points */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                What&apos;s costing you deals? (Select all that apply)
              </label>
              <div className="space-y-2">
                {painPointOptions.map((point) => (
                  <label
                    key={point.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={inputs.painPoints.includes(point.id)}
                      onChange={() => handlePainPointToggle(point.id)}
                      className="w-4 h-4 text-orange-500 bg-neutral-100 border-neutral-300 rounded focus:ring-orange-500 dark:bg-neutral-700 dark:border-neutral-600"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {point.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Industry
              </label>
              <select
                value={inputs.industry}
                onChange={(e) => setInputs(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:sticky lg:top-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800 p-12 rounded-r-3xl"
            >
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                Your Automation ROI
              </h3>

              {/* Time Recovered */}
              <div className="mb-6 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  ⏱️ Time Recovered
                </div>
                <div className="mt-2">
                  <TextGenerateEffect
                    key={timeRecovered}
                    words={`${timeRecovered} hours/week`}
                    className="text-3xl font-bold text-orange-500 dark:text-orange-400"
                    duration={0.3}
                  />
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  That&apos;s {yearlyHours.toLocaleString()} hours/year your team gets back
                </p>
              </div>

              {/* Direct Savings */}
              <div className="mb-6 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  💰 Direct Savings
                </div>
                <div className="mt-2">
                  <TextGenerateEffect
                    key={directSavings}
                    words={`$${directSavings.toLocaleString()}/month`}
                    className="text-3xl font-bold text-neutral-800 dark:text-neutral-100"
                    duration={0.3}
                  />
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  In recovered staff time (${yearlySavings.toLocaleString()}/year)
                </p>
              </div>

              {/* Hidden Costs */}
              {dealImpact > 0 && (
                <div className="mb-6 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    📈 Hidden Costs You&apos;re Losing
                  </div>
                  <div className="mt-2">
                    <TextGenerateEffect
                      key={dealImpact}
                      words={`$${dealImpact.toLocaleString()}/year`}
                      className="text-3xl font-bold text-neutral-800 dark:text-neutral-100"
                      duration={0.3}
                    />
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    From the {inputs.painPoints.length} bottleneck(s) you selected
                  </p>
                </div>
              )}

              {/* Total Opportunity */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                <div className="text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                  🎯 Total Opportunity
                </div>
                <div className="mt-2">
                  <TextGenerateEffect
                    key={totalOpportunity}
                    words={`$${totalOpportunity.toLocaleString()}/year`}
                    className="text-4xl font-bold text-orange-600 dark:text-orange-400"
                    duration={0.3}
                  />
                </div>
                <p className="mt-1 text-sm text-orange-600/80 dark:text-orange-400/80">
                  You&apos;re leaving this on the table
                </p>
              </div>

              {/* ROI Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    Payback Period
                  </div>
                  <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                    {paybackWeeks} weeks
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    12-Month ROI
                  </div>
                  <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                    {roi > 0 ? `${roi}%` : "N/A"}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                data-cal-namespace={calOptions.namespace}
                data-cal-link={CONSTANTS.CALCOM_LINK}
                data-cal-config={`{"layout":"${calOptions.layout}"}`}
                as="button"
                variant="dark"
                className="w-full"
              >
                Book Strategy Call
              </Button>
            </motion.div>
          </div>
        </div>

        {/* LayoutTextFlip CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative flex flex-col items-center justify-center gap-6 text-center p-12 rounded-3xl bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
              <LayoutTextFlip
                text="Stop losing deals to "
                words={["slow responses", "manual errors", "busywork", "copy-paste work"]}
              />
            </motion.div>
            <p className="mt-2 text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Your competitors automated months ago. Every day you wait is money left on the table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                data-cal-namespace={calOptions.namespace}
                data-cal-link={CONSTANTS.CALCOM_LINK}
                data-cal-config={`{"layout":"${calOptions.layout}"}`}
                as="button"
                variant="primary"
                className="min-w-[200px]"
              >
                Let&apos;s Fix This
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
