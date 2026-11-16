import { useState } from "react";
import { formatPrice } from "@/lib/storefront";

const label = "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";
const input = "mt-1.5 w-full rounded-xl bg-neutral-100 px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900";

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function CopyButton({ text, what }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copy(text)) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }
      }}
      className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-900 hover:border-neutral-900"
      aria-label={`Copy ${what}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * Pay by bKash, Nagad or Rocket: how much to send and where, then the Transaction ID from the provider's message. Nothing is charged
 * here; the business checks the payment before it confirms the order.
 */
export default function PaymentModal({ currency, method, orderNumberHint, transactionId, senderNumber, onTransactionId, onSenderNumber, onBack, onConfirm, sending, error }) {
  const idValid = /^[A-Za-z0-9]{6,40}$/.test(transactionId.trim());
  const accountKind = method.accountType === "merchant" ? "Merchant" : "Personal";
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 md:items-center" role="dialog" aria-modal="true" aria-label={`Pay with ${method.label}`}>
      <div className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 md:rounded-3xl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-extrabold">Pay with {method.label}</p>
          <button type="button" onClick={onBack} className="h-10 w-10 rounded-full bg-neutral-100 text-lg" aria-label="Back to the order form">✕</button>
        </div>

        <ol className="mt-4 space-y-3 rounded-2xl bg-neutral-50 p-4 text-[15px] text-neutral-700">
          <li className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">1</span>
            <span>Open your {method.label} app and choose <strong>Send Money</strong>.</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">2</span>
            <span className="min-w-0 flex-1">To <strong className="font-mono text-base">{method.accountNumber}</strong> <span className="text-neutral-500">({accountKind})</span></span>
            <CopyButton text={method.accountNumber} what="number" />
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">3</span>
            <span className="min-w-0 flex-1">Amount <strong className="text-base">{formatPrice(currency, method.payNow)}</strong></span>
            <CopyButton text={String(method.payNow)} what="amount" />
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">4</span>
            <span>Enter the Transaction ID from the {method.label} message below.</span>
          </li>
        </ol>

        {method.qrUrl && (
          <div className="mt-4 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={method.qrUrl} alt={`${method.label} QR code`} className="h-44 w-44 rounded-xl border border-neutral-200 bg-white object-contain" />
            <p className="mt-1 text-xs text-neutral-500">Or scan this code</p>
          </div>
        )}
        {method.instructions && <p className="mt-4 whitespace-pre-line rounded-xl bg-amber-50 p-3 text-sm text-amber-950">{method.instructions}</p>}
        {method.remaining > 0 && <p className="mt-3 text-sm text-neutral-600">The other {formatPrice(currency, method.remaining)} is paid on delivery.</p>}

        <label className={`${label} mt-5 block`}>Transaction ID
          <input className={input} value={transactionId} onChange={event => onTransactionId(event.target.value)} maxLength={40} autoCapitalize="characters" autoComplete="off" placeholder="e.g. 8N7A6D5K2P" />
        </label>
        <label className={`${label} mt-3 block`}>Sent from (your number) <span className="font-normal normal-case tracking-normal text-neutral-400">· optional</span>
          <input className={input} value={senderNumber} onChange={event => onSenderNumber(event.target.value)} inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" />
        </label>

        {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
        <button type="button" onClick={onConfirm} disabled={sending || !idValid} className="mt-4 w-full rounded-2xl bg-neutral-900 py-4 text-base font-bold text-white disabled:opacity-50">
          {sending ? "Sending…" : "I've paid — confirm my order"}
        </button>
        <p className="mt-2 text-center text-xs text-neutral-500">Nothing is charged here. We check your payment before we confirm your order{orderNumberHint ?? ""}.</p>
      </div>
    </div>
  );
}
