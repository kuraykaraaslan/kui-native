# Popover

> Backlog item · KuiReact id `popover` · layer `ui` · **Overlay** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Anchor-based contextual panel. Closes on outside click (capture-phase pointerdown) and Escape, layered with sibling overlays. Supports top/bottom/left/right placement. Built-in focus trap (focusTrap prop) keeps Tab cycling inside the panel.

**Why it matters for KuiNative:** Anchored floating panel; basis for Tooltip, DropdownMenu, Popconfirm.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Overlays/Popover/index.tsx` (1 file, 74 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Bottom (default), Placements, Focus trap inside Popover |
| Composes | useFocusTrap (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 2 showcase file(s) |
| Third-party imports | — |
| Unit tests | `modules/ui/Overlays/Popover/Popover.test.tsx` (5 cases) |
| Interaction flags | keyboard handling |

## Required Props

Parsed from `modules/ui/Overlays/Popover/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `trigger` | `React.ReactNode` | **yes** | — |  | same |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `placement` | `Placement` | no | `'bottom'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `focusTrap` | `boolean` | no | `true` |  | same |

## Variants

### Bottom (default)

```tsx
<Popover trigger={<Button variant="outline">Open</Button>} placement="bottom">
  <div className="p-4">
    <p className="text-sm font-semibold">Title</p>
    <p className="text-xs text-text-secondary">Content goes here.</p>
  </div>
</Popover>
```

### Placements

```tsx
<Popover placement="top" trigger={<Button>Top</Button>}><div>...</div></Popover>
<Popover placement="right" trigger={<Button>Right</Button>}><div>...</div></Popover>
```

### Focus trap inside Popover

```tsx
<Popover focusTrap placement="bottom" trigger={<Button>Quick edit</Button>}>
  <form onSubmit={(e) => e.preventDefault()} className="p-4 space-y-3 w-64">
    <input type="text" placeholder="Title" />
    <input type="text" placeholder="Tag" />
    <Button type="submit">Save</Button>
  </form>
</Popover>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

_No interactive states detected from props; verify in source._

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- useFocusTrap — missing → [backlog](use-focus-trap.md)

**Blocked by (roadmap):** `R-overlay-core`

**Third-party:** none

## Implementation Notes

Measure trigger with `measureInWindow`, render in a transparent RN `Modal` or portal host; flip/shift logic ported from `Overlays/shared/positioning.ts`.

- Location: `modules/ui/Popover.tsx`, named export `Popover` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PopoverProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Popover` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Bottom (default), Placements, Focus trap inside Popover)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-raised`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] is closed by default
  - [ ] opens on trigger click and moves focus into the panel
  - [ ] Escape closes the panel and returns focus to the trigger
  - [ ] clicking outside the panel closes it
  - [ ] focusTrap={false} skips the initial focus move
- [ ] Prop table + usage snippet documented in the showcase entry
