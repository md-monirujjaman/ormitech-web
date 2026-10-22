"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Archive,
  Bell,
  Check,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  FileText,
  Home,
  Image as ImageIcon,
  ListChecks,
  MessageSquareDashed,
  Plus,
  Search,
  Settings,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Star,
  StickyNote,
  Tag,
  Ticket,
  UserRound,
  Users
} from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";

// A demo of the OrmiTech client dashboard, drawn at a fixed size and scaled to fit its box.
// Every name, number and message below is sample data made up for this illustration.
const W = 1200;
const H = 860;

const tabs = [
  { label: "All Contacts", count: 538, icon: Users, active: true },
  { label: "Order Requests", count: 12, icon: ClipboardList },
  { label: "Unreplied", count: 20, icon: MessageSquareDashed },
  { label: "Tickets", count: 22, icon: Ticket },
  { label: "Resolved", icon: CircleCheck },
  { label: "Archived", count: 69, icon: Archive }
];

const contacts = [
  { name: "Sajal Akand", handle: "@sajal.a", time: "5min ago", text: "Sajal, 01700-000000, house 117b road 30...", channel: "Facebook", tags: [["Priority", "red"], ["Top Client", "soft"], ["High Prospect", "amber"]], more: 3, starred: true, active: true, tone: "from-rose-400 to-rose-600" },
  { name: "Golam Sakib", handle: "@sakib", time: "20min ago", text: "Etar ki ki model ase?", channel: "Instagram", tags: [["Risky", "red"], ["Low Prospect", "amber"]], tone: "from-slate-500 to-slate-700" },
  { name: "Mostofa Ahmed", handle: "No agent assigned yet", time: "40min ago", text: "Apnar order confirm korte ami apnar pr...", channel: "WhatsApp", tags: [["Priority", "red"], ["Successful", "green"]], starred: true, tone: "from-amber-400 to-orange-500" },
  { name: "Habibullah Bahar", handle: "@bahar, +2 others", time: "1hr ago", text: "SAIBEI F71 er kono anno model er infor...", channel: "Facebook", tags: [["Priority", "red"], ["Attention", "amber"], ["High Prospect", "amber"]], more: 4, tone: "from-sky-400 to-blue-600" },
  { name: "Pranto Khan", handle: "No agent assigned yet", time: "1day ago", text: "Apnar jonne aro kichu clay pot er chobi...", channel: "WhatsApp", tags: [["Priority", "red"], ["Top Client", "soft"]], more: 3, tone: "from-emerald-400 to-teal-600" }
];

const tagStyle = {
  red: "bg-brand text-white",
  soft: "bg-[#FFE7EC] text-brand",
  amber: "bg-[#FFE9DA] text-[#E2570E]",
  green: "bg-[#E3F7EA] text-[#1B9B4C]"
};

const accordions = [
  { label: "Contact Details", icon: UserRound },
  { label: "Tags", icon: Tag, action: "Add New" },
  { label: "Notes for the customer", icon: StickyNote, badge: 69 },
  { label: "Conversation Summary", icon: FileText }
];

const activity = [
  ["Your details", "Please provide your name and email"],
  ["Company details", "A few details about your company"],
  ["Invite your team", "Start collaborating with your team"],
  ["Add your socials", "Share posts to your social accounts"]
];

const files = ["from-rose-300 to-rose-500", "from-slate-700 to-slate-900", "from-red-300 to-red-500", "from-stone-300 to-stone-500", "from-slate-800 to-slate-950", "from-sky-300 to-blue-600"];

function Product({ tone = "from-stone-200 to-stone-400", className = "" }) {
  return (
    <div className={`flex items-center justify-center rounded-md bg-gradient-to-br ${tone} ${className}`}>
      <Shirt className="h-1/3 w-1/3 text-white/80" strokeWidth={1.6} />
    </div>
  );
}

