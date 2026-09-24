// VideoPlayer — ported from KuiReact's modules/ui/VideoPlayer: a custom
// control overlay (rewind / play / forward, volume, time, settings,
// fullscreen), seek bar with buffered range, a settings panel (quality,
// speed, subtitles, subtitle size, audio language), WebVTT subtitle overlay
// and auto-hiding controls (useControlsVisibility, KuiReact's).
//
// RN adaptations: playback uses expo-video (native controls off, KuiReact's
// overlay on top; works on web too). Subtitles are fetched and parsed here
// (useVttCues) since RN has no <track> element. Google Cast and keyboard
// shortcuts are web-only in KuiReact and not ported — no cast button
// renders, as when KuiReact's Cast SDK is unavailable. The first tap on the
// video reveals hidden controls; later taps play / pause.

import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import { cn } from "../../../libs/utils/cn";

import { Text } from "../Text";
import { formatTime } from "./format";
import { useControlsVisibility } from "./hooks/useControlsVisibility";
import { useVttCues } from "./hooks/useVttCues";
import { CenterPlayOverlay, ControlRow, ControlsScrim, LoadingOverlay, Scrubber, SettingsPanel, SubtitleOverlay } from "./parts/Controls";
import type { SettingsView, SubtitleFontSize, VideoPlayerProps } from "./types";

