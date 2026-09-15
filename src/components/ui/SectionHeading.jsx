export function Eyebrow({ children, dot = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-brand/[.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-brandInk ${className}`}>
      {dot && (
        <span aria-hidden className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
      )}
      {children}
    </span>
  );
}

const TILE_SIZES = {
  sm: "h-9 w-9 rounded-lg [&_svg]:h-4 [&_svg]:w-4",
  md: "h-11 w-11 rounded-xl [&_svg]:h-5 [&_svg]:w-5"
};

// `interactive` fills the tile with brand red and tilts it when the surrounding `group` is hovered.
const INTERACTIVE =
  "transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110";

export function IconTile({ icon: Icon, size = "md", interactive = false, className = "" }) {
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center bg-brand/[.08] text-brand ${TILE_SIZES[size]} ${interactive ? INTERACTIVE : ""} ${className}`}>
      <Icon strokeWidth={1.9} />
    </span>
  );
}

const TITLE_SIZES = {
  sm: "text-[28px] sm:text-[32px]",
  md: "text-3xl sm:text-4xl lg:text-[42px]"
};

export default function SectionHeading({ id, eyebrow, title, description, align = "left", size = "md", className = "" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`mt-4 font-bold leading-[1.12] tracking-[-0.03em] text-navy [text-wrap:balance] ${TITLE_SIZES[size]}`}>
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
    </div>
  );
}
