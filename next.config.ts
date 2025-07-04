import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://propublic-academy.s3.ap-southeast-1.amazonaws.com/**'),
      new URL('https://**.amazonaws.com/**'),
    ],
  },
}

export default nextConfig
