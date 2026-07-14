import { caseStudies } from "@/data/cases";
import { insights } from "@/data/insights";
import { featuredPublications } from "@/data/publications";
import { caseStudiesSchema, insightsSchema, publicationsSchema } from "@/lib/data-schemas";

export function validateStaticData() {
  const publications = publicationsSchema.safeParse(featuredPublications);
  const cases = caseStudiesSchema.safeParse(caseStudies);
  const posts = insightsSchema.safeParse(insights);

  const errors: string[] = [];

  if (!publications.success) {
    errors.push(`publications: ${publications.error.message}`);
  }

  if (!cases.success) {
    errors.push(`cases: ${cases.error.message}`);
  }

  if (!posts.success) {
    errors.push(`insights: ${posts.error.message}`);
  }

  return {
    ok: errors.length === 0,
    errors
  };
}
