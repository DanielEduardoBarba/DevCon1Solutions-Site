/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // static HTML export — deploys to Firebase Hosting unchanged
  distDir: 'build',      // output to build/ to match the Firebase hosting config
  trailingSlash: true,    // /markour/ → build/markour/index.html  (clean Firebase URLs)
  images: {
    unoptimized: true,    // required for static export; keeps <img> semantics
  },
  // Compile Spline's packages with the app's own React so they share a single
  // React instance inside the App Router (fixes ReactCurrentDispatcher errors).
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
}

export default nextConfig
