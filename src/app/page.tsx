import { CheckCircle2 } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Badge } from "@/components/badge";
import { ButtonLink } from "@/components/button-link";
import { CompactCard, HighlightCard, ServiceCard, SystemCard } from "@/components/card";
import { CTA } from "@/components/cta";
import { SectionTitle } from "@/components/section-title";
import {
  academicServices,
  authorityAreas,
  brand,
  digitalProjects,
  featuredSolutions,
  practiceAreas,
  researchAreas
} from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <Badge>{brand.tagline}</Badge>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold tracking-normal text-graphite-900 sm:text-5xl lg:text-6xl">
              Engenharia, pesquisa, segurança e tecnologia para transformar problemas complexos em soluções aplicáveis.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite-600">
              Soluções em engenharia computacional, geomecânica, segurança operacional, sistemas institucionais,
              pesquisa aplicada e assessoria acadêmica.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solucoes">Conhecer soluções</ButtonLink>
              <ButtonLink href="/contato" variant="secondary">Solicitar contato</ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">Atuação integrada</p>
            <div className="mt-6 space-y-4">
              {authorityAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-signal" aria-hidden="true" />
                  <span className="text-sm font-medium text-graphite-800">{area}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-graphite-600">
              Uma frente profissional voltada a transformar conhecimento técnico, pesquisa e desenvolvimento
              computacional em entregas claras, documentadas e utilizáveis.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-18">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Áreas de atuação"
            title="Um eixo técnico com engenharia, pesquisa, segurança e sistemas."
            description="A ShieldWorks organiza frentes complementares para projetos técnicos, acadêmicos e institucionais com escopo bem definido."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <ServiceCard key={area.title} {...area} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Soluções" title="Frentes em destaque" description="Serviços e linhas de desenvolvimento preparados para demandas técnicas, acadêmicas e de gestão." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSolutions.map((solution) => (
              <HighlightCard key={solution.title} {...solution} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Laboratório digital"
            title="Sistemas e projetos digitais"
            description="Exemplos de soluções para gestão, ensino, automação documental, indicadores e apoio à decisão. Demonstrações acadêmicas não devem ser interpretadas como produtos oficiais de órgãos públicos."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {digitalProjects.map((project) => (
              <SystemCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Pesquisa aplicada"
              title="Métodos computacionais conectados a problemas reais."
              description="A produção científica envolve geomecânica, engenharia de petróleo, estruturas, segurança operacional e tecnologia aplicada à gestão institucional."
            />
            <div className="mt-8">
              <ProfessionalLinks />
            </div>
            <p className="mt-4 text-xs text-graphite-500">
              Produção acadêmica, identificação científica e repositórios profissionais.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {researchAreas.map((area) => (
              <Badge key={area}>{area}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Assessoria acadêmica"
            title="Apoio metodológico e produção científica com rigor."
            description="Atuação consultiva para estruturar projetos, TCCs, artigos, relatórios técnicos, apresentações e submissão científica."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {academicServices.map((service) => (
              <CompactCard key={service} title={service} />
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-petroleum-100 bg-petroleum-50 p-5 text-sm leading-6 text-petroleum-900 shadow-sm">
            Os serviços possuem caráter consultivo, orientativo e revisional, respeitando a autoria, a integridade
            acadêmica e as normas das instituições de ensino.
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
