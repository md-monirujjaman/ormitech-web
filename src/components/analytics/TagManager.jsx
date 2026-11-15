"use client";

import { useEffect } from "react";
import { gtmContainerId } from "@/data/site";
import { ANALYTICS_ENABLED, ANALYTICS_READY_EVENT } from "@/lib/analytics";
import { isPrivatePath } from "@/lib/analytics-url";
import { readConsent } from "@/lib/consent";

// Loads the Google Tag Manager container (gtm.js). It starts only after GA4 has started (ANALYTICS_READY_EVENT),
// and GA4 starts only after the visitor accepts analytics cookies on a public page (see GoogleAnalytics.jsx).
// So GTM never loads before consent, and it starts in the same Consent Mode state as GA4. Private routes never load it.
//
// The container currently has no tags. GTM does not send analytics data by itself. Moving GA4 into GTM is a separate
// step: until then, do not add a GA4 configuration tag to the container, or GA4 would be counted twice.
export default function TagManager() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !gtmContainerId) return undefined;

    let started = false;
    const start = () => {
      if (started || isPrivatePath(window.location.pathname)) return;
      started = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmContainerId)}`;
      document.head.appendChild(script);
    };

    const onReady = () => start();
    window.addEventListener(ANALYTICS_READY_EVENT, onReady);
    // GA4 may already be running when this component mounts (for example after a client-side navigation).
    if (typeof window.gtag === "function" && readConsent()?.analytics) start();

    return () => window.removeEventListener(ANALYTICS_READY_EVENT, onReady);
  }, []);

  return null;
}
