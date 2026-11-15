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
| GA4 loader | `src/components/analytics/GoogleAnalytics.jsx` | Renders nothing until analytics is accepted, and never starts on a private route (`/p/...`, `/blog/preview/...`). Then loads `gtag.js`, with Consent Mode v2 defaults set to denied and updated to granted. Sends the first page view by hand with a sanitised URL (`send_page_view: false`). Withdrawal sets `ga-disable-<ID>` and updates consent to denied. |
| Tag Manager loader | `src/components/analytics/TagManager.jsx` | Loads `gtm.js` for container `GTM-NNKKSCVF` (`src/data/site.js`, overridable with `NEXT_PUBLIC_GTM_ID`) only after GA4 has started, so only after accepted consent on a public page. The container has no tags yet. Does not send analytics by itself. |
| URL sanitising | `src/lib/analytics-url.js` | Single place for page URL, path, title and referrer rules (section 4b). Also installs a history guard that updates the sanitised `page_location` on each navigation. |
| SPA page views | `src/components/analytics/AnalyticsPageview.jsx` | One sanitised `page_view` per client-side route change, consent-gated. Replaces the earlier `config` call with `page_path`. |
| Event helper | `src/lib/analytics.js` | `trackEvent` only sends in production, only with consent, never on private routes, strips unsafe parameters, and queues events requested before gtag exists. |
| Outbound clicks | `src/components/analytics/OutboundClicks.jsx` | Our `outbound_click` event with host name only. GA4 Enhanced Measurement may send its own outbound click event too (section 4b). |
| Page-level event | `src/components/analytics/TrackOnMount.jsx` | Sends one event per page view. Used for `view_pricing`. |
| Pricing plans | `src/components/pricing/PricingPlans.jsx` | `select_plan` on plan CTA click. |
| Contact form | `src/components/sections/Contact.jsx` | `form_start`, `form_submit`, `generate_lead`. |
| Legal copy | `src/data/legalPolicies.js` | Section 7 and the Google Analytics sentence in section 5 now describe the banner and consent behavior. |
| Env docs | `.env.example` | Comments on GA behavior, plus commented-out placeholders for future IDs. No values added. |

No new npm dependencies were added.

## 3. Consent architecture

1. First visit: no `gtag.js` request. The banner is shown. `dataLayer` stays empty.
2. "Accept analytics": cookie written, `CONSENT_CHANGE_EVENT` dispatched. `GoogleAnalytics` loads `gtag.js` (unless the current page is a private route, in which case it waits for the next public page). Init script sets `consent default` (denied) and `consent update` (analytics_storage granted), sets the sanitised `page_location` and `page_referrer`, configures GA with `send_page_view: false`, sends one sanitised `page_view`, then signals ready. Queued events (for example `view_pricing`) are sent.
3. "Essential only": cookie written with `analytics: false`. Nothing loads.
4. Footer "Cookie settings": banner reopens. Choosing "Essential only" after acceptance sets `ga-disable-G-HFH88XV2FG = true`, sends `consent update` (denied), and stops `trackEvent` from sending. Already-loaded `gtag.js` stays in memory until page reload but sends nothing.
5. Advertising storage stays denied. No advertising vendor is installed, so there is no advertising category in the banner yet.

Environment rule: `ANALYTICS_ENABLED = process.env.NODE_ENV === "production"`. `next dev` and `next start` on a development build send nothing. Production builds only.

## 4. Event specification

Only fired after the real action has happened. Parameters never include names, email addresses, phone numbers, message text, tokens, or URLs with private path segments or non-campaign query values (see section 4b).

| Event | Trigger | Parameters | Status |
|---|---|---|---|
| `page_view` | Initial load after consent; route change (SPA). Not sent on private routes. | `page_location`, `page_path`, `page_title`, `page_referrer`, all sanitised (section 4b) | Implemented. Verified in browser: initial load, SPA navigation, private-to-public full navigation (network payloads inspected). |
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
| `scroll`, `click`, `file_download` | Sent by GA4 Enhanced Measurement if that setting is on for the property (section 8). Not sent by this code. No custom versions were added here. |
| `form_start` on the other forms | Only the contact form was found on this site. The storefront "Buy Now" form on `/p/...` was not changed. |

