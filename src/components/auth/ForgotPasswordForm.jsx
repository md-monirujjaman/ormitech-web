"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MailCheck } from "lucide-react";
import { authLinks } from "@/data/site";
import { AuthBody, AuthField, AuthHeading, PreviewNotice, Spinner, SubmitButton, emailError, useAuthForm } from "./formKit";

const RESEND_SECONDS = 30;
const backLink = "group inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brandInk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export default function ForgotPasswordForm() {
  const form = useAuthForm({ initialValues: { email: "" }, validate: values => ({ email: emailError(values.email) }) });
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (form.status === "success") setSecondsLeft(RESEND_SECONDS);
  }, [form.status]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft(value => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function resend() {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setSecondsLeft(RESEND_SECONDS);
    }, 800);
  }

  if (form.status === "success") {
    return (
      <AuthHeading title="Check your inbox" description={`If an account exists for ${form.values.email}, we’ll send a link to reset your password.`}>
        <span aria-hidden className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/[.08] text-brand">
          <MailCheck className="h-7 w-7" />
        </span>
        <PreviewNotice>Authentication isn’t connected yet, so no email was sent. This page previews the password reset experience.</PreviewNotice>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span>Didn’t get it?</span>
          <button
            type="button"
            onClick={resend}
            disabled={secondsLeft > 0 || resending}
            className="inline-flex items-center gap-2 rounded font-semibold text-brandInk hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            {resending && <Spinner />}
            {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend link"}
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={authLinks.login} className={backLink}>
            <ArrowLeft aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to log in
          </Link>
          <button type="button" onClick={() => form.setStatus("idle")} className="rounded text-sm font-semibold text-slate-600 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
            Use a different email
          </button>
        </div>
      </AuthHeading>
    );
  }

  return (
    <>
      <AuthHeading title="Forgot your password?" description="Enter the email you signed up with and we’ll send you a link to reset it." />
      <AuthBody>
        <form ref={form.formRef} onSubmit={form.handleSubmit} noValidate className="mt-8 space-y-5">
          <AuthField id="forgot-email" label="Email" type="email" icon={Mail} autoComplete="email" placeholder="you@company.com" error={form.errors.email} {...form.inputProps("email")} />
          <SubmitButton submitting={form.status === "submitting"} busyLabel="Sending link…">
            Send reset link
          </SubmitButton>
        </form>
        <Link href={authLinks.login} className={`mt-8 ${backLink}`}>
          <ArrowLeft aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to log in
        </Link>
      </AuthBody>
    </>
  );
}
