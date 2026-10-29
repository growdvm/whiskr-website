"use client";

import { useEffect } from "react";

const INTERCOM_APP_ID =
  process.env.NEXT_PUBLIC_INTERCOM_APP_ID ?? "pocnc7zs";

const DEFER_MS = 10_000;

export function IntercomMessenger() {
  useEffect(() => {
    if (!INTERCOM_APP_ID) return;

    let loaded = false;

    const loadIntercom = async () => {
      if (loaded) return;
      loaded = true;
      const { default: Intercom } = await import("@intercom/messenger-js-sdk");
      Intercom({ app_id: INTERCOM_APP_ID });
    };

    const timeoutId = window.setTimeout(loadIntercom, DEFER_MS);

    const onFirstInteraction = () => {
      window.clearTimeout(timeoutId);
      void loadIntercom();
    };

    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("scroll", onFirstInteraction, opts);
    window.addEventListener("pointerdown", onFirstInteraction, opts);
    window.addEventListener("keydown", onFirstInteraction, opts);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  return null;
}
