"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sora } from "@/styles/fonts";

const letters = ["O", "R", "M", "I", "T", "E", "C", "H"];
const WAVE = 5.5;

// The big OrmiTech word behind the footer. A soft red glow travels across the letters from left to right, over and over,
// and the letters rise into place the first time it scrolls into view.
export default function FooterWordmark() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px" });

  return (
    <div ref={ref} aria-hidden className={`${sora.className} relative top-6 flex h-full items-end justify-end whitespace-nowrap pb-0 text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-none tracking-[-.08em]`}>
      {letters.map((letter, index) => {
        const isMark = letter === "I";
        return (
          <motion.span
            key={index}
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block"
          >
            <motion.span
              className="inline-block"
              style={{ color: isMark ? "rgba(242,13,69,.45)" : "rgba(255,255,255,.07)" }}
              animate={
                inView
                  ? {
                      color: [isMark ? "rgba(242,13,69,.45)" : "rgba(255,255,255,.07)", "rgba(255,92,133,.95)", isMark ? "rgba(242,13,69,.45)" : "rgba(255,255,255,.07)"],
                      textShadow: ["0 0 0 rgba(242,13,69,0)", "0 0 38px rgba(242,13,69,.85), 0 0 90px rgba(242,13,69,.45)", "0 0 0 rgba(242,13,69,0)"]
                    }
                  : undefined
              }
              transition={{ duration: 1.8, delay: index * 0.28, repeat: Infinity, repeatDelay: WAVE - 1.8 - 0.28 * 7 > 0 ? WAVE - 1.8 - 0.28 * 7 : 1.2, ease: "easeInOut" }}
            >
              {letter}
            </motion.span>
          </motion.span>
        );
      })}
    </div>
  );
}
