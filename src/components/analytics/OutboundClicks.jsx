"use client";

import { useEffect } from "react";
import { EVENTS, trackEvent } from "@/lib/analytics";

// Sends outbound_click when a visitor follows a link to another host. Only the host name is sent,
// never the path or query string, so no identifiers in URLs reach analytics.
export default function OutboundClicks() {
  useEffect(() => {
    function onClick(event) {
      const target = event.target;
      const anchor = target instanceof Element ? target.closest("a[href]") : null;
      if (!anchor) return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.protocol !== "https:" && url.protocol !== "http:") return;
      if (url.host === window.location.host) return;

      trackEvent(EVENTS.OUTBOUND_CLICK, { link_domain: url.hostname });
    }

    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
