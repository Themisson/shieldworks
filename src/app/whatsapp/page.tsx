import { redirect } from "next/navigation";

const whatsappUrl = "https://wa.me/5582991547336";

export default function WhatsAppRedirectPage() {
  redirect(whatsappUrl);
}
