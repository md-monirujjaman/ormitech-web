// Event helpers for the marketing site. Every event goes through `trackEvent`, which:
//   - does nothing outside production builds (development and test never send data),
//   - does nothing until the visitor has accepted analytics cookies (see lib/consent.js),
//   - strips parameters that could carry personal data before they reach gtag.
//
// Callers must only fire an event after the real action succeeded (for example after the API accepted a
// form), never on a click alone.

import { readConsent } from "@/lib/consent";

export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production";

// Event names used by the site. The full specification is in docs/analytics-tracking.md.
export const EVENTS = {
  OUTBOUND_CLICK: "outbound_click",
  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  GENERATE_LEAD: "generate_lead",
  VIEW_PRICING: "view_pricing",
  SELECT_PLAN: "select_plan"
};

const PARAM_NAME = /^[a-z][a-z0-9_]{0,39}$/;
// Keys that must never be sent, even if a future caller passes them by mistake.
const BLOCKED_PARAM = /email|phone|mobile|password|otp|token|secret|message|address|card|iban|account/;
const MAX_STRING_LENGTH = 100;

export function canTrackAnalytics() {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return false;
  return readConsent()?.analytics === true;
}

function cleanParams(params) {
  const clean = {};
  for (const [key, value] of Object.entries(params || {})) {
    if (!PARAM_NAME.test(key) || BLOCKED_PARAM.test(key)) continue;
    if (typeof value === "number" && Number.isFinite(value)) {
      clean[key] = value;
    } else if (typeof value === "boolean") {
      clean[key] = value;
    } else if (typeof value === "string" && value && !value.includes("@")) {
      clean[key] = value.slice(0, MAX_STRING_LENGTH);
    }
  }
  return clean;
}

// gtag.js loads after the visitor accepts, so an event can be requested before it exists (for example a pricing
// view on a first visit). Such events wait in a short queue and are sent when GoogleAnalytics signals ready.
export const ANALYTICS_READY_EVENT = "ormitech:analytics-ready";
const MAX_QUEUED = 20;
const queue = [];
let ready = false;

function flushQueue() {
  ready = true;
  if (typeof window.gtag !== "function") return;
  while (queue.length) {
    const [name, params] = queue.shift();
    window.gtag("event", name, params);
  }
}

if (typeof window !== "undefined") {
  window.addEventListener(ANALYTICS_READY_EVENT, flushQueue);
}

/** Sends one GA4 event when allowed. Returns true when the event was sent or queued for sending. */
export function trackEvent(name, params = {}) {
  if (!canTrackAnalytics()) return false;
  const clean = cleanParams(params);
  if (!ready || typeof window.gtag !== "function") {
    if (queue.length >= MAX_QUEUED) return false;
    queue.push([name, clean]);
    return true;
  }
  window.gtag("event", name, clean);
  return true;
}
