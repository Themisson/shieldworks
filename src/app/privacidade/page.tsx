import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Política de privacidade do site ShieldWorks, com informações sobre dados coletados nos formulários e uso para retorno profissional."
};

const privacySections = [
  {
    title: "Dados coletados",
    description:
      "O formulário de contato pode coletar nome, e-mail, telefone/WhatsApp, instituição, área de interesse e mensagem. O formulário de feedback pode coletar nome e e-mail opcionais, nota, comentário e área de interesse."
  },
  {
    title: "Finalidade do contato",
    description:
      "Os dados são utilizados para compreender a demanda enviada, responder solicitações profissionais, tratar assuntos técnicos, acadêmicos ou institucionais, analisar o contexto informado e organizar o retorno adequado."
  },
  {
    title: "Uso dos dados",
    description:
      "As informações são usadas apenas para retorno profissional, análise de demanda e melhoria da experiência do site. A ShieldWorks não vende, aluga ou comercializa dados pessoais."
  },
  {
    title: "Provedores técnicos",
    description:
      "O site pode utilizar provedores técnicos necessários ao funcionamento da aplicação, como Vercel para hospedagem, analytics e infraestrutura, e Resend para envio de mensagens por e-mail. Esses serviços podem processar dados estritamente necessários à operação técnica."
  },
  {
    title: "Solicitação de exclusão",
    description:
      "Nos termos da Lei Geral de Proteção de Dados Pessoais (LGPD), o titular pode solicitar correção ou exclusão de dados enviados pelo site usando o próprio formulário de contato ou o canal profissional informado pela ShieldWorks."
  },
  {
    title: "Analytics e melhorias",
    description:
      "O site pode utilizar analytics para compreender uso, desempenho e navegação. A coleta deve ser limitada a métricas de acesso e melhoria da experiência, sem registrar conteúdos sensíveis enviados pelos formulários."
  }
];

export default function PrivacidadePage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Privacidade"
          title="Política de privacidade"
          description="Informações simples sobre os dados coletados pelo site ShieldWorks e sua finalidade de uso."
        />
        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm leading-7 text-slate-700">
            Esta política se aplica aos dados enviados voluntariamente pelos formulários do site. O objetivo é manter
            transparência sobre a coleta e o uso das informações necessárias para retorno profissional.
          </p>
          <p className="mt-4 text-xs font-medium text-slate-500">Última atualização: 11 de maio de 2026.</p>
        </div>
        <div className="mt-6 grid gap-4">
          {privacySections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold tracking-tight text-slate-950">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{section.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
