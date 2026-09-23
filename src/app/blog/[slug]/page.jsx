import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, siteUrl } from "@/data/site";
import { relatedLabels } from "@/data/solutions";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, defaultOgImage, faqSchema, metaDescription } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() { return blogPosts.map(p => ({ slug: p.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: metaDescription(post.answer), path: `/blog/${post.slug}`, type: "article", publishedTime: post.date });
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
      description: post.answer,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: language,
      mainEntityOfPage: absoluteUrl(path),
      image: `${siteUrl}${defaultOgImage.url}`,
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
        <p className="mt-6 rounded-2xl border border-brand/15 bg-brand/[.04] p-5 text-lg leading-8 text-black/70">{post.answer}</p>
        <article className="mt-10 space-y-10 text-base leading-8 text-black/65">
          {post.sections.map(section => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">{section.heading}</h2>
              {section.paragraphs?.map(text => <p key={text} className="mt-4">{text}</p>)}
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brand">
                  {section.list.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
          {post.faq && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-navy">{language === "bn" ? "প্রশ্নোত্তর" : "FAQ"}</h2>
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
        </article>
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
