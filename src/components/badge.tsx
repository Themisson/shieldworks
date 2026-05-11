import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md border border-petroleum-100 bg-petroleum-50 px-3 py-1.5 text-left text-xs font-medium leading-5 text-petroleum-900 shadow-sm break-words">
      {children}
    </span>
  );
}
