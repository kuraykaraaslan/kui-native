# ImageGallery

> Backlog item · KuiReact id `image-gallery` · layer `app` · **Media** · Priority **Medium** · Complexity **Large** · Wave 3 · Fit `adapt` · est. 5–8 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Responsive image grid with a full-screen lightbox, right-click context menu (open, copy URL, move to first/last, remove), and drag-to-reorder. Supports 2–4 columns, square / video / portrait / auto aspect ratios, optional captions, zoom toggle, thumbnail strip, and full keyboard navigation (← → Escape).

**Why it matters for KuiNative:** Grid + lightbox.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/ImageGallery/index.tsx` (9 files, 705 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Reorderable — drag + right-click menu, 3-column grid — lightbox only, 2-column with captions, 4-column compact |
| Composes | ContextMenu (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/ImageGallery/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `images` | `ImageGalleryImage[]` | **yes** | — |  | same |
| `columns` | `GalleryColumns` | no | `3` |  | same |
| `aspect` | `GalleryAspect` | no | `'square'` |  | same |
| `gap` | `GalleryGap` | no | `'md'` |  | same |
| `lightbox` | `boolean` | no | `true` |  | same |
| `showCaptions` | `boolean` | no | `false` |  | same |
| `reorderable` | `boolean` | no | `false` |  | same |
| `onReorder` | `(images: ImageGalleryImage[]) => void` | no | — |  | same |
| `onRemove` | `(index: number, image: ImageGalleryImage) => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Reorderable — drag + right-click menu

```tsx
<ImageGallery
  images={images}
  columns={3}
  aspect="square"
  gap="md"
  reorderable
  onReorder={(next) => setImages(next)}
  onRemove={(idx, img) => console.log('removed', img.alt)}
/>
```

### 3-column grid — lightbox only

```tsx
<ImageGallery
  images={images}
  columns={3}
  aspect="square"
  gap="md"
  lightbox
/>
```

### 2-column with captions

```tsx
<ImageGallery
  images={images}
  columns={2}
  aspect="video"
  gap="lg"
  showCaptions
  lightbox
/>
```

### 4-column compact

```tsx
<ImageGallery
  images={images}
  columns={4}
  aspect="square"
  gap="sm"
  lightbox
/>
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
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="list"` | `accessibilityRole="list"` |
| `role="listitem"` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-modal` | `accessibilityViewIsModal` |
| `aria-pressed` | `accessibilityState.selected` |

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
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- ContextMenu — missing → [backlog](context-menu.md)

**Blocked by (roadmap):** `context-menu`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `expo-image`, `react-native-gesture-handler`

## Implementation Notes

FlatList grid + full-screen pinch-zoom viewer (gesture-handler).

- Location: `modules/app/ImageGallery.tsx`, named export `ImageGallery` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ImageGalleryProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ImageGallery` from the `modules/app` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 4 KuiReact variants (Reorderable — drag + right-click menu, 3-column grid — lightbox only, 2-column with captions, 4-column compact)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `surface-sunken`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
