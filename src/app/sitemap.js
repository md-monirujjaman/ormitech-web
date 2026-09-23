import { blogPosts, siteUrl } from "@/data/site";

// Public, indexable routes only. Auth pages (/login, /signup, /forgot-password), the API route and the
// /features redirect are intentionally excluded — see the redirect at src/app/features/page.jsx.
const staticRoutes = [
  "/",
  "/product",
  "/product/ai-customer-support",
  "/product/omnichannel-inbox",
  "/product/lead-order-management",
  "/features/ai-chatbot",
  "/features/human-handover",
  "/features/automation",
  "/features/team-collaboration",
  "/features/analytics",
  "/how-it-works",
  "/pricing",
  "/blog",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/data-deletion"
];

export default function sitemap() {
  const staticEntries = staticRoutes.map(route => ({
    url: `${siteUrl}${route === "/" ? "/" : route}`
  }));

  const blogEntries = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date
  }));

  return [...staticEntries, ...blogEntries];
}
