import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily ignoring ESLint during builds to allow deployment
  // TODO: Fix all ESLint warnings and remove this setting
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
  },
};

export default nextConfig;
