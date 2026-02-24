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
      {
        protocol: 'https',
        hostname: 'www.savinodelbene.com',
      },
      {
        protocol: 'https',
        hostname: 'us.images.westend61.de',
      },
      {
        protocol: 'https',
        hostname: 'www.terapify.com',
      },
      {
        protocol: 'https',
        hostname: 'e01-phantom-expansion.uecdn.es',
      },
    ],
  },
};

module.exports = nextConfig;
