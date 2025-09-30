/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { 
        protocol: "https", 
        hostname: "**.myshopify.com" 
      },
      { 
        protocol: "https", 
        hostname: "cdn.shopify.com" 
      },
    ],
  },
}

export default nextConfig
