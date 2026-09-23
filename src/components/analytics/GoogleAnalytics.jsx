import Script from "next/script";
import { Suspense } from "react";
import { gaMeasurementId } from "@/data/site";
import AnalyticsPageview from "./AnalyticsPageview";

// Loads gtag.js and initializes GA4. `afterInteractive` keeps it off the critical render path,
// so it does not affect hydration or first paint.
export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsPageview />
      </Suspense>
    </>
  );
}
