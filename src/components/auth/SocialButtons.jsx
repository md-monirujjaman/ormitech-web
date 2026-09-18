"use client";

import { Google } from "@thesvg/react";
import { useState } from "react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { Spinner } from "./formKit";

const providers = [
  { id: "google", label: "Google", logo: <Google aria-hidden variant="default" className="h-5 w-5" /> },
  { id: "facebook", label: "Facebook", logo: <ChannelLogo name="Facebook" className="h-5 w-5" /> }
];

// Social sign-in buttons. Frontend preview only: they explain that the provider is not connected yet.
export default function SocialButtons() {
  const [pending, setPending] = useState(null);
  const [notice, setNotice] = useState("");

  function handleClick(provider) {
    setPending(provider.id);
    setNotice("");
    setTimeout(() => {
      setPending(null);
      setNotice(`${provider.label} sign-in isn’t connected yet — this page is a preview of the OrmiTech account experience.`);
    }, 700);
  }

  return (
    <div>
      <div className="grid gap-3">
        {providers.map(provider => (
          <button
            key={provider.id}
            type="button"
            onClick={() => handleClick(provider)}
            disabled={pending !== null}
            aria-busy={pending === provider.id}
            className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[15px] font-semibold text-navy transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_12px_24px_-18px_rgba(13,27,61,.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 disabled:cursor-wait disabled:opacity-70 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
          >
            <span className="flex h-5 w-5 items-center justify-center transition-transform duration-200 motion-safe:group-hover:scale-110">{pending === provider.id ? <Spinner className="text-slate-500" /> : provider.logo}</span>
            Continue with {provider.label}
          </button>
        ))}
      </div>
      <p role="status" className={notice ? "mt-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-[13px] leading-5 text-slate-600 ring-1 ring-slate-200" : "sr-only"}>
        {notice}
      </p>
    </div>
  );
}
