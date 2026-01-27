import { Metadata } from "next";

// =============================================================================
// Types for JSON-LD Schemas
// =============================================================================

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description: string;
  founder?: PersonReference;
  sameAs?: string[];
  contactPoint?: ContactPoint;
  offers?: OfferSchema[];
}

export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url?: string;
  description?: string;
  jobTitle?: string;
  worksFor?: OrganizationReference;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface CourseSchema {
  "@context": "https://schema.org";
  "@type": "Course";
  name: string;
  description: string;
  provider: OrganizationReference;
  instructor?: PersonReference;
  offers?: OfferSchema;
  hasCourseInstance?: CourseInstance;
  coursePrerequisites?: string;
  educationalLevel?: string;
  about?: string[];
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FAQQuestion[];
}

export interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  brand?: OrganizationReference;
  offers?: OfferSchema | OfferSchema[];
  aggregateRating?: AggregateRating;
}

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  isPartOf?: WebSiteReference;
  about?: ThingReference;
  mainEntity?: ThingReference;
}

// Supporting types
interface PersonReference {
  "@type": "Person";
  name: string;
  url?: string;
}

interface OrganizationReference {
  "@type": "Organization";
  name: string;
  url?: string;
}

interface WebSiteReference {
  "@type": "WebSite";
  name: string;
  url: string;
}

interface ThingReference {
  "@type": string;
  name: string;
  url?: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  contactType: string;
  url?: string;
  email?: string;
}

interface OfferSchema {
  "@type": "Offer";
  name?: string;
  price: string;
  priceCurrency: string;
  url?: string;
  availability?: string;
  validFrom?: string;
}

interface CourseInstance {
  "@type": "CourseInstance";
  courseMode: string;
  duration?: string;
}

interface FAQQuestion {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: string;
}

// =============================================================================
// Schema Generator Functions
// =============================================================================

/**
 * Generate Organization schema for LemonBrand
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LemonBrand",
    url: "https://lemonbrand.io",
    logo: "https://lemonbrand.io/logo.png",
    description:
      "LemonBrand builds custom business tools you own forever. No subscriptions, no vendor lock-in. One-time purchase starting at $4,500. Also teaching operators to build their own with Claude Code. Founded by Simon Bergeron, creator of VerifiedNode (58,000+ contractor records) and Lemonbrand ATS.",
    founder: {
      "@type": "Person",
      name: "Simon Bergeron",
      url: "https://lemonbrand.io/about",
    },
    sameAs: [
      "https://youtube.com/@slbergeron",
      "https://x.com/SLBergeron",
      "https://github.com/SLBergeron",
      "https://substack.com/@slbergeron",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://cal.com/lemonbrand/30min",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Custom Tool Development",
        price: "5000",
        priceCurrency: "USD",
        url: "https://lemonbrand.io/custom",
      },
      {
        "@type": "Offer",
        name: "Lemonbrand ATS",
        price: "4500",
        priceCurrency: "CAD",
        url: "https://lemonbrand.io/tools/ats",
      },
      {
        "@type": "Offer",
        name: "7-Day Sprint",
        price: "297",
        priceCurrency: "USD",
        url: "https://lemonbrand.io/sprint",
      },
      {
        "@type": "Offer",
        name: "8-Week Program",
        price: "997",
        priceCurrency: "USD",
        url: "https://lemonbrand.io/8-week",
      },
      {
        "@type": "Offer",
        name: "AI Builders Club",
        price: "97",
        priceCurrency: "USD",
        url: "https://lemonbrand.io/club",
      },
    ],
  };
}

/**
 * Generate Person schema for Simon Bergeron
 */
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Simon Bergeron",
    url: "https://lemonbrand.io/about",
    description:
      "Founder of LemonBrand. Builds custom business tools companies own forever. Creator of VerifiedNode (58,000+ contractor records) and Lemonbrand ATS (Ontario-compliant hiring). Also teaches operators to build their own tools with Claude Code.",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "LemonBrand",
      url: "https://lemonbrand.io",
    },
    sameAs: [
      "https://youtube.com/@slbergeron",
      "https://x.com/SLBergeron",
      "https://github.com/SLBergeron",
      "https://substack.com/@slbergeron",
    ],
    knowsAbout: [
      "Custom software development",
      "Business tool development",
      "Claude Code",
      "AI-assisted development",
      "Build Stack framework",
      "Ontario employment law compliance",
      "No-code AI development",
    ],
  };
}

/**
 * Generate Course schema
 */
export function generateCourseSchema(options: {
  name: string;
  description: string;
  price: string;
  url: string;
  duration?: string;
  prerequisites?: string;
}): CourseSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: options.name,
    description: options.description,
    provider: {
      "@type": "Organization",
      name: "LemonBrand",
      url: "https://lemonbrand.io",
    },
    instructor: {
      "@type": "Person",
      name: "Simon Bergeron",
      url: "https://lemonbrand.io/about",
    },
    offers: {
      "@type": "Offer",
      price: options.price,
      priceCurrency: "USD",
      url: options.url,
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: options.duration,
    },
    coursePrerequisites: options.prerequisites,
    educationalLevel: "Beginner",
    about: [
      "Claude Code",
      "AI tool development",
      "Build Stack framework",
      "No-code development",
    ],
  };
}

/**
 * Generate FAQPage schema from Q&A pairs
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Product schema
 */
export function generateProductSchema(options: {
  name: string;
  description: string;
  price: string;
  url: string;
  isSubscription?: boolean;
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    brand: {
      "@type": "Organization",
      name: "LemonBrand",
      url: "https://lemonbrand.io",
    },
    offers: {
      "@type": "Offer",
      price: options.price,
      priceCurrency: "USD",
      url: options.url,
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(options: {
  name: string;
  description: string;
  url: string;
}): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    isPartOf: {
      "@type": "WebSite",
      name: "LemonBrand",
      url: "https://lemonbrand.io",
    },
  };
}

// =============================================================================
// Metadata Helper
// =============================================================================

export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  aiMetadata?: Record<string, string>;
}

/**
 * Create consistent page metadata
 * Note: OG images are auto-generated by opengraph-image.tsx files in each route
 */
export function createPageMetadata(config: PageMetadataConfig): Metadata {
  const baseUrl = "https://lemonbrand.io";
  const fullUrl = `${baseUrl}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: "LemonBrand",
      type: "website",
      // Images auto-generated by opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      // Images auto-generated by opengraph-image.tsx
    },
    alternates: {
      canonical: fullUrl,
    },
    other: config.aiMetadata,
  };
}

// =============================================================================
// JSON-LD Script Component Helper
// =============================================================================

/**
 * Renders a JSON-LD script tag (use in server components)
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
