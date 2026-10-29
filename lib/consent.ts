export const CONSENT_STORAGE_KEY = "whiskr_cookie_consent_v1";

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const CONSENT_DENIED: ConsentState = {
  analytics: false,
  marketing: false,
  updatedAt: "",
};

export function parseStoredConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
