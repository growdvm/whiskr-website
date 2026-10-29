import type { Metadata } from "next";
import { BookDemoCalendar } from "@/components/home/BookDemoCalendar";
import { Footer } from "@/components/layout/Footer";
import { WhiskrLogo } from "@/components/ui/WhiskrLogo";
import { TRIAL_CTA_LABEL, TRIAL_CTA_URL } from "@/lib/cta";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Schedule a personalized whiskr.ai demo. See how our AI vet scribe builds complete SOAP notes, supports 17+ languages, and syncs to your PIMS.",
  alternates: { canonical: `${SITE_URL}/book-a-free-demo` },
};

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans text-[#1e293b]">
      <header className="border-b border-[#e2e8f0] bg-white/95 backdrop-blur-[20px]">
        <div className="max-w-[1200px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <WhiskrLogo />
          <div className="flex items-center gap-4">
            <a
              href="https://app.whiskr.ai/login"
              className="text-[15px] font-medium text-[#101235] hover:text-[#1ce881] transition-colors hidden sm:inline no-underline"
            >
              Log in
            </a>
            <a
              href={TRIAL_CTA_URL}
              className="px-7 py-3 rounded-full border-none cursor-pointer text-[#101235] font-semibold text-sm transition-all hover:-translate-y-0.5 no-underline"
              style={{
                background: "linear-gradient(135deg,#1ce881,#24ffc9)",
                boxShadow: "0 4px 15px rgba(28,232,129,0.3)",
              }}
            >
              {TRIAL_CTA_LABEL}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10 max-w-[720px] mx-auto">
            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold text-[#101235] mb-4 tracking-tight">
              Book a free demo
            </h1>
            <p className="text-lg text-[#475569] m-0" style={{ lineHeight: 1.7 }}>
              Pick a time that works for you. We&apos;ll walk you through whiskr.ai and answer any questions about your
              clinic&apos;s workflow.
            </p>
          </div>
          <BookDemoCalendar />
        </div>
      </main>

      <Footer />
    </div>
  );
}
