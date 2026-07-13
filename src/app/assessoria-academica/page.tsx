import type { Metadata } from "next";
import {
  BarChart3,
  BookOpenCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Library,
  Presentation,
  SearchCheck,
  Send,
  TextQuote
} from "lucide-react";
import { CardShell } from "@/components/card";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Assessoria Acadêmica",
  description: "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos e bancas.",
  alternates: {
    canonical: canonicalUrl("/assessoria-academica")
  },
  openGraph: {
    title: "Assessoria Acadêmica | ShieldWorks",
    description: "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos e bancas.",
    url: canonicalUrl("/assessoria-academica"),
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
    title: "Assessoria Acadêmica | ShieldWorks",
    description: "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos e bancas.",
    images: ["/og-image.png"]
  }
};

const advisoryServices = [
  {
    title: "Orientação metodológica",
    description:
      "Apoio na definição do problema de pesquisa, objetivos, justificativa, metodologia e organização lógica do trabalho acadêmico.",
    icon: SearchCheck
  },
  {
    title: "Projeto de pesquisa",
    description:
      "Auxílio na estruturação de projetos com delimitação do tema, problema, hipóteses, objetivos, referencial teórico e percurso metodológico.",
    icon: BookOpenCheck
  },
  {
    title: "TCC e trabalhos acadêmicos",
    description:
      "Acompanhamento consultivo na organização, desenvolvimento, revisão técnica e preparação de trabalhos de conclusão de curso.",
    icon: GraduationCap
  },
  {
    title: "Artigos científicos",
    description:
      "Apoio na estruturação de artigos, organização de seções, coerência argumentativa, metodologia, resultados e preparação para submissão.",
    icon: Library
  },
  {
    title: "Relatórios técnicos",
    description:
      "Revisão e organização de relatórios com foco em clareza, consistência técnica, apresentação de dados e comunicação objetiva.",
    icon: FileText
  },
  {
    title: "Normalização ABNT",
    description:
      "Apoio à adequação formal de citações, referências, estrutura do documento, elementos pré-textuais, textuais e pós-textuais.",
    icon: TextQuote
  },
  {
    title: "Análise e organização de dados",
    description:
      "Apoio na organização de bases de dados, leitura de resultados, elaboração de tabelas, gráficos e interpretação técnica.",
    icon: BarChart3
  },
  {
    title: "Preparação para bancas",
    description:
      "Orientação para construção de apresentação, roteiro de fala, defesa oral, controle do tempo e respostas a questionamentos.",
    icon: Presentation
  },
  {
    title: "Revisão técnica e acadêmica",
    description:
      "Leitura crítica do texto com foco em coerência, clareza, estrutura, fundamentação, linguagem técnica e consistência metodológica.",
    icon: FileCheck2
  },
  {
    title: "Submissão de artigos",
    description:
      "Apoio na revisão de requisitos de periódicos ou eventos, preparação de arquivos, adequação de normas e organização documental.",
    icon: Send
  }
];

export default function AssessoriaAcadêmicaPage() {
  const [primary, secondary, ...rest] = advisoryServices;
  const PrimaryIcon = primary?.icon;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <SectionTitle
              title="Apoio técnico e metodológico para trabalhos acadêmicos e científicos."
              description="Apoio técnico e metodológico para estudantes, pesquisadores e profissionais que precisam estruturar trabalhos acadêmicos, artigos científicos, relatórios técnicos e projetos de pesquisa com clareza, rigor e organização."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {primary ? (
              <Reveal className="lg:col-span-5">
                <article className="flex h-full flex-col rounded-2xl border border-petroleum-100 bg-gradient-to-br from-white via-white to-petroleum-50/70 p-6 shadow-card sm:p-7">
                  {PrimaryIcon ? (
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100">
                      <PrimaryIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  ) : null}
                  <h2 className="text-xl font-semibold tracking-tight text-graphite-900">{primary.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{primary.description}</p>
                  {secondary ? (
                    <div className="mt-auto border-t border-graphite-100 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-petroleum-600">
                        Também comum
                      </p>
                      <p className="mt-2 text-sm font-semibold text-graphite-900">{secondary.title}</p>
                      <p className="mt-1 text-sm leading-6 text-graphite-600">{secondary.description}</p>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {rest.map((service, index) => (
                <Reveal key={service.title} delay={(index % 2) * 60}>
                  <CardShell {...service} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={80}>
            <div className="panel-accent mt-10 p-6">
              <h2 className="text-base font-semibold text-petroleum-900">Nota ética</h2>
              <p className="mt-3 max-w-[65ch] text-sm leading-6 text-petroleum-900">
                Os serviços possuem caráter consultivo, orientativo e revisional, respeitando a autoria, a integridade
                acadêmica e as normas das instituições de ensino.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <CTA
        title="Precisa de apoio metodológico em um trabalho ou projeto?"
        description="Descreva o estágio atual do trabalho, o prazo e o tipo de apoio necessário. A conversa inicial define o escopo com clareza."
        action="Solicitar assessoria"
      />
    </>
  );
}
