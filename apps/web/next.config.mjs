/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@lemonbrand/ui",
    "@lemonbrand/convex",
    "@lemonbrand/config",
  ],
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "img.youtube.com" },
      { hostname: "i.ytimg.com" },
      { hostname: "raw.githubusercontent.com" },
      { hostname: "www.drouincreations.com" },
      { hostname: "cdn.prod.website-files.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/edison',
        destination: '/',
        permanent: true,
      },
      // Client page redirects
      {
        source: '/st-albert-q4-2025',
        destination: '/clients/st-albert-q4-2025',
        permanent: true,
      },
      {
        source: '/drouin-creations',
        destination: '/clients/drouin-creations',
        permanent: true,
      },
      {
        source: '/airpro-case-study',
        destination: '/clients/airpro',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/clients/calculator',
        permanent: true,
      },
      {
        source: '/prompts-st-albert',
        destination: '/clients/prompts-st-albert',
        permanent: true,
      },
      // Merge resources into templates
      {
        source: '/resources',
        destination: '/templates',
        permanent: true,
      },
      // Consolidate work-with-me into custom (Cal.com now embedded on /custom)
      {
        source: '/work-with-me',
        destination: '/custom',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
