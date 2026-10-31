import { notFound } from "next/navigation";
import { siteUrl } from "@/data/site";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/seo/JsonLd";
import PostView from "@/components/blog/PostView";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { absoluteUrl, breadcrumbSchema, buildMetadata, defaultOgImage, faqSchema, metaDescription } from "@/lib/seo";

// Articles come from the admin panel. Known ones are built ahead of time; a new one is built on its first visit,
// and every page is refreshed in the background about a minute after it changes.
// A literal, because Next reads this value without running the file. Keep it equal to BLOG_REVALIDATE_SECONDS in lib/blog.js.
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const description = post => metaDescription(post.seo.description || post.excerpt || post.answer || post.title);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const picture = post.seo.ogImageUrl
    ? { url: post.seo.ogImageUrl, alt: post.coverImage?.alt || post.title }
    : post.coverImage
      ? { url: post.coverImage.url, alt: post.coverImage.alt || post.title, ...(post.coverImage.width && post.coverImage.height ? { width: post.coverImage.width, height: post.coverImage.height } : {}) }
      : undefined;
  return buildMetadata({
    title: post.seo.title || post.title,
    // A title the writer chose for search is used as written, without the site name added after it.
    absoluteTitle: Boolean(post.seo.title),
    description: description(post),
    path: `/blog/${post.slug}`,
    canonical: post.seo.canonicalUrl || undefined,
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
    modifiedTime: post.updatedAt,
    authors: [post.authorName],
    section: post.category,
    tags: post.tags,
    keywords: [post.seo.focusKeyword, ...post.seo.keywords].filter(Boolean),
    noindex: post.seo.noindex,
    ...(picture ? { image: picture } : {})
  });
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }];
  const language = post.lang || "en";
  const isTeam = /\b(team|ormitech)\b/i.test(post.authorName);
  const image = post.seo.ogImageUrl || post.coverImage?.url || `${siteUrl}${defaultOgImage.url}`;
  const nodes = [
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#article`,
      headline: post.title,
      description: description(post),
      datePublished: post.publishedAt ?? post.updatedAt,
      dateModified: post.updatedAt,
      inLanguage: language,
      mainEntityOfPage: absoluteUrl(path),
      image,
      articleSection: post.category,
      keywords: [post.seo.focusKeyword, ...post.seo.keywords, ...post.tags].filter(Boolean).join(", ") || undefined,
      author: isTeam ? { "@id": `${siteUrl}/#organization` } : { "@type": "Person", name: post.authorName },
      publisher: { "@id": `${siteUrl}/#organization` },
      // The direct answer and the key points are what a voice assistant may read aloud.
      ...(post.answer || post.keyTakeaways.length > 0 ? { speakable: { "@type": "SpeakableSpecification", cssSelector: ["[data-speakable]"] } } : {})
    },
    breadcrumbSchema(crumbs),
    ...(post.faq.length > 0 ? [faqSchema(post.faq)] : [])
  ];

  return (
    <>
      <JsonLd nodes={nodes} />
      <Navbar />
      <PostView post={post} crumbs={crumbs} />
      <Footer />
    </>
  );
}
