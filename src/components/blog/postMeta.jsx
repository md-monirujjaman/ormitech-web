import { CalendarDays, Clock } from "lucide-react";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** "2026-10-22" -> "Oct 22, 2026". */
export function formatPostDate(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormat.format(date);
}

/** Date and reading time, with their small icons. `light` is for use on a dark image. */
export default function PostMeta({ post, light = false, className = "" }) {
  const tone = light ? "text-white/80" : "text-slate-500";
  const icon = light ? "text-white/70" : "text-brand";
  return (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${tone} ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className={`h-3.5 w-3.5 ${icon}`} aria-hidden />
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className={`h-3.5 w-3.5 ${icon}`} aria-hidden />
        {post.readMinutes} min read
      </span>
    </p>
  );
}

/** Small red uppercase category label. */
export function CategoryLabel({ children, className = "" }) {
  return <span className={`text-[11px] font-bold uppercase tracking-[.08em] text-brand ${className}`}>{children}</span>;
}

/** The post picture in a fixed-ratio frame. */
export function PostImage({ post, className = "", priority = false }) {
  if (!post.image) return <div className={`bg-gradient-to-br from-[#FFF3F6] to-slate-100 ${className}`} aria-hidden />;
  return (
    // Cloudinary URLs are used as given; width and height reserve the space.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.image.src}
      alt={post.image.alt}
      width={post.image.width}
      height={post.image.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`bg-slate-50 object-cover ${className}`}
    />
  );
}
