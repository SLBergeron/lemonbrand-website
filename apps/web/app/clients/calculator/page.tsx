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
  avgJobValue: number;
  missedCallsPerMonth: number;
  quotesNotFollowedUp: number;
  pastCustomersNotContacted: number;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    avgJobValue: 3500,
    missedCallsPerMonth: 15,
    quotesNotFollowedUp: 8,
    pastCustomersNotContacted: 120,
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

  // Calculate missed revenue with conservative conversion rates
  const missedCallConversionRate = 0.30; // 30% of after-hours calls would book
  const quoteFollowUpConversionRate = 0.25; // 25% of followed-up quotes would convert
  const reactivationConversionRate = 0.15; // 15% of past customers would book again

  // Monthly missed revenue
  const missedCallRevenue = inputs.missedCallsPerMonth * missedCallConversionRate * inputs.avgJobValue;
  const quoteFollowUpRevenue = inputs.quotesNotFollowedUp * quoteFollowUpConversionRate * inputs.avgJobValue;

  // Yearly reactivation revenue
  const reactivationRevenue = inputs.pastCustomersNotContacted * reactivationConversionRate * inputs.avgJobValue;

  // Total monthly and yearly missed revenue
  const monthlyMissedRevenue = Math.round(missedCallRevenue + quoteFollowUpRevenue);
  const yearlyMissedRevenue = Math.round((monthlyMissedRevenue * 12) + reactivationRevenue);

  // Express Core costs
  const setupCost = 1500;
  const monthlyCost = 499;
  const yearOneCost = setupCost + (monthlyCost * 12); // $7,488

  // Net gain
  const yearOneNet = yearlyMissedRevenue - yearOneCost;
  const monthlyNet = monthlyMissedRevenue - monthlyCost;

  // ROI
  const roi = Math.round((yearOneNet / yearOneCost) * 100);

  // Payback period in months
  const paybackMonths = yearOneCost / monthlyMissedRevenue;
  const paybackWeeks = Math.round(paybackMonths * 4.33);

  // Guaranteed minimum (20 jobs × avg job value)
  const guaranteedMinRevenue = 20 * inputs.avgJobValue;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-32 pb-20 px-4 md:px-8 md:pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Express Core ROI Calculator
          </p>
          <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 md:text-5xl">
            How Much Revenue Are You Leaving on the Table?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
            Every missed after-hours call. Every quote not followed up. Every past customer not contacted. Calculate what Express Core could recover in Month 1.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-0 items-stretch overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-3xl">
          {/* Left: Inputs */}
          <div className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-12 shadow-[8px_0_24px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_24px_rgba(0,0,0,0.3)] relative z-10 rounded-l-3xl flex flex-col">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
              Your Numbers
            </h3>

            {/* Average Job Value */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Average Job Value ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input
                  type="number"
                  min="500"
                  max="50000"
                  step="100"
                  value={inputs.avgJobValue}
                  onChange={(e) => setInputs(prev => ({ ...prev, avgJobValue: Number(e.target.value) }))}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                What&apos;s the average value of a completed job?
              </p>
            </div>

            {/* Missed Calls Per Month */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Missed After-Hours Calls/Month
                </label>
                <span className="text-2xl font-bold text-orange-500 dark:text-orange-400 tabular-nums">
                  {inputs.missedCallsPerMonth}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={inputs.missedCallsPerMonth}
                onChange={(e) => setInputs(prev => ({ ...prev, missedCallsPerMonth: Number(e.target.value) }))}
                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>0</span>
                <span>25</span>
                <span>50</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Calls that go to voicemail evenings/weekends
              </p>
            </div>

            {/* Quotes Not Followed Up */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Quotes Not Followed Up/Month
                </label>
                <span className="text-2xl font-bold text-orange-500 dark:text-orange-400 tabular-nums">
                  {inputs.quotesNotFollowedUp}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={inputs.quotesNotFollowedUp}
                onChange={(e) => setInputs(prev => ({ ...prev, quotesNotFollowedUp: Number(e.target.value) }))}
                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>0</span>
                <span>15</span>
                <span>30</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Quotes you sent but never followed up on
              </p>
            </div>

            {/* Past Customers Not Contacted */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Past Customers Not Contacted/Year
                </label>
                <span className="text-2xl font-bold text-orange-500 dark:text-orange-400 tabular-nums">
                  {inputs.pastCustomersNotContacted}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={inputs.pastCustomersNotContacted}
                onChange={(e) => setInputs(prev => ({ ...prev, pastCustomersNotContacted: Number(e.target.value) }))}
                className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>0</span>
                <span>250</span>
                <span>500</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Customers who haven&apos;t heard from you in 12+ months
              </p>
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
                Your Missed Revenue
              </h3>

              {/* 2x2 Grid of Missed Revenue Modules */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {/* Lost After-Hours Calls */}
                <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    📞 Lost After-Hours Calls
                  </div>
                  <div className="mt-2">
                    <TextGenerateEffect
                      key={Math.round(missedCallRevenue)}
                      words={`$${Math.round(missedCallRevenue).toLocaleString()}/mo`}
                      className="text-2xl lg:text-3xl font-bold text-red-500 dark:text-red-400"
                      duration={0.3}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {inputs.missedCallsPerMonth} × 30% × ${inputs.avgJobValue.toLocaleString()}
                  </p>
                </div>

                {/* Lost Quote Follow-ups */}
                <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    📋 Lost Quote Follow-ups
                  </div>
                  <div className="mt-2">
                    <TextGenerateEffect
                      key={Math.round(quoteFollowUpRevenue)}
                      words={`$${Math.round(quoteFollowUpRevenue).toLocaleString()}/mo`}
                      className="text-2xl lg:text-3xl font-bold text-red-500 dark:text-red-400"
                      duration={0.3}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {inputs.quotesNotFollowedUp} × 25% × ${inputs.avgJobValue.toLocaleString()}
                  </p>
                </div>

                {/* Lost Reactivations */}
                <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    🔄 Lost Reactivations
                  </div>
                  <div className="mt-2">
                    <TextGenerateEffect
                      key={Math.round(reactivationRevenue)}
                      words={`$${Math.round(reactivationRevenue).toLocaleString()}/yr`}
                      className="text-2xl lg:text-3xl font-bold text-red-500 dark:text-red-400"
                      duration={0.3}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {inputs.pastCustomersNotContacted} × 15% × ${inputs.avgJobValue.toLocaleString()}
                  </p>
                </div>

                {/* Total Missed Revenue */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    💸 Total Missed Revenue
                  </div>
                  <div className="mt-2">
                    <TextGenerateEffect
                      key={yearlyMissedRevenue}
                      words={`$${yearlyMissedRevenue.toLocaleString()}/yr`}
                      className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400"
                      duration={0.3}
                    />
                  </div>
                  <p className="mt-1 text-xs text-red-600/80 dark:text-red-400/80">
                    Walking out the door
                  </p>
                </div>
              </div>

              {/* Net Gain & ROI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                    Year 1 Net Gain
                  </div>
                  <div className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                    ${yearOneNet.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                    ROI
                  </div>
                  <div className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {roi > 0 ? `${roi}%` : "N/A"}
                  </div>
                </div>
              </div>

              {/* Guarantee Badge */}
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="text-xs font-bold uppercase tracking-wider">
                  ✓ Guaranteed Minimum
                </div>
                <div className="mt-2 text-3xl font-bold">
                  ${guaranteedMinRevenue.toLocaleString()}
                </div>
                <p className="mt-1 text-sm text-white/90">
                  20+ booked jobs in Month 1 or we work free
                </p>
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
                Claim Your Revenue Back
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
                text="Stop losing revenue to "
                words={["missed after-hours calls", "forgotten follow-ups", "inactive customers", "slow response times"]}
              />
            </motion.div>
            <p className="mt-2 text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Express Core captures after-hours calls, follows up on quotes, and reactivates past customers. Live in 72 hours. Guaranteed 20+ booked jobs in Month 1.
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
                Book a Call
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
