import { Landing } from "@/components/landing/landing";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/",
    locale === "en"
      ? "Engineering, research and software"
      : "Engenharia, pesquisa e software",
    locale === "en"
      ? "ShieldWorks connects computational engineering, applied research, software and operational safety to real-world problems."
      : "ShieldWorks conecta engenharia computacional, pesquisa aplicada, software e segurança operacional a problemas reais.",
    locale,
  );
}
export default async function Home({ params }: Props) {
  return <Landing locale={await routeLocale(params)} />;
}
