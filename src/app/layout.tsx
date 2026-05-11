import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FloatingFeedback } from "@/components/FloatingFeedback";
import { Header } from "@/components/header";
import { LocaleProvider } from "@/i18n/locale-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shieldworks.com.br"),
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.shieldworks.com.br",
    siteName: "ShieldWorks",
    title: "ShieldWorks | Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
    description:
      "Engenharia, pesquisa, segurança e tecnologia aplicada para transformar problemas complexos em soluções práticas.",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-graphite-900 antialiased">
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingFeedback />
        </LocaleProvider>
      </body>
    </html>
  );
}
