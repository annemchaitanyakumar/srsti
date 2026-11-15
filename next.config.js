/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['gsap'],
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas'
    });
    return config;
  }
};

module.exports = nextConfig;
