import Image from "next/image";
import Link from "next/link";
import { paths } from "@/components/common/ChannelLogo";
import FooterWordmark from "@/components/common/FooterWordmark";
import { appLinks, authLinks } from "@/data/site";
import { interTight } from "@/styles/fonts";

const columns = [
  ["Product", [["Overview", "/product"], ["Features", "/features"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]]],
  ["Company", [["Blog", "/blog"], ["Contact", "/contact"]]],
  ["Resources", [["Documentation", appLinks.docs], ["Log in", authLinks.login], ["Sign up", authLinks.signup]]]
];

const legal = [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]];

const socials = [
  ["Facebook", "#", paths.Facebook],
  ["WhatsApp", "#", paths.WhatsApp],
  ["Instagram", "#", paths.Instagram],
  ["LinkedIn", "#", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"],
  ["X", "#", "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"]
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
          <div className="lg:col-span-5">
            <Link href="/" aria-label="OrmiTech home" className="inline-block">
              <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={160} height={80} className="h-9 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-lg font-semibold leading-snug tracking-[-.02em]">
              Every conversation. <span className="text-slate-400">One powerful workspace.</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map(([name, href, d]) => (
                <li key={name}>
                  <a href={href} aria-label={`OrmiTech on ${name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30">
                    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current"><path d={d} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
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
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-navy">OrmiTech</span> IT. All rights reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legal.map(([label, href]) => (
              <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
            ))}
            <li className="inline-flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />Built in Bangladesh</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
