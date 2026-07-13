import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Política de privacidade do site ShieldWorks, com informações sobre dados coletados nos formulários e uso para retorno profissional.",
  alternates: {
    canonical: canonicalUrl("/privacidade")
  },
  openGraph: {
    title: "Privacidade | ShieldWorks",
    description:
      "Política de privacidade do site ShieldWorks, com informações sobre dados coletados nos formulários e uso para retorno profissional.",
    url: canonicalUrl("/privacidade"),
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
    title: "Privacidade | ShieldWorks",
    description:
      "Política de privacidade do site ShieldWorks, com informações sobre dados coletados nos formulários e uso para retorno profissional.",
    images: ["/og-image.png"]
  }
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
    <section className="page-hero">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="section-shell relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <Reveal immediate>
            <SectionTitle
              title="Política de privacidade"
              description="Informações simples sobre os dados coletados pelo site ShieldWorks e sua finalidade de uso."
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="panel-muted mt-10 p-6 sm:p-7">
              <p className="text-sm leading-7 text-graphite-700">
                Esta política se aplica aos dados enviados voluntariamente pelos formulários do site. O objetivo é
                manter transparência sobre a coleta e o uso das informações necessárias para retorno profissional.
              </p>
              <p className="mt-4 font-mono text-[11px] font-medium tracking-wide text-graphite-500">
                Última atualização: 11 de maio de 2026.
              </p>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-3">
            {privacySections.map((section, index) => (
              <Reveal key={section.title} delay={index * 40}>
                <article className="panel p-5 sm:p-6">
                  <h2 className="text-base font-semibold tracking-tight text-graphite-900">{section.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-graphite-600">{section.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
