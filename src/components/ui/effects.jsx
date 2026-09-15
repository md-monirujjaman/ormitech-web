"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ease } from "./Reveal";

// Thin brand bar at the top of the viewport that fills as the page is read.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand to-brand2" />;
}

// Red marker that draws itself under a headline phrase.
export function Highlight({ children, delay = 0.65, className = "text-brand" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={`bg-no-repeat [-webkit-box-decoration-break:clone] [box-decoration-break:clone] ${className}`}
      style={{ backgroundImage: "linear-gradient(rgba(242,13,69,.14), rgba(242,13,69,.14))", backgroundPosition: "0 92%" }}
      initial={{ backgroundSize: reduceMotion ? "100% 0.26em" : "0% 0.26em" }}
      animate={{ backgroundSize: "100% 0.26em" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.span>
  );
}

// Card with a soft brand glow that follows the pointer while hovered.
export function Spotlight({ as: Component = "div", className = "", color = "rgba(242,13,69,.08)", children, ...props }) {
  const ref = useRef(null);

  function handlePointerMove(event) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Component ref={ref} onPointerMove={handlePointerMove} className={`group relative isolate overflow-hidden ${className}`} {...props}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${color}, transparent 65%)` }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-x-100" />
      {children}
    </Component>
  );
}

// Counts the leading number of `value` up from zero once it scrolls into view.
// "24/7" counts to 24 and keeps "/7"; "1,240" keeps its thousands separator.
export function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const match = /^(\d[\d,]*)(.*)$/.exec(value);
  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const grouped = match ? match[1].includes(",") : false;
  const suffix = match ? match[2] : "";
  const count = useMotionValue(target);
  const display = useTransform(count, latest => {
    const rounded = Math.round(latest);
    return `${grouped ? rounded.toLocaleString("en-US") : rounded}${suffix}`;
  });

  useEffect(() => {
    if (!match || !inView || reduceMotion) return;
    const controls = animate(count, [0, target], { duration: 1.2, ease });
    return () => controls.stop();
  }, [count, inView, match === null, reduceMotion, target]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <motion.span ref={ref} aria-hidden>
        {display}
      </motion.span>
    </span>
  );
}

// True while the media query matches. Starts false on the server and first render.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}

// Plays a sequence once `ref` scrolls into view. Returns the current phase:
// 0 before start, then 1..delays.length as each delay (ms) passes. Changing `replayKey` plays it again.
// Reduced motion jumps straight to the end.
export function useTimeline(ref, delays, replayKey) {
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const schedule = delays.join(",");

  useEffect(() => {
    if (!inView) return;
    const steps = schedule.split(",").map(Number);
    setPhase(0);
    const timers = reduceMotion
      ? [setTimeout(() => setPhase(steps.length), 0)]
      : steps.map((delay, index) => setTimeout(() => setPhase(index + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion, schedule, replayKey]);

  return phase;
}

export function TypingDots({ className = "", dotClassName = "bg-slate-400" }) {
  return (
    <span aria-hidden className={`inline-flex items-center gap-1 ${className}`}>
      {[0, 160, 320].map(delay => (
        <span key={delay} className={`h-1.5 w-1.5 rounded-full motion-safe:animate-typing ${dotClassName}`} style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

export function PulseDot({ className = "bg-brand" }) {
  return (
    <span aria-hidden className="relative flex h-1.5 w-1.5 shrink-0">
      <span className={`absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping ${className}`} />
      <span className={`relative h-1.5 w-1.5 rounded-full ${className}`} />
    </span>
  );
}

// 3D tilt driven by the mouse position over the element. Touch and reduced-motion visitors get a still element.
export function useTilt(maxDegrees = 6) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(smoothY, latest => latest * -maxDegrees);
  const rotateY = useTransform(smoothX, latest => latest * maxDegrees);

  const handlers = reduceMotion
    ? {}
    : {
        onPointerMove(event) {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left) / rect.width - 0.5);
          y.set((event.clientY - rect.top) / rect.height - 0.5);
        },
        onPointerLeave() {
          x.set(0);
          y.set(0);
        }
      };

  return { handlers, rotateX, rotateY, pointerX: smoothX, pointerY: smoothY };
}
