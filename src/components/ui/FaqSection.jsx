"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessagesSquare } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Reveal, { ease } from "./Reveal";
import SectionHeading from "./SectionHeading";

function FaqItem({ item, open, onToggle, id }) {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <li className={`rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${open ? "border-brand/25 shadow-[0_18px_36px_-28px_rgba(13,27,61,.35)]" : "border-slate-200/80 hover:border-slate-300"}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[15px] font-semibold text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:px-6 sm:py-5"
        >
          <span className="transition-colors duration-200 group-hover:text-brandInk">{item.question}</span>
          <span
            aria-hidden
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ${open ? "rotate-180 bg-brand text-white" : "bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand"}`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-6 text-slate-600 sm:px-6">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// Accordion FAQ with a "still have questions" card. Several answers can be open at once; the first starts open.
export default function FaqSection({ id = "faq", eyebrow, title, description, items, contactText = "Tell us what you want to connect and automate." }) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  function toggle(index) {
    setOpenItems(current => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
            <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/[.08] text-brand">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-navy">Still have questions?</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{contactText}</p>
              <ButtonLink href="/contact" size="sm" variant="secondary" arrow className="mt-4">
                Talk to our team
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <FaqItem key={item.question} id={`${baseId}-faq-${index}`} item={item} open={openItems.has(index)} onToggle={() => toggle(index)} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
