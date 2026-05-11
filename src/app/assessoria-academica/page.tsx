import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { academicServices } from "@/data/site";

export const metadata: Metadata = {
  title: "Assessoria Academica",
  description: "Apoio metodologico para projetos, TCCs, artigos cientificos, relatorios tecnicos e bancas."
};

export default function AssessoriaAcademicaPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Assessoria Academica e Producao Cientifica"
          title="Apoio tecnico e metodologico para trabalhos academicos e cientificos."
          description="Apoio tecnico e metodologico para estudantes, pesquisadores e profissionais que precisam estruturar trabalhos academicos, artigos cientificos, relatorios tecnicos e projetos de pesquisa com clareza, rigor e organizacao."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academicServices.concat([
            "Definicao de problema, objetivos e justificativa",
            "Organizacao da metodologia",
            "Orientacao para submissao de artigos"
          ]).map((service) => (
            <article key={service} className="rounded-lg border border-graphite-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-graphite-900">{service}</h2>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-petroleum-100 bg-petroleum-50 p-6">
          <h2 className="text-base font-semibold text-petroleum-900">Nota etica</h2>
          <p className="mt-3 text-sm leading-6 text-petroleum-900">
            Os servicos possuem carater consultivo, orientativo e revisional, respeitando a autoria, a integridade
            academica e as normas das instituicoes de ensino.
          </p>
        </div>
      </div>
    </section>
  );
}
