"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "cta_contact_click"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error"
  | "feedback_form_submit"
  | "feedback_form_success"
  | "feedback_form_error"
  | "nav_contact_click";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, string | number | boolean>) {
  try {
    track(event, data);
  } catch {
    // Analytics must never break UX
  }
}
