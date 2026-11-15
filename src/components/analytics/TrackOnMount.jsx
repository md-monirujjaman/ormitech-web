"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { onConsentChange } from "@/lib/consent";

// Sends one event per page view for page-level events such as view_pricing. It does not send again on
// re-renders. If the visitor has not chosen yet, it waits and sends once they accept analytics on this page.
export default function TrackOnMount({ event, params }) {
  const sent = useRef(false);
  // The event name and params are fixed per page, so they are read only on the first mount.
  const eventRef = useRef({ event, params });

  useEffect(() => {
    const send = () => {
      if (sent.current) return;
      if (trackEvent(eventRef.current.event, eventRef.current.params)) sent.current = true;
    };
    send();
    return onConsentChange(consent => {
      if (consent.analytics) send();
    });
  }, []);

  return null;
}
