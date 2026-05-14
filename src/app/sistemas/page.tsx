import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { SystemCard } from "@/components/card";
import { SectionTitle } from "@/components/section-title";
import { digitalProjects } from "@/data/site";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sistemas",
  description: "Sistemas e soluções digitais para gestão, ensino, automação documental e indicadores.",
  alternates: {
    canonical: canonicalUrl("/sistemas")
  }
};

const subdomains = ["app.shieldworks.com.br", "demo.shieldworks.com.br", "monitor.shieldworks.com.br", "academy.shieldworks.com.br"];

export default function SistemasPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sistemas e Soluções Digitais"
          title="Plataformas digitais para gestão, ensino, documentos e decisão."
          description="Projetos digitais em diferentes estágios de maturidade, voltados a gestão, ensino, automação documental, análise de dados e apoio à tomada de decisão."
        />
        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-6 text-slate-600 shadow-sm">
          Os sistemas apresentados são soluções, demonstrações e projetos da ShieldWorks em evolução, sem caracterização
          como sistemas oficiais do CBMAL ou de qualquer órgão público.
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {digitalProjects.map((project) => (
            <SystemCard key={project.title} {...project} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contato">Solicitar demonstração</ButtonLink>
          <ButtonLink href="/contato" variant="secondary">Contato</ButtonLink>
        </div>
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-graphite-900">Arquitetura futura de subdomínios</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {subdomains.map((domain) => (
              <code
                key={domain}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-petroleum-900 shadow-sm"
              >
                {domain}
              </code>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
