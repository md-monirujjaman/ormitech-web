"use client";

import { useState } from "react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { Spinner } from "./formKit";

function GoogleLogo() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.11A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.61H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.11Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.11C6.23 6.88 8.88 4.77 12 4.77Z" />
    </svg>
  );
}

const providers = [
  { id: "google", label: "Google", logo: <GoogleLogo /> },
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
