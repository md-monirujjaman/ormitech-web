"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { ease } from "@/components/ui/Reveal";
import { climbDuration, formatCount, nextTarget, valueAt } from "@/lib/countUp.mjs";
import { interTight } from "@/styles/fonts";
import { Pill } from "./kit";

// The map is a 1360 x 450 picture; the cities, the lines between them and the pulses are drawn on top of it in the same coordinates, so they
// stay on their pins at any width.
const MAP_W = 1360;
const MAP_H = 450;
const cities = {
  newYork: { x: 362, y: 155 },
  london: { x: 638, y: 110 },
  dubai: { x: 814, y: 195 },
  dhaka: { x: 968, y: 195 },
  singapore: { x: 1043, y: 265 },
  sydney: { x: 1204, y: 367 }
};

// Every line ends at Dhaka or at a neighbour, so the whole thing reads as one connected network.
const links = [
  ["newYork", "london"],
  ["london", "dubai"],
  ["dubai", "dhaka"],
  ["dhaka", "singapore"],
  ["singapore", "sydney"],
  ["newYork", "dhaka"],
  ["london", "dhaka"],
  ["sydney", "dhaka"]
];

const arc = (from, to) => {
  const a = cities[from];
  const b = cities[to];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.22;
  return `M${a.x} ${a.y} Q${mx} ${my - lift} ${b.x} ${b.y}`;
};

const POLL_MS = 45_000;

