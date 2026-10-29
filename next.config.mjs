/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/support",
        destination: "https://support.whiskr.ai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
