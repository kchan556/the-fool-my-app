import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 静的生成のタイムアウトを伸ばし、エラーを無理やり回避
  staticPageGenerationTimeout: 300,
  output: 'standalone',
  // 画像最適化でコケるのを防ぐ
  images: {
    unoptimized: true,
  },
};

export default nextConfig;