import { Bot, ChartNoAxesColumnIncreasing, Clock, HeartHandshake, Inbox, Target, UsersRound, Workflow } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { value } from "@/data/pricing";
import { channels } from "@/data/site";

const card =
  "flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] motion-safe:hover:-translate-y-1";

function Preview({ children }) {
  return (
    <div aria-hidden className="mt-5 flex flex-1 items-end">
      <div className="w-full rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 transition-colors duration-300 group-hover:bg-brand/[.03]">{children}</div>
    </div>
  );
}

const extras = [
  { title: "Faster first responses", icon: Clock },
  { title: "Leads that don’t slip away", icon: Target },
  { title: "Team collaboration", icon: UsersRound },
  { title: "Consistent customer experience", icon: HeartHandshake }
];

// Server component: static content with client-side reveal and hover effects.
export default function PricingValue() {
  return (
    <section id="value" aria-labelledby="value-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="value-title" eyebrow={value.eyebrow} title={value.title} description={value.description} />
        </Reveal>

        <Stagger as="ul" stagger={0.08} className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerItem as="li">
            <Spotlight as="article" className={card}>
              <IconTile icon={Inbox} interactive />
              <h3 className="mt-5 text-lg font-semibold text-navy">Every conversation in one place</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Facebook, Instagram, WhatsApp and website chat, answered from one shared inbox.</p>
              <Preview>
                <div className="flex items-center justify-between">
                  <span className="flex -space-x-1.5">
                    {channels.map(channel => (
                      <span key={channel.name} className="rounded-full bg-white p-0.5 ring-1 ring-slate-100">
                        <ChannelLogo name={channel.name} className="h-5 w-5" />
                      </span>
                    ))}
                  </span>
                  <span className="text-[12px] font-semibold text-navy">→ 1 inbox</span>
                </div>
              </Preview>
            </Spotlight>
          </StaggerItem>

          <StaggerItem as="li">
            <Spotlight as="article" className={card}>
              <IconTile icon={Bot} interactive />
              <h3 className="mt-5 text-lg font-semibold text-navy">An AI assistant that knows your business</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Answers from your products, FAQs and policies — and hands over when a person is needed.</p>
              <Preview>
                <p className="w-fit rounded-lg bg-white px-2.5 py-1.5 text-[12px] text-slate-600 ring-1 ring-slate-200/70">Do you deliver to Khulna?</p>
                <p className="ml-auto mt-1.5 w-fit rounded-lg bg-brand/[.08] px-2.5 py-1.5 text-[12px] text-slate-700 ring-1 ring-brand/20">Yes — 2–3 days.</p>
              </Preview>
            </Spotlight>
          </StaggerItem>

          <StaggerItem as="li">
            <Spotlight as="article" className={card}>
              <IconTile icon={Workflow} interactive />
              <h3 className="mt-5 text-lg font-semibold text-navy">Automation for repetitive work</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Auto-replies, assignment and lead creation run without anyone lifting a finger.</p>
              <Preview>
                <div className="flex flex-wrap items-center gap-1 text-[11.5px] font-semibold">
                  {["New message", "Assign", "Create lead"].map((step, index) => (
                    <span key={step} className="flex items-center gap-1">
                      {index > 0 && <span className="text-slate-300">→</span>}
                      <span className={`rounded-md px-2 py-1 ${index === 2 ? "bg-brand text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>{step}</span>
                    </span>
                  ))}
                </div>
              </Preview>
            </Spotlight>
          </StaggerItem>

          <StaggerItem as="li">
            <Spotlight as="article" className={card}>
              <IconTile icon={ChartNoAxesColumnIncreasing} interactive />
              <h3 className="mt-5 text-lg font-semibold text-navy">Visibility across the business</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">See response times, AI activity and leads so you know what’s working.</p>
              <Preview>
                <div className="flex h-12 items-end gap-1.5">
                  {[40, 62, 48, 78, 66, 92, 70].map((height, index) => (
                    <span key={index} className={`w-full rounded-t ${index === 5 ? "bg-brand" : "bg-brand/20"}`} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </Preview>
            </Spotlight>
          </StaggerItem>
        </Stagger>

        <Stagger as="ul" stagger={0.06} className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {extras.map(({ title, icon: Icon }) => (
            <StaggerItem as="li" key={title} className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-navy transition-colors duration-300 hover:border-brand/25">
              <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/[.08] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              {title}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
