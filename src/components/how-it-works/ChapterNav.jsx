"use client";

import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/howItWorks";

// Sticky chapter bar under the site navbar. Highlights the chapter currently in the middle of the screen.
export default function ChapterNav() {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    const sections = chapters.map(chapter => document.getElementById(chapter.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Keep the active chip visible when the bar scrolls horizontally on small screens.
  useEffect(() => {
    const list = listRef.current;
    const link = active && list?.querySelector(`[data-chapter="${active}"]`);
    if (!link) return;
    list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="How it works chapters" className="sticky top-20 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="container-x">
        <ol ref={listRef} className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-between">
          {chapters.map((chapter, index) => {
            const isActive = chapter.id === active;
            return (
              <li key={chapter.id} className="shrink-0">
                <a
                  href={`#${chapter.id}`}
                  data-chapter={chapter.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    isActive ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100 hover:text-navy"
                  }`}
                >
                  <span className={`text-[11px] font-bold tabular-nums ${isActive ? "text-white/80" : "text-slate-400 group-hover:text-brandInk"}`}>{String(index + 1).padStart(2, "0")}</span>
                  {chapter.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
