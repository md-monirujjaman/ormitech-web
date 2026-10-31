import { apiUrl } from "@/data/site";

// The blog the admin panel manages, read from the OrmiTech API. Nothing is built in: the blog shows exactly what
// is published there, and shows no articles when there are none.
//
// Pages are rebuilt in the background about a minute after a change (`revalidate`), so a published, edited or
// unpublished article reaches the site without a deploy.
export const BLOG_REVALIDATE_SECONDS = 60;

const PAGE_SIZE = 100;
const MAX_POSTS = 500;

// While `next build` runs, an unreachable API must not fail the deploy; the page fills in on its first refresh.
// At run time a failure is thrown instead, so Next keeps serving the last good copy of the page.
const building = () => process.env.NEXT_PHASE === "phase-production-build";

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}/api/v1${path}`, { headers: { Accept: "application/json" }, ...options });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`The blog API answered ${response.status}`);
  const body = await response.json();
  return body?.data ?? null;
}

const live = { next: { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] } };

/** One list item in the shape the blog components use. */
export function toCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt ?? post.updatedAt,
    updatedAt: post.updatedAt,
    category: post.category,
    noindex: Boolean(post.noindex),
    readMinutes: post.readingMinutes,
    image: post.coverImage ? { src: post.coverImage.url, alt: post.coverImage.alt, width: post.coverImage.width ?? undefined, height: post.coverImage.height ?? undefined } : null
  };
}

/** Every published article, newest first. */
export async function getBlogPosts() {
  try {
    const posts = [];
    for (let offset = 0; offset < MAX_POSTS; offset += PAGE_SIZE) {
      const data = await request(`/blog/posts?limit=${PAGE_SIZE}&offset=${offset}`, live);
      if (!data) break;
      posts.push(...data.items.map(toCard));
      if (posts.length >= data.total || data.items.length < PAGE_SIZE) break;
    }
    return posts;
  } catch (error) {
    if (building()) return [];
    throw error;
  }
}

/** One published article with its content and search fields, or null when there is none (the page is then a 404). */
export async function getBlogPost(slug) {
  try {
    return await request(`/blog/posts/${encodeURIComponent(slug)}`, live);
  } catch (error) {
    if (building()) return null;
    throw error;
  }
}

/** An article in any state, through its secret preview token. Never cached. */
export async function getBlogPreview(token) {
  return request(`/blog/preview/${encodeURIComponent(token)}`, { cache: "no-store" });
}
