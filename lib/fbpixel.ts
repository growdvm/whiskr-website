declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const fbEvent = (
  name: string,
  params?: Record<string, unknown>,
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, params);
  }
};

export const fbCustomEvent = (
  name: string,
  params?: Record<string, unknown>,
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, params);
  }
};
