/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hqxqtxjphnflyfxhsjxz.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/room-images/**",
      },
    ],
  },
};

export default nextConfig;