/** The black counter: starts from the real number, climbs to it once when it scrolls into view, then follows the real count as it grows. */
function ReachCounter({ initial }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const visible = useInView(ref, { margin: "0px 0px -10% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [target, setTarget] = useState(() => nextTarget(null, initial));
  const [shown, setShown] = useState(() => nextTarget(null, initial));
  const shownRef = useRef(shown);
  shownRef.current = shown;
  const climbed = useRef(false);

  // The real count, read again every little while, only while the counter is on screen. It never goes down.
  useEffect(() => {
    if (!visible) return undefined;
    let stopped = false;
    const controller = new AbortController();
    const read = async () => {
      try {
        const response = await fetch("/api/widget-reach", { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok) return;
        const body = await response.json();
        if (!stopped) setTarget((current) => nextTarget(current, body?.people));
      } catch {
        // No answer this time: the number stays as it is.
      }
    };
    read();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") read();
    }, POLL_MS);
    return () => {
      stopped = true;
      controller.abort();
      clearInterval(timer);
    };
  }, [visible]);

  // The climb: from 0 to the number the first time it is seen, then from what is shown to each new, higher count.
  useEffect(() => {
    if (target === null) return undefined;
    if (reduce || !seen) {
      if (reduce) setShown(target);
      return undefined;
    }
    const from = climbed.current ? shownRef.current ?? 0 : 0;
    climbed.current = true;
    if (from >= target) {
      setShown(target);
      return undefined;
    }
    const duration = climbDuration(target - from);
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = (now - start) / duration;
      setShown(valueAt(from, target, t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, seen, reduce]);

  // No honest number (the API cannot give one): the counter is left out, never replaced by a made-up figure.
  if (target === null) return <div ref={ref} aria-hidden className="h-px" />;

  return (
    <div ref={ref} className="text-center">
      <p className="text-[56px] font-extrabold leading-none tracking-[-0.04em] text-[#0B0D12] tabular-nums sm:text-[80px]" aria-label={`${formatCount(target)} people reached so far`}>
        <span aria-hidden>{formatCount(seen ? (shown ?? target) : 0)}</span>
      </p>
      <p className="mt-3 text-[13px] font-medium tracking-[.02em] text-slate-500 sm:text-sm">People reached so far · via the widget</p>
    </div>
  );
}

function Network({ live }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gc-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#F20D45" stopOpacity=".15" />
          <stop offset=".5" stopColor="#F20D45" stopOpacity=".85" />
          <stop offset="1" stopColor="#FFB020" stopOpacity=".6" />
        </linearGradient>
      </defs>
      {links.map(([from, to], index) => {
        const path = arc(from, to);
        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#gc-arc)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.5, delay: 0.7 + index * 0.18, ease: "easeInOut" }}
            />
            {live && (
              <circle r="3.6" fill="#fff" stroke="#F20D45" strokeWidth="1.6">
                <animateMotion dur={`${3.4 + (index % 4) * 0.5}s`} begin={`${2.4 + index * 0.35}s`} repeatCount="indefinite" path={path} keyPoints={index % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur={`${3.4 + (index % 4) * 0.5}s`} begin={`${2.4 + index * 0.35}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
      {Object.entries(cities).map(([name, point], index) => (
        <g key={name} transform={`translate(${point.x} ${point.y})`}>
          {live && (
            <>
              <motion.circle r="9" fill="none" stroke="#F20D45" strokeWidth="2" initial={{ opacity: 0 }} animate={{ r: [8, 30], opacity: [0.7, 0] }} transition={{ duration: 2.6, delay: 1.2 + index * 0.45, repeat: Infinity, ease: "easeOut" }} />
              <motion.circle r="9" fill="none" stroke="#F20D45" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ r: [8, 30], opacity: [0.5, 0] }} transition={{ duration: 2.6, delay: 2.5 + index * 0.45, repeat: Infinity, ease: "easeOut" }} />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/**
 * Home page: the world map with the places customers write from, the lines that connect them, and a counter of the people the website chat
 * has answered so far (real, from the API). Replaces the old "From connection to conversion" steps.
 */
export default function GlobalConnections({ initialReach = null }) {
  const reduce = useReducedMotion();
  const live = !reduce;

  return (
    <MotionConfig reducedMotion="user">
      <section id="global-connections" aria-labelledby="home-global-title" className={`${interTight.className} relative overflow-hidden border-y border-slate-100 bg-white py-16 sm:py-20 lg:py-24`}>
        <div className="container-x relative">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="mx-auto max-w-4xl text-center">
            <Pill>Global customer connections</Pill>
            <h2 id="home-global-title" className="mt-6 text-[36px] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0B0D12] [text-wrap:balance] sm:text-[56px] lg:text-[64px]">
              Every conversation, connected.
              <span className="mt-1 block bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">Every customer, closer.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
              Bring every channel your customers use into one shared inbox. Let AI handle routine questions and your team step in when it matters.
            </p>
          </motion.div>

          <div className="mt-10 hidden items-center justify-between text-[11px] font-semibold uppercase tracking-[.2em] text-slate-500 md:flex">
            <span className="border-l-2 border-brand pl-3">One connected platform</span>
            <span className="border-l-2 border-brand pl-3">Always on, across time zones</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease }}
            className="relative mx-auto mt-6 w-full max-w-[1180px] md:mt-3"
          >
            <div className="relative isolate" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
              <Image src="/images/world-connections.jpg" alt="World map with customer conversations connecting New York, London, Dubai, Dhaka, Singapore and Sydney" width={MAP_W} height={MAP_H} priority={false} sizes="(min-width: 1280px) 1180px, 100vw" className="absolute inset-0 h-full w-full select-none object-contain" />
              {live && (
                // The same picture again, lit up and fading in and out over itself: the golden city lights twinkle.
                <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: [0, 0.55, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }} className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ filter: "brightness(1.5) saturate(1.5)" }}>
                  <Image src="/images/world-connections.jpg" alt="" width={MAP_W} height={MAP_H} sizes="1180px" className="h-full w-full object-contain" />
                </motion.div>
              )}
              <Network live={live} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: 0.2, ease }} className="mt-8 sm:mt-10">
            <ReachCounter initial={initialReach} />
            <div className="mx-auto mt-8 flex max-w-3xl items-center gap-4 text-[10.5px] font-semibold uppercase tracking-[.2em] text-slate-400 sm:text-xs">
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-brand/30" />
              <span className="text-center">Powering customer communication, around the clock</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-brand/30" />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
