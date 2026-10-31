import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PostBody from "./PostBody";
import { CategoryLabel, formatPostDate, PostImage } from "./postMeta";
import { toCard } from "@/lib/blog";

const DAY_MS = 86_400_000;

/** The article page: header, direct answer, key points, contents, body, questions, call to action and related reads. */
export default function PostView({ post, crumbs }) {
  const language = post.lang || "en";
  const published = post.publishedAt ?? post.updatedAt;
  const updated = new Date(post.updatedAt).getTime() - new Date(published).getTime() > DAY_MS;
  const related = (post.related ?? []).map(toCard);
  const showContents = post.headings.length >= 3;

  return (
    <main lang={language} className="container-x max-w-3xl pt-36 pb-24">
      <Breadcrumbs items={crumbs} className="mb-6" />
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
        <CategoryLabel>{post.category}</CategoryLabel>
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-brand" aria-hidden /><time dateTime={published}>{formatPostDate(published)}</time></span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand" aria-hidden />{post.readingMinutes} min read</span>
        {updated && <span>Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time></span>}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{post.title}</h1>
      {post.excerpt && <p className="mt-4 text-lg leading-8 text-black/60">{post.excerpt}</p>}
      <p className="mt-4 text-sm text-slate-500">By <span className="font-medium text-navy">{post.authorName}</span></p>

      {post.coverImage && (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            width={post.coverImage.width ?? undefined}
            height={post.coverImage.height ?? undefined}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full rounded-2xl border border-slate-200/70"
          />
        </figure>
      )}

      {post.answer && (
        <div data-speakable className="mt-6 rounded-2xl border border-brand/15 bg-brand/[.04] p-5">
          <p className="text-xs font-bold uppercase tracking-[.08em] text-brand">{language === "bn" ? "সংক্ষেপে উত্তর" : "The short answer"}</p>
          <p className="mt-2 text-lg leading-8 text-black/70">{post.answer}</p>
        </div>
      )}

      {post.keyTakeaways.length > 0 && (
        <section data-speakable aria-labelledby="takeaways" className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5">
          <h2 id="takeaways" className="text-base font-semibold text-navy">{language === "bn" ? "মূল কথা" : "Key takeaways"}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-black/65 marker:text-brand">
            {post.keyTakeaways.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </section>
      )}

      {showContents && (
        <nav aria-label="Contents" className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
          <p className="text-base font-semibold text-navy">{language === "bn" ? "এই লেখায়" : "In this article"}</p>
          <ol className="mt-3 space-y-2 text-sm">
            {post.headings.map(heading => (
              <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
                <a href={`#${heading.id}`} className="text-black/60 transition-colors hover:text-brandInk">{heading.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <article className="mt-6 text-base leading-8 text-black/65">
        <PostBody doc={post.content} headings={post.headings} />
      </article>

      {post.faq.length > 0 && (
        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="text-2xl font-semibold tracking-tight text-navy">{language === "bn" ? "প্রশ্নোত্তর" : "Frequently asked questions"}</h2>
          <dl className="mt-4 space-y-5">
            {post.faq.map((item, index) => (
              <div key={index}>
                <dt className="font-semibold text-navy">{item.question}</dt>
                <dd className="mt-1 leading-7 text-black/65">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {post.cta && (
        <aside className="mt-12 rounded-2xl border border-brand/15 bg-[#FFF4F6] p-6 sm:p-8">
          <p className="text-base leading-8 text-black/70">{post.cta.text}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={post.cta.href} arrow>{post.cta.label}</ButtonLink>
            {post.cta.secondaryHref && post.cta.secondaryLabel && <ButtonLink href={post.cta.secondaryHref} variant="secondary">{post.cta.secondaryLabel}</ButtonLink>}
          </div>
        </aside>
      )}

      {related.length > 0 && (
        <aside aria-labelledby="related" className="mt-14 border-t border-slate-200/70 pt-8">
          <h2 id="related" className="text-lg font-semibold text-navy">{language === "bn" ? "আরও পড়ুন" : "Keep reading"}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map(item => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition hover:border-brand/30 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.4)]">
                  <PostImage post={item} className="aspect-[16/9] w-full" />
                  <span className="flex flex-1 flex-col p-4">
                    <CategoryLabel>{item.category}</CategoryLabel>
                    <span className="mt-1.5 line-clamp-3 text-[15px] font-bold leading-snug text-navy group-hover:text-brandInk">{item.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-brandInk">Read<ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
