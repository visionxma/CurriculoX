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
  },
  // Adicione as linhas abaixo:
  basePath: '/CurriculoX',
  assetPrefix: '/CurriculoX/',
}

export default nextConfig
