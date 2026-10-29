"use client";

import { useEffect, useRef, useState } from "react";
import ShaderBackground from "@/components/ui/shader-background";

const TRANSCRIPT =
  "Milo, 3-year-old neutered male DSH, here for annual wellness. Owner reports healthy appetite, no vomiting or diarrhea. Indoor only. Physical exam normal — vitals within range, mild tartar on upper premolars. Due for FVRCP, Rabies, and FeLV today.";

type SoapGroup = { heading?: string; bullets: string[] };
type SoapSection = { label: "S" | "O" | "A" | "P"; title: string; groups: SoapGroup[] };

const SOAP: SoapSection[] = [
  {
    label: "S",
    title: "Subjective",
    groups: [
      {
        bullets: [
          "Chief complaint: Annual wellness examination",
          "No current concerns reported. Indoor-only lifestyle.",
        ],
      },
    ],
  },
  {
    label: "O",
    title: "Objective",
    groups: [
      {
        heading: "Vitals",
        bullets: [
          "Temperature, heart rate, and respiratory rate within normal limits",
          "CRT <2 seconds · Mucous membranes pink and moist",
        ],
      },
      {
        heading: "Physical Examination",
        bullets: [
          "Bright, alert, responsive. Normal body condition.",
          "Oral cavity: mild tartar on upper premolars. No gingivitis.",
        ],
      },
    ],
  },
  {
    label: "A",
    title: "Assessment",
    groups: [{ bullets: ["Primary: Healthy adult feline", "No significant abnormalities identified"] }],
  },
  {
    label: "P",
    title: "Plan",
    groups: [
      {
        heading: "Diagnostics Recommended",
        bullets: ["Annual screening bloodwork and urinalysis", "Fecal flotation for parasite screening"],
      },
      {
        heading: "Home Care Instructions",
        bullets: ["Continue routine parasite prevention", "Monitor appetite, thirst, and litter box habits"],
      },
      { heading: "Follow-up Schedule", bullets: ["Return in one year for annual wellness and vaccinations"] },
      { heading: "Prognosis", bullets: ["Excellent"] },
    ],
  },
];

type RevealItem =
  | { kind: "section"; sectionIdx: number }
  | { kind: "heading"; sectionIdx: number; groupIdx: number }
  | { kind: "bullet"; sectionIdx: number; groupIdx: number; bulletIdx: number };

const REVEAL_ITEMS: RevealItem[] = (() => {
  const items: RevealItem[] = [];
  SOAP.forEach((section, sIdx) => {
    items.push({ kind: "section", sectionIdx: sIdx });
    section.groups.forEach((group, gIdx) => {
      if (group.heading) items.push({ kind: "heading", sectionIdx: sIdx, groupIdx: gIdx });
      group.bullets.forEach((_, bIdx) => {
        items.push({ kind: "bullet", sectionIdx: sIdx, groupIdx: gIdx, bulletIdx: bIdx });
      });
    });
  });
  return items;
})();

const REVEAL_INTERVAL_MS = 210;
const TOTAL_REVEAL_MS = REVEAL_ITEMS.length * REVEAL_INTERVAL_MS;
const RECORDING_MS = 5000;
const TRANSCRIPT_HOLD_MS = 400;
const SOAP_START_MS = RECORDING_MS + TRANSCRIPT_HOLD_MS;
const REVEAL_START_MS = SOAP_START_MS + 100;
const COMPLETE_AT = REVEAL_START_MS + TOTAL_REVEAL_MS + 200;
const HOLD_MS = 5000;
const CYCLE_MS = COMPLETE_AT + HOLD_MS;
const TIMER_MAX_SEC = Math.ceil(RECORDING_MS / 1000);

type Phase = "recording" | "transcript" | "soap" | "complete";

const CARD_CLASS =
  "whiskr-demo-card flex flex-col w-[380px] xl:w-[400px] h-[400px] lg:h-[420px] shrink-0 grow-0 rounded-2xl overflow-hidden relative backdrop-blur-md";

const STATUS_LABEL: Record<Phase, string> = {
  recording: "Listening…",
  transcript: "Transcript captured",
  soap: "Generating SOAP…",
  complete: "SOAP note ready",
};

