import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { brand } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="ShieldWorks - inicio">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-petroleum-900 text-white">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-semibold text-graphite-900">{brand.name}</span>
        <span className="hidden text-xs text-graphite-500 sm:block">{brand.tagline}</span>
      </span>
    </Link>
  );
}
