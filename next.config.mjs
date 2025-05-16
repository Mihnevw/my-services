/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    domains: ['images.unsplash.com', 'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "font-src 'self' data: https://fonts.gstatic.com;",
              "img-src 'self' data: https://images.unsplash.com https://platform-lookaside.fbsbx.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com;",
              "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://*.supabase.co https://lh3.googleusercontent.com https://platform-lookaside.fbsbx.com https://avatars.githubusercontent.com;"
            ].join(' ')
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' }
        ]
      },
      {
        source: '/:path*.(jpg|jpeg|png|gif|webp|svg|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      }
    ]
  }
}

export default nextConfig
