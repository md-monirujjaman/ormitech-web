import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/common/PageHero";

/**
 * Shared layout for the legal pages (/privacy, /terms, /data-deletion).
 *
 * Content comes from `src/data/legalPolicies.js` as plain blocks, so a page file stays a few lines. Text wrapped in
 * [[double brackets]] is an unconfirmed placeholder and is rendered highlighted, so it is obvious on the page
 * until the business owner replaces it.
 */

const PLACEHOLDER = /\[\[(.+?)\]\]/g;

function Text({ children }) {
  if (typeof children !== "string") return children;
  const parts = children.split(PLACEHOLDER);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded bg-brand/10 px-1.5 py-0.5 font-semibold text-brandInk decoration-brand/40 underline-offset-2">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function Block({ block }) {
  if (block.sub) {
    return <h3 className="mt-7 text-base font-semibold tracking-[-.01em] text-navy">{block.sub}</h3>;
  }

  if (block.note) {
    return (
      <p className="mt-5 rounded-2xl border border-brand/15 bg-brand/[0.04] p-4 text-[15px] leading-7 text-black/65 sm:p-5">
        <Text>{block.note}</Text>
      </p>
    );
  }

  if (block.ul) {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.ul.map(item => (
          <li key={item} className="flex gap-3 text-[15px] leading-7 text-black/60 sm:text-base">
            <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span>
              <Text>{item}</Text>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.ol) {
    return (
      <ol className="mt-4 space-y-3">
        {block.ol.map((item, index) => (
          <li key={item} className="flex gap-3 text-[15px] leading-7 text-black/60 sm:text-base">
            <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
              {index + 1}
            </span>
            <span>
              <Text>{item}</Text>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.link) {
    return (
      <p className="mt-5">
        <Link
          href={block.link.href}
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brandInk underline decoration-brand/30 underline-offset-4 transition-colors hover:text-navy"
        >
          {block.link.label}
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-4 text-[15px] leading-7 text-black/60 sm:text-base sm:leading-8">
      <Text>{block.p}</Text>
    </p>
  );
}

export default function LegalDocument({ document }) {
  const { eyebrow, title, description, updated, updatedISO, effective, intro, sections } = document;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <div className="container-x py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2"
              >
                <ArrowLeft aria-hidden className="h-4 w-4" />
                Back to home
              </Link>

              <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-slate-400">Last updated</p>
              <time className="mt-1 block text-sm font-semibold text-navy" dateTime={updatedISO}>{updated}</time>
              {effective && <p className="mt-4 text-xs font-bold uppercase tracking-[.18em] text-slate-400">Effective date</p>}
              {effective && <time className="mt-1 block text-sm font-semibold text-navy" dateTime={updatedISO}>{effective}</time>}

              <nav aria-label="On this page" className="mt-6 hidden border-t border-slate-200/70 pt-5 lg:block">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">On this page</p>
                <ul className="mt-3 space-y-2 lg:max-h-[52vh] lg:overflow-y-auto lg:pr-2">
                  {sections.map(section => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block text-[13px] leading-6 text-slate-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <details className="mt-6 border-t border-slate-200/70 pt-4 lg:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40">
                  On this page <span aria-hidden="true" className="ml-1 text-slate-400">＋</span>
                </summary>
                <nav aria-label="On this page" className="pt-3">
                  <ul className="space-y-1.5">
                    {sections.map(section => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="block rounded-lg py-1.5 text-sm leading-5 text-slate-600 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40">
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            </div>
          </aside>

          <article className="min-w-0 lg:col-span-8 xl:col-span-9">
            <p className="text-lg leading-8 text-black/65">{intro}</p>

            {sections.map(section => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mt-10 scroll-mt-28 border-t border-slate-200/70 pt-10">
                <h2 id={`${section.id}-heading`} className="text-2xl font-bold tracking-[-.025em] text-navy sm:text-[28px]">{section.heading}</h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
