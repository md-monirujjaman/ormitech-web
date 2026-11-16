"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** A full-screen look at one picture, with arrows, the keyboard (← → Esc) and a tap on the dark edge to close. */
function Lightbox({ images, name, index, onIndex, onClose }) {
  useEffect(() => {
    const onKey = event => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onIndex(Math.max(index - 1, 0));
      if (event.key === "ArrowRight") onIndex(Math.min(index + 1, images.length - 1));
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, images.length, onClose, onIndex]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`${name} pictures`} onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[index]} alt={name} className="max-h-full max-w-full object-contain" onClick={event => event.stopPropagation()} />
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/15 text-xl text-white hover:bg-white/25">✕</button>
      {images.length > 1 && (
        <>
          <button type="button" onClick={event => { event.stopPropagation(); onIndex(Math.max(index - 1, 0)); }} disabled={index === 0} aria-label="Previous picture" className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 disabled:opacity-30">‹</button>
          <button type="button" onClick={event => { event.stopPropagation(); onIndex(Math.min(index + 1, images.length - 1)); }} disabled={index === images.length - 1} aria-label="Next picture" className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 disabled:opacity-30">›</button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white">{index + 1} / {images.length}</p>
        </>
      )}
    </div>
  );
}

/**
 * The product's pictures. Swipe on a phone; on a computer the mouse wheel, a drag, the arrows, the thumbnails and the keyboard all move
 * between pictures, and a click opens the picture large. The whole picture is always shown, never cropped. At the first and last picture
 * the wheel lets the page scroll on, so it never traps a visitor.
 */
export default function Gallery({ images, name }) {
  const box = useRef(null);
  const wheelAt = useRef(0);
  const drag = useRef(null);
  const moved = useRef(false);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const last = images.length - 1;

  const goTo = useCallback(
    index => {
      const element = box.current;
      if (!element) return;
      const next = Math.min(Math.max(index, 0), last);
      element.scrollTo({ left: next * element.clientWidth, behavior: "smooth" });
      setActive(next);
    },
    [last]
  );

  function onScroll() {
    const element = box.current;
    if (element && element.clientWidth > 0 && !drag.current) setActive(Math.round(element.scrollLeft / element.clientWidth));
  }

  useEffect(() => {
    const element = box.current;
    if (!element || images.length < 2) return undefined;
    function onWheel(event) {
      // Sideways wheel or two-finger swipe already scrolls the strip by itself.
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY) || Math.abs(event.deltaY) < 4) return;
      const current = Math.round(element.scrollLeft / element.clientWidth);
      const next = current + (event.deltaY > 0 ? 1 : -1);
      if (next < 0 || next > last) return;
      event.preventDefault();
      const now = Date.now();
      if (now - wheelAt.current < 450) return;
      wheelAt.current = now;
      goTo(next);
    }
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [images.length, last, goTo]);

  function onPointerDown(event) {
    if (event.pointerType !== "mouse" || event.button !== 0 || images.length < 2) return;
    const element = box.current;
    drag.current = { x: event.clientX, left: element.scrollLeft };
    moved.current = false;
    element.style.scrollSnapType = "none";
    element.style.scrollBehavior = "auto";
    element.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event) {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 5) moved.current = true;
    box.current.scrollLeft = drag.current.left - delta;
  }
  function onPointerUp(event) {
    if (!drag.current) return;
    const element = box.current;
    drag.current = null;
    element.releasePointerCapture?.(event.pointerId);
    element.style.scrollSnapType = "";
    element.style.scrollBehavior = "";
    goTo(Math.round(element.scrollLeft / element.clientWidth));
  }

  if (images.length === 0) {
    return <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">No picture</div>;
  }

  return (
    <div>
      <div className="group relative">
        <div
          ref={box}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          // On the strip, not the picture: a mouse press captures the pointer, so the click lands on the strip.
          onClick={() => { if (!moved.current) setZoom(true); }}
          className={`flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl border border-neutral-200 bg-neutral-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${images.length > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        >
          {images.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={index === 0 ? name : `${name} ${index + 1}`}
              draggable={false}
              className="aspect-square w-full shrink-0 snap-center cursor-zoom-in select-none object-contain"
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous picture" className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl shadow-md transition disabled:opacity-0 md:opacity-0 md:group-hover:opacity-100">‹</button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Next picture" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl shadow-md transition disabled:opacity-0 md:opacity-0 md:group-hover:opacity-100">›</button>
            <p className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-neutral-900/70 px-2.5 py-1 text-xs font-semibold text-white">{active + 1} / {images.length}</p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, index) => (
            <li key={src} className="shrink-0">
              <button type="button" onClick={() => goTo(index)} aria-label={`Picture ${index + 1}`} aria-current={index === active} className={`block h-16 w-16 overflow-hidden rounded-xl border-2 bg-neutral-50 transition md:h-20 md:w-20 ${index === active ? "border-neutral-900" : "border-transparent opacity-70 hover:opacity-100"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {zoom && <Lightbox images={images} name={name} index={active} onIndex={index => { setActive(index); goTo(index); }} onClose={() => setZoom(false)} />}
    </div>
  );
}
