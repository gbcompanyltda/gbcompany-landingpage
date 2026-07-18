import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/gbcompany-landingpage',
  images: {
    unoptimized: true, // Necessário para o Next.js exportar imagens no GitHub Pages
  },
};

export default nextConfig;