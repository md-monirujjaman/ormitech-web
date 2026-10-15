# Internal Data-Flow Audit

**Reviewed:** 14 October 2026  
**Scope:** This `ormitech-web` checkout only. It is the Next.js marketing site, not the OrmiTech dashboard, backend, admin panel or docs service. This is an implementation inventory, not a security assessment or legal opinion.

## Confirmed flows in this repository

```text
Website visitor
  ├─> Next.js marketing pages
  │     ├──────────────────────────────> Google gtag.js / Google Analytics 4
  │     └─(blog image requested)───────> Cloudinary image CDN
  └─> Contact form
        └─> /api/contact
              └─ validates fields, logs the selected topic and presence of email/phone,
                 returns success; no message storage or delivery integration is present

Sign-up / login links ─> app.ormitechit.com (separate system; implementation unavailable here)
Marketing product claims ─> Meta, AI, database, payment, courier and email flows
                         (described in content; no integration implementation in this checkout)
```

## Data categories confirmed by code

| Flow | Data visible to this project | Storage / recipient confirmed here |
| --- | --- | --- |
| Contact form and API | Name, email, company, phone, message and optional topic are submitted to the route. | The API validates required fields, logs the selected topic and whether email/phone were provided, then returns success. No persistence or delivery integration is present in this checkout. Hosting/runtime request metadata is outside this checkout and unverified. |
| Google Analytics 4 | Page path and query string on initial and client-side route views; normal browser request metadata. | The Google tag is loaded unconditionally and configured to send page views. There is no consent UI and no Google Consent Mode. GA4 may set `_ga` and `_ga_<container-id>` first-party cookies. |
| Blog images | The browser requests some editorial images from Cloudinary-hosted URLs. | The request goes directly from the visitor's browser to Cloudinary. Exact CDN logs/retention are not specified in this repository. |
| Account access | Sign-in and registration links point to the configured OrmiTech app URL. | No credential, authentication, session, account database or API flow is implemented here. |

## Product-data categories advertised but not verified in this checkout

Marketing content describes account/workspace information, team roles, connected page/account/phone identifiers, Meta messages and profile data, website chat, customer contacts, conversation attachments and status, leads, notes, tags, orders, delivery addresses, AI prompts/responses, analytics, payment and courier workflows. The implementation that would confirm these flows is on separate app/API services and is absent here. This repository contains no Meta OAuth or webhook code, access-token storage, website chat loader, AI provider client, order database/API, payment integration, courier API, email sender, deletion endpoint, or DPA.

Do not treat marketing examples or product mockups as proof of production data flows. The service owner must compare this list with the deployed app, API, infrastructure and provider settings before finalizing customer-facing privacy terms.

## Provider inventory visible in this checkout

| Provider | Purpose | Data / status |
| --- | --- | --- |
| Google Analytics / Google tag | Website analytics | Active on the marketing site without a consent UI. Sends page-view events and browser request information; GA4 may use first-party analytics cookies. |
| Cloudinary | Hosts some blog editorial images | Active when a page requests one of those external images; receives the direct image request and normal connection metadata. |
| Meta (Facebook, Messenger, Instagram, WhatsApp) | Product integrations described in marketing content | No active integration code found in this checkout. Separate product configuration not audited. |
| AI, hosting/database, email/support, payment, courier | Potential product services | No provider or active integration can be identified from this checkout. |

## Operational findings

- There is no verified legal entity name, postal address, monitored privacy contact, or governing jurisdiction in this project.
- The contact API is not a verified privacy-request channel: it acknowledges submissions but no monitored delivery path is present in this checkout.
- No account export, account closure, customer deletion, request tracking, backup lifecycle, or support workflow is implemented here.
- No authentication, authorization, tenant isolation, encryption, token handling, database, backup, hosting, or security certification can be verified here.
- The marketing site should not be described as the system that processes the product's Meta, conversation, order or AI data until the separate services are audited.

## Owner actions before final publication

1. Provide the separate app/API source or production data-flow and security documentation for audit.
2. Identify the contracting legal entity, jurisdiction, postal address and monitored privacy/legal contact.
3. Configure a privacy-request intake that is delivered, access-controlled, tracked and handled under a documented retention process; add export, correction and deletion operations as applicable.
4. Review the marketing site's unconditional Google Analytics loading for the jurisdictions served and add a consent mechanism if required; disclose the actual choice and cookie behavior.
5. Confirm AI providers, prompt/response data, retention and model-training settings, and publish a provider/DPA inventory.
6. Confirm Meta permissions and fields, hosting/database regions, email/support, billing and courier providers, logs and backup retention.
7. Have counsel complete the DPA decision and review the terms, privacy notice, cookie approach and any location-specific obligations.
