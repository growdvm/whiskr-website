interface YTPlayerOptions {
  videoId?: string;
  host?: string;
  playerVars?: Record<string, string | number | undefined>;
  events?: {
    onReady?: (event: { target: YTPlayerInstance }) => void;
  };
}

interface YTPlayerInstance {
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (element: HTMLElement | string, options: YTPlayerOptions) => YTPlayerInstance;
}

interface Window {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
}
