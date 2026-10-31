"use client";

import { useMemo, useState } from "react";
import BlogCta from "./BlogCta";
import BlogHero from "./BlogHero";
import CategoryCards from "./CategoryCards";
import FeaturedPosts from "./FeaturedPosts";
import LatestGrid, { ViewAllLink } from "./LatestGrid";
import TrendingPanel from "./TrendingPanel";

/**
 * The blog index. With no search and no category chosen it shows the full layout; as soon as either is used, the
 * page becomes one list of matching posts so the result is easy to see.
 */
export default function BlogIndex({ posts }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);

  const sorted = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);
  const categories = useMemo(() => {
    const counts = new Map();
    for (const post of sorted) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    return [...counts].map(([name, count]) => ({ name, count }));
  }, [sorted]);

  const needle = query.trim().toLowerCase();
  const filtering = needle !== "" || category !== null;
  const matches = useMemo(
    () =>
      sorted.filter(post => {
        if (category && post.category !== category) return false;
        return !needle || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle);
      }),
    [sorted, needle, category]
  );
  const clear = () => {
    setQuery("");
    setCategory(null);
  };

  const [lead, ...rest] = sorted;
  if (!lead) {
    return (
      <>
        <BlogHero empty query="" onQuery={() => {}} categories={[]} category={null} onCategory={() => {}} />
        <section className="container-x mt-10" aria-live="polite">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h2 className="text-lg font-bold text-navy">No articles yet</h2>
            <p className="mt-2 text-sm text-slate-500">New guides are on the way. Check back soon.</p>
          </div>
        </section>
        <BlogCta />
      </>
    );
  }
  return (
    <>
      <BlogHero query={query} onQuery={setQuery} categories={categories.map(entry => entry.name)} category={category} onCategory={setCategory} />

      {filtering ? (
        matches.length > 0 ? (
          <LatestGrid
            id="results"
            eyebrow="Results"
            heading={`${matches.length} ${matches.length === 1 ? "article" : "articles"}${category ? ` in ${category}` : ""}`}
            posts={matches}
            action={<button type="button" onClick={clear} className="text-xs font-semibold text-brand hover:text-brandInk">Clear filters</button>}
          />
        ) : (
          <section className="container-x mt-12" aria-live="polite">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <h2 className="text-lg font-bold text-navy">No articles match your search</h2>
              <p className="mt-2 text-sm text-slate-500">Try a different word, or browse every article.</p>
              <button type="button" onClick={clear} className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25">Clear filters</button>
            </div>
          </section>
        )
      ) : (
        lead && (
          <>
            <FeaturedPosts lead={lead} side={rest.slice(0, 3)} />
            {sorted.length >= 2 && <TrendingPanel highlight={sorted[1]} list={sorted.slice(0, 4)} />}
            {categories.length > 1 && <CategoryCards categories={categories} onSelect={setCategory} />}
            <LatestGrid id="latest-articles" eyebrow="Latest articles" heading="Featured articles from our blog" posts={sorted} action={<ViewAllLink href="#latest-articles" />} />
          </>
        )
      )}

      <BlogCta />
    </>
  );
}
