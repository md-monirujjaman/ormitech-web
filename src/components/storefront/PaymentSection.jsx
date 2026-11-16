import { formatPrice } from "@/lib/storefront";

const label = "text-[11px] font-semibold uppercase tracking-wider text-neutral-500";

/** The ways to pay that the business has on for the chosen area. Nothing is listed that the business switched off. */
export default function PaymentSection({ currency, methods, value, onChange }) {
  return (
    <fieldset className="mt-4">
      <legend className={label}>Payment</legend>
      <div className="mt-2 space-y-2" role="radiogroup" aria-label="Payment method">
        {methods.map(method => {
          const selected = value === method.method;
          return (
            <button
              key={method.method}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(method.method)}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${selected ? "border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900" : "border-neutral-300 bg-white hover:border-neutral-900"}`}
            >
              <span className="min-w-0">
                <span className="block font-semibold text-neutral-900">{method.label}</span>
                <span className="mt-0.5 block text-sm text-neutral-600">
                  {method.method === "cod"
                    ? "Pay the courier when it arrives"
                    : method.remaining > 0
                      ? `Pay ${formatPrice(currency, method.payNow)} now, ${formatPrice(currency, method.remaining)} on delivery`
                      : `Pay ${formatPrice(currency, method.payNow)} now`}
                </span>
              </span>
              <span aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${selected ? "border-neutral-900 bg-neutral-900 shadow-[inset_0_0_0_3px_white]" : "border-neutral-400"}`} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
