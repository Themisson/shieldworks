import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shieldworks.com.br"),
  title: {
    default: "ShieldWorks | Engenharia, Pesquisa, Seguranca e Tecnologia Aplicada",
    template: "%s | ShieldWorks"
  },
  description:
    "Site profissional de Themisson dos Santos Vasconcelos para engenharia computacional, pesquisa aplicada, seguranca operacional, sistemas institucionais e assessoria academica.",
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
      "Engenharia, pesquisa, seguranca e tecnologia aplicada para transformar problemas complexos em solucoes praticas."
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
