import ButtonLink from "@/components/common/ButtonLink";
import { markPath, markViewBox } from "@/data/ormitechMark";

export default function SimpleCTA({
  title = "Ready to modernize customer communication?",
  text = "Start with the channels you use today and build toward a smarter workflow for your team.",
  primaryLabel = "Talk to our team",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-brand/15 bg-[#FFF4F6] px-6 py-10 sm:px-12 sm:py-14">
          <div aria-hidden className="red-glow absolute -right-24 -top-32 h-96 w-96 opacity-60" />
          <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-brandInk ring-1 ring-brand/15">OrmiTech IT</span>
              <h2 id="cta-title" className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-navy sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primaryHref} arrow>{primaryLabel}</ButtonLink>
                {secondaryHref && <ButtonLink href={secondaryHref} variant="secondary">{secondaryLabel}</ButtonLink>}
              </div>
            </div>
            <div aria-hidden className="group hidden h-40 w-40 items-center justify-center rounded-full bg-white shadow-[0_24px_48px_-24px_rgba(242,13,69,.45)] ring-8 ring-brand/[.06] transition-[box-shadow] duration-500 hover:shadow-[0_32px_60px_-24px_rgba(242,13,69,.6)] motion-safe:animate-float md:flex">
              <svg viewBox={markViewBox} className="h-20 w-20 text-brand transition-transform duration-500 motion-safe:group-hover:rotate-[-8deg] motion-safe:group-hover:scale-110">
                <path d={markPath} fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