function Avatar({ tone, name, size = 40 }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tone} font-semibold text-white`} style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {name.split(" ").map(part => part[0]).slice(0, 2).join("")}
    </span>
  );
}

export default function DashboardMock() {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const fit = () => setScale(box.clientWidth / W);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} role="img" aria-label="OrmiTech dashboard with a contact list, an AI-assisted customer conversation and order actions" className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: `${W} / ${H}` }}>
      <div aria-hidden className="absolute left-0 top-0 select-none text-[#0B0D12]" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {/* Top bar */}
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 pl-24 pr-8">
          <div className="flex items-center gap-2">
            <Image src="/images/ormitech-logo.webp" alt="" width={150} height={40} className="h-9 w-auto" />
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
          <div className="flex items-center gap-4">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -right-1.5 -top-1.5 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">48</span>
            </span>
            <span className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 px-4 text-[15px] font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Available
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </span>
          </div>
        </div>

        {/* Left rail */}
        <div className="absolute bottom-0 left-0 top-0 w-[68px] border-r border-slate-100 bg-white">
          <span className="absolute left-0 top-5 h-[60px] w-1.5 rounded-r bg-brand" />
          <div className="mt-[92px] flex flex-col items-center gap-6 text-slate-500">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE9EE] text-brand">
              <Home className="h-5 w-5" />
            </span>
            <Users className="h-5 w-5" />
            <ImageIcon className="h-5 w-5" />
          </div>
          <div className="absolute bottom-6 left-0 flex w-full flex-col items-center gap-5 text-slate-500">
            <Settings className="h-5 w-5" />
            <Avatar tone="from-rose-400 to-rose-600" name="Rafi Hasan" size={34} />
          </div>
        </div>

        {/* Tabs + channel filter */}
        <div className="absolute left-[68px] right-0 top-[76px] flex h-[64px] items-center justify-between border-b border-slate-100 px-7">
          <div className="flex items-center gap-[18px] whitespace-nowrap text-[13px]">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <span key={tab.label} className={`relative flex items-center gap-1.5 py-5 font-medium ${tab.active ? "text-[#0B0D12]" : "text-slate-500"}`}>
                  <Icon className={`h-4 w-4 ${tab.active ? "text-brand" : ""}`} />
                  {tab.label}
                  {tab.count != null && <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold ${tab.active ? "bg-brand text-white" : "bg-[#FFE7EC] text-brand"}`}>{tab.count}</span>}
                  {tab.active && <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-brand" />}
                </span>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center whitespace-nowrap rounded-xl bg-slate-50 p-1 text-[12.5px] font-medium text-slate-600">
            <span className="rounded-lg bg-brand px-3 py-1.5 font-semibold text-white">All channels</span>
            {["Facebook", "Instagram", "Whatsapp"].map(name => (
              <span key={name} className="px-3 py-1.5">{name}</span>
            ))}
          </div>
        </div>

        {/* Contact list */}
        <div className="absolute bottom-0 left-[68px] top-[140px] w-[330px] border-r border-slate-100">
          <div className="flex items-center gap-3 px-5 pb-3 pt-5">
            <span className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3.5 text-[14px] text-slate-400">
              <Search className="h-4 w-4" />
              Search
            </span>
            <span className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-[14px] font-medium">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </span>
          </div>
          <div className="overflow-hidden">
            {contacts.map(contact => (
              <div key={contact.name} className={`relative px-5 py-3.5 ${contact.active ? "bg-[#FFF0F3]" : ""}`}>
                {contact.active && <span className="absolute bottom-0 left-0 top-0 w-1 bg-brand" />}
                <div className="flex gap-3">
                  <span className="relative">
                    <Avatar tone={contact.tone} name={contact.name} />
                    <span className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white ring-2 ring-white">
                      <ChannelLogo name={contact.channel} className="h-4 w-4" />
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[14.5px] font-semibold">{contact.name}</span>
                      <span className="flex shrink-0 items-center gap-1 text-[12px] text-slate-400">
                        <Star className={`h-3.5 w-3.5 ${contact.starred ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                        {contact.time}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-slate-400">{contact.handle}</p>
                  </div>
                </div>
                <p className="mt-2 truncate text-[13px] text-slate-500">{contact.text}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  {contact.tags.map(([label, tone]) => (
                    <span key={label} className={`rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${tagStyle[tone]}`}>{label}</span>
                  ))}
                  {contact.more && <span className="px-1 text-[12px] font-semibold text-slate-500">+{contact.more}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="absolute bottom-0 left-[398px] top-[140px] w-[470px]">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar tone="from-rose-400 to-rose-600" name="Sajal Akand" size={44} />
              <div>
                <p className="text-[17px] font-semibold leading-tight">Sajal Akand</p>
                <p className="flex items-center gap-1.5 text-[13px] text-slate-500">
                  <UserRound className="h-3.5 w-3.5" />
                  Assign Agent
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              {[Star, Archive, Check].map((Icon, index) => (
                <span key={index} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200">
                  <Icon className={`h-[18px] w-[18px] ${index === 0 ? "fill-amber-400 text-amber-400" : "text-slate-500"}`} />
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 px-6 pt-4">
            <div className="flex gap-3">
              <Avatar tone="from-rose-400 to-rose-600" name="Sajal Akand" size={34} />
              <div>
                <p className="text-[13.5px] font-semibold">Sajal Akand</p>
                <Product tone="from-stone-200 to-stone-400" className="mt-1.5 h-[96px] w-[82px]" />
                <p className="mt-2 rounded-lg bg-slate-50 px-4 py-2.5 text-[14px]">Eta order korbo</p>
                <p className="mt-1.5 text-[11.5px] text-slate-400">Thursday 11:40am</p>
              </div>
            </div>

            <div className="ml-16 rounded-xl border-[1.5px] border-brand bg-white px-4 py-2.5 text-[14px] leading-6">
              Thanks for choosing The Neutral Edition — White Half Zip x Coffee Pant. Please share your name, phone number and delivery address to confirm.
            </div>

            <div className="flex justify-end">
              <Product tone="from-stone-300 to-stone-500" className="h-[84px] w-[70px]" />
            </div>
            <p className="flex items-center justify-end gap-2 text-[11.5px] text-slate-400">
              Thursday 11:41am
              <span className="flex text-brand">
                <Check className="-mr-1.5 h-3.5 w-3.5" strokeWidth={3} />
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </p>

            <div className="flex gap-3">
              <Avatar tone="from-rose-400 to-rose-600" name="Sajal Akand" size={34} />
              <div>
                <p className="text-[13.5px] font-semibold">Sajal Akand</p>
                <p className="mt-1.5 rounded-lg bg-slate-50 px-4 py-2.5 text-[14px]">Sajal, 01700-000000, house 117b road 30 gulshan 1, 1 pc</p>
                <p className="mt-1.5 text-[11.5px] text-slate-400">Thursday 11:44am</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
            <div>
              <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-brand">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white">
                  <Plus className="h-3 w-3" strokeWidth={3} />
                </span>
                AI Agent
                <ChevronDown className="h-3 w-3" />
              </p>
              <p className="mt-1.5 text-[14px] text-slate-400">Type a message...</p>
            </div>
            <span className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-[14px] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(242,13,69,.8)]">
              <Sparkles className="h-4 w-4" />
              Stop AI
            </span>
          </div>
        </div>

        {/* Order actions panel */}
        <div className="absolute bottom-0 left-[868px] right-0 top-[140px] border-l border-slate-100 px-6 pt-5">
          <p className="text-[18px] font-semibold">Order Actions</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[14px] font-semibold">
            <span className="rounded-lg bg-brand py-2.5 text-center text-white">Manage Orders</span>
            <span className="rounded-lg border-[1.5px] border-brand py-2.5 text-center text-brand">Create Orders</span>
          </div>

          <div className="mt-4 space-y-0.5">
            {accordions.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 py-3 text-[14.5px] font-medium">
                  <Icon className="h-[18px] w-[18px] text-slate-600" />
                  <span className="flex-1">{item.label}</span>
                  {item.action && <span className="flex items-center gap-1 text-[12.5px] font-semibold text-brand"><Plus className="h-3 w-3" />{item.action}</span>}
                  {item.badge && <span className="rounded-md bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">{item.badge}</span>}
                  {!item.action && <ChevronDown className="h-4 w-4 text-slate-500" />}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-[14.5px] font-medium">
            <span className="flex items-center gap-3">
              <ListChecks className="h-[18px] w-[18px] text-slate-600" />
              Activity List
            </span>
            <span className="text-[12.5px] font-semibold text-brand">See all</span>
          </div>
          <div className="relative mt-3 space-y-4 pl-1">
            <span className="absolute bottom-6 left-[11px] top-3 w-px bg-brand/50" />
            {activity.map(([title, text], index) => (
              <div key={title} className="relative flex gap-3">
                <span className={`z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${index === 3 ? "border-[5px] border-brand bg-white" : "bg-brand text-white"}`}>
                  {index !== 3 && <Check className="h-3 w-3" strokeWidth={3.5} />}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold leading-tight">{title}</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-400">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-[14.5px] font-medium">
            <span className="flex items-center gap-3">
              <ImageIcon className="h-[18px] w-[18px] text-slate-600" />
              Shared Files
            </span>
            <span className="text-[12.5px] font-semibold text-brand">See all</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {files.map(tone => (
              <Product key={tone} tone={tone} className="h-[62px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
