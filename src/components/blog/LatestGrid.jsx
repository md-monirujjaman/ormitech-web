import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostMeta, { PostImage } from "./postMeta";

/** A grid of post cards. Used for the full list and for filtered results. */
export default function LatestGrid({ id, eyebrow, heading, posts, action }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="container-x mt-12 scroll-mt-28">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-brand">
            <span aria-hidden className="h-0.5 w-6 bg-brand" />
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="mt-2 text-2xl font-black tracking-[-.02em] text-navy">{heading}</h2>
        </div>
        {action}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition hover:border-brand/30 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.4)] motion-safe:hover:-translate-y-1">
            <div className="relative">
              <PostImage post={post} className="aspect-[16/9] w-full" />
              <span className="absolute bottom-3 left-3 rounded-md bg-brand px-2 py-1 text-[10px] font-bold uppercase tracking-[.06em] text-white">{post.category}</span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-navy group-hover:text-brandInk">{post.title}</h3>
              <PostMeta post={post} className="mt-auto pt-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ViewAllLink({ href }) {
  return (
    <a href={href} className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand hover:text-brandInk">
      View all articles <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </a>
  );
}
