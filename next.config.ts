/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.86.22'],
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

module.exports = nextConfig;