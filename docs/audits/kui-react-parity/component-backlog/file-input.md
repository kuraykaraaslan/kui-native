# FileInput

> Backlog item · KuiReact id `file-input` · layer `ui` · **Forms** · Priority **Medium** · Complexity **Medium** · Wave 2 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Drag-and-drop file upload with validation, file list, and individual remove actions. M1 adds paste-from-clipboard, `accept` MIME-pattern + extension validation, and `maxFiles` enforcement with i18n messages. Pixel-identical EJS sibling at modules/ui/FileInput/FileInput.ejs.

**Why it matters for KuiNative:** File selection; RN has no `<input type=file>`.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/FileInput/index.tsx` (2 files, 391 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Single file, Multiple files, With upload action, Paste from clipboard, Disabled |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | keyboard handling, focus-visible ring, sr-only text, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/FileInput/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | **yes** | — |  | → `nativeID` / `testID` (RN needs no id for label wiring) |
| `label` | `string` | no | — |  | same |
| `hint` | `string` | no | — |  | same |
| `multiple` | `boolean` | no | `false` |  | same |
| `accept` | `string` | no | — |  | same |
| `maxSizeBytes` | `number` | no | — |  | same |
| `maxFiles` | `number` | no | — |  | same |
| `allowedTypes` | `string[]` | no | — |  | same |
| `disabled` | `boolean` | no | — |  | same |
| `required` | `boolean` | no | — |  | same |
| `name` | `string` | no | — |  | same |
| `enablePaste` | `boolean` | no | `false` |  | same |
| `onFiles` | `(files: File[]) => void` | no | — |  | same |
| `onUpload` | `(files: File[]) => Promise<void>` | no | — |  | same |
| `uploadLabel` | `string` | no | `'Upload'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `messages` | `Partial<FileInputMessages>` | no | — |  | same |

## Variants

### Single file

```tsx
<FileInput id="photo" label="Profile photo" hint="PNG or JPG, max 2 MB"
  accept="image/*" maxSizeBytes={2097152} />
```

### Multiple files

```tsx
<FileInput id="attachments" label="Attachments" multiple hint="Up to 5 MB each" maxSizeBytes={5242880} />
```

### With upload action

```tsx
<FileInput id="attachments" label="Project attachments" multiple maxSizeBytes={5242880}
  onUpload={uploadFiles} uploadLabel="Upload" />
```

### Paste from clipboard

```tsx
<FileInput id="screenshots" label="Screenshot drop" multiple enablePaste
  accept="image/*" maxFiles={4} maxSizeBytes={4 * 1024 * 1024}
  hint="Drop, browse, or paste a screenshot (Cmd/Ctrl + V)." />
```

### Disabled

```tsx
<FileInput id="upload" label="Disabled upload" disabled />
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| disabled | `disabled` | opacity-50, not interactive | `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50` |
| required | `required` | asterisk + sr-only (required) | asterisk + "required" in accessibilityLabel |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="status"` | `accessibilityRole="summary"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).
- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-fg` | #7f1d1d | #fee2e2 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-active` | #1d4ed8 | #1d4ed8 | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |
| `primary-hover` | #2563eb | #93c5fd | ✓ |
| `primary-subtle` | #eff6ff | #1e3a5f | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-disabled` | #9ca3af | #475569 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** `R-field-shell`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `expo-document-picker`, `expo-image-picker`

## Implementation Notes

`expo-document-picker` / `expo-image-picker`; keep `accept`, `multiple`, `onFiles` naming (map accept → MIME types). Drag-and-drop is not applicable.

- Location: `modules/ui/FileInput.tsx`, named export `FileInput` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FileInputProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `FileInput` from the `modules/ui` barrel with its props type
- [ ] All 17 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Single file, Multiple files, With upload action, Paste from clipboard, Disabled)
- [ ] State **disabled** implemented: `disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`
- [ ] State **required** implemented: asterisk + "required" in accessibilityLabel
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-fg`, `error-subtle`, `primary`, `primary-active`, `primary-fg`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
