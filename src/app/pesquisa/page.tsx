import type { Metadata } from "next";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Badge } from "@/components/badge";
import { SectionTitle } from "@/components/section-title";
import { researchAreas } from "@/data/site";

export const metadata: Metadata = {
  title: "Pesquisa | ShieldWorks",
  description:
    "Pesquisa aplicada em geomecânica salina, engenharia de poços, modelagem numérica, ABAQUS, C++, Python, Método dos Elementos Finitos, Método dos Elementos de Contorno e métodos computacionais."
};

const methods = [
  "Método dos Elementos Finitos",
  "Método dos Elementos de Contorno",
  "Material Point Method",
  "FVM",
  "ABAQUS",
  "C++",
  "Python",
  "Simulação numérica",
  "Modelagem computacional"
];
const applications = [
  "Geomecânica salina",
  "Engenharia de poços",
  "Estruturas",
  "Comportamento de rochas",
  "Fluência",
  "Problemas acoplados",
  "Segurança operacional",
  "Tecnologia institucional"
];

export default function PesquisaPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pesquisa aplicada"
          title="Produção científica e técnica conectada à engenharia e segurança."
          description="A pesquisa aplicada envolve o uso de métodos numéricos e ferramentas computacionais como Método dos Elementos Finitos, Método dos Elementos de Contorno, Material Point Method, FVM, ABAQUS, C++ e Python, com aplicação em geomecânica salina, engenharia de poços, estruturas e segurança operacional."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Áreas de pesquisa</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <Badge key={area}>{area}</Badge>
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Métodos utilizados</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {methods.map((method) => (
                <Badge key={method}>{method}</Badge>
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Aplicações práticas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {applications.map((application) => (
                <Badge key={application}>{application}</Badge>
              ))}
            </div>
          </article>
        </div>
        <div className="mt-10 rounded-lg bg-graphite-50 p-6">
          <h2 className="text-lg font-semibold text-graphite-900">Produção científica resumida</h2>
          <p className="mt-3 text-sm leading-6 text-graphite-600">
            A produção científica completa e atualizada pode ser consultada nos perfis acadêmicos oficiais, enquanto
            os repositórios profissionais reúnem projetos, códigos e soluções técnicas em desenvolvimento.
          </p>
          <div className="mt-6">
            <ProfessionalLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
