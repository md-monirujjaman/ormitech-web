import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostMeta, { CategoryLabel, PostImage } from "./postMeta";

/** The newest post as a large image card, with up to three of the next newest beside it. */
export default function FeaturedPosts({ lead, side }) {
  return (
    <section aria-label="Featured articles" className="container-x mt-8">
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Link href={`/blog/${lead.slug}`} className="group relative isolate flex min-h-[340px] overflow-hidden rounded-2xl bg-navy lg:min-h-[420px]">
          <PostImage post={lead} priority className="absolute inset-0 -z-20 h-full w-full transition duration-500 motion-safe:group-hover:scale-[1.03]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1230] via-[#0A1230]/70 to-[#0A1230]/10" />
          <span className="absolute left-5 top-5 rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-white">{lead.category}</span>
          <div className="mt-auto w-full p-6 pr-20 sm:p-8 sm:pr-24">
            <h2 className="max-w-lg text-2xl font-extrabold leading-tight text-white sm:text-[28px]">{lead.title}</h2>
            <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-white/80">{lead.excerpt}</p>
            <PostMeta post={lead} light className="mt-4" />
          </div>
          <span aria-hidden className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_24px_-8px_rgba(242,13,69,.9)] transition motion-safe:group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>

        {side.length > 0 && (
          <div className="flex flex-col gap-4">
            {side.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-1 gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 transition hover:border-brand/30 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.4)] motion-safe:hover:-translate-y-0.5">
                <PostImage post={post} className="aspect-[4/3] w-28 shrink-0 rounded-xl sm:w-32" />
                <div className="flex min-w-0 flex-col justify-center py-1">
                  <CategoryLabel>{post.category}</CategoryLabel>
                  <h3 className="mt-1.5 line-clamp-3 text-[15px] font-bold leading-snug text-navy">{post.title}</h3>
                  <PostMeta post={post} className="mt-2.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