export type { QualityOption, SubtitleTrack, AudioTrackOption, VideoPlayerProps, VideoSource, SubtitleFontSize, CastState } from "./types";
export { parseVtt, cueAt } from "./hooks/useVttCues";
export { formatTime } from "./format";

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  startMuted = false,
  qualities,
  defaultQuality,
  subtitles,
  audioTracks,
  onQualityChange,
  onAudioTrackChange,
  controlsVisible,
  autoHideControls = true,
  onControlsVisibilityChange,
  className,
}: VideoPlayerProps) {
  const first = Array.isArray(src) ? src[0] : src;
  const uri = typeof first === "string" ? first : first?.src;

  const player = useVideoPlayer(uri ?? null, (p) => {
    p.loop = loop;
    p.muted = startMuted;
    p.timeUpdateEventInterval = 0.25;
    if (autoPlay) p.play();
  });
  const viewRef = useRef<VideoView>(null);

  const { isPlaying: playing } = useEvent(player, "playingChange", { isPlaying: player.playing });
  const { status } = useEvent(player, "statusChange", { status: player.status });
  const time = useEvent(player, "timeUpdate", { currentTime: 0, bufferedPosition: 0, currentLiveTimestamp: null, currentOffsetFromLive: null });
  const currentTime = time?.currentTime ?? 0;
  const duration = player.duration || 0;

  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(startMuted);
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrub, setScrub] = useState<number | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>(defaultQuality ?? qualities?.[0]?.value ?? "");
  const [selectedSubtitle, setSelectedSubtitle] = useState<number | null>(null);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState(0);
  const [subtitleFontSize, setSubtitleFontSize] = useState<SubtitleFontSize>("md");
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>("main");

  const { effectiveControls, scheduleHide, resetHideTimer } = useControlsVisibility({
    controlsVisible,
    autoHideControls,
    isCasting: false,
    playing,
    onChange: onControlsVisibilityChange,
  });
  useEffect(() => {
    scheduleHide(playing);
  }, [playing, scheduleHide]);

  const cueText = useVttCues(subtitles, selectedSubtitle, currentTime);
  const loading = status === "loading";

  const togglePlay = useCallback(() => {
    if (player.playing) player.pause();
    else player.play();
  }, [player]);
  const seekBy = useCallback((delta: number) => player.seekBy(delta), [player]);
  const toggleMute = useCallback(() => {
    player.muted = !player.muted;
    setMuted(player.muted);
  }, [player]);
  const handleVolumeChange = useCallback(
    (v: number) => {
      player.volume = v;
      player.muted = v === 0;
      setVolume(v);
      setMuted(v === 0);
    },
    [player],
  );
  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) viewRef.current?.exitFullscreen();
    else viewRef.current?.enterFullscreen();
  }, [isFullscreen]);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setSettingsView("main");
  }, []);
  const applySpeed = (s: number) => {
    player.playbackRate = s;
    setSpeed(s);
    closeSettings();
  };
  const applyQuality = (value: string) => {
    setSelectedQuality(value);
    onQualityChange?.(value);
    closeSettings();
  };
  const applySubtitle = (index: number | null) => {
    setSelectedSubtitle(index);
    closeSettings();
  };
  const applyAudioTrack = (index: number) => {
    setSelectedAudioTrack(index);
    onAudioTrackChange?.(index);
    closeSettings();
  };

  const progress = duration > 0 ? currentTime / duration : 0;
  const buffered = duration > 0 ? Math.min(1, (time?.bufferedPosition ?? 0) / duration) : 0;

  return (
    <View accessibilityLabel={title ? `Video: ${title}` : "Video player"} className={cn("relative aspect-video min-h-[10rem] overflow-hidden rounded-xl bg-black", className)}>
      <VideoView
        ref={viewRef}
        testID="video-view"
        player={player}
        nativeControls={false}
        contentFit="contain"
        style={{ width: "100%", height: "100%" }}
        onFullscreenEnter={() => setIsFullscreen(true)}
        onFullscreenExit={() => setIsFullscreen(false)}
      />
      {/* HTML <video poster>: shown until playback first starts (expo-video has no poster). */}
      {poster && !playing && currentTime === 0 ? <Image testID="video-poster" source={{ uri: poster }} resizeMode="contain" className="absolute inset-0" style={{ width: "100%", height: "100%" }} /> : null}
      {loading ? <LoadingOverlay /> : <CenterPlayOverlay playing={playing} />}
      {cueText ? <SubtitleOverlay cueText={cueText} effectiveControls={effectiveControls} subtitleFontSize={subtitleFontSize} /> : null}

      {/* Tap target over the video: first reveals hidden controls, then toggles playback. */}
      <Pressable
        testID="video-surface"
        accessibilityRole="button"
        accessibilityLabel={playing ? "Pause" : "Play"}
        onPress={() => {
          if (!effectiveControls) resetHideTimer();
          else {
            togglePlay();
            resetHideTimer();
          }
        }}
        className="absolute inset-0"
      />

      {effectiveControls ? (
        <View pointerEvents="box-none" className="absolute inset-0 z-20 justify-end">
          <ControlsScrim />
          {showSettings ? (
            <SettingsPanel
              view={settingsView}
              onChangeView={setSettingsView}
              qualities={qualities}
              subtitles={subtitles}
              audioTracks={audioTracks}
              selectedQuality={selectedQuality}
              selectedSubtitle={selectedSubtitle}
              selectedAudioTrack={selectedAudioTrack}
              speed={speed}
              subtitleFontSize={subtitleFontSize}
              applyQuality={applyQuality}
              applySpeed={applySpeed}
              applySubtitle={applySubtitle}
              applySubtitleSize={(s) => {
                setSubtitleFontSize(s);
                setSettingsView("main");
              }}
              applyAudioTrack={applyAudioTrack}
            />
          ) : null}
          <View className="gap-2.5 px-4 pb-3 pt-6">
            {title ? (
              <Text numberOfLines={1} className="text-sm font-medium leading-tight text-white/90">
                {title}
              </Text>
            ) : null}
            <View>
              {scrub !== null ? (
                <Text className="absolute -top-8 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white" style={{ left: `${scrub * 100}%`, transform: [{ translateX: -20 }] }}>
                  {formatTime(scrub * duration)}
                </Text>
              ) : null}
              <Scrubber
                testID="video-seek"
                label="Seek"
                value={scrub ?? progress}
                buffered={buffered}
                onScrub={setScrub}
                onChange={(f) => {
                  player.currentTime = f * duration;
                  resetHideTimer();
                }}
              />
            </View>
            <ControlRow
              playing={playing}
              muted={muted}
              volume={volume}
              currentTime={currentTime}
              duration={duration}
              isFullscreen={isFullscreen}
              showSettings={showSettings}
              onPlay={togglePlay}
              onSeekBy={seekBy}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
              onToggleSettings={() => {
                setShowSettings((v) => !v);
                setSettingsView("main");
              }}
              onToggleFullscreen={toggleFullscreen}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
