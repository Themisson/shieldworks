import Link from "next/link";
import Image from "next/image";
import { brand } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="ShieldWorks - inicio">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-petroleum-600/40 bg-petroleum-900 shadow-sm ring-1 ring-white/10 transition duration-300 group-hover:border-safety-500/60 group-hover:shadow-glow">
        <Image src="/icon.svg" alt="" width={40} height={40} className="h-full w-full" priority />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-base font-semibold tracking-tight text-graphite-900">
          {brand.name}
        </span>
        <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-graphite-500 sm:block">
          Engenharia · Tecnologia
        </span>
      </span>
    </Link>
  );
}
