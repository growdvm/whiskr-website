"use client";

import { cn } from "@/lib/utils";
import { getYouTubeEmbedSrc } from "@/lib/youtube";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  start?: number;
  className?: string;
  iframeClassName?: string;
  pointerEventsNone?: boolean;
};

export function YouTubeEmbed({
  videoId,
  title = "YouTube video",
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  start,
  className,
  iframeClassName,
  pointerEventsNone = false,
}: YouTubeEmbedProps) {
  if (!videoId) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#101235] text-[#94a3b8] text-sm text-center px-4",
          className,
        )}
      >
        Set <code className="text-[#1ce881]">NEXT_PUBLIC_YOUTUBE_DEMO_VIDEO_ID</code> in your env.
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <iframe
        src={getYouTubeEmbedSrc(videoId, { autoplay, muted, loop, controls, start })}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={cn(
          "absolute inset-0 w-full h-full border-0",
          pointerEventsNone && "pointer-events-none",
          iframeClassName,
        )}
      />
    </div>
  );
}
