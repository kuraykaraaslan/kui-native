// VideoPlayer controls, ported from KuiReact's VideoPlayer/parts: CtrlBtn,
// Scrubber (the seek ProgressBar and the volume slider share it), ControlRow,
// the settings panel (SettingsRow / SettingsOption / SettingsSubMenu) and
// the overlays. KuiReact's Turkish copy is kept verbatim.

import type * as React from "react";
import { useId, useMemo, useRef, useState } from "react";
import { PanResponder, Platform, Pressable, View, type LayoutChangeEvent, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCompress,
  faExpand,
  faGear,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../../libs/theme";
import { cn } from "../../../../libs/utils/cn";

import { Spinner } from "../../Spinner";
import { Text } from "../../Text";
import { SPEEDS, SUBTITLE_SIZE_LABELS, SUBTITLE_SIZES } from "../constants";
import { formatTime } from "../format";
import type { AudioTrackOption, QualityOption, SettingsView, SubtitleFontSize, SubtitleTrack } from "../types";

// KuiReact's rem subtitle sizes at a 16px root.
export const SUBTITLE_SIZE_PX: Record<SubtitleFontSize, number> = { sm: 12.8, md: 16, lg: 20.8, xl: 26.4 };

export function CtrlBtn({ onPress, label, primary, active, expanded, children }: { onPress: () => void; label: string; primary?: boolean; active?: boolean; expanded?: boolean; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={expanded !== undefined ? { expanded } : undefined}
      hitSlop={4}
      className={cn("items-center justify-center rounded", primary ? "h-9 w-9" : "h-8 w-8", active && "opacity-100")}
    >
      {children}
    </Pressable>
  );
}

/** Tap / drag track (KuiReact: the seek bar and the range input). `onChange` receives 0..1. */
export function Scrubber({
  value,
  buffered,
  label,
  onChange,
  onScrub,
  testID,
  className,
}: {
  value: number;
  buffered?: number;
  label: string;
  onChange: (fraction: number) => void;
  onScrub?: (fraction: number | null) => void;
  testID?: string;
  className?: string;
}) {
  const t = useThemeTokens();
  const [width, setWidth] = useState(0);
  const latest = useRef({ width, onChange, onScrub });
  latest.current = { width, onChange, onScrub };
  const pan = useMemo(() => {
    const frac = (x: number) => (latest.current.width ? Math.min(1, Math.max(0, x / latest.current.width)) : 0);
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => latest.current.onScrub?.(frac(e.nativeEvent.locationX)),
      onPanResponderMove: (e) => latest.current.onScrub?.(frac(e.nativeEvent.locationX)),
      onPanResponderRelease: (e) => {
        latest.current.onChange(frac(e.nativeEvent.locationX));
        latest.current.onScrub?.(null);
      },
    });
  }, []);
  const pct = Math.round(value * 100);
  return (
    <View
      {...pan.panHandlers}
      testID={testID}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) => onChange(Math.min(1, Math.max(0, value + (e.nativeEvent.actionName === "increment" ? 0.05 : -0.05))))}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      // -my-2 keeps the touch padding out of the layout (KuiReact's bar is a bare h-1.5).
      className={cn("-my-2 justify-center py-2", className)}
    >
      <View className="h-1.5 overflow-hidden rounded-full bg-white/20">
        {buffered !== undefined ? <View className="absolute inset-y-0 left-0 rounded-full bg-white/25" style={{ width: `${buffered * 100}%` }} /> : null}
        <View className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, backgroundColor: t.primary }} />
      </View>
    </View>
  );
}

