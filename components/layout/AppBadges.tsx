"use client";

import { fbCustomEvent } from "@/lib/fbpixel";

export function AppBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="https://apps.apple.com/app/id6761505957"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        onClick={() => fbCustomEvent("CTAClick", { content_name: "App Store", location: "footer" })}
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="40" rx="6" fill="#000000" />
          <rect x="0.5" y="0.5" width="119" height="39" rx="5.5" stroke="#A6A6A6" fill="none" />
          <g fill="#FFFFFF">
            <path d="M24.769 20.3a4.949 4.949 0 0 1 2.356-4.151 5.066 5.066 0 0 0-3.99-2.158c-1.68-.176-3.308 1.005-4.164 1.005-.872 0-2.19-.988-3.608-.958a5.315 5.315 0 0 0-4.473 2.728c-1.934 3.348-.491 8.269 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.025 2.426-1.332 3.32-2.669a10.962 10.962 0 0 0 1.52-3.092 4.782 4.782 0 0 1-2.92-4.4zM22.037 12.21a4.872 4.872 0 0 0 1.115-3.49 4.957 4.957 0 0 0-3.208 1.66 4.636 4.636 0 0 0-1.144 3.36 4.1 4.1 0 0 0 3.237-1.53z" />
          </g>
          <text fill="#FFFFFF" xmlSpace="preserve" fontFamily="Arial, sans-serif">
            <tspan x="38" y="15" fontSize="7" letterSpacing="0.5">Download on the</tspan>
            <tspan x="38" y="28" fontSize="13" fontWeight="600">App Store</tspan>
          </text>
        </svg>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=ai.whiskr.app&hl=en_IN"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        onClick={() => fbCustomEvent("CTAClick", { content_name: "Play Store", location: "footer" })}
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <svg width="135" height="40" viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="135" height="40" rx="6" fill="#000000" />
          <rect x="0.5" y="0.5" width="134" height="39" rx="5.5" stroke="#A6A6A6" fill="none" />
          <image href="/assets/google-play-icon.png" x="10" y="7" width="26" height="26" />
          <text fill="#FFFFFF" xmlSpace="preserve" fontFamily="Arial, sans-serif">
            <tspan x="42" y="15" fontSize="7" letterSpacing="0.3">GET IT ON</tspan>
            <tspan x="42" y="28" fontSize="13" fontWeight="600">Google Play</tspan>
          </text>
        </svg>
      </a>
    </div>
  );
}
