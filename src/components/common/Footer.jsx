import Image from "next/image";
import { Inter_Tight } from "next/font/google";
import { paths } from "@/components/common/ChannelLogo";
import FooterWordmark from "@/components/common/FooterWordmark";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });

const columns = [
  ["Product", [["Overview", "/product"], ["Features", "/features"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]]],
  ["Company", [["Blog", "/blog"], ["Contact", "/contact"]]],
  ["Legal", [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]]]
];

const socials = [
  ["Facebook", "#", paths.Facebook],
  ["WhatsApp", "#", paths.WhatsApp],
  ["Instagram", "#", paths.Instagram],
  ["LinkedIn", "#", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"],
  ["X", "#", "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"]
];

export default function Footer() {
  return (
    <footer className={`${interTight.className} flex flex-col border-t border-black/[.06] bg-white text-[#0B0D12] antialiased lg:min-h-[60vh]`}>
      <div className="shrink-0 border-b border-black/[.08] pt-[3vh]">
        <div className="mx-auto aspect-[1020/160] w-[min(calc(100%_-_24px),1600px,125vh)] overflow-hidden">
          <FooterWordmark />
        </div>
      </div>

      <div aria-hidden className="h-[4vh] min-h-[24px] shrink-0" style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(11,13,18,.05), transparent 75%), linear-gradient(to bottom, rgba(11,13,18,.02), transparent)" }} />

      <div className="container-x flex-1 pb-10 lg:pb-[3vh]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
            <a href="/" aria-label="OrmiTech home" className="inline-block">
              <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={160} height={80} className="h-9 w-auto object-contain" />
            </a>
            <p className="mt-4 text-xl font-semibold leading-snug tracking-[-.03em]">
              Every conversation.<br className="lg:hidden" /> <span className="text-black/35">One powerful workspace.</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map(([name, href, d]) => (
                <li key={name}>
                  <a href={href} aria-label={`OrmiTech on ${name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
                    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current"><path d={d} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-x-4 text-center lg:col-span-5 lg:col-start-8 lg:text-left">
            {columns.map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <h3 className="text-sm font-semibold tracking-[-.01em]">{title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {links.map(([label, href]) => <li key={href}><a href={href} className="text-black/55 transition-colors hover:text-black">{label}</a></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-black/[.08]">
        <div className="container-x flex flex-col items-center justify-center gap-1.5 py-4 text-center text-[13px] text-black/50 sm:flex-row sm:gap-3">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-black">OrmiTech</span> IT. All rights reserved.</p>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-black/20 sm:block" />
          <p className="inline-flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />Built in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
