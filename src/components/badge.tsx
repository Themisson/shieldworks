import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md border border-safety-100 bg-safety-50 px-3 py-1.5 text-left text-xs font-semibold leading-5 text-safety-700 shadow-sm break-words">
      {children}
    </span>
  );
}
