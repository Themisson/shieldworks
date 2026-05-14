import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import { FloatingFeedback } from "@/components/FloatingFeedback";
import { Header } from "@/components/header";
import { brand, githubUrl } from "@/data/site";
import { LocaleProvider } from "@/i18n/locale-provider";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ShieldWorks | Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
    template: "%s | ShieldWorks"
  },
  description:
    "Site profissional de Themisson dos Santos Vasconcelos para engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica.",
  applicationName: "ShieldWorks",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg"
  },
  alternates: {
    canonical: canonicalUrl("/")
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: canonicalUrl("/"),
    siteName: "ShieldWorks",
    title: "ShieldWorks | Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
    description:
      "Engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldWorks | Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
    description:
      "Engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

const sameAs = [brand.lattes, brand.orcid, brand.scholar, brand.linkedin, githubUrl];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ShieldWorks",
    url: SITE_URL,
    description:
      "Engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica."
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: brand.owner,
    url: SITE_URL,
    sameAs
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ShieldWorks",
    url: SITE_URL,
    sameAs
  }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-graphite-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingFeedback />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
