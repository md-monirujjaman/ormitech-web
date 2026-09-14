"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sora } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sora = Sora({ subsets: ["latin"], weight: ["600"], display: "swap" });

const TEXT = "OrmiTech";
const letters = Array.from(TEXT);
const word = { x: 0, y: 192, textLength: 1000, lengthAdjust: "spacingAndGlyphs", fontWeight: 600, fontSize: 204, letterSpacing: -3 };
const dash = word.fontSize * 7;
const WIPE_WIDTH = 1040;

export default function FooterWordmark() {
  const rootRef = useRef(null);
  const wipeRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const wipe = wipeRef.current;
    const strokes = root.querySelectorAll("[data-stroke-char]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(strokes, { strokeDashoffset: 0 });
      gsap.set(wipe, { attr: { width: WIPE_WIDTH } });
      return undefined;
    }

    const timeline = gsap.timeline({ paused: true })
      .to(strokes, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", stagger: 0.05 }, 0)
      .to(wipe, { attr: { width: WIPE_WIDTH }, duration: 0.9, ease: "power2.inOut" }, 1.8);

    const trigger = ScrollTrigger.create({ trigger: root, start: "top 90%", once: true, onEnter: () => timeline.play(0) });

    return () => {
      trigger.kill();
      timeline.kill();
    };
  }, []);

  return (
    <svg ref={rootRef} aria-hidden viewBox="-10 0 1020 200" className={`${sora.className} block h-auto w-full`}>
      <defs>
        <linearGradient id="wm-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2234F" />
          <stop offset=".55" stopColor="#E10032" />
          <stop offset="1" stopColor="#BA0029" />
        </linearGradient>
        <linearGradient id="wm-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8AA3" />
          <stop offset=".4" stopColor="#C4002C" />
          <stop offset=".8" stopColor="#85001E" />
          <stop offset="1" stopColor="#B0002A" />
        </linearGradient>
        <linearGradient id="wm-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
          <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".25" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity=".1" />
        </linearGradient>
        <filter id="wm-halo" x="-3%" y="-15%" width="106%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
          <feOffset in="blur" dy="5" result="drop" />
          <feFlood floodColor="#E10032" floodOpacity=".18" />
          <feComposite in2="drop" operator="in" />
        </filter>
        <filter id="wm-bevel" x="-2%" y="-10%" width="104%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant=".8" specularExponent="36" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="250" y="-300" z="260" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
        <filter id="wm-sheen" x="-2%" y="-10%" width="104%" height="130%">
          <feOffset in="SourceAlpha" dy="5" result="off" />
          <feComposite in="SourceAlpha" in2="off" operator="out" result="edge" />
          <feGaussianBlur in="edge" stdDeviation="3" result="soft" />
          <feFlood floodColor="#FFFFFF" floodOpacity=".3" />
          <feComposite in2="soft" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" result="sheen" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="sheen" /></feMerge>
        </filter>
        <clipPath id="wm-clip">
          <text {...word}>{TEXT}</text>
        </clipPath>
        <clipPath id="wm-wipe" clipPathUnits="userSpaceOnUse">
          <rect ref={wipeRef} x="-20" y="0" width="0" height="200" />
        </clipPath>
        <mask id="wm-line" maskUnits="userSpaceOnUse" x="-10" y="0" width="1020" height="200">
          <text {...word} fill="none" stroke="#FFFFFF" strokeWidth="19.5" strokeLinejoin="round">{TEXT}</text>
          <text {...word} fill="none" stroke="#000000" strokeWidth="17" strokeLinejoin="round">{TEXT}</text>
        </mask>
      </defs>

      <g clipPath="url(#wm-wipe)">
        <text {...word} fill="#000000" filter="url(#wm-halo)">{TEXT}</text>
      </g>

      <text {...word} fill="none" stroke="url(#wm-rim)" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" filter="url(#wm-bevel)">
        {letters.map((char, i) => <tspan key={i} data-stroke-char strokeDasharray={dash} strokeDashoffset={dash}>{char}</tspan>)}
      </text>

      <g clipPath="url(#wm-wipe)">
        <text {...word} fill="url(#wm-face)" filter="url(#wm-sheen)">{TEXT}</text>
        <g clipPath="url(#wm-clip)">
          <rect x="-10" y="0" width="1020" height="200" fill="url(#wm-inner)" mask="url(#wm-line)" />
        </g>
        <text {...word} fill="none" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="1">{TEXT}</text>
      </g>
    </svg>
  );
}
