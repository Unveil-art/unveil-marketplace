/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "cumbersome-furtive-fowl.media.strapiapp.com",
      "unveil-nft-images-dev.s3.eu-north-1.amazonaws.com",
      "https://unveil-org.myfreshworks.com/crm/sales",
    ],
  },
};

module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "https://unveil-org.myfreshworks.com/crm/sales/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};


module.exports = nextConfig;
