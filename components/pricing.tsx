"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";

export type Plan = {
  id: string;
  description: string;
  name: string;
  finalPrice: number | string;
  currency: string;
  features: string[];
  featured?: boolean;
  buttonText?: string;
  buttonLink?: string;
  externalLink?: boolean;
  additionalFeatures?: string[];
  priceSubtext?: string;
};

export const planIds = {
  website: "website",
  leadAutomations: "lead-automations",
  expressCore: "express-core",
};

const plans: Array<Plan> = [
  {
    id: planIds.website,
    description: "For contractors who need a website",
    name: "Professional Website",
    finalPrice: 249,
    currency: "usd",
    features: [
      "Template built for your trade",
      "Mobile-optimized design",
      "Contact forms & Google Maps",
      "Live in 48 hours",
      "One-time payment, no monthly fees",
    ],
    buttonText: "Get Your Website",
    buttonLink: "https://getmywebsite.io",
    externalLink: true,
    priceSubtext: "One-time",
  },
  {
    id: planIds.leadAutomations,
    description: "For contractors ready to automate",
    name: "Lead Automations",
    finalPrice: 99,
    currency: "usd",
    features: [
      "Instant lead response 24/7",
      "Automated quote follow-ups",
      "Customer reactivation campaigns",
      "Built on your systems",
      "72-hour deployment",
    ],
    buttonText: "Calculate ROI",
    buttonLink: "/calculator",
    featured: true,
    priceSubtext: "Per month",
  },
  {
    id: planIds.expressCore,
    description: "For contractors scaling fast",
    name: "Express Core",
    finalPrice: "1,500 + 499",
    currency: "usd",
    features: [
      "3 core automations deployed",
      "20+ booked jobs guarantee (Month 1)",
      "72-hour go-live",
      "CRM agnostic",
      "Done-with-you build",
      "Full ownership of systems",
    ],
    additionalFeatures: [
      "Ongoing optimization included",
      "Monthly performance monitoring",
      "Direct access to our team",
    ],
    buttonText: "Book a Call",
    priceSubtext: "Setup + monthly",
  },
];

