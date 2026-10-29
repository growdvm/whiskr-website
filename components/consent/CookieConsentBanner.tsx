"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieConsentBanner() {
  const {
    hasChosen,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    closePreferences,
    consent,
    savePreferences,
  } = useConsent();

  const [draftAnalytics, setDraftAnalytics] = useState(consent.analytics);
  const [draftMarketing, setDraftMarketing] = useState(consent.marketing);

  useEffect(() => {
    if (preferencesOpen) {
      setDraftAnalytics(consent.analytics);
      setDraftMarketing(consent.marketing);
    }
  }, [preferencesOpen, consent.analytics, consent.marketing]);

  if (hasChosen && !preferencesOpen) return null;

  const showFirstVisitBanner = !hasChosen;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none md:left-auto md:right-0 md:max-w-[420px] md:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        className="pointer-events-auto w-full max-w-[720px] mx-auto md:mx-0 md:max-w-none rounded-2xl border border-[#e2e8f0] bg-white/98 shadow-[0_20px_50px_rgba(16,18,53,0.15)] p-5 md:p-6"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <p className="text-[15px] font-semibold text-[#101235] m-0 mb-2">
          {showFirstVisitBanner ? "We use cookies" : "Cookie preferences"}
        </p>
        <p className="text-sm text-[#64748b] m-0 mb-4 leading-relaxed">
          {showFirstVisitBanner ? (
            <>
              Essential cookies keep whiskr.ai running. With your permission, we also use analytics and marketing cookies
              to understand usage and measure ads. Read our{" "}
              <Link href="/privacy" className="text-[#059669] font-medium no-underline hover:underline">
                Privacy Policy
              </Link>
              . Manage choices anytime via <strong>Cookie settings</strong> in the footer.
            </>
          ) : (
            <>Choose which optional cookies we may use. Essential cookies are always on.</>
          )}
        </p>

        {preferencesOpen && (
          <div className="mb-4 space-y-3 rounded-xl border border-[#e2e8f0] bg-[#fafbfc] p-4">
            <label className="flex items-start gap-3 cursor-default opacity-80">
              <input type="checkbox" checked disabled className="mt-1 accent-[#1ce881]" />
              <span>
                <span className="block text-sm font-semibold text-[#101235]">Essential</span>
                <span className="block text-xs text-[#64748b] mt-0.5">Always on — required for the site.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 accent-[#1ce881]"
                checked={draftAnalytics}
                onChange={(e) => setDraftAnalytics(e.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-[#101235]">Analytics</span>
                <span className="block text-xs text-[#64748b] mt-0.5">Microsoft Clarity — how visitors use the site.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 accent-[#1ce881]"
                checked={draftMarketing}
                onChange={(e) => setDraftMarketing(e.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-[#101235]">Marketing</span>
                <span className="block text-xs text-[#64748b] mt-0.5">
                  Google Ads and Meta Pixel — ad measurement and retargeting.
                </span>
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {showFirstVisitBanner && !preferencesOpen ? (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className="px-5 py-2.5 rounded-full border-none cursor-pointer text-[#101235] font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#1ce881,#24ffc9)",
                  boxShadow: "0 4px 15px rgba(28,232,129,0.25)",
                }}
              >
                Allow all
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="px-5 py-2.5 rounded-full cursor-pointer bg-white border-2 border-[#e2e8f0] text-[#101235] font-semibold text-sm hover:border-[#1ce881] transition-colors"
              >
                Essential only
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => savePreferences({ analytics: draftAnalytics, marketing: draftMarketing })}
                className="px-5 py-2.5 rounded-full border-none cursor-pointer text-[#101235] font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#1ce881,#24ffc9)",
                  boxShadow: "0 4px 15px rgba(28,232,129,0.25)",
                }}
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={closePreferences}
                className="px-5 py-2.5 rounded-full cursor-pointer bg-white border-2 border-[#e2e8f0] text-[#101235] font-semibold text-sm hover:border-[#1ce881] transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
