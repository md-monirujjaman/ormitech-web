import { ArrowRight, Check, MessagesSquare } from "lucide-react";
import { buttonClasses, ButtonShine } from "@/components/common/ButtonLink";
import { appLinks } from "@/data/site";

/** The closing banner. Only claims the pricing page already makes. */
export default function BlogCta() {
  return (
    <section aria-labelledby="blog-cta-heading" className="container-x mt-14 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1230] via-[#1B1030] to-[#7A0A2E] p-7 sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative grid items-center gap-7 lg:grid-cols-[auto_1fr_auto]">
          <span aria-hidden className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-brand lg:flex">
            <MessagesSquare className="h-10 w-10" />
          </span>
          <div>
            <h2 id="blog-cta-heading" className="text-2xl font-extrabold text-white sm:text-3xl">
              Turn every conversation into <span className="text-brand">growth</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">Bring WhatsApp, Messenger, Instagram and website chat into one inbox, and let AI answer the questions customers ask every day.</p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-center">
            <a href={appLinks.register} className={buttonClasses({ variant: "primary", size: "md" })}>
              <ButtonShine />
              Get Started <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/80">
              {["No credit card required", "Setup in minutes"].map(text => (
                <li key={text} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-white" aria-hidden />{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
