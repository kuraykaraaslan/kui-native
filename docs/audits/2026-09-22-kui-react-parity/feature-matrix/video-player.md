# Feature matrix — VideoPlayer

> KuiReact `modules/ui/VideoPlayer/` (19 files, 1487 LOC: `index.tsx`, `types.ts`, `format.ts`, `constants.ts`, `hooks/` useControlsVisibility, useVideoEvents, useSubtitleCues, useGoogleCast, useFullscreen, useKeyboardShortcuts, usePlayerActions, `parts/` ControlRow, CtrlBtn, ProgressBar, Overlays, Settings*; 0 tests, 3 showcase variants) ↔ KuiNative `modules/ui/VideoPlayer/` (added 2026-09-22 in `3d2d0f9`: `index.tsx` on `expo-video`, `types.ts`, `format.ts`, `constants.ts` and `hooks/useControlsVisibility` ported, `hooks/useVttCues`, `parts/Controls`; 10 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `src`, `poster`, `title`, `autoPlay`, `loop`, `startMuted`, `qualities`, `defaultQuality`, `subtitles`, `audioTracks`, `onQualityChange`, `onAudioTrackChange`, `controlsVisible`, `autoHideControls` (true), `onControlsVisibilityChange`, `enableCast`, `onCastStateChange`, `className` | ✓ | ✓ | Match |
| Types (`QualityOption`, `SubtitleTrack`, `AudioTrackOption`, `VideoPlayerProps`, …) | ✓ + Google Cast SDK types | same, without the Cast SDK surface; `formatTime`, `parseVtt`, `cueAt` also exported | Match |
| Playback | `<video>` with `<source>` list (the browser picks the first playable) | `expo-video` player (native controls off), first source played; `poster` shown until playback starts | Adapted |
| Controls overlay | rewind / play / forward, volume, time, settings, fullscreen, centre play and loading overlays, auto-hide (`useControlsVisibility`) | same buttons, overlays and auto-hide logic | Match |
| Seek bar | buffered range, click / drag to seek, hover time preview | buffered range, tap / drag to seek (adjustable, increment / decrement actions); no hover preview | Adapted (no hover on touch) |
| Volume | slider revealed on hover of the volume button | mute on tap, slider revealed by a long-press | Adapted |
| Settings panel | quality, speed, subtitles, subtitle size, audio language sub-menus (Turkish copy) | same menus and copy | Match |
| Subtitles | `<track>` WebVTT cues (`cuechange`) drawn as a custom overlay with font sizes | `.vtt` fetched (or decoded from `data:` URIs) and parsed (`useVttCues`), same overlay and sizes | Adapted (RN has no text tracks) |
| Tap on video | toggles playback | first tap reveals hidden controls, later taps toggle playback | Adapted |
| Fullscreen | Fullscreen API on the container | `VideoView` enter / exit fullscreen | Match (adapted) |
| Google Cast | Cast SDK button and casting overlay when the SDK is available | no cast button (as KuiReact without the SDK); `enableCast` / `onCastStateChange` accepted | N/A (web-only SDK) |
| Keyboard shortcuts (space / k, arrows, m, f, Escape) | ✓ | — | N/A (hardware-keyboard pattern) |
| Accessibility | container labelled "Video: {title}" / "Video player", labelled buttons, `aria-label="Seek"` | same labels, adjustable scrubbers with values, expanded state on the settings button, overlays hidden | Match (adapted) |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Full featured (kalite + altyazı + dil), Subtitle + Font Boyutu, Minimal (sadece oynatma hızı) | same titles and settings (subtitle demos use `data:` URIs where KuiReact builds Blob URLs) | Match |
