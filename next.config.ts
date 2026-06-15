/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <=== enables static exports
  images: {
    unoptimized: true, // Mandatory for static HTML exports
  },
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.86.22'],
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

module.exports = nextConfig;