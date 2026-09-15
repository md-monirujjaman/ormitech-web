"use client";

import { motion } from "framer-motion";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { bigPicture } from "@/data/howItWorks";
import { markPath, markViewBox } from "@/data/ormitechMark";
import FlowLine from "./FlowLine";

const nodeVariants = {
  hidden: { opacity: 0, y: 14 },
  show: index => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.15 + index * 0.14, ease } })
};

// Horizontal pipeline on desktop, vertical flow on smaller screens.
export default function BigPicture() {
  const { nodes } = bigPicture;
  const lastIndex = nodes.length - 1;

  return (
    <section id="big-picture" aria-labelledby="big-picture-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="big-picture-title" align="center" eyebrow={bigPicture.eyebrow} title={bigPicture.title} description={bigPicture.description} />
        </Reveal>

        <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mx-auto mt-14 grid max-w-md lg:max-w-none lg:grid-cols-7">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.li
                key={`${node.title}-${index}`}
                custom={index}
                variants={nodeVariants}
                className="group relative flex items-center gap-4 pb-8 last:pb-0 lg:flex-col lg:gap-3 lg:px-2 lg:pb-0 lg:text-center"
              >
                {index < lastIndex && <FlowLine className="absolute bottom-0 left-7 top-14 lg:hidden" delay={index * 0.3} />}
                {index > 0 && <FlowLine direction="horizontal" className="absolute right-1/2 top-7 hidden w-full lg:block" delay={index * 0.3} />}
                <span
                  aria-hidden
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-[transform,border-color] duration-300 motion-safe:group-hover:-translate-y-1 ${
                    node.hub
                      ? "bg-brand text-white shadow-[0_14px_30px_-12px_rgba(242,13,69,.7)]"
                      : "border border-slate-200/80 bg-white text-brand shadow-[0_10px_24px_-18px_rgba(13,27,61,.4)] group-hover:border-brand/30"
                  }`}
                >
                  {node.hub ? (
                    <svg viewBox={markViewBox} className="h-6 w-6">
                      <path d={markPath} fill="currentColor" />
                    </svg>
                  ) : (
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-navy">{node.title}</span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-slate-500">{node.text}</span>
                </span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
