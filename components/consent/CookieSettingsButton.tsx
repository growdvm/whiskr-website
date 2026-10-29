"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const { openPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className ?? "text-sm text-[#cbd5e1] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-left"}
    >
      Cookie settings
    </button>
  );
}
