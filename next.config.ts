import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://propublic-academy.s3.ap-southeast-1.amazonaws.com/**'),
      new URL('https://**.amazonaws.com/**'),
      new URL('https://avatar.iran.liara.run/**'),
      // new URL('https://images.unsplash.com/**/**'),
    ],
    domains: ['images.unsplash.com', 'avatar.iran.liara.run'],
  },
}

export default nextConfig
