"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { ButtonShine, buttonClasses } from "@/components/common/ButtonLink";
import { ease } from "@/components/ui/Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(value) {
  if (!value.trim()) return "Enter your email address.";
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address.";
  return undefined;
}

export const passwordRules = [
  { id: "length", label: "At least 8 characters", test: value => value.length >= 8 },
  { id: "number", label: "One number", test: value => /\d/.test(value) },
  { id: "upper", label: "One uppercase letter", test: value => /[A-Z]/.test(value) }
];

// How long a pretend request takes. There is no authentication backend yet.
const PREVIEW_DELAY_MS = 900;

// Form state, validation and a simulated submit. Invalid submits focus the first field with an error.
export function useAuthForm({ initialValues, validate }) {
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(name, value) {
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => (current[name] ? { ...current, [name]: undefined } : current));
  }

  const inputProps = name => ({ name, value: values[name], onChange: event => update(name, event.target.value) });
  const checkboxProps = name => ({ name, checked: values[name], onChange: event => update(name, event.target.checked) });

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors).find(name => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    await new Promise(resolve => setTimeout(resolve, PREVIEW_DELAY_MS));
    setStatus("success");
  }

  return { formRef, values, errors, status, setStatus, inputProps, checkboxProps, handleSubmit };
}

export function AuthHeading({ title, description, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
      <h1 className="text-[32px] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-4xl">{title}</h1>
      {description && <p className="mt-2 text-[15px] leading-6 text-slate-600">{description}</p>}
      {children}
    </motion.div>
  );
}

export function AuthBody({ children, delay = 0.08 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function Spinner({ className = "" }) {
  return <span aria-hidden className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent ${className}`} />;
}

export function AuthField({ id, label, type = "text", error, hint, icon: Icon, action, children, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-navy">
          {label}
        </label>
        {action}
      </div>
      <div className="relative mt-1.5">
        {Icon && <Icon aria-hidden className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${error ? "text-red-500" : "text-slate-400"}`} />}
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-xl border bg-white text-[15px] text-navy transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${Icon ? "pl-10" : "pl-3.5"} ${isPassword ? "pr-12" : "pr-3.5"} ${
            error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "border-slate-200 hover:border-slate-300 focus:border-brand focus:ring-brand/15"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(value => !value)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            {visible ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}
          </button>
        )}
      </div>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ submitting, children, busyLabel }) {
  return (
    <button type="submit" disabled={submitting} aria-busy={submitting} className={buttonClasses({ className: "w-full disabled:cursor-wait disabled:opacity-80" })}>
      <ButtonShine />
      {submitting ? (
        <>
          <Spinner />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3 text-[13px] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-slate-200" />
      {label}
      <span aria-hidden className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

// Shown after a simulated submit so nobody mistakes the preview for a real sign-in.
export function PreviewNotice({ children }) {
  return <p className="mt-4 rounded-xl bg-amber-50 px-3.5 py-2.5 text-[13px] leading-5 text-amber-800 ring-1 ring-amber-200">{children}</p>;
}
