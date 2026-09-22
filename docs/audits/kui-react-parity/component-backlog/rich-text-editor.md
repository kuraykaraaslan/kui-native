# RichTextEditor

> Backlog item · KuiReact id `rich-text-editor` · layer `app` · **Advanced Components** · Priority **Low** · Complexity **Very Large** · Wave 3 · Fit `adapt` · est. 10–20 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Quill 2.x WYSIWYG editor with token-tinted snow theme. Production features: controlled value, imperative ref API, onBlur, name+hidden-form-sync, drag-and-drop image upload with onImageUpload callback, paste sanitization (Word / GDocs cleanup), char + word counter with maxLength, autosave to localStorage, markdown shortcuts, color + highlight, sub/sup, indent/outdent, horizontal rule, tables, emoji picker, @-mentions, /-slash command menu, selection bubble menu, image resize/align overlay, fullscreen mode. Pixel-identical EJS sibling at modules/app/RichTextEditor.ejs.

**Why it matters for KuiNative:** Quill-based editor (2.1k LOC); Quill is DOM-only.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/RichTextEditor/index.tsx` (17 files, 1972 LOC) |
| Public export | `@/modules/app/RichTextEditor/index` — source-only (not exported from a barrel) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | Empty + counter, Pre-populated, Read-only, Max length (200 chars), Mentions + slash commands, Imperative ref API, Form integration, Autosave |
| Composes | Button (exists as `Button`), ColorPicker (missing), Input (exists as `TextInput`), Modal (exists as `Modal`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `zustand` |
| Unit tests | none |
| Interaction flags | focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/RichTextEditor/index.tsx`. Uses `forwardRef` — KuiNative must forward a typed ref. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `name` | `string` | no | — |  | same |
| `label` | `string` | no | — |  | same |
| `hint` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `value` | `string` | no | — |  | same |
| `defaultValue` | `string` | no | — |  | same |
| `onChange` | `(html: string, delta?: unknown) => void` | no | — |  | same |
| `onBlur` | `(html: string) => void` | no | — |  | same |
| `placeholder` | `string` | no | — |  | same |
| `readOnly` | `boolean` | no | — |  | same |
| `minHeight` | `number` | no | — |  | same |
| `maxLength` | `number` | no | — |  | same |
| `showCounter` | `boolean` | no | — |  | same |
| `showWordCount` | `boolean` | no | — |  | same |
| `onImageUpload` | `(file: File) => Promise<string>` | no | — |  | same |
| `sanitizeOnPaste` | `boolean` | no | — |  | same |
| `autosaveKey` | `string` | no | — |  | same |
| `mentions` | `MentionUser[]` | no | — |  | same |
| `slashItems` | `SlashCommand[]` | no | — |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Empty + counter

```tsx
const [body, setBody] = useState('');
<RichTextEditor
  id="article-body"
  label="Article body"
  value={body}
  onChange={setBody}
  showCounter
  showWordCount
/>
```

### Pre-populated

```tsx
<RichTextEditor
  id="release-notes"
  label="Release notes"
  defaultValue={initial}
  onChange={setBody}
/>
```

### Read-only

```tsx
<RichTextEditor
  id="archived"
  defaultValue={savedHtml}
  readOnly
/>
```

### Max length (200 chars)

```tsx
<RichTextEditor
  id="short-summary"
  maxLength={200}
  showCounter
/>
```

### Mentions + slash commands

```tsx
<RichTextEditor
  id="comment"
  mentions={[
    { id: 'u1', label: 'Jane Doe', description: 'Designer' },
    { id: 'u2', label: 'John Smith', description: 'Engineer' },
  ]}
  slashItems={[
    { id: 'h1', label: 'Heading 1', action: (q) => q.format('header', 1, 'user') },
    { id: 'list', label: 'Bullet list', action: (q) => q.format('list', 'bullet', 'user') },
  ]}
/>
```

### Imperative ref API

```tsx
const ref = useRef<RichTextEditorHandle>(null);
<RichTextEditor ref={ref} id="reply" />
ref.current?.focus();
ref.current?.clear();
ref.current?.insertHTML('<p>Hi!</p>');
const text = ref.current?.getText();
```

### Form integration

```tsx
<form action="/api/post" method="post">
  <RichTextEditor id="post" name="body" defaultValue={savedHtml} />
  <button type="submit">Save</button>
</form>
```

### Autosave

```tsx
<RichTextEditor
  id="draft"
  autosaveKey="my-draft"
  placeholder="Survives page refresh…"
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |
| read-only | `readOnly` | sunken background, not editable | `editable={false}` + sunken bg + label suffix |
| selected / active | `value` | highlighted | `accessibilityState.selected` |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="dialog"` | `accessibilityRole="none` + `accessibilityViewIsModal"` |
| `role="grid"` | `accessibilityRole="grid"` |
| `role="gridcell"` | review manually |
| `role="listbox"` | `accessibilityRole="list"` |
| `role="option"` | review manually |
| `role="toolbar"` | `accessibilityRole="toolbar"` |
| `aria-describedby` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |
| `aria-label` | `accessibilityLabel` |
| `aria-pressed` | `accessibilityState.selected` |
| `aria-selected` | `accessibilityState.selected` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |

Use NativeWind classes (`bg-surface-base`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Button — exists as `Button`
- ColorPicker — missing → [backlog](color-picker.md)
- Input — exists as `TextInput`
- Modal — exists as `Modal`

**Blocked by (roadmap):** `color-picker`, `R-button`, `R-input`, `R-modal`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`, `zustand`

**Suggested RN libraries:** `WebView-based editor`

## Implementation Notes

Evaluate `@10play/tentap-editor` (TipTap in WebView). Large effort.

- Location: `modules/app/RichTextEditor.tsx`, named export `RichTextEditor` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `RichTextEditorProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `RichTextEditor` from the `modules/app` barrel with its props type
- [ ] All 21 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 8 KuiReact variants (Empty + counter, Pre-populated, Read-only, Max length (200 chars), Mentions + slash commands, Imperative ref API, Form integration, Autosave)
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] State **read-only** implemented: `editable={false}` + sunken bg + label suffix
- [ ] State **selected / active** implemented: `accessibilityState.selected`
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`surface-base`, `surface-sunken`, `surface-raised`, `surface-overlay`, `text-primary`, `text-secondary`, `text-disabled`, `border`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
