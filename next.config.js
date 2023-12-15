/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogger.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "i.imgur.com", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "evertaletoolbox.azurewebsites.net", port: "" },
    ],
  },
};

module.exports = nextConfig;
