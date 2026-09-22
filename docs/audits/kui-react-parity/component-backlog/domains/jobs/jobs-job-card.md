# JobCard

> Backlog item · KuiReact id `jobs-job-card` · layer `domain` · **Domain — Jobs** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Summarises a job posting with company logo, title, badges, tags, and meta.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/jobs/job/JobCard.tsx` (1 file, 92 LOC) |
| Public export | `@/modules/domains/jobs` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | With link, No badges |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`), JobExperienceBadge (missing), JobMeta (missing), JobTypeBadge (missing), JobWorkModeBadge (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 3 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/jobs/job/JobCard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `job` | `JobWithData` | **yes** | — |  | same |
| `href` | `string` | no | — |  | → `onPress` + expo-router `Link` |
| `onClick` | `() => void` | no | — |  | → `onPress` |
| `showBadges` | `boolean` | no | `true` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### With link

```tsx
<JobCard job={job} href="/jobs/slug" />
```

### No badges

```tsx
<JobCard job={job} showBadges={false} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`
- JobExperienceBadge — missing → [backlog](jobs-experience-badge.md)
- JobMeta — missing → [backlog](jobs-job-meta.md)
- JobTypeBadge — missing → [backlog](jobs-type-badge.md)
- JobWorkModeBadge — missing → [backlog](jobs-work-mode-badge.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/jobs/JobCard.tsx`, named export `JobCard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `JobCardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/jobs/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `JobCard` from the `modules/domains/jobs` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (With link, No badges)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Uses only semantic tokens (`border`, `border-focus`, `surface-raised`, `surface-sunken`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
