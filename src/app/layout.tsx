import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FloatingFeedback } from "@/components/FloatingFeedback";
import { Header } from "@/components/header";
import { LocaleProvider } from "@/i18n/locale-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shieldworks.com.br"),
  title: {
    default: "ShieldWorks | Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
    template: "%s | ShieldWorks"
  },
  description:
    "Site profissional de Themisson dos Santos Vasconcelos para engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica.",
  applicationName: "ShieldWorks",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://shieldworks.com.br",
    siteName: "ShieldWorks",
    title: "ShieldWorks",
    description:
      "Engenharia, pesquisa, segurança e tecnologia aplicada para transformar problemas complexos em soluções práticas."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
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
