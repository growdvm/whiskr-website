"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type YouTubePlayerInstance = {
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
};

type YouTubePlayerProps = {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  onReady?: (player: YouTubePlayerInstance) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

let apiLoadingPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoadingPromise) return apiLoadingPromise;

  apiLoadingPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return apiLoadingPromise;
}

export function YouTubePlayer({
  videoId,
  className,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  onReady,
  onTimeUpdate,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const onReadyRef = useRef(onReady);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let cancelled = false;
    let timeUpdateInterval: ReturnType<typeof setInterval> | undefined;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      const player = new window.YT.Player(containerRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
          loop: loop ? 1 : 0,
          playlist: loop ? videoId : undefined,
          controls: controls ? 1 : 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            const instance = event.target as YouTubePlayerInstance;
            playerRef.current = instance;
            onReadyRef.current?.(instance);

            if (onTimeUpdateRef.current) {
              timeUpdateInterval = setInterval(() => {
                const currentTime = instance.getCurrentTime();
                if (typeof currentTime === "number") {
                  onTimeUpdateRef.current?.(currentTime);
                }
              }, 200);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (timeUpdateInterval) clearInterval(timeUpdateInterval);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId, autoplay, muted, loop, controls]);

  if (!videoId) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#101235] text-[#94a3b8] text-sm text-center px-4",
          className,
        )}
      >
        Set <code className="text-[#1ce881]">NEXT_PUBLIC_YOUTUBE_HOW_IT_WORKS_VIDEO_ID</code> in your env.
      </div>
    );
  }

  return <div ref={containerRef} className={cn("w-full h-full", className)} />;
}
