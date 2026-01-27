/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'estonetech.eu',
      },
      {
        protocol: 'https',
        hostname: 'img.lovepik.com',
      },
      {
        protocol: 'https',
        hostname: 'arcecon.com',
      },
    ],
  },
};

module.exports = nextConfig;
