// The rules of the home page counter, kept apart from the component so they can be tested.

/** A number off the wire that may be shown: a whole, finite, non-negative number. Anything else is not a count. */
export const asCount = (value) => (typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : null);

/** The count that stands after a new reading: it only goes up. A lower reading (an old cached answer, a deletion) never makes the counter go back. */
export const nextTarget = (current, reading) => {
  const next = asCount(reading);
  if (next === null) return current;
  return current === null ? next : Math.max(current, next);
};

/** How long a climb of `distance` people takes, in milliseconds: gentle for a few people, never more than 3.2 s for a lot. */
export const climbDuration = (distance) => Math.min(3200, 900 + Math.log10(Math.max(distance, 1) + 1) * 700);

/** Ease-out, so the number rushes at first and settles slowly. `t` is 0..1. */
export const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/** The number shown at progress `t` of a climb from `from` to `to`. */
export const valueAt = (from, to, t) => Math.round(from + (to - from) * easeOut(t));

export const formatCount = (value) => value.toLocaleString("en-US");
