import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Workers / Pages free-tier optimizations
  output: "export", // Pure static export for 0ms edge execution & bypasses 3MB worker bundle limit
  images: {
    unoptimized: true, // Eliminates server-side sharp dependency, lightning-fast edge delivery
  },
  experimental: {
    optimizePackageImports: ["lucide-react"], // Tree-shakes Lucide icons for minimal JS payload
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
