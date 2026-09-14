import { notFound } from "next/navigation";
import { blogPosts } from "@/data/site";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export function generateStaticParams() { return blogPosts.map(p => ({ slug: p.slug })); }

export default async function Post({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <Navbar />
      <main className="container-x max-w-3xl pt-36 pb-24">
        <p className="text-sm text-brand">{post.category} · {post.date}</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-black/50">{post.excerpt}</p>
        <article className="mt-12 space-y-6 text-base leading-8 text-black/65">
          <p>Customer conversations are spread across channels, but your team still needs one clear operational view. A unified workflow reduces context switching and gives every conversation a consistent path.</p>
          <p>AI can take care of repeatable work, while a human can step in when the customer needs judgment, empathy or a decision that should not be automated.</p>
          <p>That combination is the core idea behind OrmiTech: connect channels, automate responsibly, keep context, and measure what happens next.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}