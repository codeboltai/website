/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['hono-avatars.pages.dev', 'placehold.co', 'pub-cd2980acaa6d4462a4356b5afe3a82d6.r2.dev'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 