"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import { CheckCheck, ShieldCheck, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "motion/react";
import { useRef } from "react";
import { fbEvent } from "@/lib/fbpixel";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";


export default function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);
  

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const timelineVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const features = [
    "Unlimited SOAP, wellness & procedure notes",
    "Atlas AI clinical suggestions",
    "Diagnostic analysis",
    "Multi-language support",
    "Speaker detection",
    "Custom templates",
    "One-click PIMS integration",
    "Priority support",
    "Medication summary",
  ];

  return (
    <div
      ref={pricingRef}
      className="relative w-full overflow-hidden py-8 md:py-12"
    >
      {/* Purple gradient background at top */}
      <div
        className="absolute inset-x-0 top-0 h-[400px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,18,53,0.06) 0%, rgba(16,18,53,0.02) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <TimelineContent animationNum={0}>
          <div className="flex flex-col items-center text-center mb-12">
            <p className="inline-block px-4 py-1.5 rounded-full bg-[#1ce881]/10 border border-[#1ce881]/30 text-xs font-semibold text-[#1ce881] uppercase tracking-wider mb-4">
              Pricing
            </p>

            <div className="mb-4">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.04}
                containerClassName="text-4xl md:text-5xl font-extrabold text-[#101235] justify-center"
                elementLevelClassName="font-extrabold"
              >
                Simple, transparent pricing
              </VerticalCutReveal>
            </div>

            <motion.p
              custom={1}
              initial="hidden"
              whileInView="visible"
              variants={revealVariants}
              viewport={{ once: true }}
              className="text-lg text-[#475569] max-w-lg"
            >
              One plan. Everything included. 30-day money-back guarantee.
            </motion.p>
          </div>
        </TimelineContent>

        {/* Two-column layout */}
        <TimelineContent animationNum={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Column — Features */}
            <div className="space-y-5">
              <motion.h3
                custom={0}
                initial="hidden"
                whileInView="visible"
                variants={timelineVariants}
                viewport={{ once: true }}
                className="text-[15px] font-bold uppercase tracking-wider text-[#1ce881]"
              >
                What's inside
              </motion.h3>

              <div className="space-y-1">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    custom={index + 1}
                    initial="hidden"
                    whileInView="visible"
                    variants={timelineVariants}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 py-1.5"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[#1ce881]/10">
                      <CheckCheck className="w-3.5 h-3.5 text-[#1ce881]" />
                    </div>
                    <span className="text-[15px] text-[#101235]">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column — Pricing */}
            <div id="billing" className="relative rounded-2xl scroll-mt-24">
              <GlowingEffect spread={40} proximity={200} inactiveZone={0.01} borderWidth={3} blur={8} disabled={false} />
              <div className="relative rounded-2xl border border-[#e2e8f0] bg-white p-8 space-y-6">
                <div className="space-y-1">
                  <p className="text-[15px] font-bold uppercase tracking-wider text-[#1ce881]">
                    Billing period
                  </p>
                  <p className="text-sm text-[#475569]">
                    Launch pricing saves you 60%
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-[42px] font-extrabold text-[#101235]">
                    $19.99
                  </span>
                  <span className="text-base text-[#475569]">/2 weeks</span>
                  <span className="text-lg text-[#475569] line-through decoration-[#475569]/50 decoration-2 ml-1">
                    $97/mo
                  </span>
                </div>

                <a
                  href={TRIAL_CTA_URL}
                  onClick={() =>
                    fbEvent("Lead", {
                      content_name: TRIAL_CTA_LABEL,
                      location: "pricing",
                    })
                  }
                  className="w-full max-w-xs py-4 rounded-xl border-none cursor-pointer font-semibold text-[15px] transition-all hover:-translate-y-0.5 text-[#101235] flex items-center justify-center gap-2 no-underline"
                  style={{
                    background: "linear-gradient(135deg, #1ce881, #24ffc9)",
                    boxShadow: "0 4px 15px rgba(28,232,129,0.3)",
                  }}
                >
                  <Zap className="w-4 h-4" />
                  {TRIAL_CTA_LABEL}
                </a>

                <div className="w-full max-w-xs rounded-xl border border-[#1ce881]/20 bg-[#1ce881]/5 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#1ce881] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#101235]">30-Day Money-Back Guarantee</span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Try whiskr.ai completely risk-free. If you're not saving hours every week, we'll refund every penny with no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TimelineContent>
      </div>
    </div>
  );
}
