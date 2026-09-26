import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Compatibility with V1 call sites; content is always visible in V2. */
  delay?: number;
  immediate?: boolean;
};

export function Reveal({children,className=""}:RevealProps) {
  return <div className={`reveal is-visible ${className}`.trim()}>{children}</div>;
}
