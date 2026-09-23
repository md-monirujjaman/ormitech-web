import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import FeaturePageHero from "@/components/features/pages/FeaturePageHero";
import AnswerBlock from "@/components/seo/AnswerBlock";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { ScrollProgress } from "@/components/ui/effects";
import FaqSection from "@/components/ui/FaqSection";
import Reveal, { MotionProvider } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo";
import { interTight } from "@/styles/fonts";
import { Check } from "lucide-react";

const ui = {
  en: { answerEyebrow: "The short answer", faqEyebrow: "FAQ", faqTitle: "Frequently asked questions", stepsEyebrow: "How it works", benefitsEyebrow: "Benefits", useCasesEyebrow: "Use cases", relatedTitle: "Keep exploring", ctaTitle: "See OrmiTech with your own channels.", ctaText: "Start with the channels you use today and let your team handle only the conversations that need a person.", cta: "Get started", pricing: "See pricing" },
  bn: { answerEyebrow: "সংক্ষেপে উত্তর", faqEyebrow: "প্রশ্নোত্তর", faqTitle: "সাধারণ কিছু প্রশ্ন", stepsEyebrow: "কীভাবে কাজ করে", benefitsEyebrow: "সুবিধা", useCasesEyebrow: "ব্যবহার", relatedTitle: "আরও দেখুন", ctaTitle: "নিজের চ্যানেল দিয়ে OrmiTech দেখে নিন।", ctaText: "আজ যেসব চ্যানেলে কাস্টমারের সাথে কথা বলেন সেগুলো দিয়েই শুরু করুন। শুধু যেসব কথোপকথনে মানুষ দরকার, সেগুলোই আপনার টিম দেখবে।", cta: "শুরু করুন", pricing: "প্রাইসিং দেখুন" }
};

// Shared layout for the channel and market landing pages. Each page supplies its own copy, so only the
// structure is shared. `crumbs` drive both the visible breadcrumb and the BreadcrumbList schema.
export default function SolutionPage({ page, crumbs, language = "en" }) {
  const t = ui[language];
  const { hero, answer, steps, stepsTitle, benefits, benefitsTitle, useCases, useCasesTitle, faq, related, meta, path } = page;
  const wrap = language === "bn" ? "bn" : undefined;

  return (
    <>
      <JsonLd nodes={[webPageSchema({ path, name: meta.title, description: meta.description, language }), breadcrumbSchema(crumbs), faqSchema(faq)]} />
      <Navbar />
      <main lang={wrap} className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <FeaturePageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} breadcrumbs={crumbs} ctaLabel={t.cta} secondaryHref="/pricing" secondaryLabel={t.pricing} />

          <AnswerBlock id="answer" eyebrow={t.answerEyebrow} heading={answer.heading} definition={answer.definition} facts={answer.facts} />

          <section id="how-it-works" aria-labelledby="steps-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-16 lg:py-20">
            <div className="container-x">
              <Reveal>
                <SectionHeading id="steps-title" eyebrow={t.stepsEyebrow} title={stepsTitle} size="sm" />
              </Reveal>
              <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <Reveal as="li" key={step.title} delay={index * 0.07}>
                    <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)]">
                      <span className="text-sm font-bold tabular-nums text-brandInk">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-base font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="benefits-title" className="py-16 lg:py-20">
            <div className="container-x">
              <Reveal>
                <SectionHeading id="benefits-title" eyebrow={t.benefitsEyebrow} title={benefitsTitle} size="sm" />
              </Reveal>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {benefits.map((item, index) => (
                  <Reveal as="li" key={item.title} delay={index * 0.06}>
                    <div className="group flex h-full items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand/20 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.3)]">
                      <IconTile icon={Check} interactive />
                      <div>
                        <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="usecases-title" className="border-y border-slate-100 bg-[#F7F9FC] py-16 lg:py-20">
            <div className="container-x">
              <Reveal>
                <SectionHeading id="usecases-title" eyebrow={t.useCasesEyebrow} title={useCasesTitle} size="sm" />
              </Reveal>
              <ul className="mt-10 grid gap-4 md:grid-cols-3">
                {useCases.map((item, index) => (
                  <Reveal as="li" key={item.title} delay={index * 0.07}>
                    <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-6">
                      <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          <div lang={wrap}>
            <FaqSection eyebrow={t.faqEyebrow} title={t.faqTitle} items={faq} />
          </div>

          <RelatedLinks paths={related} title={t.relatedTitle} eyebrow={language === "bn" ? "সম্পর্কিত" : "Related"} lang={wrap} />

          <SimpleCTA title={t.ctaTitle} text={t.ctaText} primaryLabel={t.cta} secondaryLabel={t.pricing} secondaryHref="/pricing" />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
