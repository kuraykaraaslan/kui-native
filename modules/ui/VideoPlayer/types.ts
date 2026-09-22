// Public types for VideoPlayer, ported from KuiReact's
// modules/ui/VideoPlayer/types.ts (its Google Cast SDK type surface is
// web-only and not ported).

export type QualityOption = { label: string; value: string };
export type SubtitleTrack = { label: string; srclang?: string; src: string };
export type AudioTrackOption = { label: string; language?: string };

export type VideoSource = { src: string; type?: string };
export type SubtitleFontSize = "sm" | "md" | "lg" | "xl";
export type SettingsView = "main" | "quality" | "speed" | "subtitles" | "subtitle-size" | "language";

export type CastState = "unavailable" | "available" | "connecting" | "connected";

export type VideoPlayerProps = {
  /** A URL, a `{ src, type }` source, or a list of them (the first is played). */
  src: string | VideoSource | (string | VideoSource)[];
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  startMuted?: boolean;
  /** Quality options — switching is delegated to onQualityChange. */
  qualities?: QualityOption[];
  defaultQuality?: string;
  /** WebVTT subtitle tracks, rendered as a custom overlay (supports font size). */
  subtitles?: SubtitleTrack[];
  /** Audio language options — switching is delegated to onAudioTrackChange. */
  audioTracks?: AudioTrackOption[];
  onQualityChange?: (value: string) => void;
  onAudioTrackChange?: (index: number) => void;
  /** Controlled visibility of the controls overlay (disables auto-hide). */
  controlsVisible?: boolean;
  /** When false, controls stay visible while playing. Default: true. */
  autoHideControls?: boolean;
  onControlsVisibilityChange?: (visible: boolean) => void;
  /** Accepted for API parity; Google Cast is not available on RN, so no cast button renders. */
  enableCast?: boolean;
  onCastStateChange?: (state: CastState) => void;
  className?: string;
};
