"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { Section } from "@/components/shared/Section";

const benefits = [
  "30-minute call to understand your needs",
  "Fixed quote within 48 hours",
  "No obligation to proceed",
  "Clear scope and timeline",
];

const whatToExpect = [
  {
    title: "We talk about your problem",
    description: "What's the manual process? What's the software that almost works? What would the ideal solution look like?",
  },
  {
    title: "I tell you if I can help",
    description: "Not every project is a fit. If yours isn't, I'll tell you—and point you in the right direction.",
  },
  {
    title: "You get a fixed quote",
    description: "Within 48 hours, you'll have a detailed scope and a price. The quote is the price—no surprises.",
  },
];

export default function WorkWithMeContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Book a Discovery Call
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            30 minutes to discuss what you need. No pitch, just a conversation.
            If I can help, you&apos;ll get a fixed quote within 48 hours.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link
              href="https://cal.com/lemonbrand/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Time
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* What You Get */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-6">
                What you get
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-6">
                What to expect
              </h2>
              <div className="space-y-5">
                {whatToExpect.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-accent">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4">
            Ready to talk?
          </h2>
          <p className="text-muted-foreground mb-8">
            Pick a time that works for you. The call is free and there&apos;s no obligation.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link
              href="https://cal.com/lemonbrand/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Discovery Call
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Alternative */}
      <section className="py-12 sm:py-16 px-3 sm:px-4 bg-muted/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            Not ready for a call? Explore what we offer first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-medium"
            >
              See Our Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-medium"
            >
              How Custom Builds Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
