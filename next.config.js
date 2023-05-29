/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "cumbersome-furtive-fowl.media.strapiapp.com",
      "unveil-nft-images-dev.s3.eu-north-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
