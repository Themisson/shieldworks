import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingIncludes: { "/*": ["./content/articles/**/*.md"] },
  experimental: { globalNotFound: true },
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  async rewrites() {
    // Browsers and crawlers still request this conventional icon path. Serve the
    // authored SVG without creating a duplicate raster asset just for the alias.
    return { beforeFiles: [{ source: "/favicon.ico", destination: "/favicon.svg" }] };
  },
  async redirects() {
    return [
      { source: "/insights", destination: "/conteudo", permanent: true },
      { source: "/insights/:slug", destination: "/conteudo/:slug", permanent: true },
      { source: "/en/insights", destination: "/en/conteudo", permanent: true },
      { source: "/en/insights/:slug", destination: "/en/conteudo/:slug", permanent: true },
      { source: "/pt/insights", destination: "/conteudo", permanent: true },
      { source: "/pt/insights/:slug", destination: "/conteudo/:slug", permanent: true },
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
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Cloudflare Web Analytics: the domain's proxy injects this beacon.
              // Sentinela (sentinela.shieldworks.com.br): ShieldWorks' own access measurement,
              // loaded by the root layout; the ping goes out through sendBeacon (connect-src)
              // or, without it, a 1x1 GIF (img-src already allows https:).
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://static.cloudflareinsights.com https://sentinela.shieldworks.com.br`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://cloudflareinsights.com https://sentinela.shieldworks.com.br",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join("; ")
          }
        ]
      }
    ];
  }
};

export default nextConfig;
