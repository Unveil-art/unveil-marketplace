/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["cumbersome-furtive-fowl.media.strapiapp.com"],
  },
  nextConfig,
};
