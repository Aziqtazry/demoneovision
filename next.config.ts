import type { NextConfig } from "next";

const isStaticExport = process.env.BUILD_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  images: isStaticExport ? { unoptimized: true } : undefined,
};

export default nextConfig;
