import { Bot, BookOpen, Layers, MessageCircle, Sparkles, Users } from "lucide-react";

const ICONS = { AI: Bot, Guide: BookOpen, Product: Layers, "Customer Communication": MessageCircle, Automation: Sparkles, Leads: Users };

/** One card per real category, with its article count. Choosing one filters the page. */
export default function CategoryCards({ categories, onSelect }) {
  return (
    <section aria-label="Browse by category" className="container-x mt-10">
      <div className="flex flex-wrap gap-3">
        {categories.map(({ name, count }) => {
          const Icon = ICONS[name] ?? Sparkles;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelect(name)}
              className="group flex min-w-[150px] flex-1 flex-col items-center rounded-2xl border border-slate-200/80 bg-white px-4 py-5 text-center transition hover:border-brand/30 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 motion-safe:hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1F5] text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="mt-3 text-sm font-bold text-navy">{name}</span>
              <span className="mt-1 text-xs text-slate-500">{count} {count === 1 ? "article" : "articles"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
