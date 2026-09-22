# Feature matrix — TagInput

> KuiReact `modules/ui/TagInput.tsx` (150 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/TagInput.tsx` (added 2026-09-22 in `77ce794`; 10 tests, 2 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `hint`, `error`, `value`, `onChange(tags)`, `placeholder` (default "Type and press Enter or comma…"), `disabled`, `className` | ✓ | ✓ | Match |
| Adding | Enter or comma, trimmed, duplicates ignored, pending text added on blur | Enter (submit key) or comma, same rules; several comma-separated parts pasted at once are added in one update (KuiReact adds them one by one from a stale `value`) | Match |
| Removing | chip × button, Backspace on an empty input removes the last tag | same | Match |
| Editing | double-click a chip; Enter / blur saves, Escape cancels | double-tap (300 ms) or long-press a chip; submit / blur saves | Adapted (no Escape on touch) |
| Field | `min-h-10 rounded-md border px-3 py-2`, chips `rounded-full bg-primary-subtle text-primary text-xs px-2 py-0.5`, `focus-within:ring-2 ring-border-focus`, disabled `opacity-50 bg-surface-sunken` | same | Match |
| Error look | `border-error ring-1 ring-error bg-error-subtle` | `border-error bg-error-subtle` | Gap: no `ring-1` |
| Helper text | hint, else "Double-click a tag to edit it" when there are tags, error `role="alert"` | same strings | Match |
| Accessibility | label `htmlFor`, `aria-describedby`, "Remove {tag}" buttons | labelled input with hint / error as hint, labelled chips with an edit hint, "Remove {tag}" buttons, error alert | Match (adapted) |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Default, Empty / Error | same titles and data | Match |
