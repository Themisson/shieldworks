import Link from "next/link";
import { IBM_Plex_Mono, Outfit } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const sans = Outfit({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Página não encontrada · Page not found | ShieldWorks",
  robots: { index: false, follow: true },
};

/** Unknown slugs of both locales end here, so the page speaks both languages. */
export default function GlobalNotFound() {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <main className="section-shell error-page">
          <p className="technical-label">SHIELDWORKS / 404</p>
          <h1>Página não encontrada</h1>
          <p>Este endereço não corresponde a uma página disponível.</p>
          <p lang="en">This address does not match an available page.</p>
          <div className="button-row">
            <Link className="sw-button" href="/">
              Voltar ao início
            </Link>
            <Link className="sw-button sw-button-secondary" href="/en" lang="en">
              English home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
