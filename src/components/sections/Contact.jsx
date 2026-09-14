 "use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  async function submit(e) {
    e.preventDefault();
    setStatus("Sending…");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      e.currentTarget.reset();
      setStatus("Thanks — your message has been received.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    }
  }
  return (
    <section id="contact" className="border-t border-black/5 bg-[#F7F8FA] py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">Get started</p><h2 className="mt-4 text-4xl font-bold sm:text-5xl">Build a better conversation workflow.</h2><p className="mt-5 text-black/50">Tell us what you want to connect and automate. The landing page is ready to hand off into the future OrmiTech platform architecture.</p></div>
        <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Your name" className="rounded-xl border border-black/10 bg-black/[.03] px-4 py-3 text-sm outline-none placeholder:text-black/25 focus:border-brand/40" />
            <input name="email" required type="email" placeholder="Work email" className="rounded-xl border border-black/10 bg-black/[.03] px-4 py-3 text-sm outline-none placeholder:text-black/25 focus:border-brand/40" />
          </div>
          <input name="company" placeholder="Company (optional)" className="mt-4 w-full rounded-xl border border-black/10 bg-black/[.03] px-4 py-3 text-sm outline-none placeholder:text-black/25 focus:border-brand/40" />
          <textarea name="message" required rows="5" placeholder="What would you like to automate?" className="mt-4 w-full rounded-xl border border-black/10 bg-black/[.03] px-4 py-3 text-sm outline-none placeholder:text-black/25 focus:border-brand/40" />
          <button className="mt-4 w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand2">Send request</button>
          {status && <p className="mt-3 text-xs text-black/45">{status}</p>}
        </form>
      </div>
    </section>
  );
}