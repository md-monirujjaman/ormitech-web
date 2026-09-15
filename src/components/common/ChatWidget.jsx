"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { markPath, markViewBox } from "@/data/ormitechMark";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
const STORAGE_KEY = "ormitech-chat-profile";
const REPLY_DELAY = 650;

const answers = {
  about: "OrmiTech is an AI-powered customer communication workspace. It brings Facebook, Instagram, WhatsApp and website chats into one inbox, automates routine replies and hands conversations to your team when it matters.",
  channels: "OrmiTech connects Facebook, Instagram, WhatsApp and your website chat, so every conversation lands in one unified inbox.",
  pricing: "Plans are shaped around your channels, usage, team size and automation needs — we don’t publish fixed prices. Tap “Talk to a human” and our team will suggest the right plan for you."
};

const quickReplies = [
  { id: "about", label: "What is OrmiTech?" },
  { id: "channels", label: "Which channels do you support?" },
  { id: "pricing", label: "How does pricing work?" },
  { id: "human", label: "Talk to a human" }
];

const emptyForm = { name: "", contact: "", company: "" };

function isValidContact(value) {
  if (EMAIL_PATTERN.test(value)) return true;
  const digits = value.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(value) && digits >= 7 && digits <= 15;
}

const firstName = name => name.split(/\s+/)[0];

const greetingFor = profile => ({
  from: "bot",
  text: `Hi ${firstName(profile.name)}! I’m the OrmiTech assistant. Ask me anything about OrmiTech, or pick a question below.`
});

async function sendLead(profile, message) {
  const contact = EMAIL_PATTERN.test(profile.contact) ? { email: profile.contact } : { phone: profile.contact };
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: profile.name, company: profile.company, ...contact, message })
  });
  if (!res.ok) throw new Error("Request failed");
}

