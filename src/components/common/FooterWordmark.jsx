"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sora } from "@/styles/fonts";

// The big OrmiTech word behind the footer. It settles into place once when it scrolls into view, then a soft band of
// light passes over it every few seconds. Quiet on purpose: it is a backdrop, not the main act.
export default function FooterWordmark() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px" });

  return (
    <div ref={ref} aria-hidden className={`${sora.className} relative flex h-full items-end justify-end whitespace-nowrap pb-0 text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-none tracking-[-.08em]`}>
      <motion.span
        initial={{ y: "28%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        <motion.span
          className="inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(105deg, rgba(255,255,255,.07) 38%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.07) 62%)",
            backgroundSize: "260% 100%",
            backgroundPositionX: "130%",
            WebkitBackgroundClip: "text"
          }}
          animate={inView ? { backgroundPositionX: ["130%", "-30%"] } : undefined}
          transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.5, delay: 1.2 }}
        >
          ORM<span style={{ color: "rgba(242,13,69,.38)" }}>I</span>TECH
        </motion.span>
      </motion.span>
    </div>
  );
}
