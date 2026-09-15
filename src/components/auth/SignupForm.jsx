"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Check, CircleCheck, Lock, Mail, UserRound } from "lucide-react";
import { plans } from "@/data/pricing";
import { authLinks } from "@/data/site";
import { AuthBody, AuthField, AuthHeading, Divider, PreviewNotice, SubmitButton, emailError, passwordRules, useAuthForm } from "./formKit";
import SocialButtons from "./SocialButtons";

const textLink = "rounded font-semibold text-brandInk underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";
const STRENGTH = [
  { label: "Too weak", tone: "bg-red-500", text: "text-red-600" },
  { label: "Weak", tone: "bg-red-500", text: "text-red-600" },
  { label: "Good", tone: "bg-amber-500", text: "text-amber-700" },
  { label: "Strong", tone: "bg-emerald-500", text: "text-emerald-700" }
];

function PasswordStrength({ password }) {
  const passed = passwordRules.filter(rule => rule.test(password)).length;
  const strength = STRENGTH[passed];
  return (
    <div className="mt-2.5" aria-live="polite">
      <div className="flex items-center gap-2">
        <div aria-hidden className="grid flex-1 grid-cols-3 gap-1">
          {passwordRules.map((rule, index) => (
            <span key={rule.id} className={`h-1.5 rounded-full transition-colors duration-300 ${index < passed ? strength.tone : "bg-slate-200"}`} />
          ))}
        </div>
        {password && <span className={`text-xs font-semibold ${strength.text}`}>{strength.label}</span>}
      </div>
      <ul className="mt-2 grid gap-1 sm:grid-cols-3">
        {passwordRules.map(rule => {
          const ok = rule.test(password);
          return (
            <li key={rule.id} className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${ok ? "text-emerald-700" : "text-slate-500"}`}>
              <Check aria-hidden className={`h-3.5 w-3.5 ${ok ? "opacity-100" : "opacity-30"}`} strokeWidth={3} />
              {rule.label}
              <span className="sr-only">{ok ? " (met)" : " (not met)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SignupForm() {
  // /signup?plan=growth (from the pricing page) shows which plan the visitor picked.
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("plan");
    setPlan(plans.find(item => item.id === requested && item.id !== "enterprise") ?? null);
  }, []);

  const form = useAuthForm({
    initialValues: { name: "", email: "", company: "", password: "", terms: false },
    validate: values => ({
      name: values.name.trim() ? undefined : "Enter your full name.",
      email: emailError(values.email),
      password: passwordRules.every(rule => rule.test(values.password)) ? undefined : "Use at least 8 characters with a number and an uppercase letter.",
      terms: values.terms ? undefined : "Please accept the Terms of Service and Privacy Policy."
    })
  });

  if (form.status === "success") {
    return (
      <AuthHeading title="Account created" description={`Welcome to OrmiTech, ${form.values.name.trim().split(" ")[0]}.`}>
        <CircleCheck aria-hidden className="mt-6 h-12 w-12 text-emerald-500" />
        <PreviewNotice>Authentication isn’t connected yet, so no account was actually created. This page previews the OrmiTech sign-up experience.</PreviewNotice>
        <Link href={authLinks.login} className={`mt-6 inline-block text-sm ${textLink}`}>
          Go to log in
        </Link>
      </AuthHeading>
    );
  }

  return (
    <>
      <AuthHeading title="Create your account" description="Connect your channels and start answering customers from one workspace.">
        <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-brand/[.07] px-3 py-1.5 text-[13px] text-slate-700">
          {plan ? (
            <>
              Starting on the <b className="text-brandInk">{plan.name}</b> plan
            </>
          ) : (
            <>Start on the Free plan and upgrade when you’re ready</>
          )}
          <Link href="/pricing" className={`text-[13px] ${textLink}`}>
            {plan ? "Change" : "See plans"}
          </Link>
        </p>
      </AuthHeading>
      <AuthBody>
        <div className="mt-8">
          <SocialButtons />
        </div>
        <Divider label="or sign up with email" />
        <form ref={form.formRef} onSubmit={form.handleSubmit} noValidate className="space-y-5">
          <AuthField id="signup-name" label="Full name" icon={UserRound} autoComplete="name" placeholder="Your name" error={form.errors.name} {...form.inputProps("name")} />
          <AuthField id="signup-email" label="Work email" type="email" icon={Mail} autoComplete="email" placeholder="you@company.com" error={form.errors.email} {...form.inputProps("email")} />
          <AuthField id="signup-company" label="Company name" icon={Building2} autoComplete="organization" placeholder="Optional" {...form.inputProps("company")} />
          <AuthField id="signup-password" label="Password" type="password" icon={Lock} autoComplete="new-password" placeholder="Create a password" error={form.errors.password} {...form.inputProps("password")}>
            <PasswordStrength password={form.values.password} />
          </AuthField>
          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                aria-invalid={Boolean(form.errors.terms)}
                aria-describedby={form.errors.terms ? "signup-terms-error" : undefined}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                {...form.checkboxProps("terms")}
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className={textLink}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className={textLink}>
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {form.errors.terms && (
              <p id="signup-terms-error" className="mt-1.5 text-xs font-medium text-red-600">
                {form.errors.terms}
              </p>
            )}
          </div>
          <SubmitButton submitting={form.status === "submitting"} busyLabel="Creating account…">
            Create account
          </SubmitButton>
        </form>
        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href={authLinks.login} className={textLink}>
            Log in
          </Link>
        </p>
      </AuthBody>
    </>
  );
}
