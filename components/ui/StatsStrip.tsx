"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { end: 12000, suffix: "+", label: "Notes generated" },
  { end: 8, suffix: " min", label: "Saved per visit" },
  { end: 98, suffix: "%", label: "Vet-approved accuracy" },
  { end: 17, suffix: "+", label: "Languages supported" },
];

export function StatsStrip() {
  return (
    <section
      className="relative py-6 md:py-7 border-y border-white/10"
      style={{ background: "linear-gradient(90deg,#101235,#1a1d3a,#101235)" }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(28,232,129,0.15), transparent 70%)" }}
      />
      <div className="relative max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#1ce881,#24ffc9)" }}>
              <AnimatedCounter end={s.end} suffix={s.suffix} duration={1800} />
            </div>
            <div className="text-xs md:text-sm text-[#cbd5e1] mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
