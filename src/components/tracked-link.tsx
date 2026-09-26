"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Preserve conversion events without putting form data in analytics. */
export function TrackedLink({
  eventName,
  source,
  ...props
}: Omit<ComponentProps<typeof Link>, "onClick"> & {
  eventName?: AnalyticsEvent;
  source?: string;
}) {
  return (
    <Link
      {...props}
      onClick={() => {
        if (eventName) trackEvent(eventName, { source: source ?? "landing" });
      }}
    />
  );
}
