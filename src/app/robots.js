import { siteUrl } from "@/data/site";

// No robots.txt existed before this — this only adds the sitemap reference, with a default allow-all.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
