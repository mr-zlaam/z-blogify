/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URI: process.env.BACKEND_URI,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
