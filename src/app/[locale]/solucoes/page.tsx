import { pageMetadata } from "@/lib/page-metadata";
import { routeLocale } from "@/lib/route-locale";

import { Text } from "@/i18n/locale-provider";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ListCard } from "@/components/card";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { serviceIcons } from "@/data/site";

const solutionBlocks = [
  {
    title: "Engenharia Computacional",
    description:
      "Modelagem numérica computacional aplicada à engenharia, com uso de C++, Python, ABAQUS e métodos numéricos para análise de tensões, deformações, comportamento geomecânico, validação de modelos e apoio à tomada de decisão técnica.",
    items: [
      "Modelagem numérica computacional",
      "Modelos numéricos em ABAQUS",
      "Simulações em C++ e Python",
      "Scripts de pré e pós-processamento",
      "Análise de tensões e deformações",
      "Simulações geomecânicas e estruturais",
      "Validação de resultados numéricos",
      "Comparação entre simulação e soluções analíticas",
      "Relatórios técnicos de modelagem computacional",
    ],
    icon: serviceIcons.computationalEngineering,
    featured: true,
  },
  {
    title: "Sistemas Institucionais",
    description:
      "Plataformas para rotinas acadêmicas, documentos, indicadores administrativos e organização de dados institucionais.",
    items: [
      "Gestão acadêmica",
      "Emissão de certificados",
      "Controle de cursos e turmas",
      "Gestão de instrutores",
      "Formulários e avaliações",
      "Dashboards administrativos",
      "Geração automática de documentos",
    ],
    icon: serviceIcons.institutionalSystems,
  },
  {
    title: "Segurança Operacional e Gestão de Riscos",
    description:
      "Apoio técnico à prevenção, análise de riscos, monitoramento e resposta operacional com uso de tecnologia aplicada.",
    items: [
      "Diagnóstico de risco",
      "Prevenção",
      "Resposta operacional",
      "Uso de tecnologia em emergências",
      "Drones e monitoramento",
      "Capacitações em segurança",
    ],
    icon: serviceIcons.operationalSafety,
  },
  {
    title: "Assessoria Acadêmica e Científica",
    description:
      "Acompanhamento consultivo para estruturação, revisão técnica, metodologia, normalização e apresentação de trabalhos.",
    items: [
      "Projetos de pesquisa",
      "TCC",
      "Artigos científicos",
      "Relatórios técnicos",
      "Metodologia",
      "Normalização",
      "Análise de dados",
      "Preparação para bancas",
    ],
    icon: serviceIcons.academicAdvisory,
  },
  {
    title: "Capacitação Técnica",
    description:
      "Frente futura para cursos e treinamentos técnicos em metodologia, segurança, programação e simulação numérica.",
    items: [
      "Metodologia científica",
      "TCC e trabalhos técnicos",
      "Segurança operacional",
      "Primeiros socorros/RCP",
      "Python para engenharia",
      "C++ para simulação numérica",
      "Métodos numéricos aplicados",
      "Geomecânica aplicada",
    ],
    icon: serviceIcons.technicalTraining,
  },
];

export default async function SolucoesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await routeLocale(params);
  const [featured, ...rest] = solutionBlocks;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                title="Serviços estruturados para demandas técnicas, digitais e acadêmicas."
                description="Cada frente pode ser tratada como consultoria, projeto técnico, demonstração, protótipo, documento técnico ou sistema evolutivo."
              />
              <div className="shrink-0">
                <ButtonLink href="/contato">
                  <Text>{"Solicitar análise inicial"}</Text>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <div className="split-composition mt-10">
            <div>
              <h2 className="text-2xl font-medium">
                {locale === "en"
                  ? "A clear path from question to delivery."
                  : "Um caminho claro da pergunta à entrega."}
              </h2>
              <ol className="detail-list mt-6">
                {(locale === "en"
                  ? [
                      "Problem · understand the context, constraints and available evidence.",
                      "Approach · define the method, scope and validation criteria.",
                      "Delivery · document models, code, analyses or systems as agreed.",
                      "Result · support a technical decision with explicit limitations.",
                    ]
                  : [
                      "Problema · compreender contexto, restrições e evidências disponíveis.",
                      "Abordagem · definir método, escopo e critérios de validação.",
                      "Entrega · documentar modelos, código, análises ou sistemas conforme o escopo.",
                      "Resultado · apoiar a decisão técnica com limitações explícitas.",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <EngineeringScene kind="numerical" />
          </div>
          <div className="mt-10 space-y-4">
            <Reveal>
              <ListCard {...featured} className="border-petroleum-100" />
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-2">
              {rest.map((block, index) => (
                <Reveal key={block.title} delay={(index % 2) * 70}>
                  <ListCard {...block} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA
        title="Precisa encaixar a solução certa ao seu problema?"
        description="Descreva o contexto técnico, institucional ou acadêmico. A avaliação inicial organiza escopo, aderência e próximos passos."
        action="Falar sobre um projeto"
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
    "/solucoes",
    locale === "en" ? "Solutions" : "Soluções",
    locale === "en"
      ? "Computational engineering, software, safety and academic advisory for real needs."
      : "Engenharia computacional, software, segurança e assessoria acadêmica para demandas reais.",
    locale,
  );
}
