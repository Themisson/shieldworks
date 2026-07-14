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
import { CaseStudyCard } from "@/components/case-study";
import { InsightCard } from "@/components/insight-card";
import { ProfilePortrait } from "@/components/profile-portrait";
import { PublicationsList } from "@/components/publications";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import type { CaseStudy } from "@/data/cases";
import type { Insight } from "@/data/insights";
import type { Publication } from "@/data/publications";
import { digitalProjects, featuredSolutions } from "@/data/site";

const startingPoints = [
  {
    title: "Empresas e equipes técnicas",
    description:
      "Modelagem, simulação, análise de risco e apoio técnico para decisões que exigem método e documentação.",
    href: "/solucoes",
    action: "Explorar soluções técnicas",
    icon: Cpu,
    featured: true
  },
  {
    title: "Instituições",
    description:
      "Sistemas sob medida, automação documental, indicadores e organização de processos acadêmicos ou administrativos.",
    href: "/sistemas",
    action: "Conhecer projetos digitais",
    icon: Building2,
    featured: false
  },
  {
    title: "Pesquisadores e estudantes",
    description:
      "Apoio metodológico, revisão técnica e estruturação de trabalhos com rigor acadêmico e respeito à autoria.",
    href: "/assessoria-academica",
    action: "Ver assessoria acadêmica",
    icon: GraduationCap,
    featured: false
  }
];

