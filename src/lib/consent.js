// Cookie consent state for the marketing site.
//
// The choice is stored in a first-party cookie (`ormitech_consent`) holding only the category flags and a
// timestamp, never personal data. Reads and writes are wrapped in try/catch because cookies can be blocked.

export const CONSENT_COOKIE = "ormitech_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 182; // about six months, then the banner asks again

export const CONSENT_CHANGE_EVENT = "ormitech:consent-change";
export const CONSENT_OPEN_EVENT = "ormitech:consent-open";

/** Returns { analytics: boolean } for a stored choice, or null when the visitor has not chosen yet. */
export function readConsent() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)ormitech_consent=([^;]*)/);
    if (!match) return null;
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    if (parsed?.v !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null;
    return { analytics: parsed.analytics };
  } catch {
    return null;
  }
}

/** Saves a choice and tells listeners (GA loader, pageview tracking, banner) right away. */
export function writeConsent({ analytics }) {
  const granted = Boolean(analytics);
  try {
    const value = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION, analytics: granted, ts: Date.now() }));
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookies blocked: the choice still applies for this page view through the event below.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { analytics: granted } }));
}

/** Subscribes to consent changes made in this tab. Returns an unsubscribe function. */
export function onConsentChange(listener) {
  const handler = event => listener({ analytics: Boolean(event.detail?.analytics) });
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}

/** Asks the banner to open again (used by the footer "Cookie settings" button). */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
