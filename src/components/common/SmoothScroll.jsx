"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance = null;

// Site-wide smooth scrolling with Lenis (lenis.dev). Native scroll position is kept, so framer-motion's
// useScroll, sticky elements and anchor links keep working. Reduced-motion visitors keep native scrolling.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenisInstance = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // A new page changes the document height; let Lenis re-measure it.
  useEffect(() => {
    lenisInstance?.resize();
  }, [pathname]);

  return null;
}
