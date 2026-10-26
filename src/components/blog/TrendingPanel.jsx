import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostMeta, { CategoryLabel, PostImage } from "./postMeta";

/** A soft pink panel: one highlighted post and a numbered list. Both come from the real posts, newest first. */
export default function TrendingPanel({ highlight, list }) {
  return (
    <section aria-labelledby="trending-heading" className="container-x mt-10">
      <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-[#FFF1F5] via-[#FFF7F9] to-white p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-brand">
            <span aria-hidden className="h-0.5 w-6 bg-brand" />
            Trending insights
          </p>
          <h2 id="trending-heading" className="mt-3 text-3xl font-black leading-tight tracking-[-.02em] text-navy">What&apos;s new and trending in customer communication</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Stay up to date with the latest articles on AI support, omnichannel inboxes and human handover.</p>
          <a href="#latest-articles" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(242,13,69,.8)] transition hover:bg-brand2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25">
            View all articles <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <Link href={`/blog/${highlight.slug}`} className="group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-26px_rgba(13,27,61,.35)] transition motion-safe:hover:-translate-y-0.5 sm:flex-row">
          <PostImage post={highlight} className="aspect-[4/3] w-full shrink-0 rounded-xl sm:w-40" />
          <div className="min-w-0">
            <CategoryLabel>{highlight.category}</CategoryLabel>
            <h3 className="mt-1.5 text-base font-bold leading-snug text-navy">{highlight.title}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{highlight.excerpt}</p>
            <PostMeta post={highlight} className="mt-3" />
          </div>
        </Link>

        <div>
          <h3 className="text-sm font-bold text-navy">Top Reads</h3>
          <ol className="mt-3 space-y-3.5">
            {list.map((post, index) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-white text-xs font-bold text-brand">{index + 1}</span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[13px] font-semibold leading-snug text-navy group-hover:text-brandInk">{post.title}</span>
                    <PostMeta post={post} className="mt-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
