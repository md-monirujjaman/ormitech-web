import { siteUrl } from "@/data/site";

// Allow all crawling except the API route. Auth pages are kept out of the index with noindex (not robots).
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
