import { Metadata } from "next";

// =============================================================================
// Types for JSON-LD Schemas
// =============================================================================

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
  teaches?: string[];
  numberOfLessons?: number;
  timeRequired?: string;
}

export interface LearningResourceSchema {
  "@context": "https://schema.org";
  "@type": "LearningResource";
  name: string;
  description: string;
  learningResourceType: string;
  educationalLevel?: string;
  isPartOf?: CourseReference;
  position?: number;
  teaches?: string[];
  timeRequired?: string;
  isAccessibleForFree?: boolean;
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

interface CourseReference {
  "@type": "Course";
  name: string;
  url?: string;
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

// =============================================================================
// Schema Generator Functions
// =============================================================================

/**
 * Generate Course schema for 7-Day Sprint
 */
export function generateSprintCourseSchema(): CourseSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "7-Day Sprint: Build Your First AI Tool",
    description:
      "Build your first AI-powered tool in 7 days using the Build Stack framework. No coding experience required. Learn to communicate with Claude Code to ship real software.",
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
      price: "297",
      priceCurrency: "USD",
      url: "https://learn.lemonbrand.io/sprint/checkout",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: "P7D",
    },
    coursePrerequisites: "No coding experience required. Just a project idea and willingness to learn.",
    educationalLevel: "Beginner",
    numberOfLessons: 8,
    timeRequired: "PT10H",
    about: [
      "Claude Code",
      "AI tool development",
      "Build Stack framework",
      "No-code development",
      "CLAUDE.md context files",
    ],
    teaches: [
      "How to communicate with Claude Code to build real software",
      "The Build Stack framework: Context, Direction, Iteration, Verification",
      "How to scope projects to ship fast (the 2-3 Exchange Pattern)",
      "Deploying with Vercel so your tool is live on the internet",
    ],
  };
}

/**
 * Generate LearningResource schema for a Sprint day/lesson
 */
export function generateLessonSchema(options: {
  day: number;
  title: string;
  description: string;
  teaches: string[];
  duration: string;
  isFree: boolean;
}): LearningResourceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Day ${options.day}: ${options.title}`,
    description: options.description,
    learningResourceType: "lesson",
    educationalLevel: "Beginner",
    isPartOf: {
      "@type": "Course",
      name: "7-Day Sprint: Build Your First AI Tool",
      url: "https://learn.lemonbrand.io/sprint",
    },
    position: options.day + 1,
    teaches: options.teaches,
    timeRequired: options.duration,
    isAccessibleForFree: options.isFree,
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
  aiMetadata?: Record<string, string>;
}

/**
 * Create consistent page metadata for Learn app
 */
export function createPageMetadata(config: PageMetadataConfig): Metadata {
  const baseUrl = "https://learn.lemonbrand.io";
  const fullUrl = `${baseUrl}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: "LemonBrand Learn",
      type: "website",
      // Images auto-generated by opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      creator: "@simonbergeron",
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
