"use client";

import { useEffect, useState } from "react";

const items = [
  "Dr. Patel at Maple Vet generated a SOAP note in 4.2s",
  "Dr. Lee saved 11 minutes on a wellness exam",
  "Dr. Rodriguez completed 14 visits with zero overtime today",
  "Dr. Chen synced 8 notes to EzyVet this hour",
  "Dr. Park finished charting before her last appointment",
  "Dr. Brooks captured a bilingual exam in one take",
];

export function SocialProofTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full border-y border-[#e2e8f0] bg-white/60 backdrop-blur-sm">
      <div className="max-w-[1100px] mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-[13px] text-[#475569]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ce881] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1ce881]" />
        </span>
        <span className="font-semibold text-[#101235]">Just now</span>
        <span className="text-[#94a3b8]">—</span>
        <span key={idx} className="animate-fade-in truncate max-w-[70vw]">{items[idx]}</span>
      </div>
    </div>
  );
}
