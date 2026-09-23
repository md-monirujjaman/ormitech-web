import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import PageHero from "@/components/common/PageHero";
import SimpleCTA from "@/components/common/SimpleCTA";

// Minimal shell for pages that are routed and styled but do not have their content written yet.
export default function PlaceholderPage({ eyebrow, title, description, note }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow={eyebrow} title={title} description={description} />
        <section className="container-x py-16 sm:py-20">
          <div className="glass max-w-2xl rounded-2xl p-8 sm:p-10">
            <p className="text-base leading-7 text-black/60">{note}</p>
          </div>
        </section>
        <SimpleCTA />
      </main>
      <Footer />
    </>
  );
}
