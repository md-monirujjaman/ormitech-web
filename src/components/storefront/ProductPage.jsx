"use client";

import { useEffect, useRef, useState } from "react";
import { placeStorefrontOrder, quoteStorefrontCoupon, trackStorefrontOrder, formatPrice } from "@/lib/storefront";

const STEPS = ["Ordered", "Packed", "On the way", "Delivered"];

/** The date a delivery of this many days arrives by, like "Mon 16 Nov", in Bangladesh time. */
function arriveBy(days) {
  return new Date(Date.now() + days * 86_400_000).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Dhaka" });
}

const label = "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";
const input = "mt-1.5 w-full rounded-xl bg-neutral-100 px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900";

function Chips({ items, value, onChange, name, soldOut = [] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {items.map(item => (
        <button
          key={item}
          type="button"
          role="radio"
          aria-checked={value === item}
          aria-disabled={soldOut.includes(item)}
          disabled={soldOut.includes(item)}
          onClick={() => onChange(item)}
          className={`min-h-11 rounded-xl px-5 text-[15px] font-semibold transition ${soldOut.includes(item) ? "cursor-not-allowed border border-neutral-200 bg-neutral-50 text-neutral-400 line-through" : value === item ? "bg-neutral-900 text-white" : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"}`}
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

/** A product's public page: pictures, price, choices, delivery and details, with Buy Now. Only what exists is shown. */
export default function ProductPage({ token, product }) {
  const areas = product.delivery ? product.delivery.areas : [];
  const [active, setActive] = useState(0);
  // Options with no units left, when the business counts stock per option: shown crossed out and cannot be chosen.
  const soldOut = product.optionStock ? product.options.filter(item => (product.optionStock[item] ?? 0) <= 0) : [];
  const [option, setOption] = useState(product.options.length === 1 && !soldOut.includes(product.options[0]) ? product.options[0] : "");
  const [area, setArea] = useState(areas[0]?.name || "");
  const [open, setOpen] = useState(false);
  const [needOption, setNeedOption] = useState(false);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", quantity: 1, note: "", couponCode: "" });
  const set = key => event => setForm(current => ({ ...current, [key]: event.target.value }));
  // A coupon the API has checked: { code, discount }. It is dropped whenever the code is edited, and worked out again when the
  // quantity or delivery area changes, because what it takes off depends on both.
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [checking, setChecking] = useState(false);
  const slides = useRef(null);

  function goTo(index) {
    const box = slides.current;
    if (!box) return;
    const next = Math.min(Math.max(index, 0), product.images.length - 1);
    box.scrollTo({ left: next * box.clientWidth, behavior: "smooth" });
    setActive(next);
  }
  function onSlide() {
    const box = slides.current;
    if (box && box.clientWidth > 0) setActive(Math.round(box.scrollLeft / box.clientWidth));
  }

  const unit = product.salePrice ?? product.price;
  // With stock counted per option, how many can be ordered depends on the option chosen.
  const maxQuantity = product.optionStock && option ? Math.min(product.maxQuantity, product.optionStock[option] ?? 0) : product.maxQuantity;
  const quantity = Math.min(Math.max(Number(form.quantity) || 1, 1), Math.max(maxQuantity, 1));
  const optionLeft = product.optionStock && option ? product.optionStock[option] ?? 0 : null;
  const terms = areas.find(candidate => candidate.name === area) ?? null;
  const fee = terms ? terms.fee : null;
  const discount = coupon ? Math.min(coupon.discount, unit * quantity + (fee ?? 0)) : 0;
  const total = unit * quantity + (fee ?? 0) - discount;
  const images = product.images;
  const hasOptions = product.options.length > 0;
  const paymentLabel = product.paymentMode === "full" ? "Full payment before delivery" : "Cash on delivery";

  async function applyCoupon() {
    const code = form.couponCode.trim();
    if (!code || checking) return;
    setChecking(true);
    setCouponError("");
    try {
      const quote = await quoteStorefrontCoupon(token, { code, quantity, ...(area ? { area } : {}), ...(form.phone.trim() ? { phone: form.phone } : {}) });
      setCoupon({ code: quote.code, discount: quote.discount });
    } catch (failure) {
      setCoupon(null);
      setCouponError(failure.message);
    } finally {
      setChecking(false);
    }
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponError("");
    setForm(current => ({ ...current, couponCode: "" }));
  }

  // Quantity or area changed under an applied coupon: ask again so the amount on screen is the one the order will get.
  useEffect(() => {
    if (!coupon) return undefined;
    let current = true;
    quoteStorefrontCoupon(token, { code: coupon.code, quantity, ...(area ? { area } : {}) })
      .then(quote => { if (current) setCoupon({ code: quote.code, discount: quote.discount }); })
      .catch(failure => { if (current) { setCoupon(null); setCouponError(failure.message); } });
    return () => { current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, area]);

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
        // Only a coupon the page has shown working goes with the order; one typed but never applied would take nothing off.
        ...(coupon ? { couponCode: coupon.code } : {})
      });
      setDone(result);
      setOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // The order details are already in their chat: take them back there.
      if (result.chatUrl) window.setTimeout(() => window.location.assign(result.chatUrl), 3000);
    } catch (failure) {
      setError(failure.message);
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
              {/* Swipe on a phone, arrows or dots anywhere; the whole picture is shown, never cropped. */}
              <div ref={slides} onScroll={onSlide} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-neutral-100 [scrollbar-width:none] md:rounded-2xl [&::-webkit-scrollbar]:hidden">
                {images.map((src, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt={index === 0 ? product.name : `${product.name} ${index + 1}`} className="aspect-square w-full shrink-0 snap-center object-contain" draggable={false} />
                ))}
              </div>
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous picture" className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow disabled:opacity-30 md:flex">‹</button>
                  <button type="button" onClick={() => goTo(active + 1)} disabled={active === images.length - 1} aria-label="Next picture" className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow disabled:opacity-30 md:flex">›</button>
                  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                    {images.map((src, index) => (
                      <button key={src} type="button" onClick={() => goTo(index)} aria-label={`Picture ${index + 1}`} className={`h-2 rounded-full transition-all ${index === active ? "w-5 bg-neutral-900" : "w-2 bg-neutral-900/30"}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-neutral-100 text-neutral-400 md:rounded-2xl">No picture</div>
          )}
          {images.length > 1 && (
            <ul className="hidden gap-2 pt-3 md:flex">
              {images.map((src, index) => (
                <li key={src}>
                  <button type="button" onClick={() => goTo(index)} aria-label={`Picture ${index + 1}`} className={`block h-16 w-16 overflow-hidden rounded-lg border-2 bg-neutral-100 ${index === active ? "border-neutral-900" : "border-transparent"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-contain" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 pt-5 md:px-0 md:pt-0">
          <h1 className="text-3xl font-extrabold tracking-tight">{product.name}</h1>
          <div className="mt-3"><Price currency={product.currency} price={product.price} salePrice={product.salePrice} size="text-4xl" /></div>
          {!product.inStock && <p className="mt-2 text-sm font-semibold text-red-700">Out of stock</p>}

          {hasOptions && (
            <div id="choices" className="mt-7">
              <p className={label}>{product.optionLabel || "Choose one"}</p>
              <Chips items={product.options} value={option} onChange={value => { setOption(value); setNeedOption(false); }} name={product.optionLabel || "Options"} soldOut={soldOut} />
              {needOption && <p role="alert" className="mt-2 text-sm font-medium text-red-700">Please choose one.</p>}
            </div>
          )}

          {done && (
            <div role="status" className="mt-7 rounded-2xl bg-emerald-50 p-4 text-emerald-950">
              <p className="font-bold">Your order is received</p>
              <p className="mt-1 text-sm">Order {done.orderNumber} · Total {formatPrice(done.currency, done.total)}{done.deliveryFee > 0 ? ` (delivery ${formatPrice(done.currency, done.deliveryFee)} included)` : ""}</p>
              {done.billSentToChat && <p className="mt-1 text-sm">We also sent the bill to your chat.</p>}
              {done.couponApplied && done.discount > 0 && <p className="mt-1 text-sm">Coupon {done.couponApplied} applied: {formatPrice(done.currency, done.discount)} off.</p>}
              {done.chatUrl && <p className="mt-2 text-sm">Taking you back to your chat… <a href={done.chatUrl} className="font-bold underline">Open chat now</a></p>}
              <p className="mt-1 text-sm">{product.paymentMode === "full" ? "Your order is being verified. We will confirm it once our team has checked your payment." : "Our team will confirm it with you shortly."}</p>
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
                  <p className="mt-3 text-sm text-neutral-500">{paymentLabel}</p>
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
                  <Chips items={product.options} value={option} onChange={setOption} name={product.optionLabel || "Options"} soldOut={soldOut} />
                </div>
              ) : <span />}
              <div>
                <p className={`${label} text-right`}>Quantity</p>
                {optionLeft !== null && optionLeft <= 5 && <p className="mt-1 text-right text-xs font-semibold text-amber-700">Only {optionLeft} left</p>}
                <div className="mt-2 flex items-center rounded-xl border border-neutral-300">
                  <button type="button" onClick={() => setForm(c => ({ ...c, quantity: Math.max(quantity - 1, 1) }))} className="h-11 w-11 text-xl" aria-label="Fewer">−</button>
                  <span className="w-8 text-center font-bold" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => setForm(c => ({ ...c, quantity: Math.min(quantity + 1, Math.max(maxQuantity, 1)) }))} className="h-11 w-11 text-xl" aria-label="More">+</button>
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
              <textarea className={input} value={form.address} onChange={set("address")} required minLength={4} maxLength={400} rows={3} autoComplete="street-address" placeholder="House, road, area, district" />
            </label>

            {areas.length > 1 && <div className="mt-4"><Segmented items={areas.map(item => ({ key: item.name, label: item.name }))} value={area} onChange={setArea} /></div>}
            <div className="mt-3">
              <label htmlFor="coupon-code" className={label}>Coupon code (optional)</label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id="coupon-code"
                  className={`${input} !mt-0 min-w-0 flex-1 uppercase`}
                  value={form.couponCode}
                  onChange={event => { set("couponCode")(event); setCoupon(null); setCouponError(""); }}
                  onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); applyCoupon(); } }}
                  maxLength={40}
                  autoCapitalize="characters"
                  autoComplete="off"
                  placeholder="Coupon code"
                  disabled={Boolean(coupon)}
                />
                {coupon ? (
                  <button type="button" onClick={removeCoupon} className="shrink-0 rounded-xl border border-neutral-300 px-4 text-sm font-bold text-neutral-900">Remove</button>
                ) : (
                  <button type="button" onClick={applyCoupon} disabled={checking || !form.couponCode.trim()} className="shrink-0 rounded-xl bg-neutral-900 px-5 text-sm font-bold text-white disabled:opacity-50">{checking ? "Checking…" : "Apply"}</button>
                )}
              </div>
              {coupon && <p role="status" className="mt-2 text-sm font-semibold text-emerald-700">Coupon {coupon.code} applied: {formatPrice(product.currency, discount)} off</p>}
              {couponError && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{couponError}</p>}
            </div>
            <label className={`${label} mt-3 block`}>Note (optional)
              <input className={input} value={form.note} onChange={set("note")} maxLength={300} placeholder="Anything we should know" />
            </label>

            <dl className="mt-5 space-y-1.5 border-t border-dashed border-neutral-300 pt-4 text-[15px] text-neutral-600">
              <div className="flex justify-between"><dt>Product × {quantity}</dt><dd>{formatPrice(product.currency, unit * quantity)}</dd></div>
              {fee !== null && <div className="flex justify-between"><dt>Delivery</dt><dd>{fee === 0 ? "Free" : formatPrice(product.currency, fee)}</dd></div>}
              {coupon && <div className="flex justify-between font-semibold text-emerald-700"><dt>Coupon {coupon.code}</dt><dd>−{formatPrice(product.currency, discount)}</dd></div>}
              <div className="flex justify-between text-lg font-extrabold text-neutral-900"><dt>Total · {paymentLabel}</dt><dd>{formatPrice(product.currency, total)}</dd></div>
            </dl>

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
