// Thin connector with a light pulse travelling along it. The pulse is hidden for reduced motion.
// Pass "absolute ..." in className to position it; otherwise it sits in the flow.
export default function FlowLine({ direction = "vertical", className = "", delay = 0 }) {
  const vertical = direction === "vertical";
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  return (
    <span aria-hidden className={`block overflow-hidden from-brand/15 via-brand/40 to-brand/15 ${position} ${vertical ? "w-px bg-gradient-to-b" : "h-px bg-gradient-to-r"} ${className}`}>
      <span
        className={`absolute inset-0 from-transparent via-brand to-transparent opacity-0 motion-safe:opacity-100 ${vertical ? "bg-gradient-to-b motion-safe:animate-flow" : "bg-gradient-to-r motion-safe:animate-flow-x"}`}
        style={{ animationDelay: `-${delay}s` }}
      />
    </span>
  );
}
