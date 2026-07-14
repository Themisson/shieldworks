import { z } from "zod";

export const publicationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(8),
  year: z.number().int().gte(1990).lte(2100),
  venue: z.string().min(2),
  kind: z.enum(["artigo", "tese", "congresso", "periodico"]),
  authors: z.string().min(2),
  href: z.string().url(),
  highlight: z.boolean().optional()
});

export const caseStudySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(8),
  domain: z.string().min(2),
  year: z.string().min(2),
  type: z.enum(["pesquisa", "sistema", "consultoria"]),
  summary: z.string().min(20),
  context: z.string().min(20),
  problem: z.string().min(20),
  method: z
    .array(
      z.object({
        label: z.string().min(2),
        detail: z.string().min(8)
      })
    )
    .min(1),
  delivery: z.array(z.string().min(4)).min(1),
  impact: z.string().min(20),
  tags: z.array(z.string().min(1)).min(1),
  featured: z.boolean().optional()
});

export const insightSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(4),
  description: z.string().min(8),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().min(2),
  tags: z.array(z.string().min(1)).min(1),
  published: z.boolean(),
  content: z.array(z.string().min(8)).min(1)
});

export const publicationsSchema = z.array(publicationSchema).min(1);
export const caseStudiesSchema = z.array(caseStudySchema).min(1);
export const insightsSchema = z.array(insightSchema).min(1);
