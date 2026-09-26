import { pageMetadata } from "@/lib/page-metadata";
import { routeLocale } from "@/lib/route-locale";

import { Text } from "@/i18n/locale-provider";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import LocalizedLink from "@/components/localized-link";
import { SystemCard } from "@/components/card";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { digitalProjects } from "@/data/site";

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
              <Text>
                {
                  "Os sistemas apresentados são soluções, demonstrações e projetos da ShieldWorks em evolução, sem caracterização como sistemas oficiais do CBMAL ou de qualquer órgão público."
                }
              </Text>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {primary ? (
              <Reveal className="lg:col-span-5">
                <article className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-petroleum-800 bg-petroleum-950 p-6 text-white sm:p-7">
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      {PrimaryIcon ? (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-safety-100 ring-1 ring-white/15">
                          <PrimaryIcon
                            className="h-5 w-5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                      {primary.status ? (
                        <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-petroleum-100">
                          <Text>{primary.status}</Text>
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-5 text-xl font-semibold tracking-tight">
                      <Text>{primary.title}</Text>
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-petroleum-100/90">
                      <Text>{primary.description}</Text>
                    </p>
                    {primary.statusDescription ? (
                      <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs leading-5 text-petroleum-100/80">
                        <Text>{primary.statusDescription}</Text>
                      </p>
                    ) : null}
                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                      <ButtonLink href="/contato" variant="inverse">
                        <Text>{"Solicitar demonstração"}</Text>
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

          <div className="detail-aside mt-12">
            <h2 className="text-2xl">
              <Text>{"Projetos e produtos digitais"}</Text>
            </h2>
            <p>
              <Text>
                {"Explore o catálogo de produtos do ecossistema ShieldWorks."}
              </Text>
            </p>
            <LocalizedLink href="/projetos" className="sw-button">
              <Text>{"Conhecer projetos"}</Text>
            </LocalizedLink>
          </div>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/sistemas",
    locale === "en" ? "Systems" : "Sistemas",
    locale === "en"
      ? "Institutional systems and digital solutions: capabilities, demonstrations and development stages."
      : "Sistemas institucionais e soluções digitais: capacidades, demonstrações e estágios de desenvolvimento.",
    locale,
  );
}
