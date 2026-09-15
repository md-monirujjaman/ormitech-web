"use client";

import Link from "next/link";
import { CircleCheck, Lock, Mail } from "lucide-react";
import { authLinks } from "@/data/site";
import { AuthBody, AuthField, AuthHeading, Divider, PreviewNotice, SubmitButton, emailError, useAuthForm } from "./formKit";
import SocialButtons from "./SocialButtons";

const textLink = "rounded font-semibold text-brandInk underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export default function LoginForm() {
  const form = useAuthForm({
    initialValues: { email: "", password: "", remember: true },
    validate: values => ({
      email: emailError(values.email),
      password: values.password ? undefined : "Enter your password."
    })
  });

  if (form.status === "success") {
    return (
      <AuthHeading title="You’re all set" description={`Signed in as ${form.values.email}.`}>
        <CircleCheck aria-hidden className="mt-6 h-12 w-12 text-emerald-500" />
        <PreviewNotice>Authentication isn’t connected yet, so no account was accessed. This page previews the OrmiTech login experience.</PreviewNotice>
        <button type="button" onClick={() => form.setStatus("idle")} className={`mt-6 text-sm ${textLink}`}>
          Back to log in
        </button>
      </AuthHeading>
    );
  }

  return (
    <>
      <AuthHeading title="Welcome back" description="Log in to your OrmiTech workspace." />
      <AuthBody>
        <div className="mt-8">
          <SocialButtons />
        </div>
        <Divider label="or log in with email" />
        <form ref={form.formRef} onSubmit={form.handleSubmit} noValidate className="space-y-5">
          <AuthField id="login-email" label="Email" type="email" icon={Mail} autoComplete="email" placeholder="you@company.com" error={form.errors.email} {...form.inputProps("email")} />
          <AuthField
            id="login-password"
            label="Password"
            type="password"
            icon={Lock}
            autoComplete="current-password"
            placeholder="Enter your password"
            error={form.errors.password}
            action={
              <Link href={authLinks.forgotPassword} className={`text-[13px] ${textLink}`}>
                Forgot password?
              </Link>
            }
            {...form.inputProps("password")}
          />
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30" {...form.checkboxProps("remember")} />
            Keep me logged in
          </label>
          <SubmitButton submitting={form.status === "submitting"} busyLabel="Logging in…">
            Log in
          </SubmitButton>
        </form>
        <p className="mt-8 text-center text-sm text-slate-600">
          New to OrmiTech?{" "}
          <Link href={authLinks.signup} className={textLink}>
            Create an account
          </Link>
        </p>
      </AuthBody>
    </>
  );
}
