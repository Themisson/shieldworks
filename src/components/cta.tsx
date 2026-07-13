import { ButtonLink } from "@/components/button-link";

type CTAProps = {
  title?: string;
  description?: string;
  action?: string;
};

export function CTA({
  title = "Tem uma demanda técnica, acadêmica ou institucional que precisa se transformar em uma solução prática?",
  description = "A ShieldWorks foi estruturada para organizar demandas complexas em projetos objetivos, aplicáveis e bem documentados.",
  action = "Vamos conversar"
}: CTAProps) {
  return (
    <section className="border-t border-petroleum-700 bg-petroleum-900 py-14 text-white sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-petroleum-100">{description}</p>
        </div>
        <ButtonLink href="/contato" variant="secondary">
          {action}
        </ButtonLink>
      </div>
    </section>
  );
}
