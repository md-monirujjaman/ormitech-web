import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BlogIndex from "@/components/blog/BlogIndex";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata=buildMetadata({title:"OrmiTech Blog: AI Customer Support and Inbox Guides",description:"Practical guides on AI chatbots, omnichannel inboxes, WhatsApp automation and human handover for teams that talk to customers every day.",path:"/blog",absoluteTitle:true,ogTitle:"OrmiTech Blog"});

// The articles are written and published in the admin panel; the list refreshes about a minute after a change.
// A literal, because Next reads this value without running the file. Keep it equal to BLOG_REVALIDATE_SECONDS in lib/blog.js.
export const revalidate = 60;

export default async function Blog() {
  // Only what the index needs goes to the client component, not the article bodies (the list never carries them).
  const posts = await getBlogPosts();
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
