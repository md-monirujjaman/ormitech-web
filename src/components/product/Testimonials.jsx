"use client";

import { Quote, Star } from "lucide-react";
import Initials from "@/components/ui/Initials";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/product";

// Renders only when real customer quotes exist in data/product.js.
export default function Testimonials() {
  if (testimonials.items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="testimonials-title" align="center" eyebrow={testimonials.eyebrow} title={testimonials.title} />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal as="li" key={`${item.name}-${index}`} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] motion-safe:hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <Quote aria-hidden className="h-6 w-6 text-brand" />
                  {item.rating && (
                    <span role="img" aria-label={`Rated ${item.rating} out of 5`} className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, star) => (
                        <Star key={star} aria-hidden className={`h-4 w-4 ${star < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </span>
                  )}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-slate-700">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Initials name={item.name} className="h-10 w-10 text-xs" />
                  <span>
                    <span className="block text-sm font-semibold text-navy">{item.name}</span>
                    <span className="block text-xs text-slate-500">{[item.role, item.company].filter(Boolean).join(", ")}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
