import { Facebook, Instagram, Linkedin, X, Youtube } from "@thesvg/react";
import Image from "next/image";
import Link from "next/link";
import FooterWordmark from "@/components/common/FooterWordmark";
import { appLinks, authLinks, socialProfiles } from "@/data/site";
import { interTight } from "@/styles/fonts";

const columns = [
  ["Product", [["Overview", "/product"], ["AI Chatbot", "/features/ai-chatbot"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]]],
  ["Solutions", [["WhatsApp AI chatbot", "/solutions/whatsapp-ai-chatbot"], ["Facebook automation", "/solutions/facebook-messenger-automation"], ["Instagram DM automation", "/solutions/instagram-dm-automation"], ["Ecommerce chatbot", "/solutions/ecommerce-chatbot"]]],
  ["Company", [["Blog", "/blog"], ["FAQ", "/faq"], ["Contact", "/contact"]]],
  ["Resources", [["Documentation", appLinks.docs], ["Log in", authLinks.login], ["Sign up", authLinks.register]]],
  ["Legal", [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Data Deletion", "/data-deletion"]]]
];

// Full-colour official brand marks (thesvg.org "default" variant), each already a self-contained badge.
const socials = [
  ["Facebook", socialProfiles[0], Facebook],
  ["Instagram", socialProfiles[1], Instagram],
  ["LinkedIn", socialProfiles[2], Linkedin],
  ["YouTube", socialProfiles[3], Youtube],
  ["X", socialProfiles[4], X]
];

const isExternal = href => href.startsWith("http");

function FooterLink({ href, children }) {
  const className = "text-slate-500 transition-colors duration-200 hover:text-brandInk";
  return isExternal(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export default function Footer() {
  return (
    <footer className={`${interTight.className} relative flex flex-col overflow-hidden border-t border-slate-200/70 bg-white text-navy antialiased`}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(7rem,18vw,15rem)] overflow-hidden">
        <div className="container-x">
          <FooterWordmark />
        </div>
      </div>

      <div className="container-x relative z-10 py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="OrmiTech home" className="inline-block">
              <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={160} height={80} className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-xs text-lg font-semibold leading-snug tracking-[-.02em]">
              Every conversation. <span className="text-slate-400">One powerful workspace.</span>
            </p>
            <p className="mt-3 max-w-[19rem] text-[15px] leading-6 text-slate-500">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:grid-cols-5">
            {columns.map(([title, links]) => (
              <nav key={title} aria-label={title} className="group">
                <h3 className="inline-flex flex-col text-sm font-semibold">
                  {title}
                  <span aria-hidden className="mt-2 h-0.5 w-5 rounded-full bg-brand transition-all duration-300 group-hover:w-full" />
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

      <div className="relative z-10 shrink-0 border-t border-slate-200/70">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-[13px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-navy">OrmiTech</span> IT. All rights reserved.</p>
          <ul className="flex items-center gap-2.5">
            {socials.map(([name, href, Brand]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`OrmiTech on ${name}`}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-brand/[.06] hover:ring-brand/30 hover:shadow-[0_10px_20px_-12px_rgba(242,13,69,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                >
                  <Brand aria-hidden variant="default" className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
