import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Cpu,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Badge } from "@/components/badge";
import { ButtonLink } from "@/components/button-link";
import { ServiceCard, SystemCard } from "@/components/card";
import { CTA } from "@/components/cta";
import { InsightCard } from "@/components/insight-card";
import { SectionTitle } from "@/components/section-title";
import { getRecentInsights } from "@/data/insights";
import { digitalProjects, featuredSolutions } from "@/data/site";

const startingPoints = [
  {
    title: "Empresas e equipes técnicas",
    description: "Modelagem, simulação, análise de risco e apoio técnico para decisões que exigem método e documentação.",
    href: "/solucoes",
    action: "Explorar soluções técnicas",
    icon: Cpu
  },
  {
    title: "Instituições",
    description: "Sistemas sob medida, automação documental, indicadores e organização de processos acadêmicos ou administrativos.",
    href: "/sistemas",
    action: "Conhecer projetos digitais",
    icon: Building2
  },
  {
    title: "Pesquisadores e estudantes",
    description: "Apoio metodológico, revisão técnica e estruturação de trabalhos com rigor acadêmico e respeito à autoria.",
    href: "/assessoria-academica",
    action: "Ver assessoria acadêmica",
    icon: GraduationCap
  }
];

const credentials = [
  "Engenheiro de Petróleo",
  "Mestre e Doutor em Estruturas e Geomecânica",
  "Experiência em segurança operacional",
  "Desenvolvimento em C++, Python e ABAQUS"
];

export default function Home() {
  const recentInsights = getRecentInsights();

  return (
    <>
      <section className="overflow-hidden border-b border-slate-200 bg-graphite-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <Badge>Consultoria técnica e desenvolvimento aplicado</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-normal text-graphite-900 sm:text-5xl lg:text-[3.5rem]">
              Engenharia e tecnologia para decisões mais seguras e projetos que saem do papel.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-graphite-600 sm:text-lg sm:leading-8">
              Transformo problemas técnicos, científicos e institucionais em análises, sistemas e entregas claras,
              combinando engenharia computacional, pesquisa aplicada e experiência operacional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contato">
                Solicitar uma análise inicial
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#como-posso-ajudar" variant="secondary">Ver como posso ajudar</ButtonLink>
            </div>
            <ul className="mt-8 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3" aria-label="Diferenciais">
              {["Escopo bem definido", "Rigor técnico", "Entrega documentada"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-graphite-700">
                  <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative min-h-[360px] overflow-hidden rounded-lg border border-slate-200 bg-petroleum-900 shadow-soft sm:min-h-[460px]">
            <Image
              src="/engineering-hero.webp"
              alt="Visualização computacional de tensões em uma estrutura geomecânica"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-graphite-900/90 p-4 text-white backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-xs font-semibold uppercase text-petroleum-100">Atuação profissional</p>
              <p className="mt-2 text-sm leading-6 text-white/90">
                Themisson dos Santos Vasconcelos, engenheiro, pesquisador e desenvolvedor de soluções técnicas.
              </p>
            </div>
          </figure>
        </div>
      </section>

      <section id="como-posso-ajudar" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            as="h2"
            eyebrow="Seu ponto de partida"
            title="Encontre a frente certa para a sua demanda."
            description="Comece pelo contexto que mais se aproxima do seu desafio. O escopo final é definido após uma avaliação inicial."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {startingPoints.map(({ title, description, href, action, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex min-h-64 flex-col rounded-lg border border-slate-200 bg-white p-6 transition hover:border-petroleum-500 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-petroleum-100"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-graphite-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite-600">{description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-petroleum-900">
                  {action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              as="h2"
              eyebrow="Soluções"
              title="Conhecimento técnico aplicado a entregas concretas."
              description="Frentes complementares para investigar, desenvolver, documentar e implementar soluções conforme a necessidade do projeto."
            />
            <div className="shrink-0">
              <ButtonLink href="/solucoes" variant="secondary">Ver todas as soluções</ButtonLink>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSolutions.map((solution) => (
              <ServiceCard key={solution.title} {...solution} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-petroleum-900 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-petroleum-100">Experiência multidisciplinar</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Profundidade técnica sem perder a visão prática.</h2>
            <p className="mt-5 text-base leading-7 text-petroleum-100">
              A ShieldWorks reúne a formação acadêmica, a vivência operacional e o desenvolvimento computacional de
              Themisson dos Santos Vasconcelos em uma atuação profissional independente.
            </p>
            <div className="mt-7">
              <ProfessionalLinks compact />
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2">
            {credentials.map((credential) => (
              <li key={credential} className="flex min-h-28 items-start gap-3 bg-petroleum-900 p-5 text-sm leading-6 text-white">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              as="h2"
              eyebrow="Projetos digitais"
              title="Sistemas pensados para rotinas reais."
              description="Soluções para gestão, automação documental, indicadores e apoio à decisão, do protótipo ao desenvolvimento sob demanda."
            />
            <div className="shrink-0">
              <ButtonLink href="/sistemas" variant="secondary">Conhecer o laboratório digital</ButtonLink>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {digitalProjects.slice(0, 3).map((project) => (
              <SystemCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              as="h2"
              eyebrow="Conteúdo técnico"
              title="Pesquisa e experiência compartilhadas com clareza."
              description="Notas sobre engenharia computacional, geomecânica, sistemas e segurança operacional para aproximar conhecimento e aplicação."
            />
            <div className="shrink-0">
              <ButtonLink href="/insights" variant="secondary">Ver todos os insights</ButtonLink>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {recentInsights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Tem um desafio técnico, institucional ou acadêmico?"
        description="Apresente o contexto da sua demanda. A conversa inicial serve para entender o problema, avaliar aderência e definir os próximos passos com objetividade."
        action="Apresentar minha demanda"
      />
    </>
  );
}
