# Analytics, Consent and Tracking (marketing site)

Scope: this repository only, the Next.js marketing site for www.ormitechit.com. The dashboard (app.ormitechit.com), API and docs are separate repositories and are not covered here.

Status date: 15 November 2026.

## 1. Infrastructure audit (before this change)

Checked against `origin/main` (commit `3afeb1c`), not against Cloudflare or any external dashboard.

| Item | Finding |
|---|---|
| Google Tag Manager | Not used. No GTM container ID exists in code or `.env.example`. |
| GA4 | Measurement ID `G-HFH88XV2FG` (fallback in `src/data/site.js`, also in `.env.example`). Loaded with a direct `gtag.js` snippet in `src/components/analytics/GoogleAnalytics.jsx`. |
| GA4 initialization | Loaded on every page with `afterInteractive`, unconditionally, in development too. Page view sent by `gtag('config')`. |
| SPA page views | `AnalyticsPageview.jsx` sends `gtag('config')` on route change. First render skipped so the initial page view is not counted twice. |
| dataLayer / custom events | None. No custom events were sent. |
| Consent | No consent UI and no Google Consent Mode. The legal copy in `src/data/legalPolicies.js` said so. |
| Cloudflare | Cloudflare sits in front of the site (per the earlier technology report). No code references Cloudflare. Cloudflare Browser Insights is not configured in code, so nothing was changed for it. |
| Advertising pixels | None (no Meta, Google Ads, LinkedIn or Clarity code). |
| Error monitoring | None (no Sentry). |
| Chat widget | `layout.jsx` loads OrmiTech's own chat widget script from `api.ormitechit.com` on non-storefront pages. Not analytics; not changed. |
| Environment separation | None. GA loaded in every environment. |
| Duplicate scripts | None found. GA is initialized once. |
| SEO | `robots.js`, `sitemap.js`, JSON-LD and `metadataBase` exist. Not changed. |

## 2. What changed

| Area | File | Change |
|---|---|---|
| Consent state | `src/lib/consent.js` | First-party cookie `ormitech_consent` holding `{v, analytics, ts}` only. Six-month expiry. Consent-change events within the tab. |
| Consent banner | `src/components/analytics/CookieConsent.jsx` | "Essential only" and "Accept analytics" buttons with equal weight. Shown until a choice is saved. Mounted in `src/app/layout.jsx`. |
| Withdrawal | `src/components/common/CookieSettingsButton.jsx`, `Footer.jsx` | "Cookie settings" button in the footer reopens the banner. |
| GA4 loader | `src/components/analytics/GoogleAnalytics.jsx` | Renders nothing until analytics is accepted. Then loads `gtag.js`, with Consent Mode v2 defaults set to denied and updated to granted. Withdrawal sets `ga-disable-<ID>` and updates consent to denied. |
| Event helper | `src/lib/analytics.js` | `trackEvent` only sends in production, only with consent, strips unsafe parameters, and queues events requested before gtag exists. |
| Outbound clicks | `src/components/analytics/OutboundClicks.jsx` | `outbound_click` with host name only. |
| Page-level event | `src/components/analytics/TrackOnMount.jsx` | Sends one event per page view. Used for `view_pricing`. |
| Pricing plans | `src/components/pricing/PricingPlans.jsx` | `select_plan` on plan CTA click. |
| Contact form | `src/components/sections/Contact.jsx` | `form_start`, `form_submit`, `generate_lead`. |
| Legal copy | `src/data/legalPolicies.js` | Section 7 and the Google Analytics sentence in section 5 now describe the banner and consent behavior. |
| Env docs | `.env.example` | Comments on GA behavior, plus commented-out placeholders for future IDs. No values added. |

No new npm dependencies were added.

## 3. Consent architecture

1. First visit: no `gtag.js` request. The banner is shown. `dataLayer` stays empty.
2. "Accept analytics": cookie written, `CONSENT_CHANGE_EVENT` dispatched. `GoogleAnalytics` loads `gtag.js`. Init script sets `consent default` (denied) and `consent update` (analytics_storage granted), then `config`, then signals ready. Queued events (for example `view_pricing`) are sent.
3. "Essential only": cookie written with `analytics: false`. Nothing loads.
4. Footer "Cookie settings": banner reopens. Choosing "Essential only" after acceptance sets `ga-disable-G-HFH88XV2FG = true`, sends `consent update` (denied), and stops `trackEvent` from sending. Already-loaded `gtag.js` stays in memory until page reload but sends nothing.
5. Advertising storage stays denied. No advertising vendor is installed, so there is no advertising category in the banner yet.

Environment rule: `ANALYTICS_ENABLED = process.env.NODE_ENV === "production"`. `next dev` and `next start` on a development build send nothing. Production builds only.

## 4. Event specification

Only fired after the real action has happened. Parameters never include names, email addresses, phone numbers, message text, tokens, or full URLs.

