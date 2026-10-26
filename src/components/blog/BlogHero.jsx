import { Search } from "lucide-react";

/** Heading, search box and the category pills. Filtering state lives in BlogIndex. */
export default function BlogHero({ query, onQuery, categories, category, onCategory }) {
  return (
    <section className="relative overflow-hidden pb-6 pt-32 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-[520px] w-[620px] bg-[radial-gradient(closest-side,rgba(242,13,69,.12),transparent)]" />
      <div className="container-x relative">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-brand">
          <span aria-hidden className="h-0.5 w-6 bg-brand" />
          Blog
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.08] tracking-[-.03em] text-navy sm:text-5xl">
          Insights, tips and ideas for a <span className="text-brand">smarter business.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-slate-600">
          Explore practical guides on AI customer support, omnichannel inboxes and human handover. Real-world advice to help your team talk to customers better.
        </p>

        <form role="search" onSubmit={event => event.preventDefault()} className="mt-7 flex max-w-xl items-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_10px_30px_-18px_rgba(13,27,61,.35)] focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10">
          <Search className="mx-3 h-4 w-4 shrink-0 text-brand" aria-hidden />
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={event => onQuery(event.target.value)}
            placeholder="Search articles..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-navy outline-none placeholder:text-slate-400"
          />
          <button type="submit" className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25">
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
          {["All", ...categories].map(name => {
            const active = (name === "All" && category === null) || name === category;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => onCategory(name === "All" ? null : name)}
                className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 ${active ? "border-brand bg-brand text-white shadow-[0_8px_18px_-10px_rgba(242,13,69,.8)]" : "border-slate-200 bg-white text-navy hover:border-brand/40 hover:text-brandInk"}`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decoration only. */}
      <div aria-hidden className="pointer-events-none absolute right-10 top-36 hidden select-none lg:block xl:right-24">
        <svg width="70" height="64" viewBox="0 0 70 64" fill="none" className="absolute -left-14 top-12 text-brand">
          <path d="M66 6C40 -2 14 14 8 50" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 41l5 11 11-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="-rotate-[8deg] text-3xl leading-[1.15] text-brand" style={{ fontFamily: '"Segoe Script","Bradley Hand","Brush Script MT","Comic Sans MS",cursive' }}>
          Smarter<br />Conversations<br />Bigger Growth
        </p>
      </div>
    </section>
  );
}
