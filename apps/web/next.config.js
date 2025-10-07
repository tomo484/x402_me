/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  transpilePackages: ['@x402/shared'],
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/x402/:path*',
        destination: `${process.env.API_BASE_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig 