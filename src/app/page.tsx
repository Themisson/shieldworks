import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/badge";
import { ButtonLink } from "@/components/button-link";
import { ServiceCard, SystemCard } from "@/components/card";
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
              Engenharia, pesquisa, seguranca e tecnologia para transformar problemas complexos em solucoes aplicaveis.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite-600">
              Solucoes em engenharia computacional, geomecanica, seguranca operacional, sistemas institucionais,
              pesquisa aplicada e assessoria academica.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/solucoes">Conhecer solucoes</ButtonLink>
              <ButtonLink href="/contato" variant="secondary">Solicitar contato</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-graphite-100 bg-graphite-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">Atuacao integrada</p>
            <div className="mt-6 space-y-4">
              {authorityAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-md bg-white p-4">
                  <CheckCircle2 className="h-5 w-5 text-signal" aria-hidden="true" />
                  <span className="text-sm font-medium text-graphite-800">{area}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-graphite-600">
              Uma frente profissional voltada a transformar conhecimento tecnico, pesquisa e desenvolvimento
              computacional em entregas claras, documentadas e utilizaveis.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-18">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Areas de atuacao"
            title="Um eixo tecnico com engenharia, pesquisa, seguranca e sistemas."
            description="A ShieldWorks organiza frentes complementares para projetos tecnicos, academicos e institucionais com escopo bem definido."
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
          <SectionTitle eyebrow="Solucoes" title="Frentes em destaque" description="Servicos e linhas de desenvolvimento preparados para demandas tecnicas, academicas e de gestao." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredSolutions.map((solution) => (
              <div key={solution} className="flex items-start gap-3 rounded-lg border border-graphite-100 p-5">
                <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-petroleum-700" aria-hidden="true" />
                <p className="text-sm font-medium leading-6 text-graphite-800">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Laboratorio digital"
            title="Sistemas e projetos digitais"
            description="Exemplos de solucoes para gestao, ensino, automacao documental, indicadores e apoio a decisao. Demonstracoes academicas nao devem ser interpretadas como produtos oficiais de orgaos publicos."
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
              title="Metodos computacionais conectados a problemas reais."
              description="A producao cientifica envolve geomecanica, engenharia de petroleo, estruturas, seguranca operacional e tecnologia aplicada a gestao institucional."
            />
            <div className="mt-8">
              <ButtonLink href={brand.lattes} variant="secondary">Acessar Curriculo Lattes</ButtonLink>
            </div>
            <p className="mt-4 text-xs text-graphite-500">
              Espacos futuros: ORCID, Google Scholar, ResearchGate e curriculo resumido em PDF.
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
            eyebrow="Assessoria academica"
            title="Apoio metodologico e producao cientifica com rigor."
            description="Atuacao consultiva para estruturar projetos, TCCs, artigos, relatorios tecnicos, apresentacoes e submissao cientifica."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {academicServices.map((service) => (
              <div key={service} className="rounded-md bg-white p-4 text-sm font-medium text-graphite-700 shadow-sm">
                {service}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-petroleum-100 bg-petroleum-50 p-5 text-sm leading-6 text-petroleum-900">
            Os servicos possuem carater consultivo, orientativo e revisional, respeitando a autoria, a integridade
            academica e as normas das instituicoes de ensino.
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
