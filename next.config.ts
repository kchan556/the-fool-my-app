import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // これを追加
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;