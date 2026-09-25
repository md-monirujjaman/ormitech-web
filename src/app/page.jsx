import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import DashboardShowcase from "@/components/sections/DashboardShowcase";
import FeaturesBento from "@/components/sections/FeaturesBento";
import Solutions from "@/components/sections/Solutions";
import Features from "@/components/sections/Features";
import Steps from "@/components/sections/Steps";
import OmnichannelDemo from "@/components/sections/OmnichannelDemo";
import AIIntegration from "@/components/sections/AIIntegration";
import ArchitectureFlow from "@/components/sections/ArchitectureFlow";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutOrmiTech from "@/components/sections/AboutOrmiTech";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, webPageSchema } from "@/lib/seo";

const homeTitle = "OrmiTech | AI Customer Communication Platform";
const homeDescription = "OrmiTech brings Facebook, Instagram, WhatsApp and website chat into one shared inbox, answers routine questions with AI and hands over to your team when it matters.";
export const metadata = buildMetadata({ title: homeTitle, description: homeDescription, path: "/", absoluteTitle: true, ogTitle: "OrmiTech: Every conversation. One powerful workspace." });

export default function Home(){return <><JsonLd nodes={[webPageSchema({ path: "/", name: homeTitle, description: homeDescription })]}/><Navbar/><main><Hero/><DashboardShowcase/><FeaturesBento/><Solutions/><section className="border-b border-black/10 py-7"><div className="container-x flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-[.18em] text-black/30"><span>Facebook</span><span>Instagram</span><span>WhatsApp</span><span>Website Chat</span><span>AI Automation</span><span>Human Teams</span></div></section><Features/><Steps/><AboutOrmiTech/><OmnichannelDemo/><AIIntegration/><ArchitectureFlow/><HowItWorks/></main><Footer/></>}
