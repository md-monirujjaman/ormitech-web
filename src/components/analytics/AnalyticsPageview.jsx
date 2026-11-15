"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ANALYTICS_READY_EVENT, canTrackAnalytics } from "@/lib/analytics";
import { currentPageContext, installHistoryGuard, isPrivatePath } from "@/lib/analytics-url";

// Sends one sanitised page_view per client-side route change, and only while analytics consent is granted.
// The first render is skipped: GoogleAnalytics sends the first page view when it starts, so counting it here
// too would double-count it. Private routes (drafts and customer product links) send no page_view. Their
// page_location is still updated, so any hit GA sends on those routes carries only the sanitised address.
export default function AnalyticsPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const lastLocation = useRef(null);

  // Installs the history guard once GA has initialised (gtag exists). Ordering against GA's own history listener
  // is not guaranteed; see docs/analytics-tracking.md.
  useEffect(() => {
    if (typeof window.gtag === "function") {
      installHistoryGuard();
      return undefined;
    }
    const install = () => installHistoryGuard();
    window.addEventListener(ANALYTICS_READY_EVENT, install, { once: true });
    return () => window.removeEventListener(ANALYTICS_READY_EVENT, install);
  }, []);

  useEffect(() => {
    const context = currentPageContext();
    const previous = lastLocation.current;
    lastLocation.current = context.page_location;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!canTrackAnalytics() || typeof window.gtag !== "function") return;

    const referrer = previous ? { page_referrer: previous } : {};
    window.gtag("set", { page_location: context.page_location, ...referrer });
    if (isPrivatePath(window.location.pathname)) return;

    window.gtag("event", "page_view", {
      page_location: context.page_location,
      page_path: context.page_path,
      page_title: context.page_title,
      ...referrer
    });
  }, [pathname, searchParams]);

  return null;
}
