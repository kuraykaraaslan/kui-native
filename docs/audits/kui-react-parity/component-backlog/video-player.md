# VideoPlayer

> Backlog item · KuiReact id `video-player` · layer `ui` · **Media** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Custom HTML5 video player. Quality, subtitle, audio track, and playback rate selection; custom WebVTT subtitle overlay; auto-hiding controls; programmatic API. Keyboard shortcuts: Space/K=play, ←→=±10s, ↑↓=volume, M=mute, F=fullscreen.

**Why it matters for KuiNative:** Custom HTML5 player (1.5k LOC).

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/VideoPlayer/index.tsx` (19 files, 1487 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `beta` · since 2025-04 |
| Showcase variants | Full featured (kalite + altyazı + dil), Subtitle + Font Boyutu, Minimal (sadece oynatma hızı) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/VideoPlayer/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `src` | `string \| VideoSource \| (string \| VideoSource)[]` | **yes** | — |  | same |
| `poster` | `string` | no | — |  | same |
| `title` | `string` | no | — |  | same |
| `autoPlay` | `boolean` | no | `false` |  | same |
| `loop` | `boolean` | no | `false` |  | same |
| `startMuted` | `boolean` | no | `false` |  | same |
| `qualities` | `QualityOption[]` | no | — |  | same |
| `defaultQuality` | `string` | no | — |  | same |
| `subtitles` | `SubtitleTrack[]` | no | — |  | same |
| `audioTracks` | `AudioTrackOption[]` | no | — |  | same |
| `onQualityChange` | `(value: string) => void` | no | — |  | same |
| `onAudioTrackChange` | `(index: number) => void` | no | — |  | same |
| `controlsVisible` | `boolean` | no | — |  | same |
| `autoHideControls` | `boolean` | no | `true` |  | same |
| `onControlsVisibilityChange` | `(visible: boolean) => void` | no | — |  | same |
| `enableCast` | `boolean` | no | `true` |  | same |
| `onCastStateChange` | `(state: CastState) => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Full featured (kalite + altyazı + dil)

```tsx
<VideoPlayer
  src="video.mp4"
  poster="poster.jpg"
  title="Video Title"
  qualities={[
    { label: '1080p HD', value: '1080' },
    { label: '720p',     value: '720'  },
    { label: 'Auto',     value: 'auto' },
  ]}
  subtitles={[
    { label: 'English', srclang: 'en', src: 'en.vtt' },
    { label: 'Türkçe',  srclang: 'tr', src: 'tr.vtt' },
  ]}
  audioTracks={[
// …
```

### Subtitle + Font Boyutu

```tsx
<VideoPlayer
  src="video.mp4"
  poster="poster.jpg"
  title="Elephants Dream"
  subtitles={[
    { label: 'English', srclang: 'en', src: 'en.vtt' },
    { label: 'Türkçe',  srclang: 'tr', src: 'tr.vtt' },
  ]}
/>
```

### Minimal (sadece oynatma hızı)

```tsx
<VideoPlayer src="video.mp4" poster="poster.jpg" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="slider"` | `accessibilityRole="adjustable"` |
| `aria-expanded` | `accessibilityState.expanded` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-pressed` | `accessibilityState.selected` |
| `aria-valuemax` | `accessibilityValue.max` |
| `aria-valuemin` | `accessibilityValue.min` |
| `aria-valuenow` | `accessibilityValue.now` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`

**Suggested RN libraries:** `expo-video`

## Implementation Notes

`expo-video` with custom token-styled controls.

- Location: `modules/ui/VideoPlayer.tsx`, named export `VideoPlayer` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `VideoPlayerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `VideoPlayer` from the `modules/ui` barrel with its props type
- [ ] All 18 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Full featured (kalite + altyazı + dil), Subtitle + Font Boyutu, Minimal (sadece oynatma hızı))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
