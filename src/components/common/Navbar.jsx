"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { authLinks } from "@/data/site";
import { interTight } from "@/styles/fonts";

const links = [["Product", "/product"], ["Features", "/features"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["Blog", "/blog"]];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const isActive = href => pathname === href || pathname?.startsWith(`${href}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`${interTight.className} fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl`}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="OrmiTech home" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={150} height={75} className="h-11 w-auto object-contain" priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map(([label, href]) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${active ? "text-brandInk" : "text-slate-600 hover:text-navy"}`}
                  >
                    {label}
                    {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />}
                  </Link>
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
        <div id={menuId} className="border-t border-slate-200/70 bg-white shadow-[0_24px_40px_-24px_rgba(13,27,61,.25)] lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {links.map(([label, href]) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${active ? "bg-brand/[.06] text-brandInk" : "text-navy hover:bg-slate-50"}`}
                >
                  {label}
                </Link>
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
