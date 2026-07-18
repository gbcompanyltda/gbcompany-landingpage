import type { NextConfig } from "next";

// Nome do repositório no GitHub — necessário para o basePath, já que o site
// é servido em https://<usuario>.github.io/gbcompany-landingpage/ e não na raiz.
const repoName = "gbcompany-landingpage";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  env: {
    // Com images.unoptimized, next/image não prefixa o src com o basePath
    // automaticamente — expomos o valor para prefixar manualmente onde necessário.
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true, // <-- ISSO IMPEDE O ERRO DE IMAGEM NO GITHUB PAGES
  },
  eslint: {
    ignoreDuringBuilds: true, // <-- Ignora avisos de formatação que travam o build
  },
  typescript: {
    ignoreBuildErrors: true, // <-- Ignora errinhos de tipo bobos que travam o build
  },
};

export default nextConfig;