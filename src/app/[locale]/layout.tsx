import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/footer";
import { FloatingFeedback } from "@/components/FloatingFeedback";
import { Header } from "@/components/header";
import { brand, githubUrl } from "@/data/site";
import { LocaleProvider, Text } from "@/i18n/locale-provider";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import { THEME_COLORS, THEME_INIT_SCRIPT } from "@/lib/theme";
import "../globals.css";
import "katex/dist/katex.min.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ShieldWorks | Engenharia e Tecnologia Aplicada",
    template: "%s | ShieldWorks",
  },
  description:
    "Consultoria técnica e desenvolvimento aplicado em engenharia computacional, pesquisa, segurança operacional, sistemas institucionais e assessoria acadêmica.",
  applicationName: "ShieldWorks",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    apple: "/icon.svg",
  },
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: canonicalUrl("/"),
    siteName: "ShieldWorks",
    title: "ShieldWorks | Engenharia e Tecnologia Aplicada",
    description:
      "Engenharia e tecnologia para decisões mais seguras, sistemas eficientes e projetos aplicáveis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldWorks | Engenharia e Tecnologia Aplicada",
    description:
      "Engenharia e tecnologia para decisões mais seguras, sistemas eficientes e projetos aplicáveis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sameAs = [
  brand.lattes,
  brand.orcid,
  brand.scholar,
  brand.linkedin,
  githubUrl,
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ShieldWorks",
    url: SITE_URL,
    description:
      "Engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: brand.owner,
    url: SITE_URL,
    sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ShieldWorks",
    url: SITE_URL,
    sameAs,
  },
];

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale === "en" ? "en" : "pt-BR"}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme before first paint; a constant script, no user input. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans text-graphite-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LocaleProvider initialLocale={locale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-petroleum-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
          >
            <Text>Ir para o conteúdo principal</Text>
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingFeedback />
        </LocaleProvider>
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
