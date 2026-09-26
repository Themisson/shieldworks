import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import { routeLocale } from "@/lib/route-locale";
import { redirect } from "next/navigation";

const whatsappUrl = "https://wa.me/5582991547336";

export default function WhatsAppRedirectPage() {
  redirect(whatsappUrl);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/whatsapp",
    locale === "en" ? "WhatsApp contact" : "Contato por WhatsApp",
    locale === "en"
      ? "Contact ShieldWorks professionally through WhatsApp."
      : "Contato profissional da ShieldWorks por WhatsApp.",
    locale,
  );
}
