"use client";

import { useEffect, useState } from "react";
import { getPaymentOptions, placeStorefrontOrder, quoteStorefrontCoupon, trackStorefrontOrder, formatPrice } from "@/lib/storefront";
import Description from "./Description";
import Gallery from "./Gallery";
import PaymentModal from "./PaymentModal";
import PaymentSection from "./PaymentSection";

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
    <section className="rounded-2xl bg-neutral-100 p-4" aria-label="Track your order">
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
  // How this order can be paid (from the API, for the area and quantity chosen): null until it is known or when the API has no answer,
  // in which case the page behaves as it always did (cash on delivery).
  const [payOptions, setPayOptions] = useState(null);
  const [payMethod, setPayMethod] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [tab, setTab] = useState("description");

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

  const chosenPay = payOptions?.methods.find(candidate => candidate.method === payMethod) ?? null;
  const prepay = chosenPay !== null && chosenPay.method !== "cod";
  // No way to pay for this place (and no old-style full payment): the order cannot be placed here.
  const noWayToPay = payOptions !== null && payOptions.methods.length === 0 && product.paymentMode !== "full";

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

  // The ways to pay follow the area, quantity and coupon: asked again whenever one changes while the order form is open.
  useEffect(() => {
    if (!open) return undefined;
    let current = true;
    getPaymentOptions(token, { quantity, ...(area ? { area } : {}), ...(coupon ? { couponCode: coupon.code } : {}) })
      .then(data => {
        if (!current) return;
        setPayOptions(data);
        setPayMethod(previous => (data.methods.some(candidate => candidate.method === previous) ? previous : data.methods.length === 1 ? data.methods[0].method : data.methods.find(candidate => candidate.method === "cod")?.method ?? ""));
      })
      .catch(() => { if (current) setPayOptions(null); });
    return () => { current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, quantity, area, coupon?.code]);

  function start() {
    if (hasOptions && !option) {
      setNeedOption(true);
      document.getElementById("choices")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setOpen(true);
  }

  // The form's own Confirm: cash on delivery places the order; mobile money first asks for the payment.
  function submit(event) {
    event.preventDefault();
    if (sending) return;
    if (noWayToPay) return;
    if (payOptions && payOptions.methods.length > 0 && !chosenPay) {
      setError("Choose how you will pay.");
      return;
    }
    if (prepay) {
      setError("");
      setPayOpen(true);
      return;
    }
    placeOrder();
  }

  async function placeOrder() {
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
        ...(coupon ? { couponCode: coupon.code } : {}),
        ...(chosenPay ? { paymentMethod: chosenPay.method } : {}),
        ...(prepay ? { transactionId: transactionId.trim(), ...(senderNumber.trim() ? { senderNumber: senderNumber.trim() } : {}) } : {})
      });
      setDone(result);
      setOpen(false);
      setPayOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // The order details are already in their chat: take them back there.
      if (result.chatUrl) window.setTimeout(() => window.location.assign(result.chatUrl), 3000);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSending(false);
    }
  }

  const off = product.salePrice !== null && product.price > 0 ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  // The cheapest charge and the shortest time across the places, for a one-line summary above the buy button.
  const cheapest = areas.length > 0 ? Math.min(...areas.map(item => item.fee)) : null;
  const tabs = [
    ...(product.description ? [{ id: "description", label: "Description" }] : []),
    ...(product.delivery ? [{ id: "delivery", label: "Delivery" }] : []),
    { id: "track", label: "Track order" }
  ];
  const shownTab = tabs.some(item => item.id === tab) ? tab : tabs[0].id;

  const buyButton = product.canOrder && !done && (
    <button type="button" onClick={start} className="w-full rounded-2xl bg-neutral-900 px-10 py-4 text-base font-bold text-white transition hover:bg-neutral-700 md:w-auto md:min-w-64">
      Buy Now · {formatPrice(product.currency, unit)}
    </button>
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl bg-white pb-28 text-neutral-900 md:pb-12">
      <p className="truncate px-5 pt-4 text-sm text-neutral-500 md:px-6 md:pt-6">
        {product.businessName}
        {product.category ? <> <span aria-hidden="true">›</span> {product.category}</> : null}
      </p>

      <div className="mt-3 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-10 md:px-6 lg:gap-14">
        <div className="px-5 md:sticky md:top-6 md:self-start md:px-0">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div className="px-5 pt-6 md:px-0 md:pt-0">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">Code {product.code}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Price currency={product.currency} price={product.price} salePrice={product.salePrice} size="text-3xl md:text-4xl" />
            {off > 0 && <span className="rounded-full bg-red-50 px-2.5 py-1 text-sm font-bold text-red-700">−{off}%</span>}
          </div>
          <p className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold ${product.inStock ? "text-emerald-700" : "text-red-700"}`}>
            <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-emerald-600" : "bg-red-600"}`} aria-hidden="true" />
            {product.inStock ? "In stock" : "Out of stock"}
          </p>

          {hasOptions && (
            <div id="choices" className="mt-6">
              <p className={label}>{product.optionLabel || "Choose one"}</p>
              <Chips items={product.options} value={option} onChange={value => { setOption(value); setNeedOption(false); }} name={product.optionLabel || "Options"} soldOut={soldOut} />
              {needOption && <p role="alert" className="mt-2 text-sm font-medium text-red-700">Please choose one.</p>}
            </div>
          )}

          {done && (
            <div role="status" className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-950">
              <p className="font-bold">Your order is received</p>
              <p className="mt-1 text-sm">Order {done.orderNumber} · Total {formatPrice(done.currency, done.total)}{done.deliveryFee > 0 ? ` (delivery ${formatPrice(done.currency, done.deliveryFee)} included)` : ""}</p>
              {done.billSentToChat && <p className="mt-1 text-sm">We also sent the bill to your chat.</p>}
              {done.couponApplied && done.discount > 0 && <p className="mt-1 text-sm">Coupon {done.couponApplied} applied: {formatPrice(done.currency, done.discount)} off.</p>}
              {done.chatUrl && <p className="mt-2 text-sm">Taking you back to your chat… <a href={done.chatUrl} className="font-bold underline">Open chat now</a></p>}
              {done.paymentStatus === "advance_submitted" && <p className="mt-1 text-sm">Payment submitted: {formatPrice(done.currency, done.advancePaid)}{done.remaining > 0 ? `. ${formatPrice(done.currency, done.remaining)} is paid on delivery.` : "."}</p>}
              <p className="mt-1 text-sm">{done.paymentStatus === "advance_submitted" ? "We will confirm your order once our team has checked your payment." : product.paymentMode === "full" ? "Your order is being verified. We will confirm it once our team has checked your payment." : "Our team will confirm it with you shortly."}</p>
            </div>
          )}

          {product.delivery && (
            <section className="mt-6 rounded-2xl border border-neutral-200 p-4" aria-label="Estimated delivery">
              <p className={label}>Delivery</p>
              {areas.length > 1 && <div className="mt-3"><Segmented items={areas.map(item => ({ key: item.name, label: item.name }))} value={area} onChange={setArea} /></div>}
              {terms ? (
                <p className="mt-3 text-[15px] text-neutral-700">
                  <strong className="text-neutral-900">{terms.fee === 0 ? "Free delivery" : `${formatPrice(product.currency, terms.fee)} delivery`}</strong> to {terms.name}
                  {terms.days ? <> · get it by <strong className="text-neutral-900">{arriveBy(terms.days)}</strong></> : null}
                </p>
              ) : cheapest !== null ? (
                <p className="mt-3 text-[15px] text-neutral-700">Delivery from <strong className="text-neutral-900">{cheapest === 0 ? "free" : formatPrice(product.currency, cheapest)}</strong>. Choose where to deliver.</p>
              ) : null}
            </section>
          )}

          <div className="mt-6 hidden md:block">{buyButton}</div>
          {!product.canOrder && !done && <p className="mt-6 rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-600">This product can't be ordered right now.</p>}
        </div>
      </div>

      <section className="mt-10 md:mt-14" aria-label="More about this product">
        <div role="tablist" aria-label="Product information" className="sticky top-0 z-30 flex gap-1 overflow-x-auto border-b border-neutral-200 bg-white/95 px-5 backdrop-blur [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
          {tabs.map(item => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={shownTab === item.id}
              aria-controls={`panel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-[15px] font-bold transition ${shownTab === item.id ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-900"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${shownTab}`} aria-labelledby={`tab-${shownTab}`} className="px-5 py-6 md:px-6 md:py-8">
          <div className="max-w-3xl">
            {shownTab === "description" && <Description text={product.description} />}
            {shownTab === "delivery" && (
              <div>
                {areas.length > 0 && (
                  <ul className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 text-[15px]">
                    {areas.map(item => (
                      <li key={item.name} className="flex items-center justify-between gap-4 px-4 py-3">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-right text-neutral-600">{item.fee === 0 ? "Free" : formatPrice(product.currency, item.fee)}{item.days ? ` · ${item.days} day${item.days === 1 ? "" : "s"}` : ""}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <ol className="mt-6 grid grid-cols-4 text-center text-xs text-neutral-600">
                  {STEPS.map((step, index) => (
                    <li key={step} className="relative flex flex-col items-center">
                      <span className={`z-10 h-3 w-3 rounded-full border-2 ${index === 0 ? "border-emerald-700 bg-emerald-700" : index === STEPS.length - 1 ? "border-emerald-700 bg-emerald-200" : "border-neutral-400 bg-white"}`} />
                      {index < STEPS.length - 1 && <span className="absolute left-1/2 top-[5px] h-px w-full bg-neutral-300" />}
                      <span className="mt-1.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-neutral-500">{paymentLabel}. Payment options are shown when you place the order.</p>
              </div>
            )}
            {shownTab === "track" && <TrackOrder token={token} placed={done} />}
          </div>
        </div>
      </section>

      {product.similar.length > 0 && (
        <section className="mt-4 px-5 md:px-6" aria-label="You may also like">
          <h2 className="text-xl font-extrabold tracking-tight">You may also like</h2>
          <ul className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {product.similar.map(item => (
              <li key={item.token} className="w-40 shrink-0 md:w-52">
                <a href={`/p/${item.token}`} className="block rounded-2xl border border-neutral-200 p-2 transition hover:border-neutral-900">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="" className="aspect-square w-full rounded-xl bg-neutral-50 object-contain" />
                  ) : (
                    <span className="flex aspect-square w-full items-center justify-center rounded-xl bg-neutral-100 text-xs text-neutral-400">No picture</span>
                  )}
                  <span className="mt-2 block truncate px-1 text-sm font-semibold">{item.name}</span>
                  <span className="block px-1 pb-1 text-sm font-bold">{formatPrice(item.currency, item.salePrice ?? item.price)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-center text-sm text-neutral-500">Powered by <a href="https://www.ormitechit.com" className="font-bold text-neutral-900">OrmiTech</a></p>

      {buyButton && <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">{buyButton}</div>}

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
            {payOptions && payOptions.methods.length > 0 && <PaymentSection currency={product.currency} methods={payOptions.methods} value={payMethod} onChange={method => { setPayMethod(method); setError(""); }} />}
            {noWayToPay && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">No way to pay is available for this place right now. Please contact the shop.</p>}
            <label className={`${label} mt-3 block`}>Note (optional)
              <input className={input} value={form.note} onChange={set("note")} maxLength={300} placeholder="Anything we should know" />
            </label>

            <dl className="mt-5 space-y-1.5 border-t border-dashed border-neutral-300 pt-4 text-[15px] text-neutral-600">
              <div className="flex justify-between"><dt>Product × {quantity}</dt><dd>{formatPrice(product.currency, unit * quantity)}</dd></div>
              {fee !== null && <div className="flex justify-between"><dt>Delivery</dt><dd>{fee === 0 ? "Free" : formatPrice(product.currency, fee)}</dd></div>}
              {coupon && <div className="flex justify-between font-semibold text-emerald-700"><dt>Coupon {coupon.code}</dt><dd>−{formatPrice(product.currency, discount)}</dd></div>}
              <div className="flex justify-between text-lg font-extrabold text-neutral-900"><dt>Total · {chosenPay ? chosenPay.label : paymentLabel}</dt><dd>{formatPrice(product.currency, total)}</dd></div>
              {chosenPay && chosenPay.payNow > 0 && <div className="flex justify-between font-semibold text-neutral-900"><dt>{chosenPay.remaining > 0 ? "Advance to pay now" : "To pay now"}</dt><dd>{formatPrice(product.currency, chosenPay.payNow)}</dd></div>}
              {chosenPay && chosenPay.payNow > 0 && chosenPay.remaining > 0 && <div className="flex justify-between"><dt>Remaining on delivery</dt><dd>{formatPrice(product.currency, chosenPay.remaining)}</dd></div>}
            </dl>

            {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
            <button type="submit" disabled={sending || noWayToPay} className="mt-4 w-full rounded-2xl bg-neutral-900 py-4 text-base font-bold text-white disabled:opacity-60">
              {sending ? "Sending…" : prepay ? `Continue to payment · ${formatPrice(product.currency, chosenPay.payNow)}` : `Confirm order · ${formatPrice(product.currency, total)}`}
            </button>
            {fee === null && <p className="mt-2 text-center text-xs text-neutral-500">Our team will tell you the delivery charge.</p>}
          </form>
        </div>
      )}
      {open && payOpen && prepay && (
        <PaymentModal
          currency={product.currency}
          method={chosenPay}
          transactionId={transactionId}
          senderNumber={senderNumber}
          onTransactionId={setTransactionId}
          onSenderNumber={setSenderNumber}
          onBack={() => { setPayOpen(false); setError(""); }}
          onConfirm={placeOrder}
          sending={sending}
          error={error}
        />
      )}
    </main>
  );
}
