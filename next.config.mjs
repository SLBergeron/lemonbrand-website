/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/edison',
        destination: '/',
        permanent: true, // 308 permanent redirect (use false for 307 temporary)
      },
    ];
  },
};

export default nextConfig;
