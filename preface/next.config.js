/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve = {
      alias: {
        "@/": path.resolve(__dirname, "src/*")
      },
      ...config.resolve
    };
    return config;
  }
};

module.exports = nextConfig;
