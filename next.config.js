/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"]
};

module.exports = nextConfig;
