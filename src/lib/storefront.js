import { apiUrl } from "@/data/site";

/** The product behind a signed link, from the OrmiTech API; null when the link is invalid or the product is no longer sold. */
export async function getStorefrontProduct(token) {
  if (!/^[\w-]{20,400}\.[\w-]{20,60}$/.test(token)) return null;
  const response = await fetch(`${apiUrl}/api/v1/public/storefront/products/${encodeURIComponent(token)}`, {
    headers: { Accept: "application/json" },
    // A price or stock change must show at once, and a link is per customer: nothing is cached.
    cache: "no-store"
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`The storefront API answered ${response.status}`);
  const body = await response.json();
  return body?.data ?? null;
}

/** Sends the order. Returns the API's data, or throws an Error carrying the API's message in plain words. */
export async function placeStorefrontOrder(token, order) {
  const response = await fetch(`${apiUrl}/api/v1/public/storefront/products/${encodeURIComponent(token)}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(order)
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const field = body?.error?.details?.[0]?.messages?.[0];
    const error = new Error(field || body?.error?.message || body?.message || "অর্ডার করা যায়নি। আবার চেষ্টা করুন।");
    error.status = response.status;
    throw error;
  }
  return body.data;
}

/** "BDT 1,200" style price. */
export function formatPrice(currency, amount) {
  return `${currency === "BDT" ? "৳" : `${currency} `}${Number(amount).toLocaleString("en-US")}`;
}

/** Looks an order up by its number and the phone it was placed with; null when there is no such order. */
export async function trackStorefrontOrder(token, orderNumber, phone) {
  const response = await fetch(`${apiUrl}/api/v1/public/storefront/products/${encodeURIComponent(token)}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ orderNumber, phone })
  });
  const body = await response.json().catch(() => null);
  if (response.status === 404) return null;
  if (!response.ok) {
    const error = new Error(body?.error?.details?.[0]?.messages?.[0] || body?.error?.message || body?.message || "Could not look that up. Try again.");
    error.status = response.status;
    throw error;
  }
  return body.data;
}
