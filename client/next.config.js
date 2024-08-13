/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID:2017108866, 
    NEXT_PUBLIC_ZEGO_SERVER_ID: "478dae90644e0d69b9838aef2662d202",
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
