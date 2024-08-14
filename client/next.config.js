/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: "2017108866", // Enclosed in quotes
    NEXT_PUBLIC_ZEGO_SERVER_ID: "478dae90644e0d69b9838aef2662d202",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
