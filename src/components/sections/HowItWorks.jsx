const steps = [
  ["01", "Connect", "Connect your customer channels and bring conversations into one workspace."],
  ["02", "Configure", "Define routing, team access, tags, workflows and AI behavior."],
  ["03", "Automate", "Let AI handle repeatable questions and qualify incoming demand."],
  ["04", "Grow", "Measure conversations, leads and team performance and improve over time."]
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-black/5 bg-[#F7F8FA] py-24">
      <div className="container-x">
        <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">How it works</p><h2 className="mt-4 text-4xl font-bold sm:text-5xl">From connection to conversion.</h2></div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num,title,text]) => <div key={num} className="glass rounded-2xl p-6"><span className="text-xs font-bold text-brand">{num}</span><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-black/45">{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}