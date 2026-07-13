import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-petroleum-100 bg-white/80 px-3.5 py-1.5 text-left text-xs font-medium leading-5 text-petroleum-800 shadow-sm backdrop-blur-sm break-words">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  );
}
