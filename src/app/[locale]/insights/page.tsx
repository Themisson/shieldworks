import { permanentRedirect } from "next/navigation";
import { routeLocale } from "@/lib/route-locale";
import { localizedPath } from "@/i18n/routing";

export default async function LegacyInsights({params}:{params:Promise<{locale:string}>}) {
  permanentRedirect(localizedPath("/conteudo",await routeLocale(params)));
}
