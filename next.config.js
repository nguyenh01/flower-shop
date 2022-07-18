/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    URL: process.env.URL,
    SOCKET_URL: process.env.SOCKET_URL,
  },
  nextConfig,
  ...withBundleAnalyzer({}),
};
