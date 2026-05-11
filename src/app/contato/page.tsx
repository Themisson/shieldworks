import type { Metadata } from "next";
import { ContactForm, FeedbackForm } from "@/components/forms";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato profissional para demandas técnicas, acadêmicas, institucionais e digitais."
};

export default function ContatoPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Contato"
          title="Envie uma demanda técnica, acadêmica ou institucional."
          description="Os formulários estão prontos para integração futura com API, serviço de e-mail, banco de dados ou plataforma externa."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div>
            <FeedbackForm />
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 text-sm leading-6 text-graphite-600 shadow-sm">
              Para versões futuras, esta página pode ser integrada a e-mail profissional, CRM simples, banco de dados,
              automações de resposta e área restrita de sistemas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
