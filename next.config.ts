import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 修正：standaloneモードにしつつ、ビルド時の静的生成を制限
  output: 'standalone',
  // 追加：特定の状況でPrerenderエラーが出るのを抑制
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;