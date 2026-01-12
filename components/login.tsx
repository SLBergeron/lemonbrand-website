"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Login() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      <Form />
      <div className="relative w-full z-20 hidden md:flex border-l border-border overflow-hidden bg-muted/10 items-center justify-center">
        <div className="max-w-sm mx-auto px-8 relative z-40">
          <p
            className={cn(
              "font-display font-semibold text-2xl text-foreground"
            )}
          >
            Real systems. Real results.
          </p>
          <div className="mt-8 space-y-8 text-sm text-muted-foreground">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <p className="font-medium text-foreground leading-relaxed">
                &quot;75+ workflows deployed across our sales, marketing, and ops teams. Pipeline up 3x in 4 months.&quot;
              </p>
              <p className="mt-3 text-xs font-semibold text-accent">— SaaS Founder, YC W23</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <p className="font-medium text-foreground leading-relaxed">
                &quot;Bespoke systems that actually work. No templates. No fluff. Just revenue growth.&quot;
              </p>
              <p className="mt-3 text-xs font-semibold text-accent">— VP Operations, Series B</p>
            </div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="bg-background flex flex-col justify-center">
      <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 max-w-2xl mx-auto">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
             <Link href="/" className="font-display font-bold text-xl tracking-tight">
               LemonBrand
             </Link>
          </div>
          
          <div>
            <h2 className="text-3xl font-display font-bold leading-9 tracking-tight text-foreground">
              Get AI Automation Playbooks
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Access proven frameworks, templates, and implementation guides. Join operators scaling with AI.
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form
                action="https://app.kit.com/forms/8620753/subscriptions"
                className="seva-form formkit-form space-y-6"
                method="post"
                data-sv-form="8620753"
                data-uid="c3298fa5a7"
                data-format="inline"
                data-version="5"
              >
                <ul className="formkit-alert formkit-alert-error text-destructive text-sm" data-element="errors" data-group="alert"></ul>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Email address
                  </label>

                  <div className="mt-2">
                    <input
                      id="email"
                      name="email_address"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="formkit-input block w-full bg-background px-4 rounded-md border border-input py-2 shadow-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    data-element="submit"
                    className="formkit-submit bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition duration-200 rounded-md px-4 py-2.5 flex items-center justify-center w-full shadow-sm"
                  >
                    <div className="formkit-spinner hidden mr-2">
                        <span className="loading-spinner"></span>
                    </div>
                    <span>Get Free Resources</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 pt-10 border-t border-border/50">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  What you&apos;ll get:
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5" />
                    Automation opportunity audit framework
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5" />
                    Outreach workflow templates
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5" />
                    Content repurposing playbooks
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5" />
                    Weekly newsletter with real implementations
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-6">
                  <Link
                    href="https://newsletter.lemonbrand.io"
                    target="_blank"
                    className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
                  >
                    Browse newsletter archive →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}