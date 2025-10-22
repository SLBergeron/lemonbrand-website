"use client";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";
import { CardSpotlight } from "./ui/card-spotlight";

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-orange-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

export function PricingDetails() {
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

  return (
    <div
      id="pricing-details"
      className="relative isolate bg-neutral-50 dark:bg-neutral-900 w-full px-4 py-20 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100">
            Express Core Pricing
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400 mt-4">
            Fast deployment. Guaranteed results. Simple pricing.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 relative overflow-hidden">
          {/* Guarantee Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-xs font-bold uppercase tracking-wider">Guarantee</div>
            <div className="text-sm font-semibold">20+ Booked Jobs</div>
            <div className="text-xs">Month 1 or Free</div>
          </div>

          {/* Main Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl md:text-6xl font-bold text-neutral-800 dark:text-neutral-100">
                $1,500
              </span>
              <span className="text-xl text-neutral-600 dark:text-neutral-400">
                USD setup
              </span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                + $499
              </span>
              <span className="text-lg text-neutral-600 dark:text-neutral-400">
                USD/month
              </span>
            </div>
          </div>

          {/* Currency Note */}
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 mb-8">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              <strong>Note for Canadian clients:</strong> All pricing is in USD. We work with clients across North America and price in USD for consistency.
            </p>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="font-semibold text-xl text-neutral-800 dark:text-neutral-100 mb-4">
              What's Included
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>3 Core Automations:</strong> Instant Lead Response, Quote Follow-up, Reactivation Sprint
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>72-Hour Deployment:</strong> Live and running within 3 days of kickoff
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>CRM Agnostic:</strong> Works alongside your existing systems without direct integration
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>Performance Guarantee:</strong> 20+ qualified booked jobs in Month 1 or we work free until you hit it
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>Ongoing Optimization:</strong> Monthly monitoring and tweaks to improve performance
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>Done-With-You Build:</strong> Your team learns the system during implementation
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>Full Ownership:</strong> Built on your accounts. You own everything. No vendor lock-in.
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              as={Link}
              href="/calculator"
              variant="dark"
              className="w-full sm:w-auto px-8"
            >
              See What You'll Make
            </Button>
            <Button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              as="button"
              variant="primary"
              className="w-full sm:w-auto px-8"
            >
              Book a Call
            </Button>
          </div>
        </div>

        {/* Custom Automation Section */}
        <CardSpotlight className="mt-12 p-8 md:p-10">
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            Need something more specific?
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <p className="mb-4">Custom automation built for your unique workflow:</p>
            <ul className="list-none mt-2 space-y-2">
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">AI Voice Agents</p>
              </li>
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">Custom Quote Builders</p>
              </li>
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">Landing Pages & Ad Campaigns</p>
              </li>
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">Custom Dashboards</p>
              </li>
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">Workflow Integration</p>
              </li>
              <li className="flex gap-2 items-start">
                <CheckIcon />
                <p className="text-white">Multi-System Automation</p>
              </li>
            </ul>
          </div>
          <div className="mt-6 relative z-20">
            <Button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              as="button"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Book a Scoping Call
            </Button>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}
