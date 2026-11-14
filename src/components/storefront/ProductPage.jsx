"use client";

import { useEffect, useRef, useState } from "react";
import { placeStorefrontOrder, trackStorefrontOrder, formatPrice } from "@/lib/storefront";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const STEPS = ["Ordered", "Packed", "On the way", "Delivered"];

/** The date a delivery of this many days arrives by, like "Mon 16 Nov", in Bangladesh time. */
function arriveBy(days) {
  return new Date(Date.now() + days * 86_400_000).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Dhaka" });
}

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
  return TURNSTILE_SITE_KEY ? <div ref={box} className="mt-3 min-h-[65px]" /> : null;
}

const label = "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";
const input = "mt-1.5 w-full rounded-xl bg-neutral-100 px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900";

function Chips({ items, value, onChange, name }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {items.map(item => (
        <button
          key={item}
          type="button"
          role="radio"
          aria-checked={value === item}
          onClick={() => onChange(item)}
          className={`min-h-11 rounded-xl px-5 text-[15px] font-semibold transition ${value === item ? "bg-neutral-900 text-white" : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Segmented({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-2xl border border-neutral-200 bg-white p-1" role="radiogroup">
      {items.map(item => (
        <button
          key={item.key}
          type="button"
          role="radio"
          aria-checked={value === item.key}
          onClick={() => onChange(item.key)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${value === item.key ? "bg-neutral-900 text-white" : "text-neutral-600"}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Price({ currency, price, salePrice, size = "text-base" }) {
  return (
    <p className={`flex items-baseline gap-2 font-bold text-neutral-900 ${size}`}>
      {formatPrice(currency, salePrice ?? price)}
      {salePrice !== null && <span className="text-[0.7em] font-normal text-neutral-400 line-through">{formatPrice(currency, price)}</span>}
    </p>
  );
}

const STAGE_OF = { pending: 0, confirmed: 1, processing: 1, shipped: 2, delivered: 3 };

/** "Where is my order": the order number and phone it was placed with, and what is known: status, courier, tracking id and updates. */
function TrackOrder({ token, placed }) {
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (placed?.orderNumber) setNumber(placed.orderNumber);
  }, [placed]);

  async function look(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const found = await trackStorefrontOrder(token, number, phone);
      if (found) setResult(found);
      else setError("We could not find an order with that number and phone.");
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  const stage = result ? (result.status === "cancelled" ? -1 : (STAGE_OF[result.status] ?? 0)) : 0;
  return (
    <section className="mx-5 mt-10 rounded-2xl bg-neutral-100 p-4 md:mx-6" aria-label="Track your order">
      <p className={label}>Track your order</p>
      <form onSubmit={look} className="mt-3 grid grid-cols-2 gap-3">
        <input className={`${input} !bg-white`} value={number} onChange={event => setNumber(event.target.value)} required placeholder="Order number" aria-label="Order number" autoCapitalize="characters" />
        <input className={`${input} !bg-white`} value={phone} onChange={event => setPhone(event.target.value)} required inputMode="tel" placeholder="Phone used" aria-label="Phone number used for the order" autoComplete="tel" />
        <button type="submit" disabled={busy} className="col-span-2 rounded-xl bg-neutral-900 py-3 font-bold text-white disabled:opacity-60">{busy ? "Looking…" : "Track"}</button>
      </form>
      {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
      {result && (
        <div className="mt-4" role="status">
          <p className="font-bold">{result.orderNumber} · {formatPrice(result.currency, result.total)}</p>
          <p className="text-sm text-neutral-600">{result.items.map(item => `${item.name} × ${item.quantity}`).join(", ")}</p>
          {stage === -1 ? (
            <p className="mt-3 font-semibold text-red-700">This order was cancelled.</p>
          ) : (
            <ol className="mt-4 grid grid-cols-4 text-center text-xs text-neutral-600">
              {STEPS.map((step, index) => (
                <li key={step} className="relative flex flex-col items-center">
                  <span className={`z-10 h-3 w-3 rounded-full border-2 ${index <= stage ? "border-emerald-700 bg-emerald-700" : "border-neutral-400 bg-white"}`} />
                  {index < STEPS.length - 1 && <span className={`absolute left-1/2 top-[5px] h-px w-full ${index < stage ? "bg-emerald-700" : "bg-neutral-300"}`} />}
                  <span className="mt-1.5">{step}</span>
                </li>
              ))}
            </ol>
          )}
          {result.parcel ? (
            <div className="mt-4 rounded-xl bg-white p-3 text-sm">
              <p className="font-semibold">{result.parcel.courier}{result.parcel.trackingId ? ` · Tracking ${result.parcel.trackingId}` : ""}</p>
              <p className="text-neutral-600">Status: {result.parcel.status}</p>
              {result.parcel.events.length > 0 && (
                <ul className="mt-2 space-y-1 border-t border-neutral-200 pt-2">
                  {[...result.parcel.events].reverse().map((entry, index) => (
                    <li key={index}>
                      <span className="text-neutral-500">{new Date(entry.at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" })}</span> · {entry.message || entry.status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            stage !== -1 && <p className="mt-3 text-sm text-neutral-600">Not handed to the courier yet. This updates once your order is on its way.</p>
          )}
        </div>
      )}
    </section>
  );
}

/** A product's public page: pictures, price, choices, delivery, details and similar products, with Buy Now. Only what exists is shown. */
export default function ProductPage({ token, product }) {
  const areas = product.delivery ? product.delivery.areas : [];
  const [active, setActive] = useState(0);
  const [option, setOption] = useState(product.options.length === 1 ? product.options[0] : "");
  const [area, setArea] = useState(areas[0]?.name || "");
  const [open, setOpen] = useState(false);
  const [needOption, setNeedOption] = useState(false);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [human, setHuman] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", quantity: 1, note: "", couponCode: "" });
  const set = key => event => setForm(current => ({ ...current, [key]: event.target.value }));
  const strip = useRef(null);

  const unit = product.salePrice ?? product.price;
  const quantity = Math.min(Math.max(Number(form.quantity) || 1, 1), Math.max(product.maxQuantity, 1));
  const terms = areas.find(candidate => candidate.name === area) ?? null;
  const fee = terms ? terms.fee : null;
  const total = unit * quantity + (fee ?? 0);
  const images = product.images;
  const hasOptions = product.options.length > 0;

  function start() {
    if (hasOptions && !option) {
      setNeedOption(true);
      document.getElementById("choices")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setOpen(true);
  }

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    if (TURNSTILE_SITE_KEY && !human) {
      setError("Please complete the check below.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const result = await placeStorefrontOrder(token, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        quantity,
        ...(option ? { option } : {}),
        ...(area ? { area } : {}),
        ...(form.note.trim() ? { note: form.note } : {}),
        ...(form.couponCode.trim() ? { couponCode: form.couponCode } : {}),
        ...(human ? { turnstileToken: human } : {})
      });
      setDone(result);
      setOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (failure) {
      setError(failure.message);
      // A human-check token works once.
      setHuman(null);
      if (window.turnstile) window.turnstile.reset();
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-xl bg-white pb-28 text-neutral-900 md:max-w-5xl md:pb-10">
      <div className="md:grid md:grid-cols-2 md:gap-10 md:px-6 md:pt-8">
        <div className="md:sticky md:top-8 md:self-start">
          {images.length > 0 ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[active]} alt={product.name} className="aspect-square w-full bg-neutral-100 object-cover md:rounded-2xl" />
              {images.length > 1 && (
                <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                  {images.map((src, index) => (
                    <button key={src} type="button" onClick={() => setActive(index)} aria-label={`Picture ${index + 1}`} className={`h-2 rounded-full transition-all ${index === active ? "w-5 bg-white" : "w-2 bg-white/60"}`} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-neutral-100 text-neutral-400 md:rounded-2xl">No picture</div>
          )}
          {images.length > 1 && (
            <ul className="hidden gap-2 pt-3 md:flex">
              {images.map((src, index) => (
                <li key={src}>
                  <button type="button" onClick={() => setActive(index)} aria-label={`Picture ${index + 1}`} className={`block h-16 w-16 overflow-hidden rounded-lg border-2 ${index === active ? "border-neutral-900" : "border-transparent"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 pt-5 md:px-0 md:pt-0">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-base font-bold text-white" aria-hidden>{product.businessName.slice(0, 1).toUpperCase()}</span>
            <div>
              <p className="font-bold leading-tight">{product.businessName}</p>
              <p className="text-sm text-neutral-500">Official shop page</p>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight">{product.name}</h1>
          <p className="mt-1 text-neutral-500">Code {product.code}</p>
          <div className="mt-4"><Price currency={product.currency} price={product.price} salePrice={product.salePrice} size="text-4xl" /></div>
          {!product.inStock && <p className="mt-2 text-sm font-semibold text-red-700">Out of stock</p>}

          {hasOptions && (
            <div id="choices" className="mt-7">
              <p className={label}>{product.optionLabel || "Choose one"}</p>
              <Chips items={product.options} value={option} onChange={value => { setOption(value); setNeedOption(false); }} name={product.optionLabel || "Options"} />
              {needOption && <p role="alert" className="mt-2 text-sm font-medium text-red-700">Please choose one.</p>}
            </div>
          )}

          {done && (
            <div role="status" className="mt-7 rounded-2xl bg-emerald-50 p-4 text-emerald-950">
              <p className="font-bold">Your order is received</p>
              <p className="mt-1 text-sm">Order {done.orderNumber} · Total {formatPrice(done.currency, done.total)}{done.deliveryFee > 0 ? ` (delivery ${formatPrice(done.currency, done.deliveryFee)} included)` : ""}</p>
              {done.billSentToChat && <p className="mt-1 text-sm">We also sent the bill to your chat.</p>}
              {done.couponNoted && <p className="mt-1 text-sm">Coupon {done.couponNoted} will be applied when our team confirms your order.</p>}
              <p className="mt-1 text-sm">Our team will confirm it with you shortly.</p>
            </div>
          )}

          {product.delivery && (
            <section className="mt-7 rounded-2xl bg-neutral-100 p-4" aria-label="Estimated delivery">
              <p className={label}>Estimated delivery</p>
              {areas.length > 1 && <div className="mt-3"><Segmented items={areas.map(item => ({ key: item.name, label: item.name }))} value={area} onChange={setArea} /></div>}
              {terms && (
                <>
                  {terms.days ? (
                    <p className="mt-4 text-neutral-600">Order now, get it<br /><span className="text-2xl font-extrabold text-neutral-900">by {arriveBy(terms.days)}</span></p>
                  ) : null}
                  <div className="mt-3 flex items-baseline justify-between rounded-xl bg-white px-4 py-3">
                    <p className="font-semibold">Delivery charge <span className="text-xl font-extrabold">{terms.fee === 0 ? "Free" : formatPrice(product.currency, terms.fee)}</span></p>
                    <p className="text-sm text-neutral-500">· {terms.name}</p>
                  </div>
                  <ol className="mt-4 grid grid-cols-4 text-center text-xs text-neutral-600">
                    {STEPS.map((step, index) => (
                      <li key={step} className="relative flex flex-col items-center">
                        <span className={`z-10 h-3 w-3 rounded-full border-2 ${index === 0 ? "border-emerald-700 bg-emerald-700" : index === STEPS.length - 1 ? "border-emerald-700 bg-emerald-200" : "border-neutral-400 bg-white"}`} />
                        {index < STEPS.length - 1 && <span className="absolute left-1/2 top-[5px] h-px w-full bg-neutral-300" />}
                        <span className="mt-1.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-sm text-neutral-500">Cash on delivery</p>
                </>
              )}
            </section>
          )}

          {(product.description || product.category || product.attributes.length > 0) && (
            <section className="mt-8" aria-label="Details">
              <p className={label}>Details</p>
              {product.description && <p className="mt-2 whitespace-pre-line text-base leading-7">{product.description}</p>}
              {(product.category || product.attributes.length > 0) && (
                <dl className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200 text-[15px]">
                  {product.attributes.map(row => (
                    <div key={row.label} className="flex gap-6 py-3"><dt className="w-24 shrink-0 text-neutral-500">{row.label}</dt><dd className="min-w-0">{row.value}</dd></div>
                  ))}
                  {product.category && <div className="flex gap-6 py-3"><dt className="w-24 shrink-0 text-neutral-500">Category</dt><dd>{product.category}</dd></div>}
                </dl>
              )}
            </section>
          )}
        </div>
      </div>

      {product.similar.length > 0 && (
        <section className="mt-9 md:px-6" aria-label="Similar products">
          <p className={`${label} px-5 md:px-0`}>Similar products</p>
          <ul ref={strip} className="mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:px-0">
            {product.similar.map(item => (
              <li key={item.token} className="w-40 shrink-0 snap-start">
                <a href={`/p/${item.token}`} className="block">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="aspect-[4/5] w-full rounded-2xl bg-neutral-100 object-cover" loading="lazy" />
                  ) : (
                    <div className="aspect-[4/5] w-full rounded-2xl bg-neutral-100" />
                  )}
                  <p className="mt-2 line-clamp-2 text-sm font-medium">{item.name}</p>
                  <Price currency={item.currency} price={item.price} salePrice={item.salePrice} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <TrackOrder token={token} placed={done} />

      <p className="mt-10 text-center text-sm text-neutral-500">Powered by <a href="https://www.ormitechit.com" className="font-bold text-neutral-900">OrmiTech</a></p>

      {product.canOrder && !done && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <button type="button" onClick={start} className="w-full rounded-2xl bg-neutral-900 py-4 text-base font-bold text-white active:bg-neutral-700">
            Buy Now · {formatPrice(product.currency, unit)}
          </button>
        </div>
      )}
      {product.canOrder && !done && (
        <div className="hidden md:mx-6 md:mt-8 md:block">
          <button type="button" onClick={start} className="rounded-2xl bg-neutral-900 px-10 py-4 text-base font-bold text-white hover:bg-neutral-700">
            Buy Now · {formatPrice(product.currency, unit)}
          </button>
        </div>
      )}
      {!product.canOrder && !done && <p className="mx-5 mt-8 rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-600">This product can't be ordered right now.</p>}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center" role="dialog" aria-modal="true" aria-label="Order form">
          <form onSubmit={submit} className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 md:rounded-3xl">
            <div className="flex items-center gap-3">
              {images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[0]} alt="" className="h-16 w-16 rounded-xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-bold">{product.name}</p>
                <p className="text-sm text-neutral-500">Code {product.code}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="h-10 w-10 rounded-full bg-neutral-100 text-lg" aria-label="Close">✕</button>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              {hasOptions ? (
                <div className="min-w-0">
                  <p className={label}>{product.optionLabel || "Choice"}</p>
                  <Chips items={product.options} value={option} onChange={setOption} name={product.optionLabel || "Options"} />
                </div>
              ) : <span />}
              <div>
                <p className={`${label} text-right`}>Quantity</p>
                <div className="mt-2 flex items-center rounded-xl border border-neutral-300">
                  <button type="button" onClick={() => setForm(c => ({ ...c, quantity: Math.max(quantity - 1, 1) }))} className="h-11 w-11 text-xl" aria-label="Fewer">−</button>
                  <span className="w-8 text-center font-bold" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => setForm(c => ({ ...c, quantity: Math.min(quantity + 1, Math.max(product.maxQuantity, 1)) }))} className="h-11 w-11 text-xl" aria-label="More">+</button>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className={label}>Your name
                <input className={input} value={form.name} onChange={set("name")} required minLength={2} maxLength={120} autoComplete="name" placeholder="Full name" />
              </label>
              <label className={label}>Mobile number
                <input className={input} value={form.phone} onChange={set("phone")} required inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" />
              </label>
            </div>
            <label className={`${label} mt-3 block`}>Delivery address
              <textarea className={input} value={form.address} onChange={set("address")} required minLength={8} maxLength={400} rows={3} autoComplete="street-address" placeholder="House, road, area, district" />
            </label>

            {areas.length > 1 && <div className="mt-4"><Segmented items={areas.map(item => ({ key: item.name, label: item.name }))} value={area} onChange={setArea} /></div>}
            <label className={`${label} mt-3 block`}>Coupon code (optional)
              <input className={input} value={form.couponCode} onChange={set("couponCode")} maxLength={40} autoCapitalize="characters" placeholder="Coupon code" />
            </label>
            <label className={`${label} mt-3 block`}>Note (optional)
              <input className={input} value={form.note} onChange={set("note")} maxLength={300} placeholder="Anything we should know" />
            </label>

            <dl className="mt-5 space-y-1.5 border-t border-dashed border-neutral-300 pt-4 text-[15px] text-neutral-600">
              <div className="flex justify-between"><dt>Product × {quantity}</dt><dd>{formatPrice(product.currency, unit * quantity)}</dd></div>
              {fee !== null && <div className="flex justify-between"><dt>Delivery</dt><dd>{fee === 0 ? "Free" : formatPrice(product.currency, fee)}</dd></div>}
              <div className="flex justify-between text-lg font-extrabold text-neutral-900"><dt>Total · Cash on delivery</dt><dd>{formatPrice(product.currency, total)}</dd></div>
            </dl>

            <HumanCheck onToken={setHuman} />
            {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
            <button type="submit" disabled={sending} className="mt-4 w-full rounded-2xl bg-neutral-900 py-4 text-base font-bold text-white disabled:opacity-60">
              {sending ? "Sending…" : `Confirm order · ${formatPrice(product.currency, total)}`}
            </button>
            {fee === null && <p className="mt-2 text-center text-xs text-neutral-500">Our team will tell you the delivery charge.</p>}
          </form>
        </div>
      )}
    </main>
  );
}
