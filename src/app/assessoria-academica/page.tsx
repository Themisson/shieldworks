import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { academicServices } from "@/data/site";

export const metadata: Metadata = {
  title: "Assessoria Acadêmica",
  description: "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos e bancas."
};

export default function AssessoriaAcadêmicaPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Assessoria Acadêmica e Produção Científica"
          title="Apoio técnico e metodológico para trabalhos acadêmicos e científicos."
          description="Apoio técnico e metodológico para estudantes, pesquisadores e profissionais que precisam estruturar trabalhos acadêmicos, artigos científicos, relatórios técnicos e projetos de pesquisa com clareza, rigor e organização."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academicServices.concat([
            "Definicao de problema, objetivos e justificativa",
            "Organização da metodologia",
            "Orientação para submissão de artigos"
          ]).map((service) => (
            <article key={service} className="rounded-lg border border-graphite-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-graphite-900">{service}</h2>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-petroleum-100 bg-petroleum-50 p-6">
          <h2 className="text-base font-semibold text-petroleum-900">Nota etica</h2>
          <p className="mt-3 text-sm leading-6 text-petroleum-900">
            Os serviços possuem caráter consultivo, orientativo e revisional, respeitando a autoria, a integridade
            acadêmica e as normas das instituições de ensino.
          </p>
        </div>
      </div>
    </section>
  );
}
