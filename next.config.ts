import type { NextConfig } from "next";

const isStaticExport = process.env.BUILD_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  images: isStaticExport ? { unoptimized: true } : undefined,
  basePath,
  trailingSlash: isStaticExport,
};

export default nextConfig;
