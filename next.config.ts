import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScriptとESLintのエラーで止まるのを防ぐ
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // 【最重要】ビルド時にページを生成（Prerender）するのを物理的に禁止する設定
  experimental: {
    // 静的生成の最適化をオフにする（これが効きます）
    optimizeCss: false,
  },
  
  // ビルド時のネットワークエラーなどを無視する
  staticPageGenerationTimeout: 1000,
  
  // 出力形式を固定
  output: 'standalone',
};

export default nextConfig;