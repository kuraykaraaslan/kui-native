# RulesetEditor

> Backlog item · KuiReact id `iot-ruleset-editor` · layer `domain` · **Domain — IoT** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Drag-and-drop visual rule chain editor — build telemetry pipelines with Trigger, Filter, Switch, Transform, and Action nodes.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/iot/ruleset/RulesetEditor/index.tsx` (21 files, 1147 LOC) |
| Public export | `@/modules/domains/iot` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | With pre-loaded chain, Empty canvas (editable) |
| Composes | CodeEditor (missing), Modal (exists as `Modal`) |
| Used by (registry) | — |
| Usage frequency | imported by 1 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`, `@fortawesome/react-fontawesome` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles · 13 raw hex literal(s) in source |

## Required Props

Parsed from `modules/domains/iot/ruleset/RulesetEditor/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `initialNodes` | `RuleNode[]` | no | `[]` |  | same |
| `initialEdges` | `RuleEdge[]` | no | `[]` |  | same |
| `readOnly` | `boolean` | no | `false` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `chainName` | `string` | no | `'Rule Chain'` |  | same |
| `ref` | `React.Ref<RulesetEditorRef>` | no | — |  | same |

## Variants

### With pre-loaded chain

```tsx
<RulesetEditor
  initialNodes={nodes}
  initialEdges={edges}
/>
```

### Empty canvas (editable)

```tsx
<RulesetEditor />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| read-only | `readOnly` | sunken background, not editable | `editable={false}` + sunken bg + label suffix |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

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
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- CodeEditor — missing → [backlog](../../code-editor.md)
- Modal — exists as `Modal`

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome

## Implementation Notes

- Location: `modules/domains/iot/RulesetEditor.tsx`, named export `RulesetEditor` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `RulesetEditorProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/iot/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `RulesetEditor` from the `modules/domains/iot` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (With pre-loaded chain, Empty canvas (editable))
- [ ] State **read-only** implemented: `editable={false}` + sunken bg + label suffix
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `border-strong`, `error`, `error-subtle`, `info`, `info-subtle`, `primary`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
