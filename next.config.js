/** @type {import('next').NextConfig} */
const nextConfig = {
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
