import Image from "next/image";

export default function DashboardShowcase() {
  return (
    <section aria-labelledby="dashboard-showcase-title" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-2/3 max-w-5xl -translate-y-1/2 rounded-full bg-brand/[.06] blur-3xl" />
      <div className="container-x relative flex max-h-screen flex-col py-10 supports-[height:100svh]:max-h-[100svh] sm:py-14 lg:max-h-none lg:py-20 supports-[height:100svh]:lg:max-h-none">
        <div className="mx-auto max-w-3xl shrink-0 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">· OrmiTech workspace</div>
          <h2 id="dashboard-showcase-title" className="mt-3 text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-4xl lg:text-5xl">
            Every customer chat, one clean dashboard
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
            Contacts, orders and AI replies from Facebook, Instagram and WhatsApp — all in one place, so your team always has the full picture.
          </p>
        </div>

        <div className="relative mt-6 aspect-[1483/1061] max-h-[80vh] min-h-0 w-full flex-initial overflow-hidden rounded-2xl border border-black/[.08] bg-white shadow-[0_40px_90px_-40px_rgba(15,23,42,.35)] sm:mt-8 sm:rounded-3xl lg:mt-12">
          <Image
            src="/images/ormitech-dashboard.webp"
            alt="OrmiTech dashboard with contact list, an AI-assisted customer conversation and order actions"
            fill
            sizes="(max-width: 1220px) 100vw, 1180px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
