import type { Metadata } from "next";
import { Code2, GraduationCap, SearchCheck } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { ProfileHighlights } from "@/components/ProfileHighlights";
import { CardShell } from "@/components/card";
import { CTA } from "@/components/cta";
import { ProfilePortrait } from "@/components/profile-portrait";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre | ShieldWorks",
  description:
    "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais.",
  alternates: {
    canonical: canonicalUrl("/sobre")
  },
  openGraph: {
    title: "Sobre | ShieldWorks",
    description:
      "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais.",
    url: canonicalUrl("/sobre"),
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
    title: "Sobre | ShieldWorks",
    description:
      "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais.",
    images: ["/og-image.png"]
  }
};

const focusAreas = [
  {
    title: "Pesquisa e engenharia",
    description:
      "Atuação em geomecânica salina, simulação numérica, engenharia de poços, ABAQUS, métodos computacionais e análise técnica de problemas complexos.",
    icon: SearchCheck,
    tags: ["Geomecânica", "ABAQUS", "Simulação"]
  },
  {
    title: "Tecnologia aplicada",
    description:
      "Desenvolvimento de soluções em C++ e Python, sistemas web, automação documental, indicadores e apoio à gestão institucional.",
    icon: Code2,
    tags: ["C++", "Python", "Sistemas"]
  },
  {
    title: "Ensino e metodologia",
    description:
      "Desde 2019, atua como instrutor de TCC e Metodologia Científica nos cursos do Corpo de Bombeiros Militar de Alagoas, com acompanhamento de projetos, artigos, relatórios e preparação para bancas.",
    icon: GraduationCap,
    tags: ["TCC", "Metodologia", "Bancas"]
  }
];

export default function SobrePage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-16 lg:py-20">
          <Reveal immediate>
            <SectionTitle
              title="Themisson dos Santos Vasconcelos"
              description="Perfil técnico-profissional orientado por engenharia, pesquisa aplicada, segurança operacional, desenvolvimento computacional e ensino."
            />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <Reveal>
                <ProfilePortrait
                  priority
                  caption={
                    <>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-safety-100">
                        Perfil profissional
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-white/92">
                        Engenharia · Pesquisa · Segurança · Tecnologia
                      </span>
                    </>
                  }
                />
              </Reveal>

              <Reveal delay={80}>
                <div className="panel-muted p-6 sm:p-7">
                  <p className="text-sm leading-7 text-graphite-700">
                    Themisson dos Santos Vasconcelos é Tenente-Coronel do Corpo de Bombeiros Militar de Alagoas,
                    engenheiro de petróleo, mestre e doutor na área de estruturas e geomecânica. Sua trajetória integra
                    segurança operacional, pesquisa aplicada, engenharia computacional, gestão acadêmica e desenvolvimento
                    de soluções digitais.
                  </p>
                  <p className="mt-5 text-sm leading-7 text-graphite-700">
                    Sua atuação técnica envolve modelagem numérica computacional, geomecânica aplicada, simulação de
                    problemas estruturais e geomecânicos, desenvolvimento de códigos próprios em C++ e Python e utilização
                    de ferramentas consolidadas de análise, incluindo o ABAQUS, para estudos envolvendo tensões,
                    deformações, comportamento de materiais e validação de modelos numéricos.
                  </p>
                  <div className="mt-6">
                    <ProfessionalLinks compact />
                  </div>
                  <p className="mt-6 border-t border-graphite-100 pt-5 text-sm leading-7 text-graphite-600">
                    A apresentação neste site tem caráter profissional pessoal. Ela não configura promoção institucional
                    nem declara que eventuais sistemas, demonstrações ou projetos digitais sejam produtos oficiais do CBMAL
                    ou de qualquer órgão público.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <ProfileHighlights />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 80}>
                <CardShell {...area} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
