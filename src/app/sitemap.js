import { siteUrl } from "@/data/site";
import { getBlogPosts } from "@/lib/blog";
import { banglaFacebookPage } from "@/data/solutions";

// Public, indexable routes only. The API route, the /features redirect (src/app/features/page.jsx) and the
// auth paths that now redirect to the client app (/login, /signup, /register, /forgot-password — see
// next.config.js) are intentionally excluded.
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
  "/solutions/whatsapp-ai-chatbot",
  "/solutions/facebook-messenger-automation",
  "/solutions/instagram-dm-automation",
  "/solutions/ecommerce-chatbot",
  "/ai-chatbot-bangladesh",
  "/bn/facebook-page-auto-reply",
  "/how-it-works",
  "/pricing",
  "/blog",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/data-deletion"
];

export default async function sitemap() {
  // Home is listed without a trailing slash so it matches its canonical URL exactly.
  const staticEntries = staticRoutes.map(route => {
    const url = route === "/" ? siteUrl : `${siteUrl}${route}`;
    const entry = { url };
    if (route === banglaFacebookPage.enPath || route === banglaFacebookPage.path) {
      entry.alternates = { languages: { en: `${siteUrl}${banglaFacebookPage.enPath}`, bn: `${siteUrl}${banglaFacebookPage.path}` } };
    }
    return entry;
  });

  // Published articles only, and not the ones their writer asked to keep out of search.
  const posts = await getBlogPosts();
  const blogEntries = posts
    .filter(post => !post.noindex)
    .map(post => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.updatedAt) }));

  return [...staticEntries, ...blogEntries];
}
