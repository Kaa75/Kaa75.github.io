/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // GitHub Pages serves static files — Next.js image optimization requires a server
  images: {
    unoptimized: true,
  },
  // headers() is not supported with static export; add meta tags or use a CDN/proxy for security headers
};

module.exports = nextConfig;
