import type { Metadata } from "next";
import {
  BarChart3,
  BookOpenCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Library,
  Presentation,
  SearchCheck,
  Send,
  TextQuote
} from "lucide-react";
import { CardShell } from "@/components/card";
import { SectionTitle } from "@/components/section-title";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Assessoria Acadêmica",
  description: "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos e bancas.",
  alternates: {
    canonical: canonicalUrl("/assessoria-academica")
  }
};

const advisoryServices = [
  {
    title: "Orientação metodológica",
    description:
      "Apoio na definição do problema de pesquisa, objetivos, justificativa, metodologia e organização lógica do trabalho acadêmico.",
    icon: SearchCheck
  },
  {
    title: "Projeto de pesquisa",
    description:
      "Auxílio na estruturação de projetos com delimitação do tema, problema, hipóteses, objetivos, referencial teórico e percurso metodológico.",
    icon: BookOpenCheck
  },
  {
    title: "TCC e trabalhos acadêmicos",
    description:
      "Acompanhamento consultivo na organização, desenvolvimento, revisão técnica e preparação de trabalhos de conclusão de curso.",
    icon: GraduationCap
  },
  {
    title: "Artigos científicos",
    description:
      "Apoio na estruturação de artigos, organização de seções, coerência argumentativa, metodologia, resultados e preparação para submissão.",
    icon: Library
  },
  {
    title: "Relatórios técnicos",
    description:
      "Revisão e organização de relatórios com foco em clareza, consistência técnica, apresentação de dados e comunicação objetiva.",
    icon: FileText
  },
  {
    title: "Normalização ABNT",
    description:
      "Apoio à adequação formal de citações, referências, estrutura do documento, elementos pré-textuais, textuais e pós-textuais.",
    icon: TextQuote
  },
  {
    title: "Análise e organização de dados",
    description:
      "Apoio na organização de bases de dados, leitura de resultados, elaboração de tabelas, gráficos e interpretação técnica.",
    icon: BarChart3
  },
  {
    title: "Preparação para bancas",
    description:
      "Orientação para construção de apresentação, roteiro de fala, defesa oral, controle do tempo e respostas a questionamentos.",
    icon: Presentation
  },
  {
    title: "Revisão técnica e acadêmica",
    description:
      "Leitura crítica do texto com foco em coerência, clareza, estrutura, fundamentação, linguagem técnica e consistência metodológica.",
    icon: FileCheck2
  },
  {
    title: "Submissão de artigos",
    description:
      "Apoio na revisão de requisitos de periódicos ou eventos, preparação de arquivos, adequação de normas e organização documental.",
    icon: Send
  }
];

export default function AssessoriaAcadêmicaPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Assessoria Acadêmica e Produção Científica"
          title="Apoio técnico e metodológico para trabalhos acadêmicos e científicos."
          description="Apoio técnico e metodológico para estudantes, pesquisadores e profissionais que precisam estruturar trabalhos acadêmicos, artigos científicos, relatórios técnicos e projetos de pesquisa com clareza, rigor e organização."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advisoryServices.map((service) => (
            <CardShell key={service.title} {...service} />
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-petroleum-100 bg-petroleum-50 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-petroleum-900">Nota ética</h2>
          <p className="mt-3 text-sm leading-6 text-petroleum-900">
            Os serviços possuem caráter consultivo, orientativo e revisional, respeitando a autoria, a integridade
            acadêmica e as normas das instituições de ensino.
          </p>
        </div>
      </div>
    </section>
  );
}
