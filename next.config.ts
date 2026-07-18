import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necessário para o Next.js exportar imagens no GitHub Pages
  },
};

export default nextConfig;