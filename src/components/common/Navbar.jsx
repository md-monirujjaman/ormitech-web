"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import NavIcon from "@/components/common/NavIcon";
import ButtonLink from "@/components/common/ButtonLink";
import { appLinks, authLinks } from "@/data/site";
import { interTight } from "@/styles/fonts";

// Each dropdown entry is [label, href, icon, one-line description].
const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Product",
    children: [
      ["Product Overview", "/product", "overview", "Everything OrmiTech IT offers"],
      ["AI Customer Support", "/product/ai-customer-support", "ai", "AI replies around the clock"],
      ["Omnichannel Inbox", "/product/omnichannel-inbox", "inbox", "Every channel in one inbox"],
      ["Lead & Order Management", "/product/lead-order-management", "orders", "Track leads and orders"]
    ]
  },
  {
    label: "Features",
    children: [
      ["AI Chatbot", "/features/ai-chatbot", "chatbot", "Answers the routine questions"],
      ["Human Handover", "/features/human-handover", "handover", "Pass chats to your team"],
      ["Automation", "/features/automation", "automation", "Routing, tags and follow-ups"],
      ["Team Collaboration", "/features/team-collaboration", "team", "Assign chats and share notes"],
      ["Analytics", "/features/analytics", "analytics", "Response time and lead flow"]
    ]
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      ["Blog", "/blog", "blog", "Guides and updates"],
      ["Documentation", appLinks.docs, "docs", "Set up and learn"],
      ["FAQ", "/faq", "faq", "Quick answers"]
    ]
  },
  { label: "Contact", href: "/contact" }
];

