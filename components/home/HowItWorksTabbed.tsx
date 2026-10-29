"use client";

import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";
import { YouTubePlayer, type YouTubePlayerInstance } from "@/components/ui/YouTubePlayer";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";
import { fbCustomEvent } from "@/lib/fbpixel";
import { HOW_IT_WORKS_POSTER } from "@/lib/assets";
import { YOUTUBE_HOW_IT_WORKS_VIDEO_ID } from "@/lib/youtube";

const TAB_TIMESTAMPS = [0, 2, 6] as const;

export default function HowItWorksTabbed() {
  const [activeTab, setActiveTab] = useState(0);
  const [videoActive, setVideoActive] = useState(false);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const isSeekingRef = useRef(false);

  const handleTimeUpdate = (currentTime: number) => {
    if (isSeekingRef.current) return;
    if (currentTime < 2) setActiveTab(0);
    else if (currentTime < 6) setActiveTab(1);
    else setActiveTab(2);
  };

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    if (!videoActive) return;
    const player = playerRef.current;
    if (player) {
      isSeekingRef.current = true;
      player.seekTo(TAB_TIMESTAMPS[idx], true);
      player.playVideo();
      setTimeout(() => {
        isSeekingRef.current = false;
      }, 300);
    }
  };

  const tabs = [
    {
      label: "Record",
      title: "Record During Exam",
      features: [
        { label: "Multiple input methods", detail: "Live recording, file upload, or manual typing" },
        { label: "Natural language", detail: "Speak conversationally, no training required" },
        { label: "Continue anytime", detail: "Pause, resume, or add notes later" },
      ],
    },
    {
      label: "Generate",
      title: "AI Generates SOAP + Suggestions",
      features: [
        { label: "Structured SOAP", detail: "Organized into Subjective, Objective, Assessment, Plan" },
        { label: "Vital extraction", detail: "Breed-specific ranges, abnormalities flagged" },
        { label: "Differentials & Diagnostics", detail: "Possible differentials and relevant diagnostics" },
      ],
    },
    {
      label: "Sync",
      title: "Review & Sync to EHR",
      features: [
        { label: "One-click EHR sync", detail: "Direct Sync with your PIMS system" },
        {
          label: "Client communications",
          detail: "Generate discharge summary, client education and medication handouts",
        },
        { label: "PDF export", detail: "Professional branded output for records" },
      ],
    },
  ];

  return (
    <section id="how" className="py-6 md:py-10" style={{ background: "linear-gradient(180deg,#f8fafc,#fff)" }}>
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-10 md:mb-14">
            <p
              className="inline-block px-5 py-2 rounded-[20px] text-xs font-bold uppercase tracking-[1.2px] mb-4"
              style={{
                background: "rgba(28,232,129,0.1)",
                border: "1px solid rgba(28,232,129,0.25)",
                color: "#059669",
              }}
            >
              How It Works
            </p>
            <h2 className="text-[clamp(28px,6vw,42px)] font-extrabold text-[#101235] mb-3">
              Three steps to complete documentation
            </h2>
            <p className="text-base md:text-lg text-[#475569]">Integrates seamlessly into your existing workflow</p>
          </div>
        </AnimatedSection>

        <div className="relative grid grid-cols-3 gap-0 mb-4 bg-[#f1f5f9] p-1.5 rounded-2xl">
          <div
            className="absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-md"
            style={{
              width: "calc((100% - 12px) / 3)",
              left: `calc(6px + ${activeTab} * (100% - 12px) / 3)`,
              background: "linear-gradient(135deg, rgba(28,232,129,0.15), rgba(36,255,201,0.15))",
              border: "2px solid #1ce881",
            }}
          />
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTabClick(idx)}
              className={`relative z-10 px-4 md:px-7 py-4 md:py-5 rounded-xl font-semibold text-[15px] md:text-lg cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                activeTab === idx ? "text-[#059669]" : "text-[#94a3b8] hover:text-[#64748b]"
              }`}
              style={{ background: "transparent" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl border-2 border-[#e2e8f0] overflow-hidden bg-white"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${activeTab * 100}%)` }}
                >
                  {tabs.map((tab, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 min-w-0 p-6 md:p-10">
                      <h3 className="text-[clamp(22px,5vw,26px)] font-extrabold text-[#101235] mb-3">{tab.title}</h3>
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        {tab.features.map((f, j) => (
                          <div key={j} className="flex gap-3 items-start">
                            <div
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: "linear-gradient(135deg,#1ce881,#24ffc9)" }}
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#fff">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[15px] font-semibold text-[#101235] mb-1">{f.label}</p>
                              <p className="text-sm text-[#64748b] m-0" style={{ lineHeight: 1.5 }}>
                                {f.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <a
                        href={TRIAL_CTA_URL}
                        onClick={() => {
                          fbCustomEvent("CTAClick", {
                            content_name: TRIAL_CTA_LABEL,
                            location: "how_it_works",
                          });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-none cursor-pointer text-[#101235] font-semibold text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(28,232,129,0.3)] no-underline"
                        style={{ background: "linear-gradient(135deg,#1ce881,#24ffc9)" }}
                      >
                        {TRIAL_CTA_LABEL}
                        <svg className="w-4 h-4 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative w-full order-1 md:order-2 overflow-hidden rounded-xl min-h-[360px] md:min-h-[460px] bg-[#101235]">
              {videoActive ? (
                <YouTubePlayer
                  videoId={YOUTUBE_HOW_IT_WORKS_VIDEO_ID}
                  autoplay
                  muted
                  loop
                  controls={false}
                  className="absolute inset-0 w-full h-full"
                  onReady={(player) => {
                    playerRef.current = player;
                  }}
                  onTimeUpdate={handleTimeUpdate}
                />
              ) : (
                <YouTubeFacade
                  videoId={YOUTUBE_HOW_IT_WORKS_VIDEO_ID}
                  posterSrc={HOW_IT_WORKS_POSTER}
                  title="Play How It Works video"
                  className="absolute inset-0 w-full h-full"
                  onActivate={() => setVideoActive(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