| Event | Trigger | Parameters | Status |
|---|---|---|---|
| `page_view` | Initial load after consent; route change (SPA) | page path, query string | Implemented. Verified in browser (initial load). Route-change path not separately tested. |
| `outbound_click` | Click on a link to another host | `link_domain` | Implemented. Verified in browser (plan CTA to app host). |
| `view_pricing` | Pricing page viewed (once per page view) | none | Implemented. Verified in browser: queued on first visit, sent after accept. |
| `select_plan` | Click on a pricing plan CTA | `item_id` (plan id), `item_name`, `billing_period` | Implemented. Verified in browser. |
| `form_start` | First interaction with the contact form until a successful submit | `form_name=contact` | Implemented. Verified in browser. |
| `form_submit` | Contact API accepted the message | `form_name=contact`, `topic` | Implemented. Verified in browser (local API). |
| `generate_lead` | Contact API reports `delivered: true` (webhook configured and accepted it) | `form_name=contact`, `topic` | Implemented. Not verified: local test had no `CONTACT_WEBHOOK_URL`, so it correctly did not fire. |

Not implemented in this repository, with reasons:

| Event | Reason |
|---|---|
| `sign_up`, `login`, `logout`, `trial_started`, `subscription_*`, `payment_failed`, `contact_sales` | Accounts and subscriptions live in the client app (app.ormitechit.com). Implement in that repository. `contact_sales` is an intent click, not a completed action, so it is intentionally not sent. |
| `chatbot_created`, `channel_connected`, `integration_connected`, `conversation_started`, `lead_created`, `order_created`, `purchase` | Happen in the dashboard or API, not on this site. Purchase tracking also requires verified payment, which this site does not process. Server-side confirmation is needed. |
| `scroll`, `click`, `file_download` | Covered by GA4 Enhanced Measurement, which is a GA4 property setting (see section 8). Adding custom versions here would duplicate them. |
| `form_start` on the other forms | Only the contact form was found on this site. The storefront "Buy Now" form on `/p/...` was not changed. |

## 5. Environment variables

| Variable | Used by code | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Public. Falls back to `G-HFH88XV2FG`. |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_DOCS_URL`, `NEXT_PUBLIC_API_URL` | Yes | Unchanged. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | Unchanged. |
| `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_SENTRY_DSN` | No | Commented placeholders in `.env.example`. Not read by code yet. |
| `META_CONVERSIONS_API_TOKEN`, `SENTRY_AUTH_TOKEN` | No | Server-only secrets. Must never use a `NEXT_PUBLIC_` prefix. Not configured. |

Set real values in the hosting platform's environment settings, not in a committed file.

## 6. Verification performed (15 Nov 2026)

Environment: `npm run build` then `next start` on port 3100 (production build), Browser pane.

| Check | Result |
|---|---|
| `npm run lint` | Passed (same as baseline). |
| `npm run build` | Passed. Baseline build also passed before the change. |
| Served HTML has no `gtag/js` script before consent | Confirmed with `curl` on `/` (0 matches). |
| First visit: banner shown, no GA script, empty `dataLayer` | Confirmed. |
| Accept analytics: `gtag.js` requested, consent default denied then update granted, `config`, queued `view_pricing` sent | Confirmed in `dataLayer`. |
| Plan CTA click after acceptance sends `select_plan` and `outbound_click` | Confirmed. Navigation was blocked in the test so the page did not leave. |
| Essential only after acceptance: `ga-disable` flag set, consent denied, later events not sent | Confirmed. |
| Contact form: `form_start` on focus, `form_submit` on accepted submit, no `generate_lead` without webhook | Confirmed. |
| Mobile (375px): banner layout | Confirmed by screenshot. |
| Browser console `403` errors | One `403` per page load, from OrmiTech's own chat widget (`GET https://api.ormitechit.com/api/v1/public/chat/config/...`). The API answers 403 "This chat widget is not enabled for this website" for an `Origin` of `localhost`. It returns 200 for `https://www.ormitechit.com`. The same 403 occurs on an untouched `origin/main` build, so it is pre-existing and not caused by the analytics change. Not GA. See section 9. |
| Browser console `net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin` | Seen once in a long test session, not reproduced in three later page loads and one SPA navigation. Source not identified. Unresolved. |
| Consent withdrawal (clean run, 15 Nov) | After "Essential only", no `/g/collect` requests were recorded for a plan click or full-page scroll, and no new `dataLayer` event entries were added. Reload with withdrawn consent: no banner, no `gtag` script, no collect requests. |

Not verified (needs real accounts or a deployed environment):
- Data appearing in GA4 DebugView or Realtime reports. Requires access to the GA4 property.
- Google Tag Assistant / GTM Preview. No GTM container exists.
- Google Search Console verification. Requires login.
- Cross-browser behavior (Safari, Firefox) and ad-blocker behavior.
- Behavior after a real deployment (Cloudflare caching of the HTML that contains consent state).

## 7. Deployment notes

