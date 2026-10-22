"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Check, CheckCheck, MapPin, Package, Star, Truck } from "lucide-react";
import { TypingDots } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";

// Building blocks for the phone chats on the home page. All names, products and numbers are made-up examples.

// Older messages glide up smoothly when a new one arrives instead of jumping.
export const glide = { layout: { type: "spring", stiffness: 240, damping: 30, mass: 0.9 } };

export const pop = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, transition: { duration: 0.12 } }
};

export const photos = {
  brown: { src: "/images/product-suit-brown.jpg", alt: "Brown three-piece suit on a mannequin", name: "Brown three-piece suit", price: "৳8,120" },
  blue: { src: "/images/product-suit-blue.jpg", alt: "Navy blue suit on a mannequin", name: "Navy blue suit", price: "৳7,450" }
};

export function Avatar({ name, tone = "from-slate-500 to-slate-700", size = 34 }) {
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white/80 ${tone}`} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {name
        .split(" ")
        .map(part => part[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

// A message from the customer: white bubble on the left.
export function Incoming({ children, time = "10:24", className = "" }) {
  return (
    <motion.div layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className={`max-w-[84%] self-start ${className}`}>
      <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12.5px] leading-5 text-slate-700 shadow-[0_6px_14px_-10px_rgba(13,27,61,.4)]">{children}</div>
      <p className="mt-1 pl-1 text-[9.5px] text-slate-400">{time}</p>
    </motion.div>
  );
}

// A photo sent by the customer.
export function PhotoMessage({ photo, caption, time = "10:24" }) {
  return (
    <motion.div layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[66%] self-start">
      <div className="overflow-hidden rounded-2xl rounded-tl-md bg-white p-1 shadow-[0_6px_14px_-10px_rgba(13,27,61,.4)]">
        <Image src={photo.src} alt={photo.alt} width={156} height={246} className="h-[100px] w-full rounded-xl object-cover" />
        {caption && <p className="px-2.5 pb-1.5 pt-2 text-[12.5px] leading-5 text-slate-700">{caption}</p>}
      </div>
      <p className="mt-1 pl-1 text-[9.5px] text-slate-400">{time}</p>
    </motion.div>
  );
}

// A reply from OrmiTech AI: brand bubble on the right.
export function AiReply({ children, time = "10:24", label = "OrmiTech AI", card }) {
  return (
    <motion.div layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[88%] self-end">
      <p className="mb-1 flex items-center justify-end gap-1 text-[10px] font-semibold text-brand">
        <Bot className="h-3 w-3" /> {label}
      </p>
      {card}
      <div className={`rounded-2xl rounded-tr-md bg-brand px-3.5 py-2.5 text-[12.5px] leading-5 text-white shadow-[0_12px_22px_-12px_rgba(242,13,69,.8)] ${card ? "mt-1.5" : ""}`}>{children}</div>
      <p className="mt-1 flex items-center justify-end gap-1 pr-1 text-[9.5px] text-slate-400">
        {time} <CheckCheck className="h-3 w-3 text-brand" />
      </p>
    </motion.div>
  );
}

// Typing dots shown on the AI side before a reply.
export function Typing() {
  return (
    <motion.span layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-end rounded-2xl bg-[#FFE3EA] px-3.5 py-3">
      <TypingDots dotClassName="bg-brand" />
    </motion.span>
  );
}

export function ProductCard({ photo, note = "In stock" }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white p-2 pr-3 text-left shadow-[0_10px_22px_-14px_rgba(13,27,61,.5)] ring-1 ring-slate-100">
      <Image src={photo.src} alt={photo.alt} width={156} height={246} className="h-[54px] w-[44px] rounded-lg object-cover" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[11.5px] font-semibold text-[#0B0D12]">{photo.name}</p>
        <p className="mt-0.5 text-[12px] font-bold text-brand">{photo.price}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[9.5px] font-medium text-emerald-600">
          <Check className="h-2.5 w-2.5" strokeWidth={3.2} /> {note}
        </p>
      </div>
    </div>
  );
}

export function OrderCard({ number = "#4821", total = "৳7,450", line = "Cash on delivery" }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-left shadow-[0_10px_22px_-14px_rgba(13,27,61,.5)] ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#0B0D12]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Package className="h-3.5 w-3.5" />
          </span>
          Order {number}
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">Confirmed</span>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[10.5px] text-slate-500">
        <span>{line}</span>
        <span className="text-[12px] font-bold text-[#0B0D12]">{total}</span>
      </div>
    </div>
  );
}

export function CourierCard({ order = "#4821", status = "Out for delivery", note = "Arrives today" }) {
  return (
    <motion.div layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="w-[84%] self-center rounded-2xl bg-[#0F1220] p-3 text-white shadow-[0_16px_30px_-16px_rgba(13,27,61,.7)]">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/60">
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-[#FF8AA3]" /> Courier update
        </span>
        <span>{order}</span>
      </div>
      <p className="mt-1.5 text-[13px] font-semibold">{status}</p>
      <div className="mt-2.5 flex items-center gap-1">
        {[0, 1, 2, 3].map(dot => (
          <span key={dot} className={`h-1 flex-1 rounded-full ${dot < 3 ? "bg-brand" : "bg-white/20"}`} />
        ))}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-white/70">
        <MapPin className="h-3 w-3" /> {note}
      </p>
    </motion.div>
  );
}

export function Stars({ filled = 5 }) {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map(star => (
        <Star key={star} className={`h-3.5 w-3.5 ${star < filled ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </span>
  );
}

// The phone body shared by the demos. `header` goes inside the top bar, `footer` replaces the default composer.
export function PhoneShell({ header, children, footer, headerClass = "bg-white", height = 520 }) {
  return (
    <div className="mx-auto w-full max-w-[310px]">
      <div className="rounded-[42px] bg-[#0F1220] p-[9px] shadow-[0_50px_90px_-30px_rgba(242,13,69,.45),0_24px_50px_-24px_rgba(13,27,61,.5)] ring-1 ring-black/10">
        <div className="relative flex flex-col overflow-hidden rounded-[34px] bg-[#F6F7FB]" style={{ height }}>
          <span aria-hidden className="absolute left-1/2 top-2 z-20 h-[18px] w-[84px] -translate-x-1/2 rounded-full bg-[#0F1220]" />
          <div className={`relative z-10 px-4 pb-3 pt-9 transition-colors duration-500 ${headerClass}`}>{header}</div>
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-3.5 pb-3 pt-4">{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
}
