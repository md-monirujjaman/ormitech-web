"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { gaMeasurementId } from "@/data/site";
import { ANALYTICS_ENABLED, ANALYTICS_READY_EVENT } from "@/lib/analytics";
import { currentPageContext, isPrivatePath, sanitizeReferrer } from "@/lib/analytics-url";
import { onConsentChange, readConsent } from "@/lib/consent";
import AnalyticsPageview from "./AnalyticsPageview";
import OutboundClicks from "./OutboundClicks";

// Loads gtag.js and initializes GA4 only after the visitor accepts analytics cookies. Until then no request
// goes to Google. Consent Mode v2 starts denied and is updated when the visitor chooses. Withdrawing consent
// sets GA's own disable flag and updates the consent state, so later hits are not sent.
//
// GA's automatic page_view is switched off (send_page_view: false). The first page view is sent by hand with a
// sanitised URL, and page_location is set globally so every later hit (including custom events) uses the safe
// value instead of the raw browser address. See lib/analytics-url.js and docs/analytics-tracking.md.
export default function GoogleAnalytics() {
  const [init, setInit] = useState(null);
  const pathname = usePathname();
  const disableFlag = `ga-disable-${gaMeasurementId}`;

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return undefined;

    // GA never starts on a private route (draft preview or customer product link). If consent exists but the
    // visitor is on such a route, GA starts on the next public page instead.
    const start = () => {
      if (isPrivatePath(window.location.pathname)) return;
      setInit(current => current || { ...currentPageContext(), page_referrer: sanitizeReferrer(document.referrer) });
    };

    const apply = consent => {
      if (consent?.analytics) {
        window[disableFlag] = false;
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "granted" });
        }
        start();
      } else {
        window[disableFlag] = true;
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "denied" });
        }
      }
    };

    apply(readConsent());
    return onConsentChange(apply);
  }, [disableFlag]);

  // Client-side navigation into a public page after consent was given on a private page.
  useEffect(() => {
    if (!ANALYTICS_ENABLED || isPrivatePath(pathname) || !readConsent()?.analytics) return;
    setInit(current => current || { ...currentPageContext(), page_referrer: sanitizeReferrer(document.referrer) });
  }, [pathname]);

  if (!ANALYTICS_ENABLED || !init) return null;

  // Built from sanitised values only. "<" is escaped so the JSON cannot close the script tag.
  const initJson = JSON.stringify(init).replace(/</g, "\\u003c");

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('js', new Date());
          (function () {
            var ctx = ${initJson};
            var referrer = ctx.page_referrer ? { page_referrer: ctx.page_referrer } : {};
            gtag('set', Object.assign({ page_location: ctx.page_location }, referrer));
            gtag('config', '${gaMeasurementId}', { send_page_view: false });
            if (!ctx.private) {
              gtag('event', 'page_view', Object.assign({
                page_location: ctx.page_location,
                page_path: ctx.page_path,
                page_title: ctx.page_title
              }, referrer));
            }
          })();
          window.dispatchEvent(new Event('${ANALYTICS_READY_EVENT}'));
        `}
      </Script>
      <OutboundClicks />
      <Suspense fallback={null}>
        <AnalyticsPageview />
      </Suspense>
    </>
  );
}
