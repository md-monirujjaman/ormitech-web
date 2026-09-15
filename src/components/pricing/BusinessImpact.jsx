import { Check, X } from "lucide-react";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { impact } from "@/data/pricing";

// Before / after comparison. No numbers: the site has no measured results to quote.
export default function BusinessImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="impact-title" align="center" eyebrow={impact.eyebrow} title={impact.title} description={impact.description} />
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_32px_64px_-44px_rgba(13,27,61,.4)]">
          <div className="hidden grid-cols-2 border-b border-slate-100 sm:grid">
            <p className="px-6 py-4 text-[12px] font-bold uppercase tracking-[.14em] text-slate-500">Without OrmiTech</p>
            <p className="border-l border-slate-100 bg-brand/[.03] px-6 py-4 text-[12px] font-bold uppercase tracking-[.14em] text-brandInk">With OrmiTech</p>
          </div>
          <Stagger as="ul" stagger={0.08} className="divide-y divide-slate-100">
            {impact.rows.map(([before, after]) => (
              <StaggerItem as="li" key={before} className="group grid transition-colors duration-300 hover:bg-slate-50/60 sm:grid-cols-2">
                <p className="flex items-start gap-3 px-6 py-4 text-[15px] text-slate-500">
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="sr-only">Without OrmiTech: </span>
                    {before}
                  </span>
                </p>
                <p className="flex items-start gap-3 bg-brand/[.03] px-6 py-4 text-[15px] font-medium text-navy transition-colors duration-300 group-hover:bg-brand/[.06] sm:border-l sm:border-slate-100">
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 motion-safe:group-hover:scale-110">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="sr-only">With OrmiTech: </span>
                    {after}
                  </span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
