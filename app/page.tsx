import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { LogoCloudMarquee } from "@/components/LogoCloudMarquee";
import { About } from "@/components/about";
import { FrequentlyAskedQuestionsAccordion } from "@/components/FAQ";
import { CTAWithDashedGridLines } from "@/components/CTAWithDashedGridlines";
import { CaseStudy } from "@/components/CaseStudy";
import { TestimonialsMasonryGrid } from "@/components/testimonals";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Lemonbrand",
        "description": "AI automation systems for home services contractors (HVAC, plumbing, electrical). Express Core: 3 automations, 72 hours to live, $1,500 setup + $499/month. 20+ qualified booked jobs in Month 1 or we work free. Capture emergency calls, follow up on quotes, reactivate past customers.",
        "url": "https://lemonbrand.io",
        "telephone": "+1-XXX-XXX-XXXX",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CA"
        },
        "founder": {
          "@type": "Person",
          "name": "Simon Bergeron",
          "jobTitle": "AI Automation Specialist",
          "description": "Building AI systems that grow revenue. 75+ workflows shipped. Direct builder with no agency overhead."
        },
        "priceRange": "$1,500 - $30,000+",
        "areaServed": ["US", "CA", "Global"],
        "serviceType": [
          "AI Automation for Home Services",
          "HVAC Automation",
          "Plumbing Automation",
          "Electrical Contractor Automation",
          "Emergency Call Response",
          "Quote Follow-up Automation",
          "Customer Reactivation",
          "Seasonal Surge Management",
          "Jobs Ledger Tracking",
          "Contractor Workflow Automation"
        ],
        "knowsAbout": [
          "AI automation for HVAC contractors",
          "AI automation for plumbing companies",
          "AI automation for electrical contractors",
          "AI automation for home service contractors",
          "Emergency call automation",
          "Quote follow-up systems",
          "Customer reactivation automation",
          "Seasonal surge management",
          "ServiceTitan integration",
          "Jobber integration",
          "Housecall Pro integration",
          "Make.com workflows",
          "Revenue automation for contractors",
          "Contractor workflow automation",
          "Jobs Ledger tracking"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "75"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who owns the automations you build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do. Everything is built on your accounts. I don't hold anything hostage. You get full access, documentation, and control. If you want to take it in-house later, you can."
            }
          },
          {
            "@type": "Question",
            "name": "How do you access my systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You provide access during our kickoff call. I work directly in your tools—CRM, marketing platforms, workflow apps. Once we're done, you can revoke access anytime. Your data stays yours."
            }
          },
          {
            "@type": "Question",
            "name": "What's the typical timeline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Discovery takes 1-2 weeks. Design and build depends on complexity—simple workflows deploy in 2-3 weeks, multi-system integrations can take 4-6 weeks. We set clear milestones upfront. No surprises."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer ongoing support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Most clients stay on a monthly retainer for optimization, scaling, and new builds. Default SLA is 72 hours for fixes and updates, but we adapt this based on your needs. Some clients need same-day support—we handle that too."
            }
          },
          {
            "@type": "Question",
            "name": "What if the automation breaks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I fix it. Part of the deal. Automations need maintenance—APIs change, platforms update. Retainer clients get priority support. One-off projects include 30 days of fixes post-launch."
            }
          },
          {
            "@type": "Question",
            "name": "How much does this cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depends on scope. Simple workflow automation starts around $5K. Multi-department systems with custom integrations run $15K-$30K+. Retainers start at $2K/month for ongoing optimization and support. Book a call and we'll scope it out."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with our team or replace them?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I work with your team. Done-with-you, not for-you. Your people learn the systems as we build. Training is included. Goal is to make your team more effective, not dependent on me."
            }
          },
          {
            "@type": "Question",
            "name": "What platforms do you integrate with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CRMs (HubSpot, Salesforce), automation tools (Make, Zapier, n8n), AI platforms (OpenAI, Claude, custom agents), marketing tools (Google, Meta, LinkedIn), project management (ClickUp, Notion, Airtable), and more. If it has an API, we can connect it."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="">
        <Hero />
        <LogoCloudMarquee />
        <Features />
        <Pricing />
        <CaseStudy />
        <TestimonialsMasonryGrid />
        <About />
        <FrequentlyAskedQuestionsAccordion />
        <CTAWithDashedGridLines />
      </main>
    </>
  );
}
