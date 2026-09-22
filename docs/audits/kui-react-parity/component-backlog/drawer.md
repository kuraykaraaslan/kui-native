# Drawer

> Backlog item · KuiReact id `drawer` · layer `ui` · **Overlay** · Priority **Critical** · Complexity **Medium** · Wave 1 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Side panel sliding in from the screen edge. Left / right placement with focus management and Escape close. Body scroll is locked while open via the shared Overlays useScrollLock hook (iOS rubber-band safe). Accepts closeOnRouteChange (M6 stub).

**Why it matters for KuiNative:** Side/bottom sheets are the primary overlay on mobile; KuiReact Drawer shares the Overlays/shared primitives with Modal.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Overlays/Drawer/index.tsx` (1 file, 120 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Right drawer, Left drawer, Route-aware close (M6 stub) |
| Composes | useFocusTrap (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 4 production file(s), 2 showcase file(s) |
| Third-party imports | `react-dom`, `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | `modules/ui/Overlays/Drawer/Drawer.test.tsx` (8 cases) |
| Interaction flags | keyboard handling, focus-visible ring, reduced-motion aware, portal, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Overlays/Drawer/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `open` | `boolean` | **yes** | — |  | same |
| `onClose` | `() => void` | **yes** | — |  | same |
| `title` | `string` | **yes** | — |  | same |
| `side` | `'left' \| 'right'` | no | `'right'` |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `footer` | `React.ReactNode` | no | — |  | same |
| `closeOnRouteChange` | `boolean` | no | — |  | → expo-router focus/blur listener |
| `reducedMotion` | `boolean` | no | — |  | → `useReducedMotion()` (Reanimated) |
| `portalTarget` | `Element \| string \| null` | no | — |  | n/a (use root overlay host) |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `ref` | `React.Ref<HTMLDivElement>` | no | — |  | ref type → RN host component (`View`/`TextInput`) |

## Variants

### Right drawer

```tsx
const [open, setOpen] = useState(false);
<Button variant="outline" onClick={() => setOpen(true)}>Open Drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right"
  footer={<><Button variant="outline">Cancel</Button><Button variant="primary">Save</Button></>}>
  <p>Drawer content goes here.</p>
</Drawer>
```

### Left drawer

```tsx
<Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left">...</Drawer>
```

### Route-aware close (M6 stub)

```tsx
// closeOnRouteChange is accepted in M1 and reserved for M6 router-events integration.
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Route-aware drawer"
  side="right"
  closeOnRouteChange
>
  ...
</Drawer>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `side`: 'left' · 'right' (default 'right')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| open / expanded | `open` | visible/expanded | `accessibilityState.expanded` / modal visibility |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-modal` | `accessibilityViewIsModal` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- useFocusTrap — missing → [backlog](use-focus-trap.md)

**Blocked by (roadmap):** `R-overlay-core`

**Third-party:** `react-dom` → root overlay host / RN Modal, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `react-native-reanimated`, `react-native-gesture-handler`

## Implementation Notes

Build on the same overlay core as the rewritten Modal (presence, backdrop, focus). Support `side` left/right (and add `bottom` as the RN-idiomatic sheet). Gesture-handler swipe-to-close; Reanimated translate.

- Location: `modules/ui/Drawer.tsx`, named export `Drawer` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `DrawerProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Drawer` from the `modules/ui` barrel with its props type
- [ ] All 11 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Right drawer, Left drawer, Route-aware close (M6 stub))
- [ ] State **open / expanded** implemented: `accessibilityState.expanded` / modal visibility
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `primary`, `surface-raised`, `text-disabled`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] renders nothing when closed
  - [ ] renders with the title as its accessible name (aria-label)
  - [ ] defaults to the right side
  - [ ] side="left" renders on the left
  - [ ] calls onClose when Escape is pressed
  - [ ] calls onClose on a backdrop click
  - [ ] the close button calls onClose
  - [ ] renders the footer when given one
- [ ] Prop table + usage snippet documented in the showcase entry
