# StepShell

> Backlog item · KuiReact id `step-shell` · layer `app` · **Layout** · Priority **Medium** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Wrapper card for a single step in a multi-step flow. Border and number circle change based on active / done / inactive state; the done + onEdit combination shows an Edit button alongside the summary.

**Why it matters for KuiNative:** Per-step layout wrapper used by StepFlow.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/StepShell.tsx` (1 file, 82 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Active / Done / Pending |
| Composes | Button (exists as `Button`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/app/StepShell.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `number` | `number` | **yes** | — |  | same |
| `title` | `string` | **yes** | — |  | same |
| `active` | `boolean` | **yes** | — |  | same |
| `done` | `boolean` | **yes** | — |  | same |
| `onEdit` | `() => void` | no | — |  | same |
| `summary` | `React.ReactNode` | no | — |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Active / Done / Pending

```tsx
<StepShell number={1} title="Delivery address" active={false} done
  summary={<AddressCard address={address} />}
  onEdit={() => setStep('address')}
/>
<StepShell number={2} title="Payment method" active done={false}>
  <PaymentMethodSelector value={method} onChange={setMethod} />
  <Button onClick={() => setStep('details')}>Continue</Button>
</StepShell>
<StepShell number={3} title="Review &amp; pay" active={false} done={false} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `active` | highlighted | `accessibilityState.selected` |

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
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`

**Blocked by (roadmap):** `R-button`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Port with StepFlow.

- Location: `modules/app/StepShell.tsx`, named export `StepShell` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `StepShellProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `StepShell` from the `modules/app` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 1 KuiReact variants (Active / Done / Pending)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `primary-fg`, `success`, `surface-overlay`, `surface-raised`, `text-disabled`, `text-primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
