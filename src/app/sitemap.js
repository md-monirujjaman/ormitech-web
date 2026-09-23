import { blogPosts, siteUrl } from "@/data/site";
import { banglaFacebookPage } from "@/data/solutions";

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

export default function sitemap() {
  // Home is listed without a trailing slash so it matches its canonical URL exactly.
  const staticEntries = staticRoutes.map(route => {
    const url = route === "/" ? siteUrl : `${siteUrl}${route}`;
    const entry = { url };
    if (route === banglaFacebookPage.enPath || route === banglaFacebookPage.path) {
      entry.alternates = { languages: { en: `${siteUrl}${banglaFacebookPage.enPath}`, bn: `${siteUrl}${banglaFacebookPage.path}` } };
    }
    return entry;
  });

  const blogEntries = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticEntries, ...blogEntries];
}
