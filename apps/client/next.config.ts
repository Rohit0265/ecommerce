import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"images.pexels.com",
      },
      {
        protocol:"https",
        hostname:"img.clerk.com",
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
      },
      {
        protocol:"https",
        hostname:"images.unsplash.com",
      }
    ]
  }
};








export default nextConfig;
