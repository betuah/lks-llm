/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: [],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
         {
            protocol: "http",
            hostname: "**",
         },
      ],
   },
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
               },
               {
                  key: "X-Frame-Options",
                  value: "SAMEORIGIN",
               },
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
               },
            ],
         },
      ];
   },
   async rewrites() {
      return [
         {
            source: "/api/auth/:path*",
            destination: "/api/auth/:path*",
         },
      ];
   },
};

export default nextConfig;
