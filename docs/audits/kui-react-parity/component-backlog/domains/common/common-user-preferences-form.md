# UserPreferencesForm

> Backlog item · KuiReact id `common-user-preferences-form` · layer `domain` · **Domain — Common** · Priority **Medium** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Preferences form with theme and language selects plus email/push notification and newsletter toggles.

**Why it matters for KuiNative:** Common vertical is shipped in KuiReact's npm package (`./common` entry) and is shared with KuiEJS; it is the only domain vertical with a parity obligation.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/common/user/UserPreferencesForm.tsx` (1 file, 82 LOC) |
| Public export | `@kuraykaraaslan/kui-react/common` — public (npm: root + /common) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | Defaults, Pre-filled |
| Composes | Button (exists as `Button`), LanguageSwitcher (missing), Form (missing), ThemeSwitcher (missing), Toggle (exists as `Switch`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/domains/common/user/UserPreferencesForm.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `initial` | `Partial<UserPreferences>` | no | `{}` |  | same |
| `onSubmit` | `(values: UserPreferences) => Promise<void> \| void` | **yes** | — |  | same |
| `error` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Defaults

```tsx
<UserPreferencesForm onSubmit={handleSave} />
```

### Pre-filled

```tsx
<UserPreferencesForm initial={{ theme: 'DARK', language: 'tr', emailNotifications: false }} onSubmit={handleSave} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |

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
| `text-primary` | #111827 | #f1f5f9 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- LanguageSwitcher — missing → [backlog](common-language-switcher.md)
- Form — missing → [backlog](../../form.md)
- ThemeSwitcher — missing → [backlog](../../theme-switcher.md)
- Toggle — exists as `Switch`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** none

## Implementation Notes

- Location: `modules/domains/common/UserPreferencesForm.tsx`, named export `UserPreferencesForm` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `UserPreferencesFormProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/common/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `UserPreferencesForm` from the `modules/domains/common` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Defaults, Pre-filled)
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] Uses only semantic tokens (`border`, `text-primary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
