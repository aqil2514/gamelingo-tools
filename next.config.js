/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogger.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "i.imgur.com", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "evertaletoolbox.azurewebsites.net", port: "" },
      { protocol: "https", hostname: "res.cloudinary.com", port: "" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", port: "" },
      { protocol: "https", hostname: "placehold.jp", port: "" },
    ],
  },
};

module.exports = nextConfig;
