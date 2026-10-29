"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fbCustomEvent } from "@/lib/fbpixel";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";

const STORAGE_KEY = "whiskr_exit_intent_dismissed";

export function ExitIntentPopover() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let triggered = false;
    const onLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggered = true;
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-fade-in">
      <div
        className="relative rounded-2xl p-5 shadow-2xl border border-[#1ce881]/30"
        style={{ background: "linear-gradient(135deg,#101235,#1a1d3a)" }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 p-1.5 rounded-full text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1ce881]">Wait —</span>
        </div>
        <h3 className="text-white font-bold text-lg leading-tight mb-2">
          See whiskr.ai save you 2 hours a day
        </h3>
        <p className="text-[#cbd5e1] text-sm mb-4 leading-snug">
          30-day money-back guarantee. Cancel anytime.
        </p>
        <a
          href={TRIAL_CTA_URL}
          onClick={() => {
            fbCustomEvent("CTAClick", {
              content_name: TRIAL_CTA_LABEL,
              location: "exit_intent",
            });
            setOpen(false);
          }}
          className="block w-full text-center px-5 py-2.5 rounded-full text-[#101235] font-bold text-sm transition-all hover:-translate-y-0.5 no-underline"
          style={{
            background: "linear-gradient(135deg,#1ce881,#24ffc9)",
            boxShadow: "0 4px 15px rgba(28,232,129,0.3)",
          }}
        >
          {TRIAL_CTA_LABEL}
        </a>
      </div>
    </div>
  );
}
