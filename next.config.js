/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.cam',
      },
      {
        protocol: 'https',
        hostname: 'otakudesu.media',
      },
    ],
  },
};

module.exports = nextConfig;
