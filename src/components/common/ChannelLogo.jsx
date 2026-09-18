import { Facebook, Instagram, Whatsapp } from "@thesvg/react";
import { Globe } from "lucide-react";

// Official brand marks from @thesvg/react. The "default" variant carries each brand's own colours, including
// Instagram's gradient, so no hand-copied paths or hardcoded hex values are needed here.
const BRANDS = {
  Facebook,
  Instagram,
  WhatsApp: Whatsapp,
};

export default function ChannelLogo({ name, className = "" }) {
  if (name === "Website") {
    return (
      <span role="img" aria-label={name} className={`flex shrink-0 items-center justify-center rounded-full bg-slate-700 ${className}`}>
        <Globe aria-hidden className="h-[62%] w-[62%] text-white" strokeWidth={2.2} />
      </span>
    );
  }

  const Brand = BRANDS[name];
  if (!Brand) return null;

  return <Brand role="img" aria-label={name} variant="default" className={`block shrink-0 ${className}`} />;
}
