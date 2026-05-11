import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { SystemCard } from "@/components/card";
import { SectionTitle } from "@/components/section-title";
import { digitalProjects } from "@/data/site";

export const metadata: Metadata = {
  title: "Sistemas",
  description: "Sistemas e solucoes digitais para gestao, ensino, automacao documental e indicadores."
};

const subdomains = ["app.shieldworks.com.br", "demo.shieldworks.com.br", "monitor.shieldworks.com.br", "academy.shieldworks.com.br"];

export default function SistemasPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sistemas e Solucoes Digitais"
          title="Plataformas digitais para gestao, ensino, documentos e decisao."
          description="Desenvolvimento de plataformas digitais voltadas a gestao, ensino, automacao documental, analise de dados e apoio a tomada de decisao."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {digitalProjects.slice(0, 5).map((project) => (
            <SystemCard key={project.title} {...project} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contato">Solicitar demonstracao</ButtonLink>
          <ButtonLink href="/contato" variant="secondary">Entrar em contato</ButtonLink>
        </div>
        <div className="mt-12 rounded-lg border border-graphite-100 bg-graphite-50 p-6">
          <h2 className="text-lg font-semibold text-graphite-900">Arquitetura futura de subdominios</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {subdomains.map((domain) => (
              <code key={domain} className="rounded-md bg-white px-3 py-3 text-sm text-petroleum-900">
                {domain}
              </code>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
