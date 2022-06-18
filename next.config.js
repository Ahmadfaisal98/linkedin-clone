/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rb.gy", "localhost", "lh3.googleusercontent.com"],
    dangerouslyAllowSVG: true,
  },
  webp: {
    preset: "default",
    quality: 100,
  },
};

module.exports = nextConfig;
