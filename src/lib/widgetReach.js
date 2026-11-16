import { apiUrl } from "@/data/site";

// How many people the website chat widget has answered so far, read from the OrmiTech API (a real count across all workspaces).
//
// There is no built-in number to fall back on: if the API cannot give an honest one, this returns null and the page leaves the counter out
// rather than showing something made up.
export const REACH_REVALIDATE_SECONDS = 30;

export async function getWidgetReach() {
  try {
    const response = await fetch(`${apiUrl}/api/v1/stats/widget-reach`, { headers: { Accept: "application/json" }, next: { revalidate: REACH_REVALIDATE_SECONDS, tags: ["widget-reach"] }, signal: AbortSignal.timeout(4000) });
    if (!response.ok) return null;
    const data = (await response.json())?.data;
    const people = data?.people;
    if (typeof people !== "number" || !Number.isFinite(people) || people < 0) return null;
    return { people: Math.floor(people), asOf: typeof data.asOf === "string" ? data.asOf : null };
  } catch {
    return null;
  }
}
