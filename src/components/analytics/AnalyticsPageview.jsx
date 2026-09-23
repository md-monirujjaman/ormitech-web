"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { gaMeasurementId } from "@/data/site";

// Sends a page_view on every client-side route change. The first render is skipped — the inline
// gtag('config', ...) call in GoogleAnalytics already reports the initial pageview, so firing here
// too would double-count it.
export default function AnalyticsPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    window.gtag("config", gaMeasurementId, { page_path: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams]);

  return null;
}