export function ControlRow({
  playing,
  muted,
  volume,
  currentTime,
  duration,
  isFullscreen,
  showSettings,
  onPlay,
  onSeekBy,
  onToggleMute,
  onVolumeChange,
  onToggleSettings,
  onToggleFullscreen,
}: {
  playing: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  showSettings: boolean;
  onPlay: () => void;
  onSeekBy: (delta: number) => void;
  onToggleMute: () => void;
  onVolumeChange: (v: number) => void;
  onToggleSettings: () => void;
  onToggleFullscreen: () => void;
}) {
  const t = useThemeTokens();
  // KuiReact reveals the volume slider on hover; on touch a long-press on the volume button does.
  const [showVolume, setShowVolume] = useState(false);
  const volumeIcon = muted || volume === 0 ? faVolumeOff : volume < 0.5 ? faVolumeLow : faVolumeHigh;
  const dim = "rgba(255,255,255,0.8)";
  return (
    <View className="flex-row items-center gap-1">
      <CtrlBtn onPress={() => onSeekBy(-10)} label="Rewind 10 seconds">
        <FontAwesomeIcon icon={faRotateLeft} size={14} color={dim} />
      </CtrlBtn>
      <CtrlBtn onPress={onPlay} label={playing ? "Pause" : "Play"} primary>
        <FontAwesomeIcon icon={playing ? faPause : faPlay} size={16} color="#ffffff" />
      </CtrlBtn>
      <CtrlBtn onPress={() => onSeekBy(10)} label="Forward 10 seconds">
        <FontAwesomeIcon icon={faRotateRight} size={14} color={dim} />
      </CtrlBtn>
      <View className="flex-row items-center gap-1.5">
        <Pressable
          onPress={onToggleMute}
          onLongPress={() => setShowVolume((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={muted ? "Unmute" : "Mute"}
          accessibilityHint="Long-press for the volume slider"
          className="h-8 w-8 items-center justify-center rounded"
        >
          <FontAwesomeIcon icon={volumeIcon} size={14} color={dim} />
        </Pressable>
        {/* KuiReact keeps the collapsed (w-0) slider wrapper in the row, so its gap-1.5 still applies. */}
        {showVolume ? <Scrubber testID="volume-slider" label="Volume" value={muted ? 0 : volume} onChange={onVolumeChange} className="w-20" /> : <View className="w-0" />}
      </View>
      <Text className="flex-1 pl-1 text-xs text-white/70" style={{ fontVariant: ["tabular-nums"] }}>
        {formatTime(currentTime)}
        <Text className="text-xs text-white/30"> / </Text>
        {formatTime(duration)}
      </Text>
      <CtrlBtn onPress={onToggleSettings} label="Settings" expanded={showSettings} active={showSettings}>
        <View style={{ transform: [{ rotate: showSettings ? "30deg" : "0deg" }] }}>
          <FontAwesomeIcon icon={faGear} size={14} color={showSettings ? t.primary : dim} />
        </View>
      </CtrlBtn>
      <CtrlBtn onPress={onToggleFullscreen} label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} size={14} color={dim} />
      </CtrlBtn>
    </View>
  );
}

function SettingsRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}, ${value}`} onPress={onPress} className="w-full flex-row items-center justify-between px-4 py-2.5 active:bg-white/10">
      <Text className="text-sm text-white/85">{label}</Text>
      <View className="flex-row items-center gap-1.5">
        <Text className="text-xs text-white/45">{value}</Text>
        <FontAwesomeIcon icon={faChevronRight} size={10} color="rgba(255,255,255,0.45)" />
      </View>
    </Pressable>
  );
}

function SettingsOption({ label, sublabel, selected, onPress }: { label: string; sublabel?: string; selected: boolean; onPress: () => void }) {
  const t = useThemeTokens();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected }} onPress={onPress} className="w-full flex-row items-center justify-between px-4 py-2 active:bg-white/10">
      <View className="items-start gap-0.5">
        <Text className={cn("text-sm", selected ? "font-semibold text-primary" : "text-white/80")}>{label}</Text>
        {sublabel ? <Text className="text-xs text-white/35">{sublabel}</Text> : null}
      </View>
      {selected ? <FontAwesomeIcon icon={faCheck} size={12} color={t.primary} /> : null}
    </Pressable>
  );
}

function SettingsSubMenu({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Back, ${title}`} onPress={onBack} className="w-full flex-row items-center gap-2.5 border-b border-white/10 px-3 py-2.5 active:bg-white/5">
        <FontAwesomeIcon icon={faChevronLeft} size={12} color="rgba(255,255,255,0.5)" />
        <Text className="text-sm font-semibold text-white">{title}</Text>
      </Pressable>
      <View className="py-1">{children}</View>
    </View>
  );
}

