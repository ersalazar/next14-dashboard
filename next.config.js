/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  env: {
    api_host: process.env.API_HOST,
    api_port: process.env.API_PORT,
  }
};

module.exports = nextConfig;
