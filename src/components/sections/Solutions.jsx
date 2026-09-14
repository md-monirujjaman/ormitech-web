"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TAB_DURATION = 3;

const tabs = [
  { title: "Increased Sales", text: "OrmiTech attends to your customers’ queries 24/7 and helps you close more sales." },
  { title: "Instant Replies", text: "OrmiTech instantly answers across all your platforms and organizes the messages for you." },
  { title: "Increased Productivity", text: "OrmiTech handles customers all day, so you can focus on growing your business." }
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoplay(false);
      video?.pause();
      return;
    }
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  const select = index => {
    setActive(index);
    setCycle(c => c + 1);
  };

  return (
    <section id="solutions" className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand/20 bg-brand/[.06] px-3 py-1 text-xs font-semibold uppercase tracking-[.16em] text-brand">Solutions</span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-4xl lg:text-5xl">
            OrmiTech replies to all of your customers so you can focus on growth
          </h2>
          <p className="mt-4 text-lg text-black/60 sm:text-xl">Just like your superhuman sales agent</p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div role="tablist" aria-label="OrmiTech solutions" className="relative">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-black/[.08]" />
            {tabs.map((tab, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tab.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="solutions-panel"
                  onClick={() => select(i)}
                  className="relative block w-full py-5 pl-7 text-left sm:py-6 sm:pl-8"
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] overflow-hidden rounded-full">
                    {isActive && (autoplay ? (
                      <motion.span
                        key={cycle}
                        className="block w-full rounded-full bg-brand"
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: TAB_DURATION, ease: "linear" }}
                        onAnimationComplete={() => select((i + 1) % tabs.length)}
                      />
                    ) : (
                      <span className="block h-full w-full rounded-full bg-brand" />
                    ))}
                  </span>
                  <span className={`block text-lg font-semibold transition-colors duration-300 ${isActive ? "text-[#0B0D12]" : "text-black/55"}`}>{tab.title}</span>
                  <span className={`mt-2 block text-base leading-7 transition-colors duration-300 ${isActive ? "text-black/65" : "text-black/40"}`}>{tab.text}</span>
                </button>
              );
            })}
          </div>

          <div id="solutions-panel" role="tabpanel" className="mx-auto w-full max-w-[400px] rounded-[28px] bg-[#F4F5F7] p-3 sm:p-4">
            <div className="overflow-hidden rounded-2xl border border-black/[.08] bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,.45)]">
              <div className="flex items-center gap-1.5 border-b border-black/[.08] bg-black/[.02] px-3.5 py-2.5">
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="mx-auto font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">ormitech · live replies</span>
              </div>
              <video
                ref={videoRef}
                className="block aspect-[414/474] w-full bg-black object-cover object-center"
                src="/tumi_banai_dao.mp4"
                autoPlay={autoplay}
                muted
                loop
                playsInline
                preload="metadata"
                controls={!autoplay}
                aria-label="OrmiTech replying to customer messages"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
