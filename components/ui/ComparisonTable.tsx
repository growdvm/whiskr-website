"use client";

import { Check, X, Minus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type Cell = "yes" | "no" | "partial" | string;

const rows: { feature: string; manual: Cell; generic: Cell; whiskr: Cell }[] = [
  { feature: "Time per SOAP note", manual: "10–15 min", generic: "5–8 min", whiskr: "Under 1 min" },
  { feature: "Veterinary-trained AI", manual: "no", generic: "no", whiskr: "yes" },
  { feature: "Breed-specific vital ranges", manual: "no", generic: "no", whiskr: "yes" },
  { feature: "Bilingual exam capture", manual: "no", generic: "partial", whiskr: "yes" },
  { feature: "Differentials & diagnostics", manual: "no", generic: "partial", whiskr: "yes" },
  { feature: "One-click EHR sync", manual: "no", generic: "no", whiskr: "yes" },
  { feature: "Client handouts auto-generated", manual: "no", generic: "no", whiskr: "yes" },
  { feature: "Done before next patient", manual: "no", generic: "partial", whiskr: "yes" },
];

const renderCell = (v: Cell, highlight = false) => {
  if (v === "yes")
    return <Check className={`w-5 h-5 mx-auto ${highlight ? "text-[#1ce881]" : "text-[#1ce881]"}`} strokeWidth={3} />;
  if (v === "no") return <X className="w-5 h-5 mx-auto text-[#94a3b8]" strokeWidth={2.5} />;
  if (v === "partial") return <Minus className="w-5 h-5 mx-auto text-[#f59e0b]" strokeWidth={3} />;
  return <span className={`text-sm font-semibold ${highlight ? "text-[#1ce881]" : "text-[#475569]"}`}>{v}</span>;
};

export function ComparisonTable() {
  return (
    <section id="compare" className="py-10 md:py-16" style={{ background: "linear-gradient(180deg,#fff,#f8fafc)" }}>
      <div className="max-w-[1000px] mx-auto px-5 md:px-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-10">
            <p className="inline-block px-4 py-1.5 rounded-full bg-[#1ce881]/10 border border-[#1ce881]/30 text-xs font-semibold text-[#1ce881] uppercase tracking-wider mb-4">
              How we compare
            </p>
            <h2 className="text-[clamp(28px,5vw,42px)] font-extrabold text-[#101235] mb-3">
              Why teams switch to whiskr.ai
            </h2>
            <p className="text-lg text-[#475569]">A side-by-side look at what changes when AI is built for vets.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
            <div className="grid grid-cols-4 bg-[#f8fafc] border-b border-[#e2e8f0]">
              <div className="p-4 text-xs font-bold uppercase tracking-wider text-[#94a3b8]">Feature</div>
              <div className="p-4 text-center text-sm font-bold text-[#475569]">Manual notes</div>
              <div className="p-4 text-center text-sm font-bold text-[#475569]">Generic AI</div>
              <div
                className="p-4 text-center text-sm font-bold text-[#101235] relative"
                style={{ background: "linear-gradient(135deg,rgba(28,232,129,0.15),rgba(36,255,201,0.1))" }}
              >
                whiskr.ai
                <span className="absolute top-1 right-1 text-[9px] font-bold uppercase text-[#1ce881]">Best</span>
              </div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-4 items-center ${
                  i !== rows.length - 1 ? "border-b border-[#f1f5f9]" : ""
                } hover:bg-[#fafbfc] transition-colors`}
              >
                <div className="p-4 text-sm font-medium text-[#101235]">{r.feature}</div>
                <div className="p-4 text-center">{renderCell(r.manual)}</div>
                <div className="p-4 text-center">{renderCell(r.generic)}</div>
                <div className="p-4 text-center" style={{ background: "rgba(28,232,129,0.04)" }}>
                  {renderCell(r.whiskr, true)}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