// "Get started" with a bright light that travels around its border.
function GlowBorder({ className = "", children }) {
  return (
    <span className={`relative inline-flex overflow-hidden rounded-[10px] bg-brand/30 p-[2px] ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[100%] [background:conic-gradient(from_0deg,transparent_0_60%,rgba(255,200,214,.9)_82%,#fff_100%)] motion-safe:animate-[spin_2.6s_linear_infinite]"
      />
      <span className="relative flex w-full">{children}</span>
    </span>
  );
}

const isExternal = href => href.startsWith("http");

const triggerClass = active =>
  `relative isolate inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${active ? "text-brandInk" : "text-slate-700 hover:text-[#0B0D12]"}`;

// Pills behind the nav items: a soft grey one follows the pointer, a pink one marks the page you are on.
function NavPills({ active, hovered }) {
  return (
    <>
      {hovered && !active && <motion.span layoutId="nav-hover-pill" aria-hidden className="absolute inset-0 -z-10 rounded-full bg-slate-100" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
      {active && <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand/10 shadow-[inset_0_0_0_1px_rgba(242,13,69,.16)]" />}
    </>
  );
}

// One row in the desktop dropdown: icon tile, title and a short line. Internal links use next/link, external ones a plain anchor.
function DropdownLink({ label, href, icon, text }) {
  const Tag = isExternal(href) ? "a" : Link;
  return (
    <Tag href={href} className="group/link flex items-center gap-3.5 rounded-xl p-3 transition-colors hover:bg-[#FFF3F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
      <NavIcon name={icon} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:ring-brand/40 motion-safe:group-hover/link:scale-105" />
      <span className="min-w-0 leading-tight">
        <span className="block text-[13.5px] font-semibold text-[#0B0D12] transition-colors group-hover/link:text-brandInk">{label}</span>
        <span className="mt-0.5 block truncate text-[12px] font-normal text-slate-500">{text}</span>
      </span>
    </Tag>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [openGroups, setOpenGroups] = useState({});
  const menuId = useId();

  const isActive = href => pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

  const isItemActive = item => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) return item.children.some(([, href]) => !isExternal(href) && isActive(href));
    return false;
  };

  useEffect(() => {
    setOpen(false);
    setOpenGroups({});
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleGroup = label => {
    setOpenGroups(value => ({ ...value, [label]: !value[label] }));
  };

  return (
    <header className={`${interTight.className} fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl`}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="OrmiTech home" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={150} height={75} className="h-11 w-auto object-contain" priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
            {navItems.map(item => {
              const active = isItemActive(item);

              if (!item.children) {
                return (
                  <li key={item.label} onMouseEnter={() => setHovered(item.label)} onFocus={() => setHovered(item.label)}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={triggerClass(active)}>
                      <NavPills active={active} hovered={hovered === item.label} />
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="group relative" onMouseEnter={() => setHovered(item.label)} onFocus={() => setHovered(item.label)}>
                  {item.href ? (
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={triggerClass(active)}>
                      <NavPills active={active} hovered={hovered === item.label} />
                      {item.label}
                      <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </Link>
                  ) : (
                    <button type="button" aria-haspopup="true" className={triggerClass(active)}>
                      <NavPills active={active} hovered={hovered === item.label} />
                      {item.label}
                      <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>
                  )}

                  <div className="invisible fixed left-0 right-0 top-20 z-50 grid grid-rows-[0fr] opacity-0 shadow-[0_24px_55px_-24px_rgba(13,27,61,.3)] transition-[grid-template-rows,opacity,visibility] duration-200 ease-out group-hover:visible group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:duration-1000 group-hover:ease-[cubic-bezier(.22,1,.36,1)] group-focus-within:visible group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:duration-1000 group-focus-within:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none">
                    <div className="min-h-0 overflow-hidden"><div className="border-y border-slate-200/80 bg-white/95 pt-2 backdrop-blur-xl">
                    <div className="container-x relative grid grid-cols-2 gap-2 pb-3 pt-2 xl:grid-cols-3">
                      {item.children.map(([label, href, icon, text]) => (
                        <DropdownLink key={label} label={label} href={href} icon={icon} text={text} />
                      ))}
                    </div>
                    <div aria-hidden className="h-1 bg-brand" />
                    </div></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={authLinks.login} className="group/login relative inline-flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-5 text-[14px] font-semibold text-slate-700 shadow-[0_8px_18px_-14px_rgba(13,27,61,.4)] transition-[transform,border-color,color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-[#FFF5F7] hover:text-brandInk hover:shadow-[0_14px_26px_-14px_rgba(242,13,69,.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 active:translate-y-0">
            <LogIn aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover/login:translate-x-0.5" />
            Log in
          </a>
          <GlowBorder>
            <ButtonLink href={authLinks.register} size="sm" arrow className="w-full">
              Get started
            </ButtonLink>
          </GlowBorder>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 lg:hidden"
          onClick={() => setOpen(value => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls={menuId}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {open && (
        <div id={menuId} data-lenis-prevent className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200/70 bg-white shadow-[0_24px_40px_-24px_rgba(13,27,61,.25)] lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {navItems.map(item => {
              const active = isItemActive(item);

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${active ? "bg-brand/[.06] text-brandInk" : "text-navy hover:bg-slate-50"}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const groupOpen = Boolean(openGroups[item.label]);

              return (
                <div key={item.label} className="flex flex-col">
                  <div className={`flex items-center justify-between rounded-lg pr-1 transition-colors ${active ? "bg-brand/[.06]" : ""}`}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex-1 px-3 py-3 text-base font-medium ${active ? "text-brandInk" : "text-navy"}`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={`flex-1 px-3 py-3 text-base font-medium ${active ? "text-brandInk" : "text-navy"}`}>{item.label}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.label)}
                      aria-expanded={groupOpen}
                      aria-label={`${groupOpen ? "Collapse" : "Expand"} ${item.label} menu`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-navy transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                    >
                      <ChevronDown aria-hidden size={18} className={`transition-transform duration-200 ${groupOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {groupOpen && (
                    <div className="ml-3 flex flex-col border-l border-slate-200/70 pl-3">
                      {item.children.map(([label, href, icon]) => {
                        const Tag = isExternal(href) ? "a" : Link;
                        return (
                          <Tag key={label} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy">
                            <NavIcon name={icon} size={34} />
                            {label}
                          </Tag>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-3 grid gap-2 border-t border-slate-200/70 pt-4 sm:grid-cols-2">
              <a href={authLinks.login} className="group/login flex h-[52px] items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white font-semibold text-slate-700 shadow-[0_8px_18px_-14px_rgba(13,27,61,.4)] transition-[border-color,color,background-color] duration-300 hover:border-brand/40 hover:bg-[#FFF5F7] hover:text-brandInk">
                <LogIn aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover/login:translate-x-0.5" />
                Log in
              </a>
              <GlowBorder className="w-full">
                <ButtonLink href={authLinks.register} arrow className="w-full">
                  Get started
                </ButtonLink>
              </GlowBorder>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
