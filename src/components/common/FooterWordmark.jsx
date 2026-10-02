import { sora } from "@/styles/fonts";

export default function FooterWordmark() {
  return (
    <div
      aria-hidden
      className={`${sora.className} relative top-6 flex h-full items-end justify-end whitespace-nowrap pb-0 text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-none tracking-[-.08em] text-navy/[.10]`}
    >
      <span>ORM</span>
      <span className="text-[#f2234f]/[.22]">I</span>
      <span>TECH</span>
    </div>
  );
}