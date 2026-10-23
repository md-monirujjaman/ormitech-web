import FooterWordmark from "@/components/common/FooterWordmark";
import { FooterBrand, FooterLink, FooterSocials } from "@/components/common/FooterInteractive";
import { appLinks, authLinks, socialProfiles } from "@/data/site";
import { interTight } from "@/styles/fonts";

const columns = [
  ["Product", [["Overview", "/product"], ["AI Chatbot", "/features/ai-chatbot"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]]],
  ["Solutions", [["WhatsApp AI chatbot", "/solutions/whatsapp-ai-chatbot"], ["Facebook automation", "/solutions/facebook-messenger-automation"], ["Instagram DM automation", "/solutions/instagram-dm-automation"], ["Ecommerce chatbot", "/solutions/ecommerce-chatbot"]]],
  ["Company", [["Blog", "/blog"], ["FAQ", "/faq"], ["Contact", "/contact"]]],
  ["Resources", [["Documentation", appLinks.docs], ["Log in", authLinks.login], ["Sign up", authLinks.register]]],
  ["Legal", [["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Data Deletion", "/data-deletion"]]]
];

const socials = [
  ["Facebook", socialProfiles[0]],
  ["Instagram", socialProfiles[1]],
  ["LinkedIn", socialProfiles[2]],
  ["YouTube", socialProfiles[3]],
  ["X", socialProfiles[4]]
];

export default function Footer() {
  return (
    <footer className={`${interTight.className} relative flex flex-col overflow-hidden bg-[#0B0D12] text-white antialiased`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 z-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,13,69,.28),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[.3] [background-image:radial-gradient(rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_65%)]" />
      {/* The big word sits in the lower part of this block, just above the line that closes the footer. */}
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(5.5rem,14vw,11.5rem)] overflow-hidden">
          <div className="container-x h-full">
            <FooterWordmark />
          </div>
        </div>
      <div className="container-x relative z-10 pb-[clamp(6rem,15vw,12rem)] pt-12 lg:pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <FooterBrand />
            <p className="mt-5 max-w-xs text-lg font-semibold leading-snug tracking-[-.02em] lg:max-w-sm lg:text-[22px]">
              Every conversation. <span className="text-white/45">One powerful workspace.</span>
            </p>
            <p className="mt-3 max-w-[19rem] text-[15px] leading-6 text-white/55 lg:max-w-sm lg:text-[16.5px] lg:leading-7">
              AI-powered customer communication for modern teams — unify your channels, automate the routine and hand over to people when it matters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:grid-cols-5">
            {columns.map(([title, links]) => (
              <nav key={title} aria-label={title} className="group">
                <h3 className="inline-flex flex-col text-sm font-semibold text-white lg:text-[16px]">
                  {title}
                  <span aria-hidden className="mt-2 h-0.5 w-5 rounded-full bg-gradient-to-r from-brand to-[#FF5C85] transition-all duration-300 group-hover:w-full" />
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm lg:mt-5 lg:space-y-3 lg:text-[15.5px]">
                  {links.map(([label, href]) => (
                    <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-[13px] text-white/50 sm:flex-row lg:py-6 lg:text-[14.5px]">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-white">OrmiTech</span> IT. All rights reserved.</p>
          <FooterSocials profiles={socials} />
        </div>
      </div>
    </footer>
  );
}
