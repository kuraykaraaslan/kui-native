# Popconfirm

> Backlog item · KuiReact id `popconfirm` · layer `ui` · **Overlay** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `adapt` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Inline "are you sure?" confirmation popover for destructive or consequential actions — lighter-weight than a full Modal. Built on the same dismiss/focus-trap primitives as Popover.

**Why it matters for KuiNative:** Inline confirmation for destructive actions.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Popconfirm.tsx` (1 file, 94 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2026-09 |
| Showcase variants | Default, Danger + description |
| Composes | Button (exists as `Button`), useFocusTrap (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | `modules/ui/Popconfirm.test.tsx` (6 cases) |
| Interaction flags | keyboard handling |

## Required Props

Parsed from `modules/ui/Popconfirm.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `trigger` | `React.ReactNode` | **yes** | — |  | same |
| `title` | `React.ReactNode` | **yes** | — |  | same |
| `description` | `React.ReactNode` | no | — |  | same |
| `confirmLabel` | `string` | no | `'Confirm'` |  | same |
| `cancelLabel` | `string` | no | `'Cancel'` |  | same |
| `danger` | `boolean` | no | `false` |  | same |
| `placement` | `Placement` | no | `'bottom'` |  | same |
| `onConfirm` | `() => void` | **yes** | — |  | same |
| `onCancel` | `() => void` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Default

```tsx
<Popconfirm trigger={<Button variant="outline">Log out</Button>} title="Log out of your account?" onConfirm={handleLogout} />
```

### Danger + description

```tsx
<Popconfirm
  trigger={<Button variant="danger">Delete project</Button>}
  title="Delete this project?"
  description="This action cannot be undone."
  danger
  confirmLabel="Delete"
  onConfirm={handleDelete}
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
| `role="alertdialog"` | `accessibilityRole="alert` + `accessibilityViewIsModal"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-modal` | `accessibilityViewIsModal` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- useFocusTrap — missing → [backlog](use-focus-trap.md)

**Blocked by (roadmap):** `R-overlay-core`, `R-button`, `popover`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `popover`

## Implementation Notes

Popover with title/description and confirm/cancel Buttons; fallback to `Alert.alert` is NOT parity (unstyled).

- Location: `modules/ui/Popconfirm.tsx`, named export `Popconfirm` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `PopconfirmProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Popconfirm` from the `modules/ui` barrel with its props type
- [ ] All 10 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Default, Danger + description)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `surface-raised`, `text-primary`, `text-secondary`, `warning`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Mirrors KuiReact's test cases where applicable:
  - [ ] is closed by default
  - [ ] opens on trigger click and moves focus into the panel
  - [ ] Escape closes the panel and returns focus to the trigger
  - [ ] clicking outside the panel closes it without confirming
  - [ ] clicking Confirm calls onConfirm and closes
  - [ ] clicking Cancel calls onCancel and closes without confirming
- [ ] Prop table + usage snippet documented in the showcase entry
