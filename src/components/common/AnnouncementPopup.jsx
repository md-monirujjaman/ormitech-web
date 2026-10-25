"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// A pop-up is shown once per visit (browser tab session), and again when the team edits it.
const seenKey = popup => `ormitech-popup-seen:${popup.id}:${popup.version}`;

function wasSeen(popup) {
  try {
    return sessionStorage.getItem(seenKey(popup)) === "1";
  } catch {
    return false;
  }
}

function markSeen(popup) {
  try {
    sessionStorage.setItem(seenKey(popup), "1");
  } catch {
    // Private windows can refuse storage; the pop-up then simply shows again next time.
  }
}

function PopupButton({ button, primary, onDone }) {
  const className = `flex-1 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
    primary ? "bg-brand text-white shadow-[0_10px_20px_-10px_rgba(242,13,69,.8)] hover:opacity-90" : "border border-slate-300 text-[#0B0D12] hover:bg-slate-50"
  }`;
  if (button.href.startsWith("/")) {
    return (
      <Link href={button.href} onClick={onDone} className={className}>
        {button.label}
      </Link>
    );
  }
  return (
    <a href={button.href} target="_blank" rel="noreferrer noopener" onClick={onDone} className={className}>
      {button.label}
    </a>
  );
}

/**
 * The pop-up set for the website in the admin panel: a picture, a close (×) at its corner, and up to two buttons
 * below. It closes with the ×, with Escape, or by clicking the dimmed area around the picture; pressing a button
 * closes it too and goes where the team chose. One at a time, once per visit.
 */
export default function AnnouncementPopup() {
  const [popups, setPopups] = useState([]);
  const [closed, setClosed] = useState(() => new Set());
  const closeButton = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/announcements")
      .then(response => (response.ok ? response.json() : { popups: [] }))
      .then(body => {
        if (!cancelled) setPopups(Array.isArray(body?.popups) ? body.popups : []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const popup = popups.find(candidate => !closed.has(candidate.id) && !wasSeen(candidate) && candidate.imageUrl);

  const close = () => {
    if (!popup) return;
    markSeen(popup);
    setClosed(current => new Set(current).add(popup.id));
  };

  useEffect(() => {
    if (!popup) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = event => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
    // `close` only reads `popup`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup?.id]);

  if (!popup) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onMouseDown={event => {
        // Only a click on the dimmed area itself, not one that began on the picture or a button.
        if (event.target === event.currentTarget) close();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={popup.title || "Announcement"} className="relative my-auto w-full max-w-md">
        <button
          ref={closeButton}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-black/5 transition-colors hover:bg-slate-100"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- an admin-uploaded picture served by the API; the image optimizer would need every API host allow-listed */}
          <img src={popup.imageUrl} alt={popup.title} className="max-h-[70vh] w-full object-cover" />
          {popup.buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 p-4">
              {popup.buttons.map((button, index) => (
                <PopupButton key={`${button.label}-${index}`} button={button} primary={index === 0} onDone={close} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
