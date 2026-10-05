import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — produces `out/` directory
  // Build command: `npm run build`
  // Build output directory: `out`
  output: "export",
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
  // Add trailing slash for clean URLs on static hosts
  trailingSlash: true,
  // Skip type checking during build (faster)
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    // Reduce bundle size for these large icon/utility libraries
    optimizePackageImports: ['react-bootstrap-icons', 'framer-motion', 'lucide-react'],
  },
  // Note: Security headers are configured in public/_headers (Cloudflare Pages reads this)
};

export default nextConfig;
