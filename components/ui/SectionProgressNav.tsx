"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "how", label: "How" },
  { id: "atlas", label: "Atlas" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export function SectionProgressNav() {
  const [active, setActive] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className={`hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 cursor-pointer bg-transparent border-0"
            aria-label={`Jump to ${s.label}`}
          >
            <span
              className={`opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold px-2 py-1 rounded-md bg-[#101235] text-white whitespace-nowrap ${
                isActive ? "opacity-100" : ""
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                isActive ? "w-3 h-3 bg-[#1ce881] shadow-[0_0_12px_rgba(28,232,129,0.6)]" : "w-2 h-2 bg-[#cbd5e1] hover:bg-[#94a3b8]"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
