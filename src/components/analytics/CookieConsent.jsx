"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_OPEN_EVENT, readConsent, writeConsent } from "@/lib/consent";

// Cookie banner. Essential cookies are always on. Analytics (Google Analytics 4) runs only if the visitor
// accepts. "Accept analytics" and "Essential only" have the same size and weight, so refusing is as easy as
// accepting. The banner shows until a choice is saved, and it reopens from the footer "Cookie settings" button.
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  function choose(analytics) {
    writeConsent({ analytics });
    setOpen(false);
  }

  const button = "inline-flex h-11 flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25";

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-text"
      className="fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-slate-200 bg-white p-5 text-navy shadow-[0_24px_60px_-20px_rgba(13,27,61,.45)] sm:inset-x-auto sm:right-6 sm:max-w-md"
    >
      <h2 id="cookie-consent-title" className="text-base font-semibold">Cookies on this site</h2>
      <p id="cookie-consent-text" className="mt-2 text-sm leading-6 text-slate-600">
        We use essential cookies to run this site. With your permission we also use Google Analytics to see which pages are useful.
        You can change your choice at any time with <span className="font-medium text-navy">Cookie settings</span> in the footer.{" "}
        <Link href="/privacy#analytics-cookies" className="font-medium text-brandInk underline underline-offset-2">Privacy Policy</Link>
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button type="button" onClick={() => choose(false)} className={`${button} border border-slate-300 bg-white text-navy hover:bg-slate-50`}>
          Essential only
        </button>
        <button type="button" onClick={() => choose(true)} className={`${button} bg-brand text-white hover:bg-brand2`}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}
