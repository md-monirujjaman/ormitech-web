"use client";

import { openConsentSettings } from "@/lib/consent";

// Footer control that reopens the cookie choice, so consent can be withdrawn as easily as it was given.
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-[13px] text-white/60 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 lg:text-[14.5px]"
    >
      Cookie settings
    </button>
  );
}
