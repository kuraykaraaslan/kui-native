# OperationPanel

> Backlog item · KuiReact id `api-doc-operation-panel` · layer `domain` · **Domain — API Doc** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Tabbed panel showing all details of an API operation — parameters, request body, responses, and code samples.

**Why it matters for KuiNative:** Shared with KuiEJS per ADR 0003, but API-reference UIs are a desktop-web use case.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/api-doc/OperationPanel.tsx` (1 file, 175 LOC) |
| Public export | `@/modules/domains/api-doc` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2025-04 |
| Showcase variants | GET with parameters and code samples, POST with request body |
| Composes | CodeSamplePanel (missing), ParameterTable (missing), ResponseCard (missing), SchemaViewer (missing), SecuritySchemeBadge (missing), Badge (exists as `Badge`), EmptyState (exists as `EmptyState`), TabGroup (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | hover styles |

## Required Props

Parsed from `modules/domains/api-doc/OperationPanel.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `operation` | `Operation` | **yes** | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### GET with parameters and code samples

```tsx
<OperationPanel operation={{
  method: 'GET',
  summary: 'List users',
  parameters: [...],
  responses: [...],
  codeSamples: [...],
}} />
```

### POST with request body

```tsx
<OperationPanel operation={{
  method: 'POST',
  summary: 'Create user',
  requestBody: { required: true, content: { 'application/json': { schema: userSchema } } },
  responses: [...],
}} />
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
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning-fg` | #78350f | #fef3c7 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- CodeSamplePanel — missing → [backlog](api-doc-code-sample-panel.md)
- ParameterTable — missing → [backlog](api-doc-parameter-table.md)
- ResponseCard — missing → [backlog](api-doc-response-card.md)
- SchemaViewer — missing → [backlog](api-doc-schema-viewer.md)
- SecuritySchemeBadge — missing → [backlog](api-doc-security-scheme-badge.md)
- Badge — exists as `Badge`
- EmptyState — exists as `EmptyState`
- TabGroup — missing → [backlog](../../tab-group.md)

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/api-doc/OperationPanel.tsx`, named export `OperationPanel` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `OperationPanelProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/api-doc/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `OperationPanel` from the `modules/domains/api-doc` barrel with its props type
- [ ] All 2 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (GET with parameters and code samples, POST with request body)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `primary`, `surface-base`, `surface-raised`, `text-disabled`, `text-secondary`, `warning-fg`, `warning-subtle`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
