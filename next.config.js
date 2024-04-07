const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: {
      allowedOrigins: ["ideal-space-guacamole-7gv49w64gx4c9j4-3000.app.github.dev"],
    },
  },
  env:{
    AUTHORIZATIONTOKEN: "b0e5ab5c312127a979ac0f11dafbc4483aece853ecd7202505283b76946e896c",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
        port: "",
      },
      { protocol: "https", hostname: "i.imgur.com", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      {
        protocol: "https",
        hostname: "evertaletoolbox.azurewebsites.net",
        port: "",
      },
      { protocol: "https", hostname: "res.cloudinary.com", port: "" },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      { protocol: "https", hostname: "placehold.jp", port: "" },
      { protocol: "https", hostname: "webstatic.hoyoverse.com", port: "" },
      { protocol: "https", hostname: "upload-os-bbs.mihoyo.com", port: "" },
      { protocol: "https", hostname: "fastcdn.hoyoverse.com", port: "" },
    ],
  },
};

module.exports = withNextIntl(nextConfig);

