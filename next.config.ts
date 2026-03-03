import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // eslint キーを削除し、必要なオプション（images等）があればここに残す
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 必要に応じて具体的なドメインに制限してください
      },
    ],
  },
};

export default nextConfig;