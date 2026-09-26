import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";

export async function routeLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
