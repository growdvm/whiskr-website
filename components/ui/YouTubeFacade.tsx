"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

type YouTubeFacadeProps = {
  videoId: string;
  /** Self-hosted poster URL; avoids i.ytimg.com when set */
  posterSrc?: string;
  title?: string;
  className?: string;
  contentClassName?: string;
  /** Load iframe inline on click (default: only show poster; use onActivate for modal etc.) */
  loadInlineOnClick?: boolean;
  onActivate?: () => void;
  embedAutoplay?: boolean;
  embedMuted?: boolean;
  embedLoop?: boolean;
  embedControls?: boolean;
};

export function YouTubeFacade({
  videoId,
  posterSrc,
  title = "Play video",
  className,
  contentClassName,
  loadInlineOnClick = false,
  onActivate,
  embedAutoplay = true,
  embedMuted = true,
  embedLoop = false,
  embedControls = true,
}: YouTubeFacadeProps) {
  const [activated, setActivated] = useState(false);

  if (!videoId) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#101235] text-[#94a3b8] text-sm text-center px-4",
          className,
        )}
      >
        Set YouTube video ID in env.
      </div>
    );
  }

  if (loadInlineOnClick && activated) {
    return (
      <YouTubeEmbed
        videoId={videoId}
        title={title}
        autoplay={embedAutoplay}
        muted={embedMuted}
        loop={embedLoop}
        controls={embedControls}
        className={cn("relative w-full h-full", className)}
      />
    );
  }

  const handleActivate = () => {
    if (loadInlineOnClick) {
      setActivated(true);
    }
    onActivate?.();
  };

  return (
    <button
      type="button"
      onClick={handleActivate}
      className={cn(
        "relative w-full h-full border-0 p-0 cursor-pointer group bg-[#101235]",
        className,
      )}
      aria-label={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc ?? getYouTubeThumbnailUrl(videoId)}
        alt=""
        width={1280}
        height={720}
        className={cn("absolute inset-0 w-full h-full object-cover", contentClassName)}
        loading="lazy"
        decoding="async"
      />
      <span className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
      <span
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
          style={{ background: "rgba(28,232,129,0.95)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#101235">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
