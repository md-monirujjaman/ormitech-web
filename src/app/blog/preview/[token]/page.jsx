import { notFound } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PostView from "@/components/blog/PostView";
import { getBlogPreview } from "@/lib/blog";

// A draft, opened through the secret address the admin panel shows. Always fresh, never indexed, no structured data.
export const dynamic = "force-dynamic";

export const metadata = { title: "Article preview", robots: { index: false, follow: false } };

export default async function Preview({ params }) {
  const { token } = await params;
  const post = await getBlogPreview(token);
  if (!post) notFound();
  const path = `/blog/preview/${token}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }];
  return (
    <>
      <Navbar />
      <div role="status" className="fixed inset-x-0 top-0 z-[60] bg-navy px-4 py-2 text-center text-sm font-medium text-white">
        Preview{post.status === "published" ? "" : " of an unpublished article"}. Only people with this address can see it.
      </div>
      <PostView post={post} crumbs={crumbs} />
      <Footer />
    </>
  );
}
