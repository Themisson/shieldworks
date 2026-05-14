/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shieldworks.com.br"
          }
        ],
        destination: "https://www.shieldworks.com.br/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
