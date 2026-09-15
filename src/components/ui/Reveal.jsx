"use client";

import { MotionConfig, motion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

const viewport = { once: true, margin: "-60px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
};

export const fadeRight = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } }
};

// Respects the visitor's reduced-motion setting for every animation inside.
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Subtle fade-up when the element scrolls into view.
export default function Reveal({ as = "div", delay = 0, className, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.4, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

// Reveals its StaggerItem children one after another when it scrolls into view.
export function Stagger({ as = "div", stagger = 0.08, delay = 0, className, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", variants = fadeUp, className, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component variants={variants} className={className} {...props}>
      {children}
    </Component>
  );
}