function StatusBridge({ phase, reduced }: { phase: Phase; reduced: boolean }) {
  const isActive = phase === "recording" || phase === "soap";

  return (
    <div className="flex flex-col items-center justify-center w-[172px] shrink-0 grow-0 py-6 lg:py-0">
      <div className="hidden lg:flex items-center gap-1 text-[#1ce881]/40 w-full justify-center" aria-hidden="true">
        <span className="w-6 h-px bg-current shrink-0" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="w-6 h-px bg-current shrink-0" />
      </div>

      <div className="relative w-full h-[56px] my-3 lg:my-4">
        <div
          key={phase}
          className="whiskr-status-pop absolute inset-0 flex flex-col items-center justify-center gap-2.5"
        >
          <span className="flex items-center justify-center gap-1 h-3 w-full">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#1ce881]"
                style={{
                  animation:
                    reduced || !isActive
                      ? "none"
                      : `whiskr-pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                  opacity: isActive ? 1 : 0.35,
                }}
              />
            ))}
          </span>
          <span className="text-sm font-semibold text-[#101235] text-center leading-snug w-full px-1">
            {STATUS_LABEL[phase]}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1 text-[#1ce881]/40 w-full justify-center" aria-hidden="true">
        <span className="w-6 h-px bg-current shrink-0" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="w-6 h-px bg-current shrink-0" />
      </div>
    </div>
  );
}

export default function HeroLiveDemo() {
  const [phase, setPhase] = useState<Phase>("recording");
  const [transcriptChars, setTranscriptChars] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [reduced, setReduced] = useState(false);

  const lastFrameRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const soapScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (reduced || phase !== "soap") return;
    const el = soapScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [revealedCount, phase, reduced]);

  useEffect(() => {
    if (reduced) {
      setPhase("complete");
      setTranscriptChars(TRANSCRIPT.length);
      setRevealedCount(REVEAL_ITEMS.length);
      setTimerSec(TIMER_MAX_SEC);
      return;
    }

    const tick = (now: number) => {
      if (lastFrameRef.current == null) lastFrameRef.current = now;
      const delta = now - lastFrameRef.current;
      lastFrameRef.current = now;

      elapsedRef.current += delta;

      if (elapsedRef.current >= CYCLE_MS) {
        elapsedRef.current = 0;
        if (soapScrollRef.current) soapScrollRef.current.scrollTop = 0;
      }

      const e = elapsedRef.current;
      setTimerSec(Math.min(TIMER_MAX_SEC, Math.floor(e / 1000)));

      if (e <= RECORDING_MS) {
        setPhase("recording");
        setRevealedCount(0);
        const frac = Math.min(1, e / RECORDING_MS);
        setTranscriptChars(Math.floor(frac * TRANSCRIPT.length));
      } else if (e < SOAP_START_MS) {
        setPhase("transcript");
        setTranscriptChars(TRANSCRIPT.length);
        setRevealedCount(0);
      } else if (e < COMPLETE_AT) {
        setPhase("soap");
        const revealedMs = Math.max(0, e - REVEAL_START_MS);
        setRevealedCount(Math.min(REVEAL_ITEMS.length, Math.floor(revealedMs / REVEAL_INTERVAL_MS)));
      } else {
        setPhase("complete");
        setRevealedCount(REVEAL_ITEMS.length);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastFrameRef.current = null;
    };
  }, [reduced]);

  const mm = String(Math.floor(timerSec / 60)).padStart(1, "0");
  const ss = String(timerSec % 60).padStart(2, "0");

  const isRevealed = (predicate: (item: RevealItem) => boolean) => {
    if (reduced) return true;
    for (let i = 0; i < revealedCount; i++) {
      if (predicate(REVEAL_ITEMS[i])) return true;
    }
    return false;
  };

  const soapHeaderLabel = phase === "complete" ? "SOAP note ready" : "SOAP note";

  return (
    <section className="relative w-full overflow-hidden bg-[#fafbfc] py-10 lg:py-14 mt-8 hero-animate-delay-4">
      <style>{`
        @keyframes whiskr-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.25); }
        }
        @keyframes whiskr-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes whiskr-complete-pulse {
          0% { box-shadow: 0 0 0 0 rgba(28,232,129,0.5); }
          100% { box-shadow: 0 0 0 14px rgba(28,232,129,0); }
        }
        @keyframes whiskr-reveal {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes whiskr-status-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .whiskr-status-pop {
          animation: whiskr-status-pop 0.45s ease-out both;
        }
        .whiskr-soap-scroll::-webkit-scrollbar { width: 6px; }
        .whiskr-soap-scroll::-webkit-scrollbar-thumb { background: rgba(16,18,53,0.15); border-radius: 3px; }
        .whiskr-demo-card {
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(250, 251, 252, 0.1) 45%,
            rgba(241, 244, 248, 0.08) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.15) inset,
            0 8px 24px rgba(16, 18, 53, 0.04);
          transform: translateY(-2px);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }
        .whiskr-demo-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 48%);
          pointer-events: none;
          z-index: 1;
        }
        .whiskr-demo-card-header {
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(248, 250, 252, 0.03) 100%);
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
        }
        .whiskr-demo-card-body {
          position: relative;
          z-index: 2;
        }
      `}</style>

      {/* Waves — full-section backdrop, always flowing */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <ShaderBackground reducedMotion={reduced} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_172px_1fr] items-center gap-8 lg:gap-6">
          {/* Left — transcript card */}
          <div className="flex justify-center lg:justify-end">
            <div className={CARD_CLASS}>
          <div className="whiskr-demo-card-header flex items-center justify-between text-xs text-[#101235]/90 px-5 pt-5 pb-3 border-b border-white/20 shrink-0">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full bg-red-500"
                style={{
                  animation:
                    reduced || phase !== "recording" ? "none" : "whiskr-pulse-dot 1.6s ease-in-out infinite",
                }}
              />
              <span className="font-medium tracking-wide">Recording exam</span>
            </div>
            <span className="font-mono text-[#64748b] tabular-nums">
              {mm}:{ss}
            </span>
          </div>

          <div className="whiskr-demo-card-body flex-1 min-h-0 overflow-y-auto whiskr-soap-scroll px-5 py-4">
            <p className="text-[14px] lg:text-[15px] leading-relaxed text-[#101235] m-0">
              {TRANSCRIPT.slice(0, transcriptChars)}
              {phase === "recording" && (
                <span
                  className="inline-block w-[7px] h-[15px] align-middle ml-0.5 bg-[#1ce881]"
                  style={{
                    animation: reduced ? "none" : "whiskr-cursor 0.9s steps(1) infinite",
                  }}
                />
              )}
            </p>
          </div>
            </div>
          </div>

        {/* Center — animated status bridge (fixed width column) */}
        <div className="flex justify-center">
          <StatusBridge phase={phase} reduced={reduced} />
        </div>

        {/* Right — SOAP card */}
        <div className="flex justify-center lg:justify-start">
          <div className={CARD_CLASS}>
          <div className="whiskr-demo-card-header flex items-center gap-2 text-xs text-[#101235] px-5 pt-5 pb-3 border-b border-white/20 shrink-0">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: phase === "complete" || reduced ? "#1ce881" : "#e5e7eb",
                animation: !reduced && phase === "complete" ? "whiskr-complete-pulse 1.2s ease-out" : "none",
              }}
            >
              {(phase === "complete" || reduced) && (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#101235"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className="font-semibold tracking-wide">{soapHeaderLabel}</span>
          </div>

          <div
            ref={soapScrollRef}
            className="whiskr-demo-card-body whiskr-soap-scroll flex-1 min-h-0 overflow-y-auto px-5 py-4 flex flex-col gap-3 relative"
          >
            {(phase === "soap" || phase === "complete" || reduced) &&
              SOAP.map((section, sIdx) => {
                const sectionShown = isRevealed((it) => it.kind === "section" && it.sectionIdx === sIdx);
                if (!sectionShown) return null;
                return (
                  <div
                    key={section.label}
                    className="flex flex-col gap-2"
                    style={{ animation: reduced ? "none" : "whiskr-reveal 0.3s ease-out both" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center"
                        style={{ background: "#1ce881", color: "#101235" }}
                      >
                        {section.label}
                      </span>
                      <span className="text-[12px] font-bold text-[#101235]">{section.title}:</span>
                    </div>
                    {section.groups.map((group, gIdx) => {
                      const headingShown = group.heading
                        ? isRevealed(
                            (it) => it.kind === "heading" && it.sectionIdx === sIdx && it.groupIdx === gIdx,
                          )
                        : true;
                      return (
                        <div key={gIdx} className="flex flex-col gap-1 pl-7">
                          {group.heading && headingShown && (
                            <div className="text-[11px] font-semibold text-[#101235] mt-0.5">{group.heading}:</div>
                          )}
                          {group.bullets.map((bullet, bIdx) => {
                            const shown = isRevealed(
                              (it) =>
                                it.kind === "bullet" &&
                                it.sectionIdx === sIdx &&
                                it.groupIdx === gIdx &&
                                it.bulletIdx === bIdx,
                            );
                            if (!shown) return null;
                            return (
                              <div key={bIdx} className="flex gap-1.5 text-[11.5px] leading-snug text-[#1a1d3a]">
                                <span className="text-[#1ce881] flex-shrink-0">•</span>
                                <span className="flex-1">{bullet}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(250,251,252,0.1))",
            }}
          />
            </div>
          </div>
        </div>
      </div>

      <p className="relative z-10 text-center text-xs text-[#64748b] mt-4 px-6 pb-2">
        Speak naturally during the exam — whiskr builds a structured English SOAP note in seconds.
      </p>
    </section>
  );
}
