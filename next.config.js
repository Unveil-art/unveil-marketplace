/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ["cumbersome-furtive-fowl.media.strapiapp.com"],
  }
}

module.exports = nextConfig;
