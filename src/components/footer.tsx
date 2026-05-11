import Link from "next/link";
import { AcademicLinks } from "@/components/academic-links";
import { Logo } from "@/components/logo";
import { brand, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-graphite-100 bg-graphite-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xl text-sm leading-6 text-graphite-600">
            Site profissional de {brand.owner}, voltado a engenharia computacional, pesquisa aplicada,
            segurança operacional, sistemas institucionais e assessoria acadêmica.
          </p>
          <p className="mt-4 text-xs leading-5 text-graphite-500">
            As soluções e demonstrações apresentadas neste site integram uma iniciativa profissional pessoal e não
            representam, por si, sistemas oficiais de qualquer órgão público.
          </p>
          <div className="mt-5">
            <AcademicLinks compact />
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-graphite-900">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm text-graphite-600">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-petroleum-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-graphite-900">Contato profissional</h2>
          <p className="mt-4 text-sm leading-6 text-graphite-600">
            Use o formulário de contato para demandas técnicas, acadêmicas ou institucionais.
          </p>
          <Link href="/contato" className="mt-4 inline-flex text-sm font-semibold text-petroleum-900">
            Solicitar contato
          </Link>
        </div>
      </div>
      <div className="border-t border-graphite-100 px-4 py-5 text-center text-xs text-graphite-500">
        © {new Date().getFullYear()} ShieldWorks. Todos os direitos reservados.
      </div>
    </footer>
  );
}
