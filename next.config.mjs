import MillionLint from "@million/lint";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["app.localhost:3000"],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
      { hostname: "firebasestorage.googleapis.com", protocol: "https" },
      { hostname: "magicmind.com" },
      { hostname: "maps.googleapis.com" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default MillionLint.next({ rsc: true })(nextConfig);
