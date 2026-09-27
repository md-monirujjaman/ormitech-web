import { siteUrl } from "@/data/site";

// Allow all crawling except the API route. The old auth paths redirect to the client app, so there is
// nothing on this site left to keep out of the index.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
