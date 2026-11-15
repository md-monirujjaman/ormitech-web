// URL sanitising for Google Analytics. Every page URL, page path, page title and referrer that the site hands to
// gtag goes through these helpers, so private path tokens and query values are never sent to Google.
//
// Rules (details in docs/analytics-tracking.md):
//   - Private routes: any path under a prefix in PRIVATE_PREFIXES has its token replaced by "[token]".
//     "/p/abc123" becomes "/p/[token]". These routes are also excluded from page views and custom events.
//   - Query string: only the utm_* campaign keys are kept. Every other key is dropped, including unknown keys.
//   - Hash fragment: always dropped.
//   - Page title: a generic label on private routes, because product and draft titles contain business names.
//   - Referrer: same-site referrers are sanitised like page URLs. Other sites are reduced to their origin.

const PRIVATE_PREFIXES = ["/blog/preview/", "/p/"];
const ALLOWED_QUERY_KEYS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);
const MAX_QUERY_VALUE_LENGTH = 100;
export const PRIVATE_PAGE_TITLE = "Private page";

function privatePrefix(pathname) {
  return PRIVATE_PREFIXES.find(prefix => pathname.startsWith(prefix)) || null;
}

/** True for routes whose address is a secret token (draft previews and customer product links). */
export function isPrivatePath(pathname) {
  return privatePrefix(pathname) !== null;
}

export function sanitizePath(pathname) {
  const prefix = privatePrefix(pathname);
  return prefix ? `${prefix}[token]` : pathname;
}

function sanitizeSearch(search) {
  const params = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const [key, value] of params) {
    if (!ALLOWED_QUERY_KEYS.has(key) || value.includes("@")) continue;
    kept.append(key, value.slice(0, MAX_QUERY_VALUE_LENGTH));
  }
  const text = kept.toString();
  return text ? `?${text}` : "";
}

/** Sanitised absolute URL for an address on this site: origin, safe path, allowed query, no hash. */
export function sanitizeUrl(href) {
  const url = new URL(href, window.location.origin);
  return `${url.origin}${sanitizePath(url.pathname)}${sanitizeSearch(url.search)}`;
}

/** Sanitised referrer, or null when there is none. Other sites are reduced to their origin. */
export function sanitizeReferrer(referrer) {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    if (url.origin === window.location.origin) return sanitizeUrl(url.href);
    return `${url.origin}/`;
  } catch {
    return null;
  }
}

/** Page fields for the current browser location. Safe to send to gtag on any route. */
export function currentPageContext() {
  const page_location = sanitizeUrl(window.location.href);
  const sanitized = new URL(page_location);
  const private_ = isPrivatePath(window.location.pathname);
  return {
    page_location,
    page_path: `${sanitized.pathname}${sanitized.search}`,
    page_title: private_ ? PRIVATE_PAGE_TITLE : document.title,
    private: private_
  };
}

let historyGuardInstalled = false;

/**
 * Keeps the sanitised page_location and page_referrer up to date on every history change (Next.js navigation,
 * history.pushState/replaceState, back and forward). Installed once, after gtag is available, so this wrapper runs
 * before GA's own history listener. This is best effort: GA's Enhanced Measurement history page_view may still send
 * its own values, which is why the property setting is listed in docs/analytics-tracking.md.
 */
export function installHistoryGuard() {
  if (historyGuardInstalled || typeof window === "undefined") return;
  historyGuardInstalled = true;

  let lastSafe = sanitizeUrl(window.location.href);
  // Never throws: a failure here must not break navigation. A same-URL change (for example a replaceState that only
  // updates history state) keeps the previous referrer instead of making the page its own referrer.
  const sync = href => {
    try {
      const next = sanitizeUrl(new URL(href, window.location.href).href);
      if (next === lastSafe) return;
      if (typeof window.gtag === "function") {
        window.gtag("set", { page_location: next, page_referrer: lastSafe });
      }
      lastSafe = next;
    } catch {
      // Unparseable address: leave the globals as they are.
    }
  };

  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function guardedHistory(state, title, url) {
      if (url != null) sync(String(url));
      return original.apply(this, arguments);
    };
  }
  window.addEventListener("popstate", () => sync(window.location.href), true);
}
