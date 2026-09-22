# CodeEditor

> Backlog item · KuiReact id `code-editor` · layer `ui` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `web-only` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Engine-agnostic code editor primitive. M1 ships a lightweight CodeMirror-style fallback engine (textarea + line-number gutter + active-line + theme + readonly + placeholder) so the public API is stable today. Future milestones: Monaco (VSCode) lazy engine, find/replace, multi-cursor, diagnostics (markers), custom autocomplete + hover, minimap, code folding, vim/emacs keymap. Pixel-identical EJS sibling at modules/ui/CodeEditor/CodeEditor.ejs. Used by RulesetEditor M3 + RichTextEditor code-block insert (planned).

**Why it matters for KuiNative:** Code editing on phones is rare; KuiEJS already treats it as out of scope.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/CodeEditor/index.tsx` (10 files, 642 LOC) |
| Public export | `@/modules/ui/CodeEditor/index` — source-only (not exported from a barrel) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | JavaScript readonly, Markdown editable |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/ui/CodeEditor/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `value` | `string` | **yes** | — |  | same |
| `onChange` | `(next: string) => void` | no | — |  | same |
| `language` | `Lang` | no | `'plaintext'` |  | same |
| `theme` | `CodeEditorTheme` | no | `'light'` |  | same |
| `engine` | `CodeEditorEngine` | no | `'codemirror'` |  | same |
| `readonly` | `boolean` | no | `false` |  | same |
| `placeholder` | `string` | no | `''` |  | same |
| `label` | `string` | no | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `minHeight` | `number` | no | `200` |  | same |
| `showLineNumbers` | `boolean` | no | `true` |  | same |
| `id` | `string` | no | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `name` | `string` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `showToolbar` | `boolean` | no | — |  | same |
| `formatOnSave` | `boolean` | no | — |  | same |
| `markers` | `Marker[]` | no | — |  | same |
| `getSuggestions` | `(ctx: SuggestContext) => Suggestion[] \| Promise<Suggestion[]>` | no | — |  | same |
| `getHover` | `(ctx: HoverContext) => Hover \| Promise<Hover>` | no | — |  | same |
| `extraLibs` | `{ path: string; content: string }[]` | no | — |  | same |
| `showMinimap` | `boolean` | no | — |  | same |
| `keymap` | `'default' \| 'vim' \| 'emacs'` | no | — |  | same |
| `messages` | `Partial<CodeEditorMessages>` | no | — |  | same |

## Variants

### JavaScript readonly

```tsx
<CodeEditor
  id="example"
  label="example.js"
  language="js"
  theme="light"
  value={source}
  readonly
  showLineNumbers
/>
```

### Markdown editable

```tsx
const [src, setSrc] = useState('# Hello');
<CodeEditor
  id="readme"
  name="readme"
  label="README.md"
  language="markdown"
  theme="dark"
  value={src}
  onChange={setSrc}
  placeholder="Start typing markdown…"
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `keymap`: 'default' · 'vim' · 'emacs'

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| read-only | `readonly` | sunken background, not editable | `editable={false}` + sunken bg + label suffix |
| selected / active | `value` | highlighted | `accessibilityState.selected` |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-multiline` | review manually |
| `aria-readonly` | `editable={false}` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-strong` | #d1d5db | #475569 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Record as exception, or provide a read-only syntax-highlighted CodeBlock.

- Location: `modules/ui/CodeEditor.tsx`, named export `CodeEditor` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `CodeEditorProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `CodeEditor` from the `modules/ui` barrel with its props type
- [ ] All 24 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (JavaScript readonly, Markdown editable)
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **read-only** implemented: `editable={false}` + sunken bg + label suffix
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-raised`, `surface-overlay`, `surface-sunken`, `text-primary`, `text-secondary`, `text-disabled`, `border`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