- Changes are in branch `feat/tracking-consent` in a git worktree at `ormitech-web-track`. They are **not committed or pushed**.
- No DNS, Cloudflare, or nameserver change was made.
- The app stays on Next.js. No architecture change.
- After deploying, check that the GA4 property still receives `page_view` after accepting and receives nothing after choosing "Essential only".
- Consent is read in the browser, so the server-rendered HTML is the same for every visitor and cacheable. Do not add a server-side GA snippet that depends on the cookie without rechecking cache rules.

## 8. Human actions and pending work

| Integration | Implementation status | Verification status | Account status | Human action | Remaining work |
|---|---|---|---|---|---|
| Consent banner + Consent Mode v2 | Implemented | Browser-verified (local production build) | Not applicable | Review banner wording and legal copy with counsel. Decide whether a region-specific banner is needed. | Counsel review. Decide scope (all visitors vs regional). |
| Google Analytics 4 | Implemented (consent-gated) | Browser-verified locally; not verified in GA4 | Existing property `G-HFH88XV2FG`; access not checked | Log into analytics.google.com. Confirm Enhanced Measurement settings (outbound clicks and scroll may duplicate custom events, so pick one source). Mark `generate_lead` and `form_submit` as key events. Enable internal traffic filter. Check data retention and Google Signals settings. | Create GA4 key events. Verify DebugView after deployment. |
| Google Tag Manager | Not implemented | Not applicable | No container exists | Create a GTM container (Google login, human only). Give the container ID. | Decide whether to migrate GA4 into GTM. If yes, remove direct `gtag.js` to avoid two GA4 tags. |
| Google Search Console | Not changed | Not verified | Not checked (requires login) | Log into search.google.com/search-console. Check ownership. If DNS TXT verification is needed, the record name and value will be given and you add it in Cloudflare yourself. | Sitemap and indexing review after login. |
| Google Ads conversion tracking | Not implemented | Not applicable | Not checked | Log into ads.google.com. Create conversion actions for `generate_lead` (and `form_submit` if wanted). Enhanced conversions only after consent review. No campaign spend without approval. | Mapping the conversion to GA4 or direct tag. |
| Microsoft Clarity | Not implemented | Not applicable | Account not checked | Create the Clarity project (human only). Give the project ID. Masking of inputs must be confirmed. | Loader gated by analytics consent, with masking. |
| Meta Pixel + Conversions API | Not implemented | Not applicable | Business Manager not checked | Create or confirm Business Manager and the Pixel (human only). Give the Pixel ID. Generate a CAPI token only in Business Manager and store it as a server-only secret. | Pixel loader gated by consent. CAPI needs a server route with event ID deduplication. |
| LinkedIn Insight Tag | Not implemented (optional) | Not applicable | Campaign Manager not checked | Optional. Create the Insight Tag only if LinkedIn ads are planned. | Loader gated by consent. |
| Sentry (free plan) | Not implemented | Not applicable | Account not checked | Create a Sentry account (human only). Give the DSN. Confirm the free plan's limits. | Install `@sentry/nextjs`, configure source maps and a data filter. |
| Cloudflare Browser Insights | Not changed | Not verified | Not applicable | None. Leave as is. | None. |

Blocked by human action:
- Anything that needs an account login, password, OTP, or agreement to terms. This includes GTM, Clarity, Meta, LinkedIn, Google Ads, Search Console, Sentry and the GA4 settings above.

Recommended next steps (in order):
1. Review and approve this change (consent wording and legal copy).
2. Deploy to staging or production and check the GA4 behavior described in section 7.
3. Decide on GTM. Create the container if wanted.
4. Set up Sentry (free) and Clarity (free) in the same pass; both only need an ID or DSN.
5. Add Meta Pixel and Conversions API only if paid ads are planned.

## 9. Local console 403 investigation (15 Nov 2026)

- Evidence: a single `/faq` load in a fresh tab shows one `403` and one warning `[OrmiTech chat] This chat widget is not enabled for this website`. Each page load adds one. The earlier four errors were four page loads in the same tab.
- Source: the browser's resource list shows only two cross-origin requests from the page: `api.ormitechit.com/api/v1/public/chat/widget.js` and `.../chat/config/wk_qtW3TW8WoEijkWotWme6alyH`. The config request returns 403 in the browser. Run from the terminal with `Origin: http://localhost:3100` or `Origin: http://127.0.0.1:3100`, it also returns 403. With `Origin: https://www.ormitechit.com`, it returns 200.
- Not caused by this change: the widget `<Script>` in `layout.jsx` is unchanged. The same 403 and warning appear on an untouched `origin/main` build served on another port.
- Not GA: the failing requests are to the chat API. Analytics requests were not in that set.
- Impact: development and local builds only. Production origin `www.ormitechit.com` gets 200 from the widget config endpoint.
- Unresolved: one `net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin` console error appeared once. It was not reproduced and its URL was not exposed by the browser tooling.
- Note on Enhanced Measurement: GA's own `scroll` event was seen in a consented run (`ae=a`, `gcs=G101`, analytics granted). It is a GA property setting, not sent by this code.
