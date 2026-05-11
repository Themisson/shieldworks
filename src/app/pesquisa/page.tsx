import type { Metadata } from "next";
import { Badge } from "@/components/badge";
import { ButtonLink } from "@/components/button-link";
import { SectionTitle } from "@/components/section-title";
import { brand, researchAreas } from "@/data/site";

export const metadata: Metadata = {
  title: "Pesquisa",
  description: "Pesquisa aplicada em geomecânica, engenharia de petróleo, estruturas e métodos computacionais."
};

const methods = ["BEM", "FEM", "MPM", "FVM", "Simulação numérica", "Modelagem computacional", "Análise de dados"];
const applications = ["Engenharia de poços", "Rochas evaporíticas", "Segurança operacional", "Gestão institucional", "Automação técnica"];

export default function PesquisaPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pesquisa aplicada"
          title="Produção científica e técnica conectada à engenharia e segurança."
          description="A produção científica envolve trabalhos relacionados à geomecânica, engenharia de petróleo, estruturas, segurança operacional e métodos computacionais aplicados. A lista completa e atualizada de publicações pode ser consultada no Currículo Lattes."
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
            <h2 className="text-lg font-semibold text-graphite-900">Aplicacoes praticas</h2>
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
            Este espaço foi preparado para receber uma síntese validada do Currículo Lattes, sem listar artigos
            completos neste momento e sem criar uma página independente de artigos.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={brand.lattes} variant="secondary">Acessar Currículo Lattes</ButtonLink>
            <ButtonLink href={brand.orcid} variant="ghost">ORCID</ButtonLink>
            <ButtonLink href={brand.scholar} variant="ghost">Google Scholar</ButtonLink>
            <ButtonLink href={brand.resume} variant="ghost">Currículo PDF</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
