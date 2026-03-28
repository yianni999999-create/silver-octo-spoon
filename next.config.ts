import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  ...(!isVercel && {
    outputFileTracingRoot: require('path').resolve(__dirname, '../../'),
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [require.resolve('orchids-visual-edits/loader.js')]
        }
      }
    },
    allowedDevOrigins: ['*.orchids.page'],
  }),
} as NextConfig;

export default nextConfig;
