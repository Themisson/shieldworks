import type { Metadata } from "next";
import { ContactForm, FeedbackForm } from "@/components/forms";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato profissional para demandas tecnicas, academicas, institucionais e digitais."
};

export default function ContatoPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Contato"
          title="Envie uma demanda tecnica, academica ou institucional."
          description="Os formularios estao prontos para integracao futura com API, servico de e-mail, banco de dados ou plataforma externa."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div>
            <FeedbackForm />
            <div className="mt-6 rounded-lg border border-graphite-100 p-6 text-sm leading-6 text-graphite-600">
              Para versoes futuras, esta pagina pode ser integrada a e-mail profissional, CRM simples, banco de dados,
              automacoes de resposta e area restrita de sistemas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
