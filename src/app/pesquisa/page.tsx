import type { Metadata } from "next";
import { FlaskConical, Sigma, Target } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { CardShell } from "@/components/card";
import { CTA } from "@/components/cta";
import { SectionTitle } from "@/components/section-title";
import { researchAreas } from "@/data/site";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pesquisa | ShieldWorks",
  description:
    "Pesquisa aplicada em geomecânica salina, engenharia de poços, modelagem numérica, ABAQUS, C++, Python, Método dos Elementos Finitos, Método dos Elementos de Contorno e métodos computacionais.",
  alternates: {
    canonical: canonicalUrl("/pesquisa")
  },
  openGraph: {
    title: "Pesquisa | ShieldWorks",
    description:
      "Pesquisa aplicada em geomecânica salina, engenharia de poços, modelagem numérica, ABAQUS, C++, Python, Método dos Elementos Finitos, Método dos Elementos de Contorno e métodos computacionais.",
    url: canonicalUrl("/pesquisa"),
    siteName: "ShieldWorks",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pesquisa | ShieldWorks",
    description:
      "Pesquisa aplicada em geomecânica salina, engenharia de poços, modelagem numérica, ABAQUS, C++, Python, Método dos Elementos Finitos, Método dos Elementos de Contorno e métodos computacionais.",
    images: ["/og-image.png"]
  }
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
    <>
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pesquisa aplicada"
          title="Produção científica e técnica conectada à engenharia e segurança."
          description="A pesquisa aplicada envolve o uso de métodos numéricos e ferramentas computacionais como Método dos Elementos Finitos, Método dos Elementos de Contorno, Material Point Method, FVM, ABAQUS, C++ e Python, com aplicação em geomecânica salina, engenharia de poços, estruturas e segurança operacional."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <CardShell
            title="Áreas de pesquisa"
            description="Eixos científicos e técnicos tratados com foco em aplicação, documentação e validação."
            icon={FlaskConical}
            tags={researchAreas}
          />
          <CardShell
            title="Métodos utilizados"
            description="Métodos numéricos, ferramentas computacionais e linguagens aplicadas à modelagem."
            icon={Sigma}
            tags={methods}
          />
          <CardShell
            title="Aplicações práticas"
            description="Problemas de engenharia, comportamento de materiais e segurança operacional."
            icon={Target}
            tags={applications}
          />
        </div>
        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
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
    <CTA />
    </>
  );
}
