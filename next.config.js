/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogger.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "i.imgur.com", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
    ],
  },
};

module.exports = nextConfig;
