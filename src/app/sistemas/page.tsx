import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SystemCard } from "@/components/card";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { digitalProjects } from "@/data/site";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sistemas",
  description: "Sistemas e soluções digitais para gestão, ensino, automação documental e indicadores.",
  alternates: {
    canonical: canonicalUrl("/sistemas")
  },
  openGraph: {
    title: "Sistemas | ShieldWorks",
    description: "Sistemas e soluções digitais para gestão, ensino, automação documental e indicadores.",
    url: canonicalUrl("/sistemas"),
    siteName: "ShieldWorks",
    locale: "pt_BR",
    type: "website",
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
    title: "Sistemas | ShieldWorks",
    description: "Sistemas e soluções digitais para gestão, ensino, automação documental e indicadores.",
    images: ["/og-image.png"]
  }
};

const subdomains = [
  "app.shieldworks.com.br",
  "demo.shieldworks.com.br",
  "monitor.shieldworks.com.br",
  "academy.shieldworks.com.br"
];

export default function SistemasPage() {
  const [primary, ...rest] = digitalProjects;
  const PrimaryIcon = primary?.icon;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <SectionTitle
              title="Plataformas digitais para gestão, ensino, documentos e decisão."
              description="Projetos digitais em diferentes estágios de maturidade, voltados a gestão, ensino, automação documental, análise de dados e apoio à tomada de decisão."
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="panel-muted mt-8 p-5 text-sm leading-6 text-graphite-600 sm:p-6">
              Os sistemas apresentados são soluções, demonstrações e projetos da ShieldWorks em evolução, sem
              caracterização como sistemas oficiais do CBMAL ou de qualquer órgão público.
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {primary ? (
              <Reveal className="lg:col-span-5">
                <article className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-petroleum-800 bg-petroleum-950 p-6 text-white shadow-lift sm:p-7">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(420px 220px at 10% 0%, rgba(47,143,131,0.3), transparent 65%)"
                    }}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      {PrimaryIcon ? (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-safety-100 ring-1 ring-white/15">
                          <PrimaryIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                      ) : null}
                      {primary.status ? (
                        <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-petroleum-100">
                          {primary.status}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-5 text-xl font-semibold tracking-tight">{primary.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-petroleum-100/90">{primary.description}</p>
                    {primary.statusDescription ? (
                      <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs leading-5 text-petroleum-100/80">
                        {primary.statusDescription}
                      </p>
                    ) : null}
                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                      <ButtonLink href="/contato" variant="inverse">
                        Solicitar demonstração
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {rest.map((project, index) => (
                <Reveal key={project.title} delay={(index % 2) * 70}>
                  <SystemCard {...project} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={100}>
            <div className="panel mt-12 p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-graphite-900">
                    Arquitetura futura de subdomínios
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-graphite-600">
                    Estrutura prevista para separar ambientes de aplicação, demonstração, monitoramento e capacitação.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {subdomains.map((domain) => (
                  <code
                    key={domain}
                    className="rounded-xl border border-graphite-100 bg-graphite-50 px-3 py-3 font-mono text-xs font-medium tracking-wide text-petroleum-900 sm:text-sm"
                  >
                    {domain}
                  </code>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTA
        title="Quer validar um sistema para a sua rotina?"
        description="Conte o fluxo atual, os documentos envolvidos e o resultado esperado. A partir disso, avaliamos protótipo, escopo e próximos passos."
        action="Solicitar demonstração"
      />
    </>
  );
}
