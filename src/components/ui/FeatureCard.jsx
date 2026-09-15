import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "./effects";
import { IconTile } from "./SectionHeading";

// Feature card with spotlight hover. `feature.href` can be an in-page anchor ("#id") or a route ("/features").
export default function FeatureCard({ feature }) {
  const LinkComponent = feature.href.startsWith("/") ? Link : "a";

  return (
    <Spotlight
      as="article"
      className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] motion-safe:hover:-translate-y-1.5"
    >
      <IconTile icon={feature.icon} interactive />
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-navy">{feature.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{feature.text}</p>
      <LinkComponent
        href={feature.href}
        aria-label={`Learn more about ${feature.title}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-brandInk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        <span className="bg-gradient-to-r from-brandInk to-brandInk bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-px transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">Learn more</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </LinkComponent>
    </Spotlight>
  );
}
