import type { NextConfig } from "next";

// Em produção (GitHub Pages) o site é servido em /<repo>, não na raiz.
// O workflow do Pages injeta NEXT_PUBLIC_BASE_PATH com esse prefixo;
// localmente (npm run dev/build) a variável fica vazia e o site roda na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
