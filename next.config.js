/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // これを true にすると、型エラーがあってもビルドを続行します
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint のエラーも無視します
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;