export function SettingsPanel({
  view,
  onChangeView,
  qualities,
  subtitles,
  audioTracks,
  selectedQuality,
  selectedSubtitle,
  selectedAudioTrack,
  speed,
  subtitleFontSize,
  applyQuality,
  applySpeed,
  applySubtitle,
  applySubtitleSize,
  applyAudioTrack,
}: {
  view: SettingsView;
  onChangeView: (v: SettingsView) => void;
  qualities?: QualityOption[];
  subtitles?: SubtitleTrack[];
  audioTracks?: AudioTrackOption[];
  selectedQuality: string;
  selectedSubtitle: number | null;
  selectedAudioTrack: number;
  speed: number;
  subtitleFontSize: SubtitleFontSize;
  applyQuality: (v: string) => void;
  applySpeed: (s: number) => void;
  applySubtitle: (i: number | null) => void;
  applySubtitleSize: (s: SubtitleFontSize) => void;
  applyAudioTrack: (i: number) => void;
}) {
  const currentQuality = qualities?.find((q) => q.value === selectedQuality)?.label ?? "Auto";
  const currentSubtitle = selectedSubtitle !== null ? subtitles?.[selectedSubtitle]?.label ?? "Kapalı" : "Kapalı";
  const currentAudio = audioTracks?.[selectedAudioTrack]?.label ?? "";
  return (
    <View testID="video-settings" className="absolute bottom-14 right-4 z-20 w-60 overflow-hidden rounded-xl border border-white/10 bg-black/90">
      {view === "main" ? (
        <>
          <View className="flex-row items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <FontAwesomeIcon icon={faGear} size={12} color="rgba(255,255,255,0.5)" />
            <Text className="text-xs font-semibold uppercase tracking-wider text-white/70">Ayarlar</Text>
          </View>
          <View className="py-1">
            {qualities && qualities.length > 0 ? <SettingsRow label="Kalite" value={currentQuality} onPress={() => onChangeView("quality")} /> : null}
            <SettingsRow label="Oynatma Hızı" value={speed === 1 ? "Normal" : `${speed}×`} onPress={() => onChangeView("speed")} />
            {subtitles && subtitles.length > 0 ? (
              <>
                <SettingsRow label="Altyazı" value={currentSubtitle} onPress={() => onChangeView("subtitles")} />
                <SettingsRow label="Altyazı Boyutu" value={SUBTITLE_SIZE_LABELS[subtitleFontSize]} onPress={() => onChangeView("subtitle-size")} />
              </>
            ) : null}
            {audioTracks && audioTracks.length > 1 ? <SettingsRow label="Ses Dili" value={currentAudio} onPress={() => onChangeView("language")} /> : null}
          </View>
        </>
      ) : null}
      {view === "quality" && qualities ? (
        <SettingsSubMenu title="Kalite" onBack={() => onChangeView("main")}>
          {qualities.map((q) => (
            <SettingsOption key={q.value} label={q.label} selected={selectedQuality === q.value} onPress={() => applyQuality(q.value)} />
          ))}
        </SettingsSubMenu>
      ) : null}
      {view === "speed" ? (
        <SettingsSubMenu title="Oynatma Hızı" onBack={() => onChangeView("main")}>
          {SPEEDS.map((s) => (
            <SettingsOption key={s} label={s === 1 ? "1× (Normal)" : `${s}×`} selected={speed === s} onPress={() => applySpeed(s)} />
          ))}
        </SettingsSubMenu>
      ) : null}
      {view === "subtitles" && subtitles ? (
        <SettingsSubMenu title="Altyazı" onBack={() => onChangeView("main")}>
          <SettingsOption label="Kapalı" selected={selectedSubtitle === null} onPress={() => applySubtitle(null)} />
          {subtitles.map((sub, i) => (
            <SettingsOption key={i} label={sub.label} selected={selectedSubtitle === i} onPress={() => applySubtitle(i)} />
          ))}
        </SettingsSubMenu>
      ) : null}
      {view === "subtitle-size" ? (
        <SettingsSubMenu title="Altyazı Boyutu" onBack={() => onChangeView("main")}>
          {(Object.entries(SUBTITLE_SIZE_LABELS) as [SubtitleFontSize, string][]).map(([key, label]) => (
            <SettingsOption key={key} label={label} sublabel={SUBTITLE_SIZES[key]} selected={subtitleFontSize === key} onPress={() => applySubtitleSize(key)} />
          ))}
        </SettingsSubMenu>
      ) : null}
      {view === "language" && audioTracks ? (
        <SettingsSubMenu title="Ses Dili" onBack={() => onChangeView("main")}>
          {audioTracks.map((track, i) => (
            <SettingsOption key={i} label={track.label} sublabel={track.language} selected={selectedAudioTrack === i} onPress={() => applyAudioTrack(i)} />
          ))}
        </SettingsSubMenu>
      ) : null}
    </View>
  );
}

