import { Messenger } from "@thesvg/react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { markPath, markViewBox } from "@/data/ormitechMark";

// Two-tone navigation icons: a soft pink fill with brand-red lines, drawn on a 24px grid.
const FILL = "#FFC9D5";
const INK = "#F20D45";
const line = { stroke: INK, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };

const duotone = {
  ai: (
    <>
      <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-5l-4 4v-4H7a3 3 0 0 1-3-3z" fill={FILL} style={{ fill: FILL }} {...line} />
      <path d="M12 6.4l.95 2.2 2.2.95-2.2.95-.95 2.2-.95-2.2-2.2-.95 2.2-.95z" fill={INK} />
    </>
  ),
  chatbot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3.5" style={{ fill: FILL }} {...line} />
      <path d="M12 8V5" {...line} />
      <circle cx="12" cy="4" r="1.2" fill={INK} />
      <circle cx="9.4" cy="13" r="1.3" fill={INK} />
      <circle cx="14.6" cy="13" r="1.3" fill={INK} />
      <path d="M3 12.5v3M21 12.5v3M10 16.2h4" {...line} />
    </>
  ),
  handover: (
    <>
      <circle cx="8" cy="8" r="3.2" style={{ fill: FILL }} {...line} />
      <path d="M2.8 20c0-3.1 2.3-5.2 5.2-5.2s5.2 2.1 5.2 5.2" style={{ fill: FILL }} {...line} />
      <path d="M15.5 7.5h5m0 0-2-2m2 2-2 2M20.5 15.5h-5m0 0 2-2m-2 2 2 2" {...line} />
    </>
  ),
  automation: (
    <>
      <path d="M13.2 2.5 5 13.2h5.6l-.9 8.3 8.3-11h-5.6z" style={{ fill: FILL }} {...line} />
      <circle cx="19" cy="5" r="1.1" fill={INK} />
      <circle cx="5" cy="19" r="1.1" fill={INK} />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="8" r="3.2" style={{ fill: FILL }} {...line} />
      <path d="M6.2 19.5c0-3.3 2.6-5.5 5.8-5.5s5.8 2.2 5.8 5.5z" style={{ fill: FILL }} {...line} />
      <circle cx="4.8" cy="10.2" r="2" fill={INK} />
      <circle cx="19.2" cy="10.2" r="2" fill={INK} />
    </>
  ),
  analytics: (
    <>
      <rect x="3.5" y="12.5" width="3.8" height="8" rx="1.2" style={{ fill: FILL }} {...line} />
      <rect x="10.1" y="7.5" width="3.8" height="13" rx="1.2" style={{ fill: FILL }} {...line} />
      <rect x="16.7" y="3.5" width="3.8" height="17" rx="1.2" fill={INK} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  orders: (
    <>
      <rect x="5" y="4.5" width="14" height="17" rx="2.5" style={{ fill: FILL }} {...line} />
      <rect x="9" y="2.5" width="6" height="4" rx="1.3" fill={INK} />
      <path d="m9 14 2.2 2.2L15.5 12" {...line} />
    </>
  ),
  blog: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" style={{ fill: FILL }} {...line} />
      <path d="M8.2 8h7.6M8.2 12h7.6M8.2 16h4.2" {...line} />
    </>
  ),
  docs: (
    <>
      <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v15.5H7A2.5 2.5 0 0 0 4.5 21z" style={{ fill: FILL }} {...line} />
      <path d="M8.5 7.5h7M8.5 11h5M7 18.5h12.5V21H7" {...line} />
    </>
  ),
  faq: (
    <>
      <path d="M12 3a8 8 0 1 0 4.2 14.8L21 21l-1.3-4.7A8 8 0 0 0 12 3z" style={{ fill: FILL }} {...line} />
      <path d="M9.8 9.6a2.4 2.4 0 1 1 3.4 2.2c-.7.3-1.2.8-1.2 1.6" {...line} />
      <circle cx="12" cy="16.4" r=".95" fill={INK} />
    </>
  )
};

function Mark() {
  return (
    <svg aria-hidden viewBox={markViewBox} className="h-[58%] w-[58%] text-brand">
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

// The four channel marks as a 2x2 grid, for the inbox entry.
function ChannelGrid() {
  return (
    <span className="grid h-[62%] w-[62%] grid-cols-2 gap-[2px]">
      <ChannelLogo name="Facebook" className="h-full w-full" />
      <Messenger role="img" aria-label="Messenger" variant="default" className="h-full w-full" />
      <ChannelLogo name="Instagram" className="h-full w-full" />
      <ChannelLogo name="WhatsApp" className="h-full w-full" />
    </span>
  );
}

// Rounded tile that holds a navigation icon. `size` is the tile edge in px.
export default function NavIcon({ name, size = 44, className = "" }) {
  return (
    <span aria-hidden style={{ width: size, height: size }} className={`flex shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-white to-[#FFE6EC] shadow-[0_8px_18px_-10px_rgba(242,13,69,.55),inset_0_1px_0_#fff] ring-1 ring-brand/15 ${className}`}>
      {name === "overview" ? (
        <Mark />
      ) : name === "inbox" ? (
        <ChannelGrid />
      ) : (
        <svg viewBox="0 0 24 24" className="h-[56%] w-[56%]" fill="none">
          {duotone[name]}
        </svg>
      )}
    </span>
  );
}
