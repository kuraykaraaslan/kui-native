# OnboardingWizard

> Backlog item · KuiReact id `onboarding-wizard` · layer `app` · **Advanced Components** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Multi-step onboarding flow with dots/bar progress, optional skip, and page or modal presentation. Each step renders its own content slot.

**Why it matters for KuiNative:** First-run onboarding; very common in mobile apps.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/OnboardingWizard.tsx` (1 file, 225 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Dots indicator (page mode), Progress bar indicator |
| Composes | Button (exists as `Button`), Modal (exists as `Modal`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/app/OnboardingWizard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `steps` | `OnboardingStep[]` | **yes** | — |  | same |
| `mode` | `'page' \| 'modal'` | no | `'page'` |  | same |
| `open` | `boolean` | no | `true` |  | same |
| `initialStep` | `number` | no | `0` |  | same |
| `title` | `string` | no | `'Welcome'` |  | same |
| `allowSkip` | `boolean` | no | `true` |  | same |
| `onStepChange` | `(index: number) => void` | no | — |  | same |
| `onComplete` | `() => void \| Promise<void>` | no | — |  | same |
| `onSkip` | `() => void` | no | — |  | same |
| `onClose` | `() => void` | no | — |  | same |
| `nextLabel` | `string` | no | `'Next'` |  | same |
| `prevLabel` | `string` | no | `'Back'` |  | same |
| `skipLabel` | `string` | no | `'Skip'` |  | same |
| `completeLabel` | `string` | no | `'Finish'` |  | same |
| `indicator` | `'dots' \| 'bar'` | no | `'dots'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Dots indicator (page mode)

```tsx
<OnboardingWizard
  steps={steps}
  indicator="dots"
  allowSkip
  onComplete={() => {}}
/>
```

### Progress bar indicator

```tsx
<OnboardingWizard
  steps={steps}
  indicator="bar"
  allowSkip={false}
  onComplete={() => {}}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `mode`: 'page' · 'modal' (default 'page')
- `indicator`: 'dots' · 'bar' (default 'dots')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| open / expanded | `open` | visible/expanded | `accessibilityState.expanded` / modal visibility |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="progressbar"` | `accessibilityRole="progressbar"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-valuemax` | `accessibilityValue.max` |
| `aria-valuemin` | `accessibilityValue.min` |
| `aria-valuenow` | `accessibilityValue.now` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- Modal — exists as `Modal`

**Blocked by (roadmap):** `R-button`, `R-modal`, `stepper`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `stepper`

## Implementation Notes

Paged horizontal FlatList / pager-view with dots; skip/next buttons.

- Location: `modules/app/OnboardingWizard.tsx`, named export `OnboardingWizard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `OnboardingWizardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `OnboardingWizard` from the `modules/app` barrel with its props type
- [ ] All 16 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Dots indicator (page mode), Progress bar indicator)
- [ ] State **open / expanded** implemented: `accessibilityState.expanded` / modal visibility
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`primary`, `surface-sunken`, `text-primary`, `text-secondary`, `border`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
