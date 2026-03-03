import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ビルド時の型チェックを無視
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時のESLintチェックを無視
    ignoreDuringBuilds: true,
  },
  // プリレンダリングのエラーを回避するための設定
  output: 'standalone',
};

export default nextConfig;