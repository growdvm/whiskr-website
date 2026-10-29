"use client";

import { useEffect, useMemo, useState } from "react";

const WORDS = ["charting", "documenting", "typing"] as const;

export function HeroRotatingWord() {
  const words = useMemo(() => [...WORDS], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearTimeout(id);
  }, [index, words.length]);

  return (
    <span
      className="relative inline-flex overflow-hidden text-gradient-whiskr"
      style={{ height: "1.2em", verticalAlign: "baseline" }}
    >
      <span key={words[index]} className="text-gradient-whiskr inline-block whitespace-nowrap hero-rotating-word">
        {words[index]}
      </span>
    </span>
  );
}
