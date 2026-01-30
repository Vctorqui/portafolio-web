/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize Material-UI emotion for better performance
  compiler: {
    emotion: true,
  },

  // Enable image optimization with modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
