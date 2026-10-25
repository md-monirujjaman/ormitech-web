import { apiUrl } from "@/data/site";
import { billing as defaultBilling, enterprisePlan as defaultEnterprise, plans as defaultPlans } from "@/data/pricing";

// The plans and prices the admin panel manages, read from the OrmiTech API when the page is built or refreshed.
//
// The built-in config in `data/pricing.js` is what the site shipped with. It is used only when the API cannot be
// reached or has nothing configured, so the pricing page never goes blank because a backend is down. Whatever the
// API returns replaces it: nothing is merged field by field.
const REVALIDATE_SECONDS = 60;

const isPlan = plan =>
  plan &&
  typeof plan.id === "string" &&
  typeof plan.name === "string" &&
  Array.isArray(plan.features) &&
  plan.cta &&
  typeof plan.cta.label === "string" &&
  typeof plan.cta.href === "string" &&
  (plan.monthlyPrice === null || typeof plan.monthlyPrice === "number");

function builtIn() {
  return { billing: defaultBilling, plans: defaultPlans, enterprisePlan: defaultEnterprise, live: false };
}

export async function getLivePricing() {
  try {
    const response = await fetch(`${apiUrl}/api/v1/pricing`, { headers: { Accept: "application/json" }, next: { revalidate: REVALIDATE_SECONDS, tags: ["pricing"] } });
    if (!response.ok) return builtIn();
    const body = await response.json();
    const data = body?.data;
    if (!data || !Array.isArray(data.plans) || data.plans.length === 0 || !data.plans.every(isPlan)) return builtIn();

    const plans = data.plans.map(plan => ({ ...plan, limits: plan.limits ?? {}, summary: plan.summary ?? "", tagline: plan.tagline ?? "", featuresIntro: plan.featuresIntro ?? undefined }));
    const currencies = Array.isArray(data.billing?.currencies) && data.billing.currencies.length > 0 ? data.billing.currencies : defaultBilling.currencies;
    return {
      billing: {
        ...defaultBilling,
        symbol: data.billing?.symbol ?? defaultBilling.symbol,
        annualDiscountPercent: typeof data.billing?.annualDiscountPercent === "number" ? data.billing.annualDiscountPercent : defaultBilling.annualDiscountPercent,
        currencies
      },
      plans,
      enterprisePlan: plans.find(plan => plan.id === "enterprise") ?? plans.find(plan => plan.monthlyPrice === null) ?? defaultEnterprise,
      live: true
    };
  } catch {
    return builtIn();
  }
}
