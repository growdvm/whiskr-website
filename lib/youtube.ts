export const YOUTUBE_DEMO_VIDEO_ID = process.env.NEXT_PUBLIC_YOUTUBE_DEMO_VIDEO_ID ?? "";
export const YOUTUBE_HOW_IT_WORKS_VIDEO_ID =
  process.env.NEXT_PUBLIC_YOUTUBE_HOW_IT_WORKS_VIDEO_ID ?? "";

type EmbedOptions = {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  start?: number;
};

export function getYouTubeEmbedSrc(videoId: string, options: EmbedOptions = {}): string {
  const { autoplay = false, muted = true, loop = false, controls = true, start } = options;

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
  });

  if (loop) {
    params.set("loop", "1");
    params.set("playlist", videoId);
  }

  if (start !== undefined && start > 0) {
    params.set("start", String(Math.floor(start)));
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" = "hqdefault",
): string {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}
