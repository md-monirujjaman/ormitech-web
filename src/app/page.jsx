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
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
export default function Home(){return <><Navbar/><main><Hero/><DashboardShowcase/><FeaturesBento/><Solutions/><section className="border-b border-black/10 py-7"><div className="container-x flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-[.18em] text-black/30"><span>Facebook</span><span>Instagram</span><span>WhatsApp</span><span>Website Chat</span><span>AI Automation</span><span>Human Teams</span></div></section><Features/><Steps/><OmnichannelDemo/><AIIntegration/><ArchitectureFlow/><HowItWorks/><Pricing/><Contact/></main><Footer/></>}
