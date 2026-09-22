# ParameterTable

> Backlog item · KuiReact id `api-doc-parameter-table` · layer `domain` · **Domain — API Doc** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Table displaying API parameters with location (path/query/header/cookie), type, required flag, and description.

**Why it matters for KuiNative:** Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/api-doc/ParameterTable.tsx` (1 file, 91 LOC) |
| Public export | `@/modules/domains/api-doc` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | Mixed parameter locations, Path params only |
| Composes | Badge (exists as `Badge`), Tooltip (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/api-doc/ParameterTable.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `parameters` | `Parameter[]` | **yes** | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Mixed parameter locations

```tsx
<ParameterTable parameters={[
  { parameterId: 'p1', name: 'userId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
  { parameterId: 'p2', name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
  { parameterId: 'p3', name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
  { parameterId: 'p4', name: 'role', in: 'query', schema: { type: 'string', enum: ['admin','editor','viewer'] }, deprecated: true },
]} />
```

### Path params only

```tsx
<ParameterTable parameters={[
  { parameterId: 'pp1', name: 'orgId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
  { parameterId: 'pp2', name: 'projectId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
]} />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
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
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Badge — exists as `Badge`
- Tooltip — missing → [backlog](../../tooltip.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/api-doc/ParameterTable.tsx`, named export `ParameterTable` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ParameterTableProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/api-doc/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `ParameterTable` from the `modules/domains/api-doc` barrel with its props type
- [ ] All 2 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Mixed parameter locations, Path params only)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `surface-base`, `surface-raised`, `surface-sunken`, `text-disabled`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
