import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
}

export default nextConfig
