import { permanentRedirect, notFound } from "next/navigation";
import { routeLocale } from "@/lib/route-locale";
import { localizedPath } from "@/i18n/routing";
import { getArticles, getArticle } from "@/lib/editorial";

export function generateStaticParams(){return getArticles("pt").map(article=>({slug:article.slug}));}
export const dynamicParams=false;
export default async function LegacyInsight({params}:{params:Promise<{locale:string;slug:string}>}) {
  const locale=await routeLocale(params), {slug}=await params;
  if(!getArticle(slug,locale))notFound();
  permanentRedirect(localizedPath(`/conteudo/${slug}`,locale));
}