/** KuiReact: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 30%, transparent 60%) behind the controls. */
export function ControlsScrim() {
  const id = `kui-video-scrim-${useId().replace(/:/g, "")}`;
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <Svg width="100%" height="100%" pointerEvents="none">
        <Defs>
          <LinearGradient id={id} x1="0" y1="1" x2="0" y2="0">
            <Stop offset={0} stopColor="#000000" stopOpacity={0.85} />
            <Stop offset={0.3} stopColor="#000000" stopOpacity={0.3} />
            <Stop offset={0.6} stopColor="#000000" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

export function LoadingOverlay() {
  return (
    <View testID="video-loading" pointerEvents="none" className="absolute inset-0 items-center justify-center bg-black/20">
      <Spinner size="lg" />
    </View>
  );
}

// KuiReact: backdrop-blur-sm (Tailwind v4: 8px). react-native-web passes backdropFilter through;
// native has no backdrop filter.
const PLAY_BACKDROP = Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as unknown as ViewStyle) : undefined;

export function CenterPlayOverlay({ playing }: { playing: boolean }) {
  if (playing) return null;
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" className="absolute inset-0 items-center justify-center">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-black/50 shadow-2xl" style={PLAY_BACKDROP}>
        {/* KuiReact: ring-2 ring-white/20 — drawn outside the 80px circle, like a CSS ring. */}
        <View className="absolute -inset-0.5 rounded-full border-2 border-white/20" />
        <FontAwesomeIcon icon={faPlay} size={24} color="#ffffff" style={{ marginLeft: 4 }} />
      </View>
    </View>
  );
}

export function SubtitleOverlay({ cueText, effectiveControls, subtitleFontSize }: { cueText: string; effectiveControls: boolean; subtitleFontSize: SubtitleFontSize }) {
  return (
    <View pointerEvents="none" className={cn("absolute left-0 right-0 z-10 items-center px-6", effectiveControls ? "bottom-[4.5rem]" : "bottom-4")}>
      <Text testID="video-subtitle" className="max-w-[85%] rounded-md bg-black/80 px-3 py-1 text-center font-medium text-white" style={{ fontSize: SUBTITLE_SIZE_PX[subtitleFontSize], lineHeight: SUBTITLE_SIZE_PX[subtitleFontSize] * 1.375 }}>
        {cueText}
      </Text>
    </View>
  );
}
