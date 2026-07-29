import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thesuntek.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.linkedin.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.instagram.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;