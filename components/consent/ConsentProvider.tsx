"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_DENIED,
  CONSENT_STORAGE_KEY,
  parseStoredConsent,
  type ConsentState,
} from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type ConsentContextValue = {
  consent: ConsentState;
  hasChosen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (next: Pick<ConsentState, "analytics" | "marketing">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function persistConsent(next: ConsentState) {
  const withTimestamp: ConsentState = {
    ...next,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(withTimestamp));
  } catch {
    /* private mode / quota */
  }
  return withTimestamp;
}

function applyGoogleConsentUpdate(consent: ConsentState) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

function applyMetaConsent(consent: ConsentState) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("consent", consent.marketing ? "grant" : "revoke");
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(CONSENT_DENIED);
  const [hasChosen, setHasChosen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const commitConsent = useCallback((next: ConsentState) => {
    const stored = persistConsent(next);
    setConsentState(stored);
    setHasChosen(true);
    setPreferencesOpen(false);
    applyGoogleConsentUpdate(stored);
    applyMetaConsent(stored);
  }, []);

  useEffect(() => {
    const stored = parseStoredConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
    if (stored) {
      setConsentState(stored);
      setHasChosen(true);
      applyGoogleConsentUpdate(stored);
      applyMetaConsent(stored);
    }
    setHydrated(true);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasChosen: hydrated && hasChosen,
      acceptAll: () => commitConsent({ analytics: true, marketing: true, updatedAt: "" }),
      rejectNonEssential: () => commitConsent({ analytics: false, marketing: false, updatedAt: "" }),
      savePreferences: (next) => commitConsent({ ...next, updatedAt: "" }),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      preferencesOpen,
    }),
    [commitConsent, consent, hasChosen, hydrated, preferencesOpen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
