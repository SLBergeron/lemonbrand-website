/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@lemonbrand/ui",
    "@lemonbrand/convex",
    "@lemonbrand/config",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
