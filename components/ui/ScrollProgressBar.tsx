"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] hover:h-[4px] transition-[height] duration-200 pointer-events-auto bg-transparent"
    >
      <div
        className="h-full origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          backgroundImage: "linear-gradient(90deg,#1ce881,#24ffc9)",
          boxShadow: "0 0 12px rgba(28,232,129,0.6)",
        }}
      />
    </div>
  );
}
