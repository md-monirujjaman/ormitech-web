import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, siteUrl } from "@/data/site";
import { relatedLabels } from "@/data/solutions";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ButtonLink from "@/components/common/ButtonLink";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, defaultOgImage, faqSchema, metaDescription } from "@/lib/seo";

export const dynamicParams = false;

// Optional inline markup for posts that use it: **bold** and [anchor](url). Plain text passes through unchanged.
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={index} className="font-semibold text-navy">{bold[1]}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (!link) return part;
    const [, label, href] = link;
    const className = "font-medium text-brandInk underline decoration-brand/30 underline-offset-4 transition-colors hover:text-navy";
    return href.startsWith("/") ? (
      <Link key={index} href={href} className={className}>{label}</Link>
    ) : (
      <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
    );
  });
}

function PostImage({ image, priority = false }) {
  return (
    <figure className="my-8">
      {/* Cloudinary URLs are used exactly as provided; width/height reserve space to prevent layout shift. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-auto w-full rounded-2xl border border-slate-200/70"
      />
      {image.caption && <figcaption className="mt-3 text-center text-sm text-black/45">{image.caption}</figcaption>}
    </figure>
  );
}

function Block({ block }) {
  if (block.p) return <p className="mt-4">{renderInline(block.p)}</p>;
  if (block.h3) return <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy">{block.h3}</h3>;
  if (block.image) return <PostImage image={block.image} />;
  if (block.ul) return <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brand">{block.ul.map(item => <li key={item}>{renderInline(item)}</li>)}</ul>;
  if (block.ol) return <ol className="mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand">{block.ol.map(item => <li key={item}>{renderInline(item)}</li>)}</ol>;
  if (block.table) {
    const { caption, headers, rows } = block.table;
    return (
      <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="w-full min-w-[340px] border-collapse text-left text-[14px] sm:text-[15px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-slate-50">
            <tr>{headers.map((header, index) => <th key={index} scope="col" className="px-3 py-3 font-semibold text-navy sm:px-4">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(row => (
              <tr key={row[0]}>
                {row.map((cell, index) => (index === 0 ? <th key={index} scope="row" className="px-3 py-3 font-semibold text-navy sm:px-4">{cell}</th> : <td key={index} className="px-3 py-3 sm:px-4">{cell}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

function Section({ section }) {
  return (
    <section key={section.heading}>
      <h2 className="text-2xl font-semibold tracking-tight text-navy">{section.heading}</h2>
      {section.blocks?.map((block, index) => <Block key={index} block={block} />)}
      {section.paragraphs?.map(text => <p key={text} className="mt-4">{text}</p>)}
      {section.list && (
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brand">
          {section.list.map(item => <li key={item}>{item}</li>)}
        </ul>
      )}
    </section>
  );
}

export function generateStaticParams() { return blogPosts.map(p => ({ slug: p.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDescription || metaDescription(post.answer),
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    ...(post.image ? { image: { url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt } } : {})
  });
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }];
  const language = post.lang || "en";
  const nodes = [
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#article`,
      headline: post.title,
      description: post.metaDescription || post.answer,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: language,
      mainEntityOfPage: absoluteUrl(path),
      image: post.image ? post.image.src : `${siteUrl}${defaultOgImage.url}`,
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` }
    },
    breadcrumbSchema(crumbs),
    ...(post.faq ? [faqSchema(post.faq)] : [])
  ];
  const related = (post.related || []).map(href => ({ href, ...relatedLabels[href] })).filter(item => item.title);

  return (
    <>
      <JsonLd nodes={nodes} />
      <Navbar />
      <main lang={post.lang} className="container-x max-w-3xl pt-36 pb-24">
        <Breadcrumbs items={crumbs} className="mb-6" />
        <p className="text-sm text-brand">{post.category} · <time dateTime={post.date}>{post.date}</time></p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        {post.image && <PostImage image={post.image} priority />}
        <p className="mt-6 rounded-2xl border border-brand/15 bg-brand/[.04] p-5 text-lg leading-8 text-black/70">{post.answer}</p>
        <article className="mt-10 space-y-10 text-base leading-8 text-black/65">
          {post.intro?.map(text => <p key={text}>{renderInline(text)}</p>)}
          {post.sections.map(section => <Section key={section.heading} section={section} />)}
          {post.faq && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">{post.faqHeading || (language === "bn" ? "প্রশ্নোত্তর" : "FAQ")}</h2>
              <dl className="mt-4 space-y-5">
                {post.faq.map(item => (
                  <div key={item.question}>
                    <dt className="font-semibold text-navy">{item.question}</dt>
                    <dd className="mt-1">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {post.closing?.map(section => <Section key={section.heading} section={section} />)}
        </article>
        {post.cta && (
          <aside className="mt-10 rounded-2xl border border-brand/15 bg-[#FFF4F6] p-6 sm:p-8">
            <p className="text-base leading-8 text-black/70">{post.cta.text}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={post.cta.href} arrow>{post.cta.label}</ButtonLink>
              {post.cta.secondaryHref && <ButtonLink href={post.cta.secondaryHref} variant="secondary">{post.cta.secondaryLabel}</ButtonLink>}
            </div>
          </aside>
        )}
        {related.length > 0 && (
          <aside className="mt-14 border-t border-slate-200/70 pt-8">
            <h2 className="text-lg font-semibold text-navy">{language === "bn" ? "আরও পড়ুন ও দেখুন" : "Related on OrmiTech"}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-xl border border-slate-200/80 p-4 transition hover:border-brand/30">
                    <span className="font-semibold text-navy">{item.title}</span>
                    <span className="mt-1 block text-sm text-black/50">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
      <Footer />
    </>
  );
}
