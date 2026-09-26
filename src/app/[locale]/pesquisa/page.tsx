import { pageMetadata } from "@/lib/page-metadata";
import { routeLocale } from "@/lib/route-locale";

import { Text } from "@/i18n/locale-provider";
import Link from "next/link";
import { localizedPath } from "@/i18n/routing";
import { researchLines } from "@/data/research";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";
import type { Metadata } from "next";
import { FlaskConical, Sigma, Target } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { CardShell } from "@/components/card";
import { CaseStudyCard } from "@/components/case-study";
import { CTA } from "@/components/cta";
import { PublicationsList } from "@/components/publications";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { getFeaturedCases } from "@/data/cases";
import { getFeaturedPublications } from "@/data/publications";
import { researchAreas } from "@/data/site";

const methods = [
  "Método dos Elementos Finitos",
  "Método dos Elementos de Contorno",
  "Material Point Method",
  "FVM",
  "ABAQUS",
  "C++",
  "Python",
  "Simulação numérica",
  "Modelagem computacional",
];

const applications = [
  "Geomecânica salina",
  "Engenharia de poços",
  "Estruturas",
  "Comportamento de rochas",
  "Fluência",
  "Problemas acoplados",
  "Segurança operacional",
  "Tecnologia institucional",
];

const researchCards = [
  {
    title: "Áreas de pesquisa",
    description:
      "Eixos científicos e técnicos tratados com foco em aplicação, documentação e validação.",
    icon: FlaskConical,
    tags: researchAreas,
  },
  {
    title: "Métodos utilizados",
    description:
      "Métodos numéricos, ferramentas computacionais e linguagens aplicadas à modelagem.",
    icon: Sigma,
    tags: methods,
  },
  {
    title: "Aplicações práticas",
    description:
      "Problemas de engenharia, comportamento de materiais e segurança operacional.",
    icon: Target,
    tags: applications,
  },
];

export default async function PesquisaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await routeLocale(params);
  const featuredCases = getFeaturedCases();
  const publications = getFeaturedPublications();

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <SectionTitle
              title="Produção científica e técnica conectada à engenharia e segurança."
              description="A pesquisa aplicada envolve o uso de métodos numéricos e ferramentas computacionais como Método dos Elementos Finitos, Método dos Elementos de Contorno, Material Point Method, FVM, ABAQUS, C++ e Python, com aplicação em geomecânica salina, engenharia de poços, estruturas e segurança operacional."
            />
          </Reveal>

          <div className="split-composition mt-10">
            <div>
              <p className="technical-label">
                {locale === "en" ? "RESEARCH LINES" : "LINHAS DE PESQUISA"}
              </p>
              <div className="solution-ledger">
                {researchLines.map((line) => (
                  <Link
                    key={line.slug}
                    href={localizedPath("/pesquisa/" + line.slug, locale)}
                  >
                    <span className="technical-label">{line.number}</span>
                    <div>
                      <h2>{line.title[locale]}</h2>
                      <p>{line.summary[locale]}</p>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
              <div className="button-row">
                <Link
                  className="sw-button"
                  href={localizedPath("/pesquisa/publicacoes", locale)}
                >
                  {locale === "en"
                    ? "Scientific publications"
                    : "Publicações científicas"}
                </Link>
                <Link
                  className="sw-button sw-button-secondary"
                  href={localizedPath("/pesquisa/projetos", locale)}
                >
                  {locale === "en"
                    ? "Research projects"
                    : "Projetos de pesquisa"}
                </Link>
              </div>
            </div>
            <EngineeringScene kind="research" locale={locale} />
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {researchCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <CardShell {...card} />
              </Reveal>
            ))}
          </div>

          {featuredCases.length ? (
            <div className="mt-14">
              <Reveal>
                <SectionTitle
                  as="h2"
                  title="Cases técnicos documentados."
                  description="Exemplos da linha de geomecânica e da frente de sistemas institucionais, organizados em problema, método, entrega e impacto."
                />
              </Reveal>
              <div className="mt-8 grid gap-6">
                {featuredCases.map((study, index) => (
                  <Reveal key={study.id} delay={index * 60}>
                    <CaseStudyCard study={study} />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-14">
            <Reveal>
              <SectionTitle
                as="h2"
                title="Publicações selecionadas."
                description="Amostra curada da produção científica. Para a lista completa e atualizada, consulte Lattes, ORCID e Google Acadêmico."
              />
            </Reveal>
            <div className="mt-8">
              <Reveal delay={40}>
                <PublicationsList items={publications} />
              </Reveal>
            </div>
          </div>

          <Reveal delay={80}>
            <div className="panel mt-12 overflow-hidden p-0">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-graphite-100 p-6 sm:p-7 lg:border-b-0 lg:border-r">
                  <h2 className="text-lg font-semibold tracking-tight text-graphite-900">
                    <Text>{"Produção científica completa"}</Text>
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-sm leading-7 text-graphite-600">
                    <Text>
                      {
                        "A seleção acima é representativa. Artigos, trabalhos de congresso e a produção completa permanecem nos perfis acadêmicos oficiais e nos repositórios profissionais."
                      }
                    </Text>
                  </p>
                </div>
                <div className="bg-graphite-50/60 p-6 sm:p-7">
                  <p className="text-sm font-medium text-graphite-800">
                    <Text>{"Perfis e repositórios"}</Text>
                  </p>
                  <div className="mt-4">
                    <ProfessionalLinks />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTA
        title="Tem um problema técnico que exige investigação aplicada?"
        description="Apresente o contexto, as restrições e o resultado esperado. Avaliamos aderência metodológica e próximos passos com objetividade."
        action="Discutir uma demanda de pesquisa"
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
    "/pesquisa",
    locale === "en" ? "Research" : "Pesquisa",
    locale === "en"
      ? "Salt geomechanics, well engineering and numerical methods: research lines, projects and verifiable publications."
      : "Geomecânica salina, engenharia de poços e métodos numéricos: linhas, projetos e publicações verificáveis.",
    locale,
  );
}
