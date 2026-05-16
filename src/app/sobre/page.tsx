import type { Metadata } from "next";
import { Code2, GraduationCap, SearchCheck } from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { ProfileHighlights } from "@/components/ProfileHighlights";
import { CardShell } from "@/components/card";
import { CTA } from "@/components/cta";
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre | ShieldWorks",
    description:
      "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais.",
    images: ["/og-image.png"]
  }
};

export default function SobrePage() {
  return (
    <>
    <section className="bg-white py-18">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sobre"
          title="Themisson dos Santos Vasconcelos"
          description="Perfil técnico-profissional orientado por engenharia, pesquisa aplicada, segurança operacional, desenvolvimento computacional e ensino."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
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
            <p className="mt-6 text-sm leading-7 text-graphite-700">
              A apresentação neste site tem caráter profissional pessoal. Ela não configura promoção institucional
              nem declara que eventuais sistemas, demonstrações ou projetos digitais sejam produtos oficiais do CBMAL
              ou de qualquer órgão público.
            </p>
          </div>
          <ProfileHighlights />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <CardShell
            title="Pesquisa e engenharia"
            description="Atuação em geomecânica salina, simulação numérica, engenharia de poços, ABAQUS, métodos computacionais e análise técnica de problemas complexos."
            icon={SearchCheck}
            tags={["Geomecânica", "ABAQUS", "Simulação"]}
          />
          <CardShell
            title="Tecnologia aplicada"
            description="Desenvolvimento de soluções em C++ e Python, sistemas web, automação documental, indicadores e apoio à gestão institucional."
            icon={Code2}
            tags={["C++", "Python", "Sistemas"]}
          />
          <CardShell
            title="Ensino e metodologia"
            description="Desde 2019, atua como instrutor de TCC e Metodologia Científica nos cursos do Corpo de Bombeiros Militar de Alagoas, contribuindo para a formação acadêmica e técnico-profissional por meio do acompanhamento de projetos, trabalhos de conclusão de curso, artigos científicos, relatórios técnicos e preparação para bancas."
            icon={GraduationCap}
            tags={["TCC", "Metodologia", "Bancas"]}
          />
        </div>
      </div>
    </section>
    <CTA />
    </>
  );
}
