// Gradient avatar with a person's initials, used inside product illustrations.
export default function Initials({ name, tone = "from-rose-400 to-red-600", className = "h-9 w-9 text-[11px]" }) {
  const initials = name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${tone} ${className}`}>
      {initials}
    </span>
  );
}
