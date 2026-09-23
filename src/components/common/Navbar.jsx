"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { appLinks, authLinks } from "@/data/site";
import { interTight } from "@/styles/fonts";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Product",
    children: [
      ["Product Overview", "/product"],
      ["AI Customer Support", "/product/ai-customer-support"],
      ["Omnichannel Inbox", "/product/omnichannel-inbox"],
      ["Lead & Order Management", "/product/lead-order-management"]
    ]
  },
  {
    label: "Features",
    children: [
      ["AI Chatbot", "/features/ai-chatbot"],
      ["Human Handover", "/features/human-handover"],
      ["Automation", "/features/automation"],
      ["Team Collaboration", "/features/team-collaboration"],
      ["Analytics", "/features/analytics"]
    ]
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      ["Blog", "/blog"],
      ["Documentation", appLinks.docs],
      ["FAQ", "/faq"]
    ]
  }
];

const isExternal = href => href.startsWith("http");

const triggerClass = active =>
  `relative inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${active ? "text-brandInk" : "text-slate-600 hover:text-navy"}`;

const dropdownLinkClass = "block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
          <ul className="flex items-center gap-1">
            {navItems.map(item => {
              const active = isItemActive(item);

              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={triggerClass(active)}>
                      {item.label}
                      {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="group relative">
                  {item.href ? (
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={triggerClass(active)}>
                      {item.label}
                      <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                      {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                    </Link>
                  ) : (
                    <button type="button" aria-haspopup="true" className={triggerClass(active)}>
                      {item.label}
                      <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                      {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                    </button>
                  )}

                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-64 rounded-xl border border-slate-200/70 bg-white p-2 shadow-[0_24px_40px_-24px_rgba(13,27,61,.25)]">
                      {item.children.map(([label, href]) =>
                        isExternal(href) ? (
                          <a key={label} href={href} className={dropdownLinkClass}>
                            {label}
                          </a>
                        ) : (
                          <Link key={label} href={href} className={dropdownLinkClass}>
                            {label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href={authLinks.login} className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
            Log in
          </Link>
          <ButtonLink href="/contact" size="sm" arrow>
            Get started
          </ButtonLink>
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
        <div id={menuId} className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200/70 bg-white shadow-[0_24px_40px_-24px_rgba(13,27,61,.25)] lg:hidden">
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
                      {item.children.map(([label, href]) =>
                        isExternal(href) ? (
                          <a key={label} href={href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy">
                            {label}
                          </a>
                        ) : (
                          <Link key={label} href={href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy">
                            {label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-3 grid gap-2 border-t border-slate-200/70 pt-4 sm:grid-cols-2">
              <Link href={authLinks.login} className="flex h-12 items-center justify-center rounded-lg border border-slate-200 font-semibold text-navy transition-colors hover:bg-slate-50">
                Log in
              </Link>
              <ButtonLink href="/contact" arrow>
                Get started
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
