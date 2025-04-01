/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['v0.blob.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

