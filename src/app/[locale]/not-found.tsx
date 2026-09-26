import { Text } from "@/i18n/locale-provider";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="section-shell max-w-2xl text-center">
        <p className="eyebrow">
          <Text>{"Erro 404"}</Text>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
          <Text>{"Página não encontrada"}</Text>
        </h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-base leading-7 text-graphite-600">
          <Text>
            {
              "O endereço acessado não existe ou foi removido. Verifique o link ou navegue para uma das páginas abaixo."
            }
          </Text>
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <Text>{"Voltar para o início"}</Text>
          </ButtonLink>
          <ButtonLink href="/contato" variant="secondary">
            <Text>{"Entrar em contato"}</Text>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
