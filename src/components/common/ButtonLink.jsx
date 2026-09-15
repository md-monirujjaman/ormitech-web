import Link from "next/link";
import { ArrowRight } from "lucide-react";

const VARIANTS = {
  primary: "bg-brand text-white shadow-[0_10px_24px_-12px_rgba(242,13,69,.7)] hover:bg-brand2 hover:shadow-[0_18px_32px_-14px_rgba(242,13,69,.8)]",
  secondary: "border border-slate-200 bg-white text-navy hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_12px_24px_-16px_rgba(13,27,61,.35)]",
  dark: "bg-navy text-white shadow-[0_10px_24px_-14px_rgba(13,27,61,.6)] hover:bg-[#162a57] hover:shadow-[0_18px_32px_-16px_rgba(13,27,61,.7)]"
};

const SIZES = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[15px]"
};

// Button look shared by links and real <button>s (for example a dialog trigger). Lifts on hover.
export function buttonClasses({ variant = "primary", size = "md", className = "" } = {}) {
  return `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

// Light sweep across primary buttons on hover.
export function ButtonShine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-shine"
    />
  );
}

// Link styled as a button. `arrow` adds a trailing arrow that nudges on hover.
export default function ButtonLink({ href, variant = "primary", size = "md", icon: Icon, arrow = false, className = "", children, ...props }) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} {...props}>
      {variant !== "secondary" && <ButtonShine />}
      {Icon && <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 motion-safe:group-hover:rotate-12" aria-hidden />}
      {children}
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />}
    </Link>
  );
}
