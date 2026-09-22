# ScrollArea

> Backlog item · KuiReact id `scroll-area` · layer `ui` · **Layout** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Scrollable container with a themed, thin scrollbar (Firefox scrollbar-color + WebKit pseudo-elements) instead of the bulky native default. Supports vertical, horizontal, or both-axis scrolling.

**Why it matters for KuiNative:** Styled-scrollbar container; on RN `ScrollView` is already the primitive.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/ScrollArea.tsx` (1 file, 36 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Vertical list, Horizontal |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/ScrollArea.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `orientation` | `ScrollAreaOrientation` | no | `'vertical'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |

**Also accepts:** `React.HTMLAttributes<HTMLDivElement>` — on RN, spread the equivalent host props (`ViewProps`, `PressableProps`, `TextInputProps`) instead.

## Variants

### Vertical list

```tsx
<ScrollArea className="h-40 w-64 rounded-md border border-border p-3">
  <ul className="space-y-2">
    {items.map((item) => <li key={item.id}>{item.label}</li>)}
  </ul>
</ScrollArea>
```

### Horizontal

```tsx
<ScrollArea orientation="horizontal" className="w-full rounded-md border border-border p-3">
  <div className="flex gap-3">
    {cards.map((c) => <Card key={c.id} {...c} />)}
  </div>
</ScrollArea>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Thin wrapper over `ScrollView` with `horizontal` for `orientation`; `both` needs nested ScrollViews. Scrollbar styling is not available on native — document `indicatorStyle` / `persistentScrollbar` (Android) as the adaptation.

- Location: `modules/ui/ScrollArea.tsx`, named export `ScrollArea` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ScrollAreaProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ScrollArea` from the `modules/ui` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Vertical list, Horizontal)
- [ ] Uses only semantic tokens (`border`, `border-strong`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
