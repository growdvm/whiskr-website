"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Clock, Brain, FileWarning, ClipboardList, Heart, MessageSquare, Users, HeartHandshake } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { WhiskrLogo } from "@/components/ui/WhiskrLogo";
import { DesktopOnly } from "@/components/ui/DesktopOnly";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LazyWhenVisible } from "@/components/ui/LazyWhenVisible";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { SocialProofTicker } from "@/components/ui/SocialProofTicker";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import {
  ExitIntentPopover,
  GlowingEffect,
  HeroLiveDemo,
  HowItWorksTabbed,
  PricingSection,
  ROICalculator,
  TestimonialsSection,
} from "@/components/home/home-dynamic";
import { fbCustomEvent } from "@/lib/fbpixel";
import { HERO_VET_IMAGE } from "@/lib/assets";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL, BOOK_DEMO_LABEL, BOOK_DEMO_URL } from "@/lib/cta";
import { YOUTUBE_DEMO_VIDEO_ID } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { MotionButton } from "@/components/ui/motion-button";
import { HOME_FAQS } from "@/lib/home-faqs";

/* ── tiny SVG icon helpers ── */
const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="#1ce881">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

type IndexClientProps = {
  heroHeadline?: ReactNode;
};

const IndexClient = ({ heroHeadline }: IndexClientProps) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#fafbfc] font-sans min-h-screen text-[#1e293b]" style={{ lineHeight: 1.65 }}>
      {/* ========== 1. HEADER — floating liquid glass pill ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 md:pt-5 pointer-events-none">
        <div className="max-w-[1120px] mx-auto pointer-events-auto">
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/45 backdrop-blur-2xl shadow-[0_12px_40px_rgba(16,18,53,0.1),0_2px_8px_rgba(16,18,53,0.04),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(255,255,255,0.25)]"
            style={{ WebkitBackdropFilter: "blur(24px) saturate(180%)" }}
          >
            {/* Liquid glass sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 42%, rgba(36,255,201,0.08) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-full opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(36,255,201,0.22), transparent 70%)" }}
            />

            <div className="relative grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 h-[62px] px-4 sm:px-6 md:px-7">
              <WhiskrLogo priority />
              <nav className="hidden-mobile items-center gap-7 justify-self-center">
                {[
                  ["Atlas AI", "atlas"],
                  ["How It Works", "how"],
                  ["Pricing", "pricing"],
                  ["FAQ", "faq"],
                ].map(([l, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-[15px] font-medium text-[#101235]/90 hover:text-[#1ce881] transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap"
                  >
                    {l}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3 sm:gap-4 justify-self-end">
                <a
                  href="https://app.whiskr.ai/login"
                  onClick={() =>
                    fbCustomEvent("LoginClick", { location: "header" })
                  }
                  className="hidden sm:inline text-[15px] font-medium text-[#101235]/90 hover:text-[#1ce881] transition-colors no-underline whitespace-nowrap"
                >
                  Log in
                </a>
                <a
                  href={TRIAL_CTA_URL}
                  onClick={() => {
                    fbCustomEvent("CTAClick", {
                      content_name: TRIAL_CTA_LABEL,
                      location: "header",
                    });
                  }}
                  className="px-5 sm:px-6 py-2.5 rounded-full border border-white/50 cursor-pointer text-[#101235] font-semibold text-sm transition-all hover:-translate-y-0.5 no-underline whitespace-nowrap shadow-[0_4px_14px_rgba(28,232,129,0.28),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  style={{
                    background: "linear-gradient(135deg,#1ce881,#24ffc9)",
                  }}
                >
                  {TRIAL_CTA_LABEL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== 3. HERO (Heidi-style: full-bleed image + gradient, text overlay) ========== */}
      <section className="relative overflow-x-hidden overflow-hidden min-h-[560px] md:min-h-[620px] lg:min-h-[680px]">
        {/* Background photo — flush to top, anchored right */}
        <div className="absolute inset-0">
          <Image
            src={HERO_VET_IMAGE}
            alt="Veterinarian examining a golden retriever in a clinic"
            fill
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            className="object-cover object-[32%_14%] md:object-[55%_12%]"
          />
          {/* Desktop: left fade for text only — photo stays visible on the right */}
          <div
            className="absolute inset-0 hidden md:block"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to right, #fafbfc 0%, #fafbfc 30%, rgba(250,251,252,0.9) 38%, rgba(250,251,252,0.55) 48%, rgba(250,251,252,0.22) 62%, rgba(250,251,252,0.06) 75%, transparent 85%), linear-gradient(to bottom, rgba(250,251,252,0.06) 0%, transparent 18%)",
            }}
          />
          {/* Mobile: lighter fade so the photo reads through */}
          <div
            className="absolute inset-0 md:hidden"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to right, #fafbfc 0%, rgba(250,251,252,0.88) 48%, rgba(250,251,252,0.35) 68%, transparent 88%), linear-gradient(to bottom, rgba(250,251,252,0.4) 0%, rgba(250,251,252,0.15) 28%, transparent 55%)",
            }}
          />
          {/* Subtle mint wash + bottom fade into page bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 12% 18%, rgba(28,232,129,0.04), transparent 55%), linear-gradient(to bottom, transparent 75%, #fafbfc 100%)",
            }}
          />
        </div>

        {/* Overlaid hero content — Heidi-style: left-anchored to viewport, not centered box */}
        <div className="relative z-10 flex min-h-[560px] md:min-h-[620px] lg:min-h-[680px] items-center pt-[96px] md:pt-[104px] pb-10 md:pb-14 w-full">
          <div className="w-full max-w-[34rem] sm:max-w-[36rem] lg:max-w-[42rem] pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 2xl:pl-24 pr-6 md:pr-10 text-left">
              {heroHeadline}
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-start mb-6 hero-animate-delay-3">
                <MotionButton label={BOOK_DEMO_LABEL} href={BOOK_DEMO_URL} />
                <MotionButton label="See How It Works" onClick={() => setVideoModalOpen(true)} />
              </div>
              <div className="flex flex-wrap gap-5 justify-start text-xs text-[#64748b] hero-animate-delay-4">
                {["30-day money-back guarantee", "Cancel anytime", "Never Used for AI Training"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                    {t}
                  </span>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Hero below-fold: social proof + demo video */}
      <section className="relative bg-[#fafbfc]">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="mt-2 -mx-6 md:mx-0">
            <SocialProofTicker />
          </div>
        </div>
        <DesktopOnly>
          <HeroLiveDemo />
        </DesktopOnly>
      </section>

      {/* ========== 4. STATS STRIP (dark accent band) ========== */}
      <StatsStrip />

      {/* Compliance banner removed from here - moved above Veterinary Differentiators */}

      {/* ========== 6. ATLAS INTELLIGENCE ========== */}
      <DesktopOnly>
      <section
        id="atlas"
        className="relative py-8 md:py-12 overflow-hidden"
        style={{ background: "linear-gradient(180deg,#101235,#1a1d3a)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle,#1ce881,transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <p className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#24ffc9] uppercase tracking-wider mb-4">
                Atlas AI Clinical Intelligence
              </p>
              <h2 className="text-[42px] font-extrabold text-white mb-4">More than transcription</h2>
              <p className="text-lg text-[#cbd5e1] max-w-[700px] mx-auto" style={{ lineHeight: 1.7 }}>
                Atlas doesn't just write your notes. It acts as a clinical co-pilot, helping you catch gaps in care,
                suggest diagnostics, and review results.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              {
                title: "Structured SOAP Notes",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                ),
              },
              {
                title: "Differentials & Diagnostics",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ),
              },
              {
                title: "Medication Summary",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5A2.25 2.25 0 008.25 22.5h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5H13.5" />
                    <rect x="9" y="1" width="6" height="4" rx="1" />
                    <path d="M12 11v6" />
                    <path d="M9 14h6" />
                  </svg>
                ),
              },
              {
                title: "Treatment Plan Review",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                ),
              },
              {
                title: "Lab Result Analysis",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h2" />
                    <path d="M8 17h2" />
                    <path d="M14 13h2" />
                    <path d="M14 17h2" />
                  </svg>
                ),
              },
              {
                title: "Breed-Aware Vitals",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
              },
              {
                title: "Veterinary-Trained AI",
                icon: <Brain size={32} className="text-[#101235]" strokeWidth={2} />,
              },
              {
                title: "17-System Physical Exam",
                icon: <ClipboardList size={32} className="text-[#101235]" strokeWidth={2} />,
              },
              {
                title: "Breed-Specific Ranges",
                icon: <Heart size={32} className="text-[#101235]" strokeWidth={2} />,
              },
              {
                title: "Multi-Language Support",
                icon: <MessageSquare size={32} className="text-[#101235]" strokeWidth={2} />,
              },
              {
                title: "Speaker Diarization",
                icon: <Users size={32} className="text-[#101235]" strokeWidth={2} />,
              },
              {
                title: "Euthanasia Workflows",
                icon: <HeartHandshake size={32} className="text-[#101235]" strokeWidth={2} />,
              },
            ].map((card, i) => (
              <div key={i} className="relative rounded-[20px] h-full">
                <GlowingEffect
                  spread={40}
                  proximity={200}
                  inactiveZone={0.01}
                  borderWidth={3}
                  blur={8}
                  disabled={false}
                />
                <div
                  className="relative rounded-[20px] p-5 lg:p-6 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#1ce881]/40 h-full flex items-center min-h-[88px]"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#1ce881,#24ffc9)" }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-[16px] lg:text-[17px] font-bold text-white m-0 leading-snug">{card.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>
      </DesktopOnly>

      {/* ========== 8. PAIN POINTS (Redesigned) ========== */}
      <DesktopOnly>
      <section className="py-6 md:py-10" style={{ background: "linear-gradient(180deg,#f8fafc,#fff)" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <p
                className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[1.2px] mb-5"
                style={{ background: "rgba(16,18,53,0.06)", border: "1px solid rgba(16,18,53,0.1)", color: "#101235" }}
              >
                Common Pain Points
              </p>
              <h2
                className="text-[clamp(28px,6vw,42px)] font-extrabold text-[#101235] mb-4"
                style={{ lineHeight: 1.2 }}
              >
                The hidden cost of charting
              </h2>
              <p
                className="text-[clamp(16px,4vw,18px)] text-[#64748b] max-w-[700px] mx-auto"
                style={{ lineHeight: 1.7 }}
              >
                Heard from 500+ DVMs
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Charting takes longer than the exam",
                desc: "A 15-minute wellness appointment becomes 30 minutes of typing. You spend more time documenting than actually practicing medicine.",
                solDesc: "Notes generated from the recording in under 1 minute — done before your next patient",
                icon: <Clock size={22} className="text-[#1ce881]" strokeWidth={2.5} />,
              },
              {
                title: "Details fade by end of day",
                desc: "By 6 PM, you're trying to remember specific findings from your 9 AM appointments. Was that BCS 6 or 7? What exact dose did you discuss?",
                solDesc: "Record the full consult — 5x faster than typing notes from memory",
                icon: <Brain size={22} className="text-[#1ce881]" strokeWidth={2.5} />,
              },
              {
                title: "Missing clinical details",
                desc: "Rushed charting leads to incomplete records. You might miss documenting important findings, conversations, or differential considerations.",
                solDesc: "Recording the consult captures everything in the moment, so nothing slips through the cracks",
                icon: <FileWarning size={22} className="text-[#1ce881]" strokeWidth={2.5} />,
              },
            ].map((card, i) => (
              <div key={i} className="relative rounded-2xl h-full">
                <GlowingEffect
                  spread={40}
                  proximity={200}
                  inactiveZone={0.01}
                  borderWidth={3}
                  blur={8}
                  disabled={false}
                />
                <div className="relative flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,18,53,0.08)] hover:border-[#1ce881]/30 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,rgba(28,232,129,0.12),rgba(36,255,201,0.12))",
                        border: "1px solid rgba(28,232,129,0.2)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-[#101235]" style={{ lineHeight: 1.3 }}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-[#64748b] mb-6 flex-1" style={{ lineHeight: 1.7 }}>
                    {card.desc}
                  </p>
                  <div
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{
                      background: "linear-gradient(135deg,rgba(28,232,129,0.08),rgba(36,255,201,0.08))",
                      border: "1px solid rgba(28,232,129,0.15)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg,#1ce881,#24ffc9)" }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#101235" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#059669" }}></p>
                      <p className="text-sm text-[#101235] font-medium m-0" style={{ lineHeight: 1.5 }}>
                        {card.solDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>
      </DesktopOnly>

      {/* Compliance banner removed — items moved to hero sub-badges */}

      {/* ========== 10. HOW IT WORKS (Tabbed) ========== */}
      <LazyWhenVisible minHeight="480px">
        <HowItWorksTabbed />
      </LazyWhenVisible>

      {/* ========== 11. TESTIMONIALS ========== */}
      <LazyWhenVisible minHeight="360px">
      <TestimonialsSection
        title="What veterinarians are saying"
        description="Real experiences from DVMs using whiskr.ai daily"
        testimonials={[
          {
            author: { name: "Dr. Sarah Mitchell", handle: "Companion Animal Hospital" },
            text: "I used to stay 2 hours after close doing charts. Now I'm done before I leave. The differential suggestions actually caught something I hadn't considered on a cryptic GI case.",
          },
          {
            author: { name: "Dr. Emily Rodriguez", handle: "Mountain View Animal Clinic" },
            text: "Half my clients speak Spanish. whiskr.ai handles the switching seamlessly and captures both languages accurately. Game changer for our practice.",
          },
          {
            author: { name: "Dr. James Chen", handle: "Pacific Veterinary Specialists" },
            text: "The diagnostic recommendations helped me catch a pattern I was missing. It's like having a resident looking over my shoulder without the overhead.",
          },
          {
            author: { name: "Dr. Ryan Hoffman", handle: "Greenfield Animal Hospital" },
            text: "Our associates picked it up immediately. No training, no resistance — it just fit into how we already work.",
          },
          {
            author: { name: "Dr. Claire Park", handle: "Willow Creek Veterinary Clinic" },
            text: "I leave on time. My staff leaves on time. That alone paid for it.",
          },
          {
            author: { name: "Dr. Daniel Moore", handle: "Harborview Veterinary Practice" },
            text: "It feels like it was built by someone who's actually done clinical work, not just another AI tool.",
          },
          {
            author: { name: "Dr. Michael Brooks", handle: "Redwood Animal Hospital" },
            text: "It remembers my patient's history better than I do on a busy day. That alone is huge.",
          },
        ]}
      />
      </LazyWhenVisible>

      {/* ========== 11.5 ROI CALCULATOR ========== */}
      <DesktopOnly>
        <LazyWhenVisible minHeight="400px">
          <ROICalculator />
        </LazyWhenVisible>
      </DesktopOnly>

      {/* ========== 12. PRICING ========== */}
      <section id="pricing" className="bg-white">
        <LazyWhenVisible minHeight="520px">
          <PricingSection />
        </LazyWhenVisible>
      </section>

      {/* ========== 13. FAQ ========== */}
      <section id="faq" className="py-8 md:py-12" style={{ background: "linear-gradient(180deg,#f8fafc,#fff)" }}>
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="inline-block px-4 py-1.5 rounded-full bg-[#1ce881]/10 border border-[#1ce881]/30 text-xs font-semibold text-[#1ce881] uppercase tracking-wider mb-4">
              FAQ
            </p>
            <h2 className="text-4xl font-extrabold text-[#101235] mb-3">Common questions from veterinarians</h2>
            <p className="text-lg text-[#475569]">Everything you need to know about whiskr.ai and Atlas AI</p>
          </div>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {HOME_FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white hover:border-[#1ce881]/30 hover:shadow-sm transition-all border-b-0"
              >
                <AccordionTrigger className="w-full px-7 py-6 hover:no-underline [&>svg]:text-[#1ce881]">
                  <span className="font-semibold text-[#101235] text-[17px] pr-4 text-left">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-7 pb-6">
                  <p className="text-[#475569] m-0 text-[15px]" style={{ lineHeight: 1.8 }}>
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ========== 14. FINAL CTA ========== */}
      <section
        className="relative py-8 md:py-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#101235,#0d1a2d)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(28,232,129,0.08),transparent 70%)" }}
        />
        <div className="relative max-w-[750px] mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-[#1ce881] mb-8"
            style={{ background: "rgba(28,232,129,0.1)", border: "1px solid rgba(28,232,129,0.2)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            Voice-First Clinical Intelligence
          </div>
          <h2 className="text-[clamp(36px,6vw,52px)] font-extrabold text-white mb-6" style={{ lineHeight: 1.2 }}>
            Document while you work,
            <br />
            not after you're done
          </h2>
          <p className="text-[19px] text-[#cbd5e1] mb-10 max-w-[650px] mx-auto" style={{ lineHeight: 1.7 }}>
            Speak naturally during exams. whiskr.ai captures everything, structures complete SOAP notes with clinical
            suggestions, and syncs to your EHR. All before you see your next patient.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <MotionButton
              label={TRIAL_CTA_LABEL}
              href={TRIAL_CTA_URL}
              size="lg"
              onClick={() => {
                fbCustomEvent("CTAClick", {
                  content_name: TRIAL_CTA_LABEL,
                  location: "final_cta",
                });
              }}
            />
            <MotionButton label={BOOK_DEMO_LABEL} href={BOOK_DEMO_URL} size="lg" />
            <MotionButton label="See How It Works" size="lg" onClick={() => setVideoModalOpen(true)} />
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-sm text-[#94a3b8]">
            {["30-day money-back guarantee", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <CheckIcon />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 15. FOOTER ========== */}
      <Footer />

      {/* Floating UX helpers */}
      <ScrollProgressBar />
      <ExitIntentPopover />

      {/* ========== MODALS ========== */}
      {videoModalOpen && (
        <div
          onClick={() => setVideoModalOpen(false)}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[900px] rounded-2xl overflow-hidden bg-[#101235] border border-[#334155]"
          >
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#334155]">
              <span className="text-white font-semibold">whiskr Demo</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="bg-transparent border-none cursor-pointer text-[#94a3b8] p-1"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-black relative" style={{ aspectRatio: "16/9" }}>
              <YouTubeEmbed
                videoId={YOUTUBE_DEMO_VIDEO_ID}
                title="whiskr Demo"
                autoplay
                muted={false}
                controls
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default IndexClient;
