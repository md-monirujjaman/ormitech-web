"use client";

import { useId, useRef } from "react";
import { Play, X } from "lucide-react";
import { buttonClasses } from "@/components/common/ButtonLink";

// Opens the existing OrmiTech reply demo video in a native modal dialog (focus trap and Escape come with <dialog>).
export default function ProductTourButton({ label = "Watch it in action", variant = "secondary", className = "" }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const titleId = useId();

  function open() {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={buttonClasses({ variant, className })}>
        <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand transition-transform duration-300 motion-safe:group-hover:scale-110">
          <Play className="ml-px h-3 w-3 fill-current" />
        </span>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={event => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(440px,calc(100%-32px))] rounded-2xl bg-transparent p-0 backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
      >
        <div className="rounded-2xl bg-white p-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3 px-1 pb-2.5">
            <p id={titleId} className="text-sm font-semibold text-navy">OrmiTech replying to customer messages</p>
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <video
            ref={videoRef}
            src="/tumi_banai_dao.mp4"
            controls
            muted
            playsInline
            preload="none"
            className="block aspect-[414/474] max-h-[75vh] w-full rounded-xl bg-black object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
