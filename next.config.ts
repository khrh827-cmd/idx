import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'estonetech.eu',
      },
      {
        protocol: 'https',
        hostname: 'watermark.lovepik.com',
      },
      {
        protocol: 'https',
        hostname: 'eco1stlogistics.com',
      },
    ],
  },
};

export default nextConfig;
