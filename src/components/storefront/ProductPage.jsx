"use client";

import { useEffect, useRef, useState } from "react";
import { placeStorefrontOrder, formatPrice } from "@/lib/storefront";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

/** Cloudflare's human check, loaded only when a site key is configured. Reports the token (or null when it expires). */
function HumanCheck({ onToken }) {
  const box = useRef(null);
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let widget = null;
    let cancelled = false;
    const render = () => {
      if (cancelled || !box.current || !window.turnstile) return;
      widget = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: token => onToken(token),
        "expired-callback": () => onToken(null),
        "error-callback": () => onToken(null)
      });
    };
    if (window.turnstile) render();
    else {
      let script = document.querySelector("script[data-turnstile]");
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (widget !== null && window.turnstile) window.turnstile.remove(widget);
    };
  }, [onToken]);
  return TURNSTILE_SITE_KEY ? <div ref={box} className="min-h-[65px]" /> : null;
}

function Price({ currency, price, salePrice, large = false }) {
  return (
    <p className={`flex items-baseline gap-2 ${large ? "text-3xl" : "text-base"} font-bold text-slate-900`}>
      {formatPrice(currency, salePrice ?? price)}
      {salePrice !== null && <span className={`${large ? "text-lg" : "text-sm"} font-normal text-slate-400 line-through`}>{formatPrice(currency, price)}</span>}
    </p>
  );
}

/** The date a delivery of this many days would arrive by, in Bangla ("১৮ নভেম্বর"). */
function estimatedDate(days) {
  const date = new Date(Date.now() + days * 86_400_000);
  return date.toLocaleDateString("bn-BD", { day: "numeric", month: "long", timeZone: "Asia/Dhaka" });
}

const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900";

