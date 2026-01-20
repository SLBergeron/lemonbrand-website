"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/shared/Section";
import { CallToAction } from "@/components/shared/CallToAction";
import { faqCategories } from "./faq-data";

export default function FAQContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
            FAQ
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Frequently asked questions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about the Sprint, 8-Week, and learning to build with AI.
          </p>
        </div>
      </Section>

      {/* FAQ Categories */}
      <Section className="py-12">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category) => (
            <div key={category.name} className="mb-12 last:mb-0">
              <h2 className="font-display text-xl font-semibold mb-6 text-accent">
                {category.name}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.name}-${index}`}
                    className="border-border/50"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <CallToAction
          title="Still have questions?"
          description="Start with the Sprint to see if it's a fit, or book a discovery call if you're ready for the 8-Week Build."
          primaryCtaText="Start the Sprint"
          primaryCtaLink="/sprint"
          secondaryCtaText="Book a Discovery Call"
          secondaryCtaLink="/work-with-me"
          className="max-w-4xl mx-auto"
        />
      </Section>
    </main>
  );
}