const credentials = [
  "Engenheiro de Petróleo",
  "Mestre e Doutor em Estruturas e Geomecânica",
  "Experiência em segurança operacional",
  "Desenvolvimento em C++, Python e ABAQUS"
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-graphite-100">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,245,247,0.9) 0%, rgba(247,249,250,0.4) 45%, transparent 100%)"
        }}
      />
      <div className="section-shell relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-20">
        <Reveal immediate className="max-w-2xl">
          <Badge>Consultoria técnica e desenvolvimento aplicado</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Engenharia e tecnologia para decisões mais seguras e projetos que saem do papel.
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-7 text-graphite-600 sm:text-lg sm:leading-8">
            Transformo problemas técnicos, científicos e institucionais em análises, sistemas e entregas
            claras, combinando engenharia computacional, pesquisa aplicada e experiência operacional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contato">
              Solicitar uma análise inicial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#como-posso-ajudar" variant="secondary">
              Ver como posso ajudar
            </ButtonLink>
          </div>
          <ul
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-graphite-100 pt-6"
            aria-label="Diferenciais"
          >
            {["Escopo bem definido", "Rigor técnico", "Entrega documentada"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-graphite-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-petroleum-50 text-signal ring-1 ring-petroleum-100">
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal immediate delay={100} className="order-first lg:order-last">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-end">
            <ProfilePortrait
              priority
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 55vw, 32vw"
              caption={
                <>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-safety-100">
                    Themisson dos Santos Vasconcelos
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white/92">
                    Engenheiro · Pesquisador · Desenvolvedor de soluções técnicas
                  </span>
                </>
              }
            />
            <figure className="relative hidden min-h-[220px] overflow-hidden rounded-3xl border border-graphite-100 bg-petroleum-900 shadow-lift sm:block sm:min-h-[280px] lg:min-h-[320px]">
              <Image
                src="/engineering-hero.webp"
                alt="Visualização de modelagem numérica e engenharia computacional aplicada"
                fill
                sizes="(max-width: 1023px) 40vw, 28vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,28,36,0.82) 0%, rgba(10,28,36,0.2) 50%, transparent 75%)"
                }}
              />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border border-white/12 bg-petroleum-950/65 px-3 py-2.5 text-white backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-petroleum-100">
                  Modelagem · Simulação
                </p>
                <p className="mt-1 text-xs leading-5 text-white/85">
                  Engenharia computacional aplicada a problemas reais.
                </p>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeStartingPoints() {
  return (
    <section id="como-posso-ajudar" className="scroll-mt-24 py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            as="h2"
            title="Encontre a frente certa para a sua demanda."
            description="Comece pelo contexto que mais se aproxima do seu desafio. O escopo final é definido após uma avaliação inicial."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {startingPoints.map(({ title, description, href, action, icon: Icon, featured }, index) => (
            <Reveal key={title} delay={index * 70} className={featured ? "lg:col-span-6" : "lg:col-span-3"}>
              <Link
                href={href}
                className={`group flex min-h-56 flex-col rounded-2xl border border-graphite-100/80 bg-white p-6 shadow-card transition duration-300 ease-out hover:-translate-y-0.5 hover:border-petroleum-200 hover:shadow-lift focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 ${
                  featured ? "lg:min-h-72 lg:p-8" : ""
                } ${index === 0 ? "bg-gradient-to-br from-white via-white to-petroleum-50/60" : ""}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100 transition duration-300 group-hover:bg-petroleum-900 group-hover:text-safety-100 group-hover:ring-petroleum-800">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3
                  className={`mt-5 font-semibold tracking-tight text-graphite-900 ${featured ? "text-xl" : "text-base"}`}
                >
                  {title}
                </h3>
                <p className={`mt-3 text-sm leading-6 text-graphite-600 ${featured ? "max-w-md" : ""}`}>
                  {description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-petroleum-800">
                  {action}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeSolutions() {
  const [primarySolution, ...otherSolutions] = featuredSolutions;
  const PrimaryIcon = primarySolution?.icon;

  return (
    <section className="border-y border-graphite-100 bg-white py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              as="h2"
              title="Conhecimento técnico aplicado a entregas concretas."
              description="Frentes complementares para investigar, desenvolver, documentar e implementar soluções conforme a necessidade do projeto."
            />
            <div className="shrink-0">
              <ButtonLink href="/solucoes" variant="secondary">
                Ver todas as soluções
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {primarySolution ? (
            <Reveal className="lg:col-span-5">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-petroleum-800 bg-petroleum-950 p-6 text-white shadow-lift sm:p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(500px 240px at 0% 0%, rgba(47,143,131,0.28), transparent 60%)"
                  }}
                />
                <div className="relative">
                  {PrimaryIcon ? (
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-safety-100 ring-1 ring-white/15">
                      <PrimaryIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  ) : null}
                  <h3 className="text-xl font-semibold tracking-tight">{primarySolution.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-petroleum-100/90">
                    {primarySolution.description}
                  </p>
                  {primarySolution.tags?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {primarySolution.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-petroleum-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href="/solucoes"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-safety-100 transition-colors hover:text-white"
                  >
                    Detalhar esta frente
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {otherSolutions.map((solution, index) => (
              <Reveal key={solution.title} delay={(index % 2) * 70}>
                <ServiceCard {...solution} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeCredentials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Experiência multidisciplinar</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
            Profundidade técnica sem perder a visão prática.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-7 text-graphite-600">
            A ShieldWorks reúne a formação acadêmica, a vivência operacional e o desenvolvimento computacional de
            Themisson dos Santos Vasconcelos em uma atuação profissional independente.
          </p>
          <div className="mt-7">
            <ProfessionalLinks compact />
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2" role="list" aria-label="Credenciais">
          {credentials.map((credential, index) => (
            <Reveal key={credential} delay={index * 60}>
              <div
                role="listitem"
                className={`flex min-h-[7.5rem] items-start gap-3 rounded-2xl border border-graphite-100 bg-white p-5 text-sm leading-6 text-graphite-700 shadow-card ${
                  index % 2 === 1 ? "sm:mt-6" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100">
                  <ShieldCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {credential}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCases({ studies }: { studies: CaseStudy[] }) {
  const [primary, secondary] = studies;

  return (
    <section className="border-y border-graphite-100 bg-white py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              as="h2"
              title="Cases técnicos documentados."
              description="Problema, método, entrega e impacto - com exemplos da linha de pesquisa em geomecânica e da frente de sistemas institucionais."
            />
            <div className="shrink-0">
              <ButtonLink href="/pesquisa" variant="secondary">
                Ver pesquisa aplicada
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {primary ? (
          <div className="mt-10">
            <Reveal>
              <CaseStudyCard study={primary} />
            </Reveal>
          </div>
        ) : null}

        {secondary ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-1">
            <Reveal delay={80}>
              <CaseStudyCard study={secondary} />
            </Reveal>
          </div>
        ) : null}

        {studies.length > 2 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {studies.slice(2).map((study, index) => (
              <Reveal key={study.id} delay={index * 70}>
                <CaseStudyCard study={study} compact />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HomePublications({ items }: { items: Publication[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            as="h2"
            title="Publicações selecionadas."
            description="Amostra da produção científica em geomecânica, evaporitos e modelagem termomecânica. Lista completa no Lattes, ORCID e Google Acadêmico."
          />
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <PublicationsList items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HomeSystems() {
  return (
    <section className="border-y border-graphite-100 bg-white py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              as="h2"
              title="Sistemas pensados para rotinas reais."
              description="Soluções para gestão, automação documental, indicadores e apoio à decisão, do protótipo ao desenvolvimento sob demanda."
            />
            <div className="shrink-0">
              <ButtonLink href="/sistemas" variant="secondary">
                Conhecer o laboratório digital
              </ButtonLink>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {digitalProjects.slice(0, 3).map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <SystemCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeInsights({ items }: { items: Insight[] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              as="h2"
              title="Pesquisa e experiência compartilhadas com clareza."
              description="Notas sobre engenharia computacional, geomecânica, sistemas e segurança operacional para aproximar conhecimento e aplicação."
            />
            <div className="shrink-0">
              <ButtonLink href="/insights" variant="secondary">
                Ver todos os insights
              </ButtonLink>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((insight, index) => (
            <Reveal key={insight.slug} delay={index * 70}>
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
