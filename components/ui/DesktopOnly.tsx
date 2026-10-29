"use client";

import { useEffect, useState } from "react";

/** Renders children only on md+ viewports — avoids mounting heavy desktop UI on mobile. */
export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isDesktop) return null;
  return <>{children}</>;
}
