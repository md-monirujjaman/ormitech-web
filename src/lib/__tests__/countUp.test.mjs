import assert from "node:assert/strict";
import { test } from "node:test";
import { asCount, climbDuration, easeOut, formatCount, nextTarget, valueAt } from "../countUp.mjs";

test("asCount accepts only a whole, finite, non-negative number", () => {
  assert.equal(asCount(0), 0);
  assert.equal(asCount(12408), 12408);
  assert.equal(asCount(12408.9), 12408);
  for (const bad of [-1, Number.NaN, Infinity, -Infinity, "12", null, undefined, {}, [], true]) assert.equal(asCount(bad), null, String(bad));
});

test("nextTarget starts from the first honest reading and then only goes up", () => {
  assert.equal(nextTarget(null, 100), 100);
  assert.equal(nextTarget(100, 130), 130);
  assert.equal(nextTarget(130, 120), 130, "an older cached answer never makes the counter go back");
  assert.equal(nextTarget(130, 130), 130);
});

test("nextTarget ignores a reading that is not a count, and keeps what it had", () => {
  assert.equal(nextTarget(null, undefined), null);
  assert.equal(nextTarget(null, "lots"), null);
  assert.equal(nextTarget(50, Number.NaN), 50);
  assert.equal(nextTarget(50, -5), 50);
  assert.equal(nextTarget(50, null), 50);
});

test("climbDuration is gentle for a few people and never longer than 3.2 seconds", () => {
  assert.ok(climbDuration(1) >= 900 && climbDuration(1) < 1600);
  assert.ok(climbDuration(5) <= climbDuration(50_000));
  assert.equal(climbDuration(10 ** 12), 3200);
  assert.ok(climbDuration(0) >= 900, "no distance is still a sane duration");
  assert.ok(Number.isFinite(climbDuration(-5)));
});

test("easeOut runs from 0 to 1, fast at first, and is clamped", () => {
  assert.equal(easeOut(0), 0);
  assert.equal(easeOut(1), 1);
  assert.ok(easeOut(0.5) > 0.5);
  assert.equal(easeOut(-3), 0);
  assert.equal(easeOut(7), 1);
});

test("valueAt climbs from the start to the target and lands exactly on it", () => {
  assert.equal(valueAt(0, 1000, 0), 0);
  assert.equal(valueAt(0, 1000, 1), 1000);
  assert.equal(valueAt(1000, 1010, 1), 1010);
  let last = 0;
  for (let step = 0; step <= 20; step += 1) {
    const value = valueAt(0, 5000, step / 20);
    assert.ok(value >= last, "never goes backwards while climbing");
    assert.equal(Number.isInteger(value), true);
    last = value;
  }
  assert.equal(valueAt(50, 50, 0.4), 50);
});

test("formatCount groups thousands the same way on the server and in the browser", () => {
  assert.equal(formatCount(0), "0");
  assert.equal(formatCount(999), "999");
  assert.equal(formatCount(12408), "12,408");
  assert.equal(formatCount(1234567), "1,234,567");
});
