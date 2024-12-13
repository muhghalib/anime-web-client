/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'samehadaku.*',
      },
    ],
  },
};

module.exports = nextConfig;
