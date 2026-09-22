# Timeline

> Backlog item · KuiReact id `timeline` · layer `ui` · **Data Display** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Chronological activity feed with sticky day headings. Grouping uses the viewer’s local day via `Intl`, not the raw ISO date — an event at 23:50 UTC otherwise lands under the wrong heading for anyone east or west of the server.

**Why it matters for KuiNative:** Activity timeline grouped by day; used by domain feeds.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Timeline.tsx` (1 file, 170 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-08 |
| Showcase variants | Grouped by day, Empty, and ungrouped |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/Timeline.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `items` | `TimelineItem[]` | **yes** | — |  | same |
| `timeZone` | `string` | no | — |  | same |
| `locale` | `string` | no | — |  | same |
| `groupByDay` | `boolean` | no | `true` |  | same |
| `emptyMessage` | `string` | no | `'Nothing here yet.'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Grouped by day

```tsx
<Timeline
  items={activities.map((a) => ({
    id: a.activityId,
    at: a.occurredAt,
    title: a.type,
    body: a.summary,
  }))}
/>
```

### Empty, and ungrouped

```tsx
<Timeline items={[]} emptyMessage="No activity yet." />
<Timeline items={items} groupByDay={false} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| empty | `emptyMessage` | empty placeholder | EmptyState |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info-fg` | #164e63 | #cffafe | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning-fg` | #78350f | #fef3c7 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

SectionList grouped by day; `Intl.DateTimeFormat` for `locale/timeZone`.

- Location: `modules/ui/Timeline.tsx`, named export `Timeline` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `TimelineProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Timeline` from the `modules/ui` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Grouped by day, Empty, and ungrouped)
- [ ] State **empty** implemented: EmptyState
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error-fg`, `error-subtle`, `info-fg`, `info-subtle`, `success-fg`, `success-subtle`, `surface-base`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
