"use client";

import { useEffect, useRef, useState } from "react";
import { Clock3, Mail, MapPin, Phone, Send, UserRound } from "lucide-react";
import Reveal, { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";

// Enquiry types that other pages can link to with /contact?topic=…
const TOPICS = {
  enterprise: { label: "Enterprise enquiry", message: "I’d like to discuss Enterprise pricing for my business." }
};

const contactDetails = [
  { icon: MapPin, label: "Our office", value: "123 Innovation Drive, Dhaka 1200, Bangladesh" },
  { icon: Mail, label: "Email us", value: "hello@ormitech.com", secondary: "support@ormitech.com", href: "mailto:hello@ormitech.com" },
  { icon: Phone, label: "Call us", value: "+880 1712 345678", secondary: "+880 1812 345678", href: "tel:+8801712345678" },
  { icon: Clock3, label: "Working hours", value: "Mon – Fri: 9:00 AM – 6:00 PM", secondary: "Sat – Sun: Closed" }
];

export default function Contact({ headingLevel: Heading = "h2" }) {
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (!requested || !TOPICS[requested]) return;
    setTopic(requested);
    if (messageRef.current && !messageRef.current.value) messageRef.current.value = TOPICS[requested].message;
  }, []);

  async function submit(e) {
    e.preventDefault();
    // Keep a reference: React clears e.currentTarget once the handler awaits.
    const formElement = e.currentTarget;
    setIsSubmitting(true);
    setStatus("Sending…");
    const payload = Object.fromEntries(new FormData(formElement).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Unable to send message");
      formElement.reset();
      setTopic("");
      setStatus("Thanks — your message has been received. We’ll get back to you soon.");
    } catch {
      setStatus("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/10";
  const labelClass = "mb-2 block text-xs font-semibold text-navy";

  return (
    <section id="contact" className="overflow-hidden border-t border-slate-100 bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:items-start lg:gap-14">
          <div className="flex flex-col">
            <Reveal transition={{ duration: 0.65, ease }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brandInk">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Get in touch
            </p>
            <Heading className="mt-5 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Let’s build something <span className="text-brand">great together.</span>
            </Heading>
            <p className="mt-6 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Have a project in mind, a question, or just want to say hi? We’d love to hear from you. Our team is here to help and will get back to you as soon as possible.
            </p>
            </Reveal>

            <Stagger as="div" className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {contactDetails.map(({ icon: Icon, label, value, secondary, href }) => (
                <StaggerItem key={label}>
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-28px_rgba(13,27,61,.5)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand" aria-hidden>
                    <Icon size={17} strokeWidth={2} />
                  </span>
                  <p className="mt-3 text-xs font-bold capitalize text-navy">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-xs leading-5 text-slate-600 transition-colors hover:text-brandInk">{value}</a>
                  ) : (
                    <p className="mt-1 text-xs leading-5 text-slate-600">{value}</p>
                  )}
                  {secondary && <p className="text-xs leading-5 text-slate-600">{secondary}</p>}
                </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.16} transition={{ duration: 0.75, ease }} className="relative mt-5 h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#edf1f5] shadow-[0_12px_35px_-28px_rgba(13,27,61,.6)] sm:h-[420px] lg:h-[480px]">
              <iframe
                title="OrmiTechIT office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58759.74267533393!2d91.15546470610349!3d23.005997738706323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a4087c8b02d1037%3A0x95f3486a0dd4fc3!2sOrmiTechIT!5e0!3m2!1sen!2sbd!4v1792069097667!5m2!1sen!2sbd"
                className="block h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </Reveal>
          </div>

          <Reveal as="form" onSubmit={submit} delay={0.1} transition={{ duration: 0.65, ease }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-34px_rgba(13,27,61,.45)] sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brandInk">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Send us a message
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">We’d love to <span className="text-brand">hear from you.</span></h2>
            <p className="mt-2 text-sm text-slate-500">Fill out the form below and we’ll get back to you as soon as possible.</p>
          {topic && (
            <>
              <input type="hidden" name="topic" value={topic} />
              <p className="mt-5 inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-red-700">{TOPICS[topic].label}</p>
            </>
          )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label><span className={labelClass}>Full name <b className="text-brand">*</b></span><span className="relative block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} aria-hidden /><input name="name" required maxLength="100" placeholder="Enter your full name" className={`${inputClass} pl-9`} /></span></label>
              <label><span className={labelClass}>Email address <b className="text-brand">*</b></span><span className="relative block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} aria-hidden /><input name="email" required type="email" maxLength="254" placeholder="Enter your email address" className={`${inputClass} pl-9`} /></span></label>
              <label><span className={labelClass}>Subject <b className="text-brand">*</b></span><select name="subject" required defaultValue="" className={`${inputClass} text-slate-500`}><option value="" disabled>Select a subject</option><option value="General enquiry">General enquiry</option><option value="Product demo">Product demo</option><option value="Enterprise enquiry">Enterprise enquiry</option><option value="Support">Support</option></select></label>
              <label><span className={labelClass}>Phone number</span><span className="relative block"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} aria-hidden /><input name="phone" type="tel" maxLength="30" placeholder="Enter your phone number" className={`${inputClass} pl-9`} /></span></label>
            </div>
            <label className="mt-4 block"><span className={labelClass}>Your message <b className="text-brand">*</b></span><textarea ref={messageRef} name="message" required maxLength="3000" rows="5" placeholder="Tell us about your project or question..." className={inputClass} /></label>
            <button disabled={isSubmitting} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand2 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending..." : "Send message"} <Send size={15} aria-hidden />
            </button>
            {status && <p role="status" className="mt-3 text-xs text-slate-500">{status}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