## 4b. URL sanitisation and Enhanced Measurement limits

Implemented in `src/lib/analytics-url.js`. Applied to every page URL, path, title and referrer the site gives to gtag.

| Part of the address | Rule |
|---|---|
| Private routes | `/p/<token>` (a business customer's product link) and `/blog/preview/<token>` (a draft). GA never starts on these routes on a full load, so they get no `page_view` and no custom events. |
| Path token (if a private route is reached) | Replaced by `[token]`: `/p/abc123` becomes `/p/[token]`. |
| Query string | Only `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` are kept (values up to 100 characters; values containing `@` are dropped). Every other key is dropped, for example `ref`, `token`, `email`, `topic`. |
| Hash fragment | Always dropped. |
| `page_title` on private routes | `Private page`. Product and business names in `/p/` titles are not sent. |
| `page_referrer` | Same-site referrer: sanitised like a page URL. Other site: origin only, no path or query. |
| Page view | `send_page_view: false`. One sanitised `page_view` on load (after consent) and one per client-side navigation. |
| Global fields | `page_location` and `page_referrer` are set with `gtag('set')` at load and on each history change, so custom events use the sanitised URL. |

Intentionally excluded: all non-campaign query values, hash fragments, path tokens, product and business names in page titles, and any text typed into the site.

### Enhanced Measurement (GA4 property setting)

Enhanced Measurement runs inside gtag.js and sends its own events. It is a property setting, not code. Status:

| Setting | State | Evidence |
|---|---|---|
| Page changes based on browser history events | **Off** (owner reports it was turned off, 15 Nov 2026; not checked in GA4 admin by the agent) | Test 6c: no GA history `page_view` on SPA navigation or raw `history.pushState`. Before the change (test 6b) it sent a second `page_view` per navigation and raw `dl`/`dr` values. |
| Outbound clicks | **Off** (owner report; same caveat) | Test 6c: only our `outbound_click` on outbound links. No `click` event with `link_url`. |
| Scroll | Not reported | Scroll events (on the earlier build) carried a sanitised `page_location`. Leave on or off as preferred. |
| File downloads | Not reported | Not tested. |

If the history setting is turned back on, the duplicate `page_view` and raw URL behavior in section 6b returns. Code cannot prevent it. The history guard in `installHistoryGuard` sets sanitised globals, but in the 6b tests GA's own history hit ignored them.

Our custom `outbound_click` is the only outbound-click event from this code. `select_plan` is sent on plan CTA clicks as well. It is a separate event, not an outbound-click event.

### Batching note for tests

GA sends several hits in one POST: the URL holds shared parameters, and each line of the body is one hit. Counting only requests undercounts hits. The 6c results count each body line as one hit.

### How token leakage was tested

Tests used a local harness outside the repository (not committed). It starts the production build in headless Chrome for Testing, hooks `navigator.sendBeacon` and `fetch` before the page loads to record every GA call with its URL and POST body, and checks each one for the strings `SECRET`, `TESTTOKEN123`, `person@example`, and fragment text. Results are in section 6.

Limit of the test: the `/p/` and `/blog/preview/` routes were tested with fake tokens, which return 404 but still render the layout that starts GA. A real token needs live API data, so a real private page render was not tested.

## 5. Environment variables

| Variable | Used by code | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Public. Falls back to `G-HFH88XV2FG`. |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_DOCS_URL`, `NEXT_PUBLIC_API_URL` | Yes | Unchanged. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | Unchanged. |
| `NEXT_PUBLIC_GTM_ID` | Yes | Public container ID. Defaults to `GTM-NNKKSCVF`. Loaded only after analytics consent. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_SENTRY_DSN` | No | Commented placeholders in `.env.example`. Not read by code yet. |
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

### 6c. URL sanitisation tests after Enhanced Measurement history and outbound clicks were turned off (15 Nov 2026)

Method: same as 6b (production build, headless Chrome for Testing, `sendBeacon` and `fetch` hooked before page scripts, every hit recorded with its URL and each POST body line). Cross-checked with CDP network events. The harness is local, outside the repository. Leak check on every hit: URL and body searched for `SECRET`, `TESTTOKEN`, `EMPROBE`, `person@`, `person%40`, `frag-`, `ref=`.

| Step | Result |
|---|---|
| S1: no consent, `/pricing?utm_source=newsletter&ref=SECRETREF&email=person@example.com#frag-SECRET` | 0 hits. No `gtag/js` request. |
| S2: accept analytics on that page | `page_view` with `dl=/pricing?utm_source=newsletter`, then queued `view_pricing`. Nothing else. |
| S3: SPA `/pricing` to `/faq` | 1 `page_view`: `dl=/faq`, `dr=/pricing?utm_source=newsletter`. |
| S4: SPA `/faq` to `/pricing` | 1 `page_view` (plus `view_pricing`). |
| S5: browser back (popstate) to `/faq` | 1 `page_view`. |
| S6: `/p/TESTTOKEN123?utm_campaign=spring&token=SECRETTOKEN#frag-SECRET` full load | 0 hits. No `gtag/js` request. `window.gtag` undefined. |
| S7: `/blog/preview/TESTTOKEN123?utm_source=x&key=SECRETTOKEN` full load | 0 hits. No `gtag/js` request. `window.gtag` undefined. |
| S8: from the preview page, full navigation to `/pricing?utm_source=newsletter&ref=SECRETREF2` | `page_view`: `dl=/pricing?utm_source=newsletter`, `dr=/blog/preview/[token]?utm_source=x`. Plus `view_pricing`. |
| S9: SPA `/pricing` to `/faq` | 1 `page_view`. |
| S10: raw `history.pushState` to `/p/EMPROBE123?utm_campaign=emprobe&token=SECRETEM` (not an app flow) | 0 hits. Previously this sent the raw token in `dl` (6b). |
| S11: navbar "Get started" (app host) | `outbound_click`, `link_domain=app.ormitechit.com`. No EM `click`. |
| S11b: plan card "Get started free" (app host) | `outbound_click` and `select_plan`. |
| S12: withdraw consent, 8 s quiet, SPA navigation, scroll | 0 hits after withdrawal. |
| S13: reload with withdrawn consent | 0 hits. No `gtag/js` script. |

Leak check: 0 matches for the leak strings in every hit of every step.

Not tested: a real private page with a valid token (needs live API data). Real-browser runs with the owner's own GA4 DebugView or Realtime were not done (no access).

### 6d. Google Tag Manager loader tests (15 Nov 2026)

Method: production build, headless Chrome for Testing, CDP network events for `googletagmanager.com` and `google-analytics.com`. Counts are per step, by request type.

| Step | Requests seen |
|---|---|
| S1: no consent, public page load | none (no `gtm.js`, no `gtag/js`) |
| S2: accept analytics on `/pricing` | `gtm.js` 1 (after GA4 ready), `gtag/js` 2, collect 2 |
| S3: SPA `/pricing` to `/faq` | collect 1, no `gtm.js` |
| S4: full load, consented, public page | `gtm.js` 1, `gtag/js` 1, collect 1 |
| S5: `/p/TESTTOKEN123` full load | none (no `gtm.js`, no `gtag/js`, no collect) |
| S6: `/blog/preview/TESTTOKEN123` full load | none |
| S7: private page to `/pricing`, consented | `gtm.js` 1, `gtag/js` 1, collect 1 |
| S8: withdraw, SPA navigation and scroll | none after withdrawal |
| S9: reload with withdrawn consent | none |

Notes:
- `gtag/js` appears twice in S2. The first request is Next.js preloading the GA script. The second is initiated by `gtm.js` itself. The dataLayer holds one `config` call (ours) and one `page_view` event. One collect request per step carries the hits, so this is not a duplicate page view. Confirm in GTM Preview before publishing any tag.
- The container is empty, so GTM sends nothing by itself. Adding a GA4 tag inside GTM now would duplicate tracking with the direct GA4 code.

### 6b. URL sanitisation tests, before the Enhanced Measurement settings were turned off (15 Nov 2026)

Method: production build, headless Chrome for Testing, `sendBeacon`/`fetch` hooked before page scripts, every GA call recorded with URL and POST body. Full harness is local, outside the repository.

| Case | GA calls seen | Result |
|---|---|---|
| No consent, `/pricing?utm_source=newsletter&ref=SECRETREF&email=person@example.com#frag-SECRET` | 0 | Pass |
| Accept on `/pricing` | `page_view`, `dl=/pricing?utm_source=newsletter` | Pass. No `ref`, `email`, hash. |
| Consent, `/pricing?...&token=SECRETTOKEN#frag` full load | `page_view`, `dl=/pricing?utm_source=newsletter` | Pass |
| Consent, `/p/TESTTOKEN123?utm_campaign=spring&token=SECRETTOKEN#frag` full load | 0 | Pass. Token absent from all GA calls. |
| Consent, `/blog/preview/TESTTOKEN123?utm_source=x&key=SECRETTOKEN` full load | 0 | Pass |
| Consent, private page then full navigation to `/pricing` | `page_view`, `dl=/pricing?utm_source=newsletter`, `dr=/p/[token]?utm_campaign=y` | Pass |
| Consent, SPA `/pricing` to `/faq` | Ours: `page_view`, `dl=/faq`, `dr=/pricing?utm_source=newsletter`. GA's history `page_view` also sent, with `dr` containing `ref=SECRETREF`. | Partial. Ours clean. GA's history hit not controllable (section 4b). |
| Withdraw, 8 s quiet, then SPA navigation and full-page scroll | 0 after withdrawal | Pass |
| Reload with withdrawn consent | 0. No `gtag.js` script. | Pass |
| Script-driven raw `history.pushState` to `/p/EMPROBE123?token=SECRETEM` (not an app flow) | GA's history `page_view` with the raw token in `dl` | **Fails.** Token reached GA. Documented limit (section 4b). Requires GA history setting off, or never changing to a private URL by history API. |

Not tested: a private page with a real, valid token (needs live API data).

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
| Google Analytics 4 | Implemented (consent-gated, URL-sanitised) | Browser-verified locally (network payloads, section 6c); not verified in GA4 admin | Existing property `G-HFH88XV2FG`; access not checked | Owner reports Enhanced Measurement "Page changes based on browser history events" and "Outbound clicks" were turned off (section 4b). Confirm in GA4 admin. Decide on Scroll and File downloads. Mark `generate_lead` and `form_submit` as key events. Enable internal traffic filter. Check data retention and Google Signals settings. | Create GA4 key events. Verify DebugView after deployment. |
| Google Tag Manager | Loader implemented (consent-gated, empty container) | Network-verified locally (section 6d). Not verified in GTM Preview. | Container `GTM-NNKKSCVF` (web, empty, never published). Duplicate account with container `GTM-NSGW9J7G` also exists. | Decide which container to keep and delete the other, in GTM account settings. Decide whether to migrate GA4 into GTM. If yes, remove direct `gtag.js` to avoid two GA4 tags. Publish only after GTM Preview checks. | Migration plan (phase 5). |
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
- Note on Enhanced Measurement: GA's own `scroll` event was seen in a consented run (`ae=a`, `gcs=G101`, analytics granted). It is a GA property setting, not sent by this code. See section 4b for history page views and outbound clicks.