export function Pricing() {
  return (
    <div
      id="pricing"
      className="relative isolate bg-neutral-50 dark:bg-neutral-900 w-full px-4 py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100">
            Pick Your Path
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400 mt-4">
            Whether you need a website or want to automate revenue capture, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 p-4 sm:gap-3 md:grid-cols-2 md:gap-4 md:p-8 lg:grid-cols-3">
          {plans.map((tier) => {
            return <Card plan={tier} key={tier.id} />;
          })}
        </div>

        {/* Custom Automations Section */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-sm border border-neutral-200 p-6 md:p-8 bg-white dark:bg-neutral-950 dark:border-neutral-800">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-20">
              {/* Custom Automation Info - 1/3 */}
              <div className="lg:col-span-1">
                <h3 className="mb-2 text-base font-medium text-neutral-900 md:text-2xl dark:text-neutral-100">
                  Need custom automation?
                </h3>
                <p className="mb-6 text-sm text-neutral-600 md:text-sm dark:text-neutral-400">
                  Multi-system integrations, AI voice agents, custom dashboards, or unique workflows built for your operation.
                </p>
                <CustomButton />
              </div>

              {/* Features - 2/3 */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <Step className="my-2">AI Voice Agents</Step>
                  <Step className="my-2">Custom Quote Builders</Step>
                  <Step className="my-2">Landing Pages & Ad Campaigns</Step>
                  <Step className="my-2">Custom Dashboards</Step>
                  <Step className="my-2">Multi-System Integration</Step>
                  <Step className="my-2">Workflow Automation</Step>
                  <Step className="my-2">Direct builder access</Step>
                  <Step className="my-2">You own everything</Step>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ plan }: { plan: Plan }) => {
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
      className={cn(
        "rounded-sm bg-transparent p-1 sm:p-2 md:p-3 dark:bg-neutral-950",
        plan.featured &&
          "border border-transparent bg-white shadow ring shadow-black/10 ring-black/5 dark:bg-neutral-800",
      )}
    >
      <div className="flex h-full flex-col justify-start gap-1 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p
              className={cn(
                "text-base font-medium text-black sm:text-lg dark:text-white",
              )}
            >
              {plan.name}
            </p>
          </div>
        </div>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {plan.description}
        </p>
        <div className="my-6">
          <div className="flex items-end">
            <div className="flex items-start gap-1">
              <span className="text-xl text-neutral-600 dark:text-neutral-400">
                $
              </span>
              <span
                className={cn(
                  "text-3xl font-medium text-neutral-800 md:text-4xl dark:text-neutral-50",
                )}
              >
                {plan.finalPrice}
              </span>
            </div>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {plan.priceSubtext}
          </span>
        </div>
        {plan.externalLink ? (
          <Link
            href={plan.buttonLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-4 mb-2 w-full cursor-pointer rounded-sm px-2 py-1.5 transition duration-200 active:scale-[0.98] md:w-full text-center",
              "border border-transparent bg-white shadow ring shadow-black/15 ring-black/10 dark:bg-neutral-900",
              plan.featured &&
                "bg-black text-white dark:bg-white dark:text-black",
            )}
          >
            {plan.buttonText}
          </Link>
        ) : plan.buttonText === "Book a Call" ? (
          <button
            data-cal-namespace={calOptions.namespace}
            data-cal-link={CONSTANTS.CALCOM_LINK}
            data-cal-config={`{"layout":"${calOptions.layout}"}`}
            className={cn(
              "mt-4 mb-2 w-full cursor-pointer rounded-sm px-2 py-1.5 transition duration-200 active:scale-[0.98] md:w-full",
              "border border-transparent bg-white shadow ring shadow-black/15 ring-black/10 dark:bg-neutral-900",
              plan.featured &&
                "bg-black text-white dark:bg-white dark:text-black",
            )}
          >
            {plan.buttonText}
          </button>
        ) : (
          <Link
            href={plan.buttonLink || "#"}
            className={cn(
              "mt-4 mb-2 w-full cursor-pointer rounded-sm px-2 py-1.5 transition duration-200 active:scale-[0.98] md:w-full text-center",
              "border border-transparent bg-white shadow ring shadow-black/15 ring-black/10 dark:bg-neutral-900",
              plan.featured &&
                "bg-black text-white dark:bg-white dark:text-black",
            )}
          >
            {plan.buttonText}
          </Link>
        )}
        <div className="mt-1">
          {plan.features.map((feature, idx) => (
            <Step key={idx}>{feature}</Step>
          ))}
        </div>
        {plan.additionalFeatures && plan.additionalFeatures.length > 0 && (
          <Divider />
        )}
        <div className="p-3">
          {plan.additionalFeatures?.map((feature, idx) => (
            <Step additional key={idx}>
              {feature}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomButton = () => {
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
    <button
      data-cal-namespace={calOptions.namespace}
      data-cal-link={CONSTANTS.CALCOM_LINK}
      data-cal-config={`{"layout":"${calOptions.layout}"}`}
      className="w-full rounded-sm bg-white px-6 py-3 font-medium text-black shadow-lg ring-1 ring-black/10 transition-colors hover:bg-neutral-100 sm:w-auto dark:bg-white dark:text-black dark:ring-white/10 dark:hover:bg-neutral-200"
    >
      Book a Scoping Call
    </button>
  );
};

const Step = ({
  children,
  additional,
  className,
}: {
  children: React.ReactNode;
  additional?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("my-5 flex items-start justify-start gap-2", className)}>
      <div
        className={cn(
          "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700",
          additional ? "bg-orange-500" : "bg-neutral-700",
        )}
      >
        <IconCheck className="h-3 w-3 [stroke-width:4px] text-neutral-300" />
      </div>
      <div
        className={cn(
          "text-sm font-medium text-neutral-600 dark:text-neutral-400",
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative">
      <div className={cn("h-px w-full bg-white dark:bg-neutral-950")} />
      <div className={cn("h-px w-full bg-neutral-200 dark:bg-neutral-800")} />
      <div
        className={cn(
          "absolute inset-0 m-auto flex h-5 w-5 items-center justify-center rounded-xl bg-white shadow-[0px_-1px_0px_0px_var(--neutral-200)] dark:bg-neutral-800 dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]",
        )}
      >
        <IconPlus
          className={cn(
            "h-3 w-3 [stroke-width:4px] text-black dark:text-neutral-300",
          )}
        />
      </div>
    </div>
  );
};
