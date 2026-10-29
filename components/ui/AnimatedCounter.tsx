"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000, decimals = 0, className }: AnimatedCounterProps) {
  // Initialize with the real value so server-rendered HTML (and no-JS/crawlers) show it.
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Before first paint on the client, reset to 0 so the count-up animation can run
  // without a visible flash of the final number.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCount(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString("en-US");

  return (
    <span ref={ref} className={className} style={{ fontFamily: 'inherit', fontWeight: 'inherit', fontSize: 'inherit' }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
