import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      // Aggiungi qui il dominio del tuo WordPress se self-hosted:
      // { protocol: 'https', hostname: 'tuosito.com' },
    ],
  },
};

export default nextConfig;
