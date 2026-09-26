import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Página não encontrada | ShieldWorks", robots: { index: false, follow: true } };
export default function GlobalNotFound() {
  return <html lang="pt-BR"><body><main className="section-shell error-page"><p className="technical-label">SHIELDWORKS / 404</p><h1>Página não encontrada</h1><p>Este endereço não corresponde a uma página disponível.</p><Link className="sw-button" href="/">Voltar ao início</Link><Link href="/en">English home</Link></main></body></html>;
}
