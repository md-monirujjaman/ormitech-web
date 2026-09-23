import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Visible breadcrumb trail. Pair it with breadcrumbSchema() in the page's JSON-LD.
export default function Breadcrumbs({ items, className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-navy">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-navy">{item.name}</Link>
                  <ChevronRight aria-hidden className="h-3.5 w-3.5 text-slate-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
