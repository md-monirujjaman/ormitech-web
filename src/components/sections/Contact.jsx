"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock3, Loader2, Mail, MapPin, Phone, Send, UserRound } from "lucide-react";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";

// Enquiry types that other pages can link to with /contact?topic=…
const TOPICS = {
  enterprise: { label: "Enterprise enquiry", message: "I’d like to discuss Enterprise pricing for my business." }
};

const SUBJECTS = ["General enquiry", "Product demo", "Enterprise enquiry", "Support"];

const contactDetails = [
  { icon: MapPin, label: "Our office", lines: [{ text: "Khulna Sadar, Khulna 9100, Bangladesh" }] },
  { icon: Mail, label: "Email us", lines: [{ text: "contact@ormitechit.com", href: "mailto:contact@ormitechit.com" }, { text: "support@ormitechit.com", href: "mailto:support@ormitechit.com" }] },
  {
    icon: Phone,
    label: "Call us",
    lines: [
      { text: "+880 1407752887", href: "tel:+8801407752887" },
      { text: "+880 1814634028", href: "tel:+8801814634028" },
      { text: "+880 1568842688", href: "tel:+8801568842688" }
    ]
  },
  { icon: Clock3, label: "Working hours", lines: [{ text: "Open 24/7" }, { text: "Open 24 hours, 7 days a week" }] }
];

const officeMapQuery = "Khulna Sadar, Khulna 9100, Bangladesh";
const officeMapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(officeMapQuery)}&output=embed`;
const officeMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeMapQuery)}`;

const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const group = (gap = 0.08, delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
const view = { once: true, margin: "-60px" };

const fieldClass = "peer w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-[#0B0D12] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand/60 focus:ring-4 focus:ring-brand/10";
const labelClass = "mb-2 block text-[12px] font-semibold text-[#0B0D12]";

function Field({ label, required, icon: Icon, children }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label} {required && <b className="text-brand">*</b>}
      </span>
      <span className="relative block">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors duration-200 peer-focus:text-brand" size={16} aria-hidden />}
        {children}
      </span>
    </label>
  );
}

