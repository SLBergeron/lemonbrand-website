import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lemonbrand.io";
  const currentDate = new Date();

  return [
    // ==========================================================================
    // Priority 1.0 - Core conversion pages
    // ==========================================================================
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sprint`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ==========================================================================
    // Priority 0.9 - Secondary offers & pricing
    // ==========================================================================
    {
      url: `${baseUrl}/8-week`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/club`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ==========================================================================
    // Priority 0.8 - Lead magnets & trust builders
    // ==========================================================================
    {
      url: `${baseUrl}/free/claudemd`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ==========================================================================
    // Priority 0.7 - Content & engagement
    // ==========================================================================
    {
      url: `${baseUrl}/videos`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/substack`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // ==========================================================================
    // Priority 0.5 - Tools & calculators
    // ==========================================================================
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // ==========================================================================
    // Priority 0.3 - Legal & utility pages
    // ==========================================================================
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
