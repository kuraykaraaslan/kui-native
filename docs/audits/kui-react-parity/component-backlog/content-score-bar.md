# ContentScoreBar

> Backlog item · KuiReact id `content-score-bar` · layer `ui` · **Data Display** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Rule-based content quality score with Good ≥70 / Fair ≥40 / Poor <40 tier system. Each rule shown as a chip with passed/total count. role="progressbar" + aria-valuenow.

**Why it matters for KuiNative:** SEO/content-quality meter; niche.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/ContentScoreBar.tsx` (1 file, 107 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Live evaluation, All tiers, Password strength |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions |

## Required Props

Parsed from `modules/ui/ContentScoreBar.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `value` | `string` | **yes** | — |  | same |
| `rules` | `ScoreRule[]` | **yes** | — |  | same |
| `label` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Live evaluation

```tsx
const rules = [
  { label: 'Min 20 chars', check: (v) => v.length >= 20, points: 20 },
  { label: 'Has keyword',  check: (v) => /react/i.test(v), points: 20, hint: 'Include "React"' },
  // ...
];
<ContentScoreBar value={content} rules={rules} label="Quality score" />
```

### All tiers

```tsx
// Good tier  (score ≥ 70)
<ContentScoreBar value="" rules={allPassRules} label="Good (100%)" />

// Fair tier  (40 ≤ score < 70)
<ContentScoreBar value="" rules={halfPassRules} label="Fair (60%)" />

// Poor tier  (score < 40)
<ContentScoreBar value="" rules={onePassRules}  label="Poor (20%)" />
```

### Password strength

```tsx
const rules = [
  { label: 'Min 8 chars',  check: (v) => v.length >= 8,          points: 25 },
  { label: 'Uppercase',    check: (v) => /[A-Z]/.test(v),        points: 25 },
  { label: 'Number',       check: (v) => /\d/.test(v),            points: 25 },
  { label: 'Special char', check: (v) => /[^A-Za-z0-9]/.test(v), points: 25 },
];
<ContentScoreBar value={password} rules={rules} label="Password strength" />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| selected / active | `value` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

Segmented progress bar with threshold colours; reuse Progress.

- Location: `modules/ui/ContentScoreBar.tsx`, named export `ContentScoreBar` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ContentScoreBarProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ContentScoreBar` from the `modules/ui` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Live evaluation, All tiers, Password strength)
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `error`, `error-subtle`, `secondary`, `success`, `success-fg`, `success-subtle`, `surface-sunken`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
