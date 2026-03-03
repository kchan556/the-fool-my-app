import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 型エラーを無視してビルドを強行する
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのエラーも無視してビルドを強行する
    ignoreDuringBuilds: true,
  },
  /* 他の設定が必要ならここに追加 */
};

export default nextConfig;