/** A product's public page: pictures, price, what the seller wrote about it, Buy Now, and similar products. Only what exists is shown. */
export default function ProductPage({ token, product }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [human, setHuman] = useState(null);
  const [option, setOption] = useState("");
  const [needOption, setNeedOption] = useState(false);
  const delivery = product.delivery;
  const areas = delivery ? ["inside", "outside"].filter(key => delivery[key]) : [];
  const [area, setArea] = useState(areas.length === 1 ? areas[0] : "");
  const [form, setForm] = useState({ name: "", phone: "", address: "", quantity: 1, note: "", couponCode: "" });
  const set = key => event => setForm(current => ({ ...current, [key]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    if (areas.length > 1 && !area) {
      setError("ইনসাইড ঢাকা নাকি আউটসাইড ঢাকা, বেছে নিন।");
      return;
    }
    if (TURNSTILE_SITE_KEY && !human) {
      setError("অনুগ্রহ করে নিচের যাচাইটি সম্পন্ন করুন।");
      return;
    }
    setSending(true);
    setError("");
    try {
      const result = await placeStorefrontOrder(token, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        quantity: Number(form.quantity),
        ...(option ? { option } : {}),
        ...(area ? { area } : {}),
        ...(form.note.trim() ? { note: form.note } : {}),
        ...(form.couponCode.trim() ? { couponCode: form.couponCode } : {}),
        ...(human ? { turnstileToken: human } : {})
      });
      setDone(result);
    } catch (failure) {
      setError(failure.message);
      // A human-check token works once.
      setHuman(null);
      if (window.turnstile) window.turnstile.reset();
    } finally {
      setSending(false);
    }
  }

  const images = product.images;

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-white px-4 py-6 text-slate-900 sm:py-10">
      <p className="text-sm font-medium text-slate-500">{product.businessName}</p>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          {images.length > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[active]} alt={product.name} className="aspect-square w-full rounded-xl bg-slate-100 object-contain" />
              {images.length > 1 && (
                <ul className="mt-3 flex gap-2">
                  {images.map((src, index) => (
                    <li key={src}>
                      <button type="button" onClick={() => setActive(index)} aria-label={`ছবি ${index + 1}`} className={`block h-16 w-16 overflow-hidden rounded-lg border-2 ${index === active ? "border-slate-900" : "border-transparent"}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-slate-100 text-slate-400">ছবি নেই</div>
          )}
        </div>

        <div>
          {product.category && <p className="text-sm text-slate-500">{product.category}</p>}
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-500">কোড: {product.code}</p>
          <div className="mt-4">
            <Price currency={product.currency} price={product.price} salePrice={product.salePrice} large />
          </div>
          <p className={`mt-2 text-sm font-medium ${product.inStock ? "text-emerald-700" : "text-red-700"}`}>{product.inStock ? "স্টকে আছে" : "স্টকে নেই"}</p>

          {product.options.length > 0 && !done && (
            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">{product.optionLabel || "অপশন বেছে নিন"}</legend>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup">
                {product.options.map(item => (
                  <button
                    key={item}
                    type="button"
                    role="radio"
                    aria-checked={option === item}
                    onClick={() => { setOption(item); setNeedOption(false); }}
                    className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-medium ${option === item ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-900 hover:border-slate-900"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {needOption && <p role="alert" className="mt-2 text-sm font-medium text-red-700">অনুগ্রহ করে একটি বেছে নিন।</p>}
            </fieldset>
          )}

          {done ? (
            <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-900">আপনার অর্ডার গ্রহণ করা হয়েছে</p>
              <p className="mt-1 text-sm text-emerald-900">অর্ডার নম্বর: {done.orderNumber}</p>
              <p className="mt-1 text-sm text-emerald-900">
                {done.deliveryFee > 0 || area ? `ডেলিভারি সহ মোট: ${formatPrice(done.currency, done.total)}` : `পণ্যের মোট দাম: ${formatPrice(done.currency, done.total)}। ডেলিভারি চার্জ আমাদের টিম জানিয়ে দেবে।`}
              </p>
              {done.billSentToChat && <p className="mt-1 text-sm text-emerald-900">বিলটি আপনার চ্যাটেও পাঠানো হয়েছে।</p>}
              {done.couponNoted && <p className="mt-1 text-sm text-emerald-900">কুপন {done.couponNoted} আমাদের টিম অর্ডার নিশ্চিত করার সময় প্রয়োগ করবে।</p>}
            </div>
          ) : product.canOrder ? (
            <button type="button" onClick={() => (product.options.length > 0 && !option ? setNeedOption(true) : setOpen(true))} className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-700 sm:w-auto">
              এখনই কিনুন
            </button>
          ) : (
            <p className="mt-6 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">এই পণ্যটি এখন অর্ডার করা যাচ্ছে না।</p>
          )}

          {delivery && !done && (
            <div className="mt-5 rounded-xl border border-slate-200 p-4 text-sm">
              <p className="font-semibold">ডেলিভারি</p>
              <ul className="mt-2 space-y-1 text-slate-700">
                {areas.map(key => (
                  <li key={key}>
                    {key === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}: {delivery[key].fee === 0 ? "ফ্রি ডেলিভারি" : formatPrice(product.currency, delivery[key].fee)}
                    {delivery[key].days ? ` · আনুমানিক ${estimatedDate(delivery[key].days)} এর মধ্যে (${delivery[key].days} দিন)` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.description && <p className="mt-6 whitespace-pre-line text-base leading-7 text-slate-700">{product.description}</p>}
        </div>
      </div>

      {product.similar.length > 0 && (
        <section className="mt-12" aria-labelledby="similar">
          <h2 id="similar" className="text-lg font-bold">অনুরূপ পণ্য</h2>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {product.similar.map(item => (
              <li key={item.token}>
                <a href={`/p/${item.token}`} className="block">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="aspect-square w-full rounded-lg bg-slate-100 object-cover" loading="lazy" />
                  ) : (
                    <div className="aspect-square w-full rounded-lg bg-slate-100" />
                  )}
                  <p className="mt-2 line-clamp-2 text-sm font-medium">{item.name}</p>
                  <Price currency={item.currency} price={item.price} salePrice={item.salePrice} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {open && !done && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center" role="dialog" aria-modal="true" aria-label="অর্ডার ফর্ম">
          <form onSubmit={submit} className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">অর্ডার করুন</h2>
                <p className="text-sm text-slate-500">{product.name}{option ? ` (${option})` : ""}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100" aria-label="বন্ধ করুন">✕</button>
            </div>

            <label className="mt-4 block text-sm font-medium">আপনার নাম
              <input className={field} value={form.name} onChange={set("name")} required minLength={2} maxLength={120} autoComplete="name" />
            </label>
            <label className="mt-3 block text-sm font-medium">মোবাইল নম্বর
              <input className={field} value={form.phone} onChange={set("phone")} required inputMode="tel" placeholder="01XXXXXXXXX" autoComplete="tel" />
            </label>
            <label className="mt-3 block text-sm font-medium">ডেলিভারি ঠিকানা
              <textarea className={field} value={form.address} onChange={set("address")} required minLength={8} maxLength={400} rows={3} autoComplete="street-address" />
            </label>
            <label className="mt-3 block text-sm font-medium">পরিমাণ
              <input className={field} type="number" min={1} max={product.maxQuantity} value={form.quantity} onChange={set("quantity")} required />
            </label>
            <label className="mt-3 block text-sm font-medium">বিশেষ কিছু জানাতে চান? (যেমন সাইজ বা রঙ)
              <input className={field} value={form.note} onChange={set("note")} maxLength={300} />
            </label>
            <label className="mt-3 block text-sm font-medium">কুপন কোড (থাকলে)
              <input className={field} value={form.couponCode} onChange={set("couponCode")} maxLength={40} autoCapitalize="characters" />
            </label>

            {areas.length > 1 && (
              <fieldset className="mt-3">
                <legend className="text-sm font-medium">ডেলিভারি এলাকা</legend>
                <div className="mt-1 flex gap-4">
                  {areas.map(key => (
                    <label key={key} className="flex items-center gap-2 text-sm">
                      <input type="radio" name="area" value={key} checked={area === key} onChange={() => setArea(key)} />
                      {key === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {area && delivery?.[area] && (
              <p className="mt-3 text-sm text-slate-700">
                পণ্যের দাম {formatPrice(product.currency, (product.salePrice ?? product.price) * Number(form.quantity || 1))} + ডেলিভারি {delivery[area].fee === 0 ? "ফ্রি" : formatPrice(product.currency, delivery[area].fee)} = <strong>{formatPrice(product.currency, (product.salePrice ?? product.price) * Number(form.quantity || 1) + delivery[area].fee)}</strong>
              </p>
            )}

            <div className="mt-4"><HumanCheck onToken={setHuman} /></div>
            {error && <p role="alert" className="mt-3 text-sm font-medium text-red-700">{error}</p>}
            <button type="submit" disabled={sending} className="mt-4 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
              {sending ? "পাঠানো হচ্ছে…" : "অর্ডার নিশ্চিত করুন"}
            </button>
            {areas.length === 0 && <p className="mt-2 text-center text-xs text-slate-500">ডেলিভারি চার্জ আমাদের টিম আপনাকে জানিয়ে দেবে।</p>}
          </form>
        </div>
      )}
    </main>
  );
}
