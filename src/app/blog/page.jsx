import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BlogIndex from "@/components/blog/BlogIndex";
import { blogPosts } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata=buildMetadata({title:"OrmiTech Blog: AI Customer Support and Inbox Guides",description:"Practical guides on AI chatbots, omnichannel inboxes, WhatsApp automation and human handover for teams that talk to customers every day.",path:"/blog",absoluteTitle:true,ogTitle:"OrmiTech Blog"});

const WORDS_PER_MINUTE = 200;

/** Every piece of readable text in a post, skipping picture addresses. */
function textOf(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (value && typeof value === "object") return Object.entries(value).filter(([key]) => key !== "image").map(([, entry]) => textOf(entry)).join(" ");
  return "";
}

const readMinutes = post => {
  const words = textOf([post.intro, post.answer, post.sections]).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export default function Blog() {
  // Only what the index needs goes to the client component, not the full article bodies.
  const posts = blogPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    image: post.image ?? null,
    readMinutes: readMinutes(post)
  }));
  return (
    <>
      <Navbar />
      <main>
        <BlogIndex posts={posts} />
      </main>
      <Footer />
    </>
  );
}
