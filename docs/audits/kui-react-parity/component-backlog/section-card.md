# SectionCard

> Backlog item · KuiReact id `section-card` · layer `app` · **Layout** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Titled content card with rounded-xl + border + bg-surface-raised + p-6. Header is separated by an underline; children slot accepts arbitrary content.

**Why it matters for KuiNative:** Titled card section for grouping form/content blocks — the settings-screen building block.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/SectionCard.tsx` (1 file, 18 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Tek bölüm, Birden fazla bölüm |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/SectionCard.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | **yes** | — |  | same |
| `children` | `React.ReactNode` | **yes** | — |  | keep (strings must be wrapped in `Text`) |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Tek bölüm

```tsx
<SectionCard title="Preferences">
  <Input id="name" label="Display name" value={name} onChange={...} />
  <Toggle id="notify" label="Email notifications" checked={notify} onChange={setNotify} />
</SectionCard>
```

### Birden fazla bölüm

```tsx
<SectionCard title="Profile">
  <UserProfileForm ... />
</SectionCard>
<SectionCard title="Security">
  <ChangePasswordForm ... />
</SectionCard>
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
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

**Suggested RN libraries:** `card`

## Implementation Notes

Compose Card with section header styles.

- Location: `modules/app/SectionCard.tsx`, named export `SectionCard` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SectionCardProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `SectionCard` from the `modules/app` barrel with its props type
- [ ] All 3 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Tek bölüm, Birden fazla bölüm)
- [ ] Uses only semantic tokens (`border`, `surface-raised`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
