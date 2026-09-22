# FormBuilder

> Backlog item · KuiReact id `form-builder` · layer `app` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `web-only` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Typeform / JotForm-style drag-to-build form designer. M1 ships the field palette (text / email / number / textarea / select / radio / checkbox / date / file — multiselect / signature / rating are palette stubs), a draggable canvas with reorder + duplicate + delete, a right-hand settings panel (label, name, placeholder, helper text, required, default value, options), JSON schema export / import, and a paired FormRenderer with required + email-format validation. Future milestones: full validation engine + custom validators (M2), conditional logic editor + runtime AST eval (M3), multi-page + save & resume (M4), schema I/O + webhooks + signature / rating (M5), full WAI-ARIA / keyboard parity + i18n + theming (M6). Pixel-identical EJS sibling at modules/app/FormBuilder/FormBuilder.ejs.

**Why it matters for KuiNative:** Schema form editor (2k LOC); authoring tool, not a mobile pattern. KuiEJS removed it.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/FormBuilder/index.tsx` (27 files, 2005 LOC) |
| Public export | `@/modules/app/FormBuilder/index` — source-only (not exported from a barrel) |
| Registry | yes · status `beta` · since 2026-05 |
| Showcase variants | Builder (drag + edit), Builder + live FormRenderer, Standalone renderer (required + email validation) |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/FormBuilder/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `schema` | `FormSchema` | no | — |  | same |
| `defaultSchema` | `FormSchema` | no | — |  | same |
| `onChange` | `(schema: FormSchema) => void` | no | — |  | same |
| `fieldTypes` | `FieldType[]` | no | — |  | same |
| `messages` | `Partial<FormBuilderMessages>` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Builder (drag + edit)

```tsx
const [schema, setSchema] = useState<FormSchema>(seed);
<FormBuilder schema={schema} onChange={setSchema} />
```

### Builder + live FormRenderer

```tsx
const [schema, setSchema] = useState<FormSchema>(seed);
<>
  <FormBuilder schema={schema} onChange={setSchema} />
  <FormRenderer schema={schema} onSubmit={async (values) => persist(values)} />
</>
```

### Standalone renderer (required + email validation)

```tsx
<FormRenderer
  schema={STARTER_SCHEMA}
  onSubmit={async (values) => persist(values)}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="application"` | review manually |
| `role="button"` | `accessibilityRole="button"` |
| `role="list"` | `accessibilityRole="list"` |
| `role="listitem"` | review manually |
| `role="radiogroup"` | `accessibilityRole="radiogroup"` |
| `aria-current` | `accessibilityState.selected` + label suffix |
| `aria-describedby` | `accessibilityHint` |
| `aria-disabled` | `accessibilityState.disabled` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |
| `aria-label` | `accessibilityLabel` |
| `aria-required` | label suffix "required" |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `primary-active` | #1d4ed8 | #1d4ed8 | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`

## Implementation Notes

Port only the renderer half if needed; record editor as exception.

- Location: `modules/app/FormBuilder.tsx`, named export `FormBuilder` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FormBuilderProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `FormBuilder` from the `modules/app` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (Builder (drag + edit), Builder + live FormRenderer, Standalone renderer (required + email validation))
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-raised`, `surface-overlay`, `text-primary`, `text-secondary`, `text-disabled`, `border`, `border-strong`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
