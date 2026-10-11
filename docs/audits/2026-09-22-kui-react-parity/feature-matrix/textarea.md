# Feature matrix — Textarea

> KuiReact `modules/ui/Textarea.tsx` (69 LOC, 0 tests, 4 showcase variants) ↔ KuiNative `modules/ui/Textarea.tsx` (added 2026-09-22, 9 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `label` (required), `hint`, `error`, `required`, `disabled` | ✓ | ✓ (label via `Label`) | Match |
| `rows` (default 4) | browser line count | minHeight = rows × 20px + padding + border (identical box) | Match |
| Field classes | `rounded-md border px-3 py-2 text-sm`, `border-border bg-surface-base` | same | Match |
| Error | `border-error ring-1 ring-error bg-error-subtle` | `border-error bg-error-subtle` | Match (no ring concept on RN) |
| Disabled | `opacity-50 bg-surface-sunken` | same, `editable={false}` | Match |
| Focus | `ring-2 ring-border-focus border-border-focus` | `border-border-focus` | Match (adapted) |
| Ref | `forwardRef` | typed `ref` prop | Match |
| `id` / `aria-describedby` | ✓ | accessibilityLabel / accessibilityHint | Adapted |
| `resize-y` | ✓ | n/a | N/A |
| Showcase | Default, Error, Disabled, Character counter | same titles and copy | Match |
