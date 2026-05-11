import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { Badge } from "@/components/badge";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Perfil profissional de Themisson dos Santos Vasconcelos e apresentacao da ShieldWorks."
};

const highlights = [
  "Oficial do Corpo de Bombeiros Militar de Alagoas",
  "Formacao em Engenharia de Petroleo",
  "Mestrado e doutorado na area de estruturas e geomecanica",
  "Pesquisa em geomecanica salina e fluencia de rochas evaporiticas",
  "Experiencia com simulacao numerica e metodos computacionais",
  "Desenvolvimento em C++ e Python",
  "Atuacao docente, academica e em gestao academica",
  "Instrutor de PCC e Metodologia Cientifica desde 2019",
  "Participacao em bancas e acompanhamento de trabalhos academicos",
  "Desenvolvimento de sistemas institucionais e rotinas digitais"
];

export default function SobrePage() {
  return (
    <section className="bg-white py-18">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sobre"
          title="Themisson dos Santos Vasconcelos"
          description="Perfil tecnico-profissional orientado por engenharia, pesquisa aplicada, seguranca operacional, desenvolvimento computacional e ensino."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-graphite-100 bg-graphite-50 p-6">
            <p className="text-sm leading-7 text-graphite-700">
              Themisson dos Santos Vasconcelos e Tenente-Coronel do Corpo de Bombeiros Militar de Alagoas,
              engenheiro de petroleo, mestre e doutor na area de estruturas e geomecanica. Sua trajetoria integra
              seguranca operacional, pesquisa aplicada, engenharia computacional, gestao academica e desenvolvimento
              de solucoes digitais.
            </p>
            <p className="mt-5 text-sm leading-7 text-graphite-700">
              A apresentacao neste site tem carater profissional pessoal. Ela nao configura promocao institucional
              nem declara que eventuais sistemas, demonstracoes ou projetos digitais sejam produtos oficiais do CBMAL
              ou de qualquer orgao publico.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Pesquisa e engenharia</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Atuacao em geomecanica salina, simulacao numerica, engenharia de pocos, metodos computacionais e
              analise tecnica de problemas complexos.
            </p>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Tecnologia aplicada</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Desenvolvimento de solucoes em C++ e Python, sistemas web, automacao documental, indicadores e apoio a
              gestao institucional.
            </p>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Ensino e metodologia</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Desde 2019 atua como instrutor de PCC e Metodologia Cientifica, acompanhando projetos, TCCs, artigos,
              relatorios e preparacao para bancas.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