export default function Contact({ headingLevel: Heading = "h2" }) {
  const [status, setStatus] = useState({ type: "", text: "" });
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (!requested || !TOPICS[requested]) return;
    setTopic(requested);
    setSubject("Enterprise enquiry");
    if (messageRef.current && !messageRef.current.value) messageRef.current.value = TOPICS[requested].message;
  }, []);

  async function submit(e) {
    e.preventDefault();
    // Keep a reference: React clears e.currentTarget once the handler awaits.
    const formElement = e.currentTarget;
    setIsSubmitting(true);
    setStatus({ type: "pending", text: "Sending…" });
    const payload = Object.fromEntries(new FormData(formElement).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Unable to send message");
      formElement.reset();
      setTopic("");
      setSubject("");
      setStatus({ type: "success", text: "Thanks — your message has been received. We’ll get back to you soon." });
    } catch {
      setStatus({ type: "error", text: "Something went wrong while sending your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="contact" className={`${interTight.className} relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white via-[#FFF8FA] to-white py-16 sm:py-24`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#FFD9E1] to-transparent opacity-70 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#FFC9D5] opacity-30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-50 [background-image:radial-gradient(rgba(242,13,69,.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-14">
            <div className="flex flex-col">
              <motion.div variants={group(0.1, 0)} initial="hidden" whileInView="show" viewport={view}>
                <motion.p variants={rise} className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  Get in touch
                </motion.p>
                <motion.div variants={rise}>
                  <Heading className="mt-5 max-w-xl text-[38px] font-bold leading-[1.04] tracking-[-0.035em] text-[#0B0D12] [text-wrap:balance] sm:text-[58px]">
                    Let’s build something <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">great together.</span>
                  </Heading>
                </motion.div>
                <motion.p variants={rise} className="mt-6 max-w-xl text-[15.5px] leading-7 text-slate-500">
                  Have a question about OrmiTech IT, your channels or getting started? We’d love to hear from you. Our team is here to help and will get back to you as soon as possible.
                </motion.p>
              </motion.div>

              <motion.ul variants={group(0.09, 0.1)} initial="hidden" whileInView="show" viewport={view} className="mt-9 grid gap-3.5 sm:grid-cols-2">
                {contactDetails.map(({ icon: Icon, label, lines }) => (
                  <motion.li key={label} variants={rise}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.05),0_20px_40px_-30px_rgba(242,13,69,.4)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_30px_52px_-28px_rgba(242,13,69,.45)] motion-safe:hover:-translate-y-1">
                      <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/[.06] transition-transform duration-500 group-hover:scale-150" />
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6" aria-hidden>
                        <Icon size={19} strokeWidth={2} />
                      </span>
                      <p className="relative mt-4 text-[13px] font-bold text-[#0B0D12]">{label}</p>
                      <div className="relative mt-1.5 space-y-0.5">
                        {lines.map(({ text, href }) =>
                          href ? (
                            <a key={text} href={href} className="block break-words text-[13px] leading-6 text-slate-500 transition-colors hover:text-brandInk">
                              {text}
                            </a>
                          ) : (
                            <p key={text} className="text-[13px] leading-6 text-slate-500">
                              {text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.form onSubmit={submit} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 0.7, delay: 0.1, ease }} className="relative overflow-hidden rounded-[28px] border border-white bg-white p-6 shadow-[0_50px_100px_-46px_rgba(242,13,69,.4),0_24px_48px_-32px_rgba(13,27,61,.3)] ring-1 ring-slate-100 sm:p-9">
              <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-[#FF5C85] to-[#C1093A]" />
              <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-brandInk">
                <Send className="h-3 w-3" aria-hidden /> Send us a message
              </p>
              <h2 className="mt-4 text-[28px] font-bold tracking-[-0.03em] text-[#0B0D12]">
                We’d love to <span className="text-brand">hear from you.</span>
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-slate-500">Fill out the form below and we’ll get back to you as soon as possible.</p>

              {topic && (
                <>
                  <input type="hidden" name="topic" value={topic} />
                  <p className="mt-5 inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-red-700">{TOPICS[topic].label}</p>
                </>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required icon={UserRound}>
                  <input name="name" required maxLength="100" placeholder="Enter your full name" className={`${fieldClass} pl-10`} />
                </Field>
                <Field label="Email address" required icon={Mail}>
                  <input name="email" required type="email" maxLength="254" placeholder="Enter your email address" className={`${fieldClass} pl-10`} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Phone number" icon={Phone}>
                    <input name="phone" type="tel" maxLength="30" placeholder="Enter your phone number" className={`${fieldClass} pl-10`} />
                  </Field>
                </div>
              </div>

              <fieldset className="mt-5">
                <legend className={labelClass}>
                  Subject <b className="text-brand">*</b>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((item, index) => (
                    <label key={item} className="cursor-pointer">
                      <input type="radio" name="subject" value={item} required={index === 0} checked={subject === item} onChange={() => setSubject(item)} className="peer sr-only" />
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:border-brand/40 hover:text-brandInk peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-checked:shadow-[0_12px_22px_-12px_rgba(242,13,69,.8)] peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20 motion-safe:peer-checked:scale-[1.03]">{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="mt-5 block">
                <span className={labelClass}>
                  Your message <b className="text-brand">*</b>
                </span>
                <textarea ref={messageRef} name="message" required maxLength="3000" rows="5" placeholder="Tell us about your project or question..." className={`${fieldClass} resize-y`} />
              </label>

              <button disabled={isSubmitting} className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand px-5 py-4 text-[14.5px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(242,13,69,.8)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand2 hover:shadow-[0_24px_42px_-16px_rgba(242,13,69,.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-shine" />
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending...
                  </>
                ) : (
                  <>
                    Send message <Send size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status.text && status.type !== "pending" && (
                  <motion.p
                    key={status.type}
                    role="status"
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className={`mt-4 flex items-start gap-2 overflow-hidden rounded-xl px-4 py-3 text-[13px] leading-5 ${status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                  >
                    {status.type === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
                    {status.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>

          {/* The map spans the same width as the page content and the footer. */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 0.75, ease }} className="relative mt-14 overflow-hidden rounded-[28px] border border-white bg-[#edf1f5] shadow-[0_40px_80px_-44px_rgba(13,27,61,.5)] ring-1 ring-slate-100 lg:mt-20">
            <iframe title="OrmiTech IT office location" src={officeMapEmbedSrc} className="block h-[380px] w-full border-0 sm:h-[460px] lg:h-[520px]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="pointer-events-auto flex max-w-sm items-center gap-3.5 rounded-2xl bg-white/95 p-4 shadow-[0_24px_50px_-24px_rgba(13,27,61,.55)] backdrop-blur">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-[0_12px_24px_-10px_rgba(242,13,69,.8)]">
                  <motion.span aria-hidden className="absolute inset-0 rounded-xl bg-brand" animate={{ scale: [1, 1.5], opacity: [0.45, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
                  <MapPin className="relative h-5 w-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[14px] font-semibold text-[#0B0D12]">OrmiTech IT office</span>
                  <span className="mt-0.5 block text-[12.5px] text-slate-500">Khulna Sadar, Khulna 9100, Bangladesh</span>
                </span>
              </div>
              <a href={officeMapLink} target="_blank" rel="noopener noreferrer" className="pointer-events-auto group inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0B0D12] px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_16px_30px_-16px_rgba(13,27,61,.8)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30">
                Open in Google Maps
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
