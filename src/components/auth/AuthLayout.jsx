import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bot, Check, UserCheck } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { MotionProvider } from "@/components/ui/Reveal";
import { channels } from "@/data/site";
import { interTight } from "@/styles/fonts";

const benefits = ["Every channel in one inbox", "AI replies from your business knowledge", "Your team takes over whenever it matters"];

const previewRows = [
  { name: "Sadia R.", channel: "Instagram", text: "Is the blue one still in stock?", tone: "from-fuchsia-400 to-pink-600", ai: true },
  { name: "Tanvir H.", channel: "WhatsApp", text: "Do you deliver to Khulna?", tone: "from-emerald-400 to-emerald-700", ai: true },
  { name: "Rahim U.", channel: "Facebook", text: "Can I get a wholesale price?", tone: "from-sky-400 to-blue-600", ai: false }
];

// Split layout for account pages: form on the left, brand panel on large screens.
export default function AuthLayout({ panelTitle, panelText, children }) {
  return (
    <div className={`${interTight.className} grid min-h-screen bg-white text-navy antialiased lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`}>
      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="OrmiTech home" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={150} height={75} className="h-10 w-auto object-contain" priority />
          </Link>
          <Link href="/" className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <ArrowLeft aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to site
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[420px]">
            <MotionProvider>{children}</MotionProvider>
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-slate-500 lg:justify-start">
          <span>© {new Date().getFullYear()} OrmiTech IT</span>
          <Link href="/privacy" className="transition-colors hover:text-navy">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-navy">
            Terms of Service
          </Link>
        </footer>
      </div>

      <aside className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-center xl:p-16">
        <div aria-hidden className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div aria-hidden className="red-glow absolute -right-24 -top-24 h-[420px] w-[420px] opacity-70 motion-safe:animate-drift" />
        <div aria-hidden className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand/15 blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

        <div className="relative mx-auto w-full max-w-md">
          <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-white/60">OrmiTech workspace</p>
          <h2 className="mt-3 text-4xl font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">{panelTitle}</h2>
          <p className="mt-4 text-base leading-7 text-white/70">{panelText}</p>

          <div aria-hidden className="mt-10 rounded-2xl border border-white/10 bg-white p-4 text-navy shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] motion-safe:animate-float">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold">Unified inbox</span>
              <span className="flex -space-x-1.5">
                {channels.map(channel => (
                  <span key={channel.name} className="rounded-full bg-white p-0.5 ring-1 ring-slate-100">
                    <ChannelLogo name={channel.name} className="h-4 w-4" />
                  </span>
                ))}
              </span>
            </div>
            <ul className="divide-y divide-slate-100">
              {previewRows.map(row => (
                <li key={row.name} className="flex items-center gap-3 py-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ${row.tone}`}>
                    {row.name
                      .split(" ")
                      .map(part => part[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold">{row.name}</span>
                    <span className="block truncate text-[12px] text-slate-500">{row.text}</span>
                  </span>
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${row.ai ? "bg-navy text-white" : "bg-brand/10 text-brandInk"}`}>
                    {row.ai ? <Bot className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                    {row.ai ? "AI" : "Team"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 space-y-3">
            {benefits.map(item => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-white/85">
                <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
