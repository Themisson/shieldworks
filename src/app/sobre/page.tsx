import type { Metadata } from "next";
import {
  BookOpenCheck,
  Building2,
  Code2,
  Cpu,
  FlaskConical,
  GraduationCap,
  PanelsTopLeft,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { CardShell } from "@/components/card";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Sobre | ShieldWorks",
  description:
    "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais."
};

const professionalSynthesis = [
  {
    title: "Carreira institucional",
    description:
      "Oficial do Corpo de Bombeiros Militar de Alagoas, com experiência operacional, administrativa e acadêmica.",
    icon: ShieldCheck,
    tags: ["Operações", "Gestão", "Academia"]
  },
  {
    title: "Formação em engenharia",
    description: "Engenheiro de petróleo, mestre e doutor na área de estruturas e geomecânica.",
    icon: Building2,
    tags: ["Petróleo", "Estruturas", "Geomecânica"]
  },
  {
    title: "Pesquisa aplicada",
    description:
      "Atuação em geomecânica salina, fluência de rochas evaporíticas, engenharia de poços e simulação numérica.",
    icon: FlaskConical,
    tags: ["Geomecânica", "Poços", "Simulação"]
  },
  {
    title: "Modelagem computacional",
    description: "Uso de C++, Python, ABAQUS, BEM, FEM, MPM e FVM em problemas técnicos de engenharia.",
    icon: Cpu,
    tags: ["C++", "Python", "ABAQUS"]
  },
  {
    title: "Ensino e metodologia",
    description:
      "Instrutor de TCC e Metodologia Científica desde 2019, com acompanhamento de projetos, artigos, relatórios e bancas.",
    icon: BookOpenCheck,
    tags: ["TCC", "Metodologia", "Bancas"]
  },
  {
    title: "Tecnologia institucional",
    description:
      "Desenvolvimento de sistemas, rotinas digitais, automação documental e apoio à gestão acadêmica.",
    icon: PanelsTopLeft,
    tags: ["Sistemas", "Documentos", "Gestão"]
  }
];

export default function SobrePage() {
  return (
    <section className="bg-white py-18">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sobre"
          title="Themisson dos Santos Vasconcelos"
          description="Perfil técnico-profissional orientado por engenharia, pesquisa aplicada, segurança operacional, desenvolvimento computacional e ensino."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
              <ProfessionalLinks />
            </div>
            <p className="mt-6 text-sm leading-7 text-graphite-700">
              A apresentação neste site tem caráter profissional pessoal. Ela não configura promoção institucional
              nem declara que eventuais sistemas, demonstrações ou projetos digitais sejam produtos oficiais do CBMAL
              ou de qualquer órgão público.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">Síntese profissional</p>
            <h2 className="mt-3 text-xl font-semibold tracking-normal text-graphite-900">
              Atuação integrada entre carreira militar, engenharia, pesquisa aplicada, desenvolvimento computacional,
              docência e soluções institucionais.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {professionalSynthesis.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-800 ring-1 ring-slate-200 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
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
  );
}
