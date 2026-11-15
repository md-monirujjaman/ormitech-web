"use client";

import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { gaMeasurementId } from "@/data/site";
import { ANALYTICS_ENABLED, ANALYTICS_READY_EVENT } from "@/lib/analytics";
import { onConsentChange, readConsent } from "@/lib/consent";
import AnalyticsPageview from "./AnalyticsPageview";
import OutboundClicks from "./OutboundClicks";

// Loads gtag.js and initializes GA4 only after the visitor accepts analytics cookies. Until then no request
// goes to Google. Consent Mode v2 starts denied and is updated when the visitor chooses. Withdrawing consent
// sets GA's own disable flag and updates the consent state, so later hits are not sent.
export default function GoogleAnalytics() {
  const [requested, setRequested] = useState(false);
  const disableFlag = `ga-disable-${gaMeasurementId}`;

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return undefined;

    const apply = consent => {
      if (consent?.analytics) {
        window[disableFlag] = false;
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "granted" });
        }
        setRequested(true);
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

  if (!ANALYTICS_ENABLED || !requested) return null;

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
          gtag('config', '${gaMeasurementId}');
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