function OrmiMark({ className }) {
  return (
    <svg viewBox={markViewBox} className={className} aria-hidden>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function Field({ id, label, error, inputRef, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-black/70">{label}</label>
      <input
        id={id}
        ref={inputRef}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-[#0B0D12] outline-none transition placeholder:text-black/35 focus:border-brand/60 sm:text-sm ${error ? "border-brand" : "border-black/10"}`}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-brand">{error}</p>}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const nameRef = useRef(null);
  const timers = useRef([]);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (saved?.name && saved?.contact && saved?.company) {
        setProfile(saved);
        setMessages([greetingFor(saved)]);
      }
    } catch {}
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!open) return;
    (profile ? inputRef : nameRef).current?.focus();
  }, [open, profile]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = event => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const addMessage = message => setMessages(current => [...current, message]);

  const botSay = text => {
    setTyping(true);
    timers.current.push(setTimeout(() => {
      setTyping(false);
      addMessage({ from: "bot", text });
    }, REPLY_DELAY));
  };

  const updateField = field => event => {
    setForm(current => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors(current => ({ ...current, [field]: undefined }));
  };

  const confirmProfile = event => {
    event.preventDefault();
    const next = { name: form.name.trim(), contact: form.contact.trim(), company: form.company.trim() };
    const nextErrors = {};
    if (!next.name) nextErrors.name = "Please enter your name.";
    if (!isValidContact(next.contact)) nextErrors.contact = "Enter a valid email address or phone number.";
    if (!next.company) nextErrors.company = "Please enter your company name.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setProfile(next);
    setMessages([greetingFor(next)]);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    sendLead(next, "Started a website chat").catch(() => {});
  };

  const forwardToTeam = async message => {
    setTyping(true);
    try {
      await sendLead(profile, message);
      botSay(`Thanks, ${firstName(profile.name)}! I’ve passed this to our team — they’ll get back to you at ${profile.contact} shortly.`);
    } catch {
      botSay("Sorry, something went wrong sending that. Please try again, or use our contact page.");
    }
  };

  const handleQuickReply = reply => {
    addMessage({ from: "user", text: reply.label });
    if (reply.id === "human") forwardToTeam("Wants to talk to a human");
    else botSay(answers[reply.id]);
  };

  const send = event => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    addMessage({ from: "user", text });
    forwardToTeam(text);
  };

  // Account pages are focused forms; the floating widget would cover their fields on small screens.
  if (["/login", "/signup", "/forgot-password"].includes(pathname)) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="ormitech-chat"
            role="dialog"
            aria-label="Chat with OrmiTech"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-[min(580px,calc(100svh_-_7rem))] w-[calc(100vw_-_2rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,.35)] sm:w-[380px]"
          >
            <div className="flex items-center gap-3 border-b border-black/[.08] px-4 py-3">
              <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand2 via-brand to-[#7A0722]">
                <OrmiMark className="h-[58%] w-[58%] text-white" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#0B0D12]">OrmiTech Assistant</p>
                <p className="text-xs text-black/50">We typically reply within minutes.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-8 w-8 items-center justify-center rounded-full text-black/50 transition hover:bg-black/[.05] hover:text-black">
                <X size={18} />
              </button>
            </div>

            {!profile ? (
              <form onSubmit={confirmProfile} noValidate className="flex flex-1 flex-col overflow-y-auto bg-[#F7F8FA] px-5 py-5">
                <div className="flex flex-col items-center text-center">
                  <Image src="/images/ormitech-logo.webp" alt="OrmiTech IT" width={800} height={400} sizes="160px" className="h-14 w-auto" />
                  <p className="mt-1 text-sm font-semibold text-[#0B0D12]">Before we start chatting</p>
                  <p className="mt-1 text-xs leading-5 text-black/55">Share a few details so our team can follow up with you.</p>
                </div>
                <div className="mt-5 space-y-3">
                  <Field id="chat-name" label="Name" inputRef={nameRef} value={form.name} onChange={updateField("name")} placeholder="Your full name" autoComplete="name" error={errors.name} />
                  <Field id="chat-contact" label="Email or phone number" value={form.contact} onChange={updateField("contact")} placeholder="you@company.com or +880…" autoComplete="email" inputMode="email" error={errors.contact} />
                  <Field id="chat-company" label="Company name" value={form.company} onChange={updateField("company")} placeholder="Your company" autoComplete="organization" error={errors.company} />
                </div>
                <button type="submit" className="mt-5 rounded-full bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand2">
                  Confirm &amp; start chat
                </button>
              </form>
            ) : (
              <>
                <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-[#F7F8FA] px-4 py-4">
                  {messages.map((message, i) => (
                    <div key={i} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                      <p className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.from === "user" ? "rounded-br-md bg-brand text-white" : "rounded-bl-md border border-black/[.06] bg-white text-[#0B0D12] shadow-sm"}`}>
                        {message.text}
                      </p>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex" aria-label="Assistant is typing">
                      <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-black/[.06] bg-white px-3.5 py-3 shadow-sm">
                        {[0, 0.15, 0.3].map(delay => <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/35" style={{ animationDelay: `${delay}s` }} />)}
                      </span>
                    </div>
                  )}

                  {!typing && (
                    <div className="flex flex-wrap justify-end gap-2 pt-1">
                      {quickReplies.map(reply => (
                        <button key={reply.id} type="button" onClick={() => handleQuickReply(reply)} className="rounded-full border border-brand/40 bg-white px-3 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-white">
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={send} className="flex items-center gap-2 border-t border-black/[.08] bg-white p-3">
                  <label htmlFor="ormitech-chat-input" className="sr-only">Type a message</label>
                  <input
                    id="ormitech-chat-input"
                    ref={inputRef}
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    type="text"
                    autoComplete="off"
                    placeholder="Type a message…"
                    className="min-w-0 flex-1 rounded-full border border-black/10 bg-[#F7F8FA] px-4 py-2.5 text-base outline-none transition focus:border-brand/50 focus:bg-white sm:text-sm"
                  />
                  <button type="submit" aria-label="Send message" disabled={!input.trim() || typing} className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand2 disabled:opacity-40">
                    <SendIcon />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        aria-expanded={open}
        aria-controls={open ? "ormitech-chat" : undefined}
        className="flex items-center gap-3 rounded-full border border-black/[.06] bg-white py-2 pl-5 pr-2 text-left shadow-[0_18px_40px_-14px_rgba(15,23,42,.35)] transition hover:-translate-y-0.5"
      >
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-[#0B0D12]">{open ? "Close chat" : "Chat with us"}</span>
          <span className="hidden text-xs text-black/50 sm:block">We typically reply within minutes.</span>
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand2 via-brand to-[#7A0722] text-white">
          {open ? <X size={18} /> : <OrmiMark className="h-[58%] w-[58%]" />}
        </span>
      </button>
    </div>
  );
}
