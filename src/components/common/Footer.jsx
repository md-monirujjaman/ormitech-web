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
  ["Resources", [["Documentation", appLinks.docs], ["Log in", authLinks.login], ["Sign up", authLinks.signup]]],
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
  const className = "text-slate-500 transition-colors hover:text-navy";
  return isExternal(href) ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export default function Footer() {
  return (
    <footer className={`${interTight.className} flex flex-col border-t border-slate-200/70 bg-white text-navy antialiased`}>
      <div className="shrink-0 border-b border-slate-200/70 pt-[3vh]">
        <div className="mx-auto aspect-[1020/160] w-[min(calc(100%_-_24px),1600px,125vh)] overflow-hidden">
          <FooterWordmark />
        </div>
      </div>

      <div className="container-x py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="OrmiTech home" className="inline-block">
              <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={160} height={80} className="h-9 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-lg font-semibold leading-snug tracking-[-.02em]">
              Every conversation. <span className="text-slate-400">One powerful workspace.</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:grid-cols-5">
            {columns.map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <h3 className="text-sm font-semibold">{title}</h3>
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

      <div className="shrink-0 border-t border-slate-200/70">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-12px_rgba(13,27,61,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
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
