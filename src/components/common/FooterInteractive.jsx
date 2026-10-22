"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, X, Youtube } from "@thesvg/react";
import { AnimatePresence, motion } from "framer-motion";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.create("a");
const isExternal = href => href.startsWith("http");

// Full-colour official brand marks (thesvg.org "default" variant) and the glow each button takes on hover.
const BRANDS = {
  Facebook: [Facebook, "#1877F2"],
  Instagram: [Instagram, "#E1306C"],
  LinkedIn: [Linkedin, "#0A66C2"],
  YouTube: [Youtube, "#FF0000"],
  X: [X, "#FFFFFF"]
};

const spring = { type: "spring", stiffness: 420, damping: 22 };

// Footer text link: slides right and draws an underline on hover, presses in and flashes red when clicked.
export function FooterLink({ href, children }) {
  const Tag = isExternal(href) ? MotionAnchor : MotionLink;
  return (
    <Tag
      href={href}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.95, x: 6, color: "#FF5C85" }}
      transition={spring}
      className="group/link relative inline-block text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      {children}
      <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand to-[#FF5C85] transition-transform duration-300 group-hover/link:scale-x-100" />
    </Tag>
  );
}

// The footer logo: a white-lettered copy of the logo, straight on the black footer.
export function FooterBrand() {
  return (
    <MotionLink href="/" aria-label="OrmiTech IT home" whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.94, rotate: -2 }} transition={spring} className="relative inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/50">
      <Image src="/images/ormitech-logo-dark.webp" alt="OrmiTech IT" width={480} height={135} className="h-14 w-auto object-contain drop-shadow-[0_8px_24px_rgba(242,13,69,.35)]" />
    </MotionLink>
  );
}

// One social button. Hover lifts it and fills it with the brand colour; a click sends out a ring.
function Social({ name, href }) {
  const [Brand, glow] = BRANDS[name];
  const [burst, setBurst] = useState(0);

  return (
    <li className="relative">
      <MotionAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label={`OrmiTech on ${name}`}
        onClick={() => setBurst(value => value + 1)}
        whileHover={{ y: -6, rotate: -6, scale: 1.08 }}
        whileTap={{ scale: 0.88, rotate: 0 }}
        transition={spring}
        style={{ "--glow": glow }}
        className="group/social relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[.06] ring-1 ring-white/15 backdrop-blur transition-[background-color,box-shadow] duration-300 hover:bg-[color-mix(in_srgb,var(--glow)_22%,transparent)] hover:shadow-[0_0_0_1px_var(--glow),0_16px_32px_-10px_var(--glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-[0_6px_14px_-8px_rgba(0,0,0,.8)]">
          <Brand aria-hidden variant="default" className="h-[22px] w-[22px]" />
        </span>
        <AnimatePresence>
          {burst > 0 && <motion.span key={burst} aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-2" style={{ "--tw-ring-color": glow }} initial={{ scale: 1, opacity: 0.9 }} animate={{ scale: 1.9, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} />}
        </AnimatePresence>
        <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1.5 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0B0D12] opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover/social:translate-y-0 group-hover/social:opacity-100">
          {name}
        </span>
      </MotionAnchor>
    </li>
  );
}

export function FooterSocials({ profiles }) {
  return (
    <ul className="flex items-center gap-3.5">
      {profiles.map(([name, href]) => (
        <Social key={name} name={name} href={href} />
      ))}
    </ul>
  );
}
