import { notFound } from "next/navigation";
import { caseStudies } from "@/data/cases";
import { CaseStudyCard } from "@/components/case-study";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { translate } from "@/i18n/translations";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.id }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const study = caseStudies.find((item) => item.id === slug);
  if (!study) return {};
  return pageMetadata(
    `/cases/${slug}`,
    translate(study.title, locale),
    translate(study.summary, locale),
    locale,
  );
}
export default async function CasePage({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const study = caseStudies.find((item) => item.id === slug);
  if (!study) notFound();
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === "en" ? "Case studies" : "Cases", href: "/cases" },
          { label: translate(study.title, locale), href: `/cases/${slug}` },
        ]}
      />
      <header className="internal-hero">
        <p className="technical-label">
          {study.year} /{" "}
          {locale === "en" ? "DOCUMENTED CASE" : "CASE DOCUMENTADO"}
        </p>
        <h1>{translate(study.title, locale)}</h1>
      </header>
      <CaseStudyCard study={study} />
    </div>
  );
}
