# MapView

> Backlog item · KuiReact id `map-view` · layer `ui` · **Media** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Leaflet-based interactive map. Tooltip-enabled markers, predefined zones (polygon), route lines (polyline), and click-to-add marker mode.

**Why it matters for KuiNative:** Leaflet map with markers/zones/routes.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/MapView/index.tsx` (14 files, 796 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `beta` · since 2025-04 |
| Showcase variants | Tam özellik — işaretçi + zone + rota, Tıkla-ekle işaretçi modu, Yalnız zone ve rota |
| Composes | Button (exists as `Button`), Card (exists as `Card`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `leaflet`, `react-leaflet`, `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | reduced-motion aware, animated/transitions · 10 raw hex literal(s) in source |

## Required Props

Parsed from `modules/ui/MapView/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `provider` | `MapProviderId` | no | `'leaflet'` |  | same |
| `apiKey` | `string` | no | — |  | same |
| `center` | `[number, number]` | no | `[39.9334, 32.8597]` |  | same |
| `zoom` | `number` | no | `6` |  | same |
| `markers` | `MapMarker[]` | no | `[]` |  | same |
| `zones` | `MapZone[]` | no | `[]` |  | same |
| `routes` | `MapRoute[]` | no | `[]` |  | same |
| `fitBoundsPadding` | `number` | no | — |  | same |
| `onMarkerAdd` | `(position: [number, number]) => void` | no | — |  | same |
| `onMarkerClick` | `(id: string) => void` | no | — |  | same |
| `height` | `string \| number` | no | `480` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Tam özellik — işaretçi + zone + rota

```tsx
<MapView
  center={[41.015, 28.979]}
  zoom={6}
  markers={CITIES}
  zones={ZONES}
  routes={ROUTES}
  onMarkerClick={(id) => console.log(id)}
  height={420}
/>
```

### Tıkla-ekle işaretçi modu

```tsx
<MapView
  center={[39.5, 35.0]}
  zoom={5}
  markers={markers}
  onMarkerAdd={(pos) => setMarkers(prev => [
    ...prev,
    { id: String(Date.now()), position: pos, variant: 'warning' },
  ])}
  height={380}
/>
```

### Yalnız zone ve rota

```tsx
<MapView
  center={[39.5, 35.0]}
  zoom={5}
  zones={ZONES}
  routes={ROUTES}
  height={380}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="button"` | `accessibilityRole="button"` |
| `aria-command` | review manually |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- Card — exists as `Card`

**Blocked by (roadmap):** `R-button`, `R-card`

**Third-party:** `leaflet` → react-native-maps, `react-leaflet` → react-native-maps, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `react-native-maps`

## Implementation Notes

`react-native-maps`; keep MapMarker/MapZone/MapRoute types.

- Location: `modules/ui/MapView.tsx`, named export `MapView` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `MapViewProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `MapView` from the `modules/ui` barrel with its props type
- [ ] All 12 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Tam özellik — işaretçi + zone + rota, Tıkla-ekle işaretçi modu, Yalnız zone ve rota)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `surface-raised`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
