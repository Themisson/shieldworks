import type { Metadata } from "next";
import { FlaskConical, Sigma, Target } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { CardShell } from "@/components/card";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
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

const researchCards = [
  {
    title: "Áreas de pesquisa",
    description: "Eixos científicos e técnicos tratados com foco em aplicação, documentação e validação.",
    icon: FlaskConical,
    tags: researchAreas
  },
  {
    title: "Métodos utilizados",
    description: "Métodos numéricos, ferramentas computacionais e linguagens aplicadas à modelagem.",
    icon: Sigma,
    tags: methods
  },
  {
    title: "Aplicações práticas",
    description: "Problemas de engenharia, comportamento de materiais e segurança operacional.",
    icon: Target,
    tags: applications
  }
];

export default function PesquisaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <SectionTitle
              title="Produção científica e técnica conectada à engenharia e segurança."
              description="A pesquisa aplicada envolve o uso de métodos numéricos e ferramentas computacionais como Método dos Elementos Finitos, Método dos Elementos de Contorno, Material Point Method, FVM, ABAQUS, C++ e Python, com aplicação em geomecânica salina, engenharia de poços, estruturas e segurança operacional."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {researchCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <CardShell {...card} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="panel mt-10 overflow-hidden p-0">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-graphite-100 p-6 sm:p-7 lg:border-b-0 lg:border-r">
                  <h2 className="text-lg font-semibold tracking-tight text-graphite-900">
                    Produção científica resumida
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-sm leading-7 text-graphite-600">
                    A produção científica completa e atualizada pode ser consultada nos perfis acadêmicos oficiais,
                    enquanto os repositórios profissionais reúnem projetos, códigos e soluções técnicas em
                    desenvolvimento.
                  </p>
                </div>
                <div className="bg-graphite-50/60 p-6 sm:p-7">
                  <p className="text-sm font-medium text-graphite-800">Perfis e repositórios</p>
                  <div className="mt-4">
                    <ProfessionalLinks />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTA
        title="Tem um problema técnico que exige investigação aplicada?"
        description="Apresente o contexto, as restrições e o resultado esperado. Avaliamos aderência metodológica e próximos passos com objetividade."
        action="Discutir uma demanda de pesquisa"
      />
    </>
  );
}
