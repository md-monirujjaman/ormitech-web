"use client";

import { useEffect, useRef, useState } from "react";

/** The business's own words about the product, as written (line breaks kept). A long text is shown shortened, with "See more". */
export default function Description({ text }) {
  const box = useRef(null);
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (element) setLong(element.scrollHeight > 260);
  }, [text]);

  return (
    <div>
      <div className="relative">
        <div ref={box} className={`whitespace-pre-line break-words text-base leading-7 text-neutral-800 ${!open && long ? "max-h-56 overflow-hidden" : ""}`}>
          {text}
        </div>
        {!open && long && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />}
      </div>
      {long && (
        <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} className="mt-3 rounded-full border border-neutral-300 px-5 py-2 text-sm font-bold text-neutral-900 hover:border-neutral-900">
          {open ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
