import { Facebook, Instagram, Linkedin, X, Youtube } from "@thesvg/react";
import Link from "next/link";
import FooterWordmark from "@/components/common/FooterWordmark";
import { appLinks, authLinks, socialProfiles } from "@/data/site";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { interTight } from "@/styles/fonts";

const columns = [
  ["Product", [["Overview", "/product"], ["AI Chatbot", "/features/ai-chatbot"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]]],
  ["Solutions", [["WhatsApp AI chatbot", "/solutions/whatsapp-ai-chatbot"], ["Facebook automation", "/solutions/facebook-messenger-automation"], ["Instagram DM automation", "/solutions/instagram-dm-automation"], ["Ecommerce chatbot", "/solutions/ecommerce-chatbot"]]],
  ["Company", [["Blog", "/blog"], ["FAQ", "/faq"], ["Contact", "/contact"]]],
  ["Resources", [["Documentation", appLinks.docs], ["Log in", authLinks.login], ["Sign up", authLinks.register]]],
  ["Legal", [["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Data Deletion", "/data-deletion"]]]
];

// Full-colour official brand marks (thesvg.org "default" variant), each already a self-contained badge.
const socials = [
  ["Facebook", socialProfiles[0], Facebook, "#1877F2"],
  ["Instagram", socialProfiles[1], Instagram, "#E1306C"],
  ["LinkedIn", socialProfiles[2], Linkedin, "#0A66C2"],
  ["YouTube", socialProfiles[3], Youtube, "#FF0000"],
  ["X", socialProfiles[4], X, "#FFFFFF"]
];

const isExternal = href => href.startsWith("http");

function FooterLink({ href, children }) {
  const className = "inline-block text-white/60 transition-[color,transform] duration-200 hover:translate-x-1 hover:text-white";
  return isExternal(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export default function Footer() {
  return (
    <footer className={`${interTight.className} relative flex flex-col overflow-hidden bg-[#0B0D12] text-white antialiased`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 z-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,13,69,.28),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[.3] [background-image:radial-gradient(rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(7rem,18vw,15rem)] overflow-hidden">
        <div className="container-x">
          <FooterWordmark />
        </div>
      </div>

      <div className="container-x relative z-10 py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="OrmiTech IT home" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#B3082F] text-white shadow-[0_14px_28px_-10px_rgba(242,13,69,.8)] transition-transform duration-300 group-hover:-rotate-6">
                <svg aria-hidden viewBox={markViewBox} className="h-6 w-6">
                  <path d={markPath} fill="currentColor" />
                </svg>
              </span>
              <span className="text-[22px] font-bold leading-none tracking-[-0.03em]">
                OrmiTech <span className="text-[#FF5C85]">IT</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-lg font-semibold leading-snug tracking-[-.02em]">
              Every conversation. <span className="text-white/45">One powerful workspace.</span>
            </p>
            <p className="mt-3 max-w-[19rem] text-[15px] leading-6 text-white/55">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:grid-cols-5">
            {columns.map(([title, links]) => (
              <nav key={title} aria-label={title} className="group">
                <h3 className="inline-flex flex-col text-sm font-semibold text-white">
                  {title}
                  <span aria-hidden className="mt-2 h-0.5 w-5 rounded-full bg-gradient-to-r from-brand to-[#FF5C85] transition-all duration-300 group-hover:w-full" />
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {links.map(([label, href]) => (
                    <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-[13px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-white">OrmiTech</span> IT. All rights reserved.</p>
          <ul className="flex items-center gap-3">
            {socials.map(([name, href, Brand, glow]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`OrmiTech on ${name}`}
                  style={{ "--glow": glow }}
                  className="group/social relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_-14px_rgba(0,0,0,.8)] ring-1 ring-white/20 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--glow)_28%,transparent),0_18px_34px_-12px_var(--glow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
                >
                  <Brand aria-hidden variant="default" className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
                  <span aria-hidden className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0B0D12] opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover/social:translate-y-0 group-hover/social:opacity-100">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
