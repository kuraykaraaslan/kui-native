# Feature matrix — Popconfirm

> KuiReact `modules/ui/Popconfirm.tsx` (94 LOC + `useFocusTrap` / `useDismiss` / `positioning`; 6 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Popconfirm.tsx` (added 2026-09-22 in `44cdca3`, on `Overlays/shared/AnchoredPanel` + `useTrigger`; 8 tests, 2 demos).
> **Status: PARITY_COMPLETE** (was PARITY_MINOR_GAPS; initial focus added in `02d510b`)

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `trigger`, `title`, `description`, `confirmLabel` (default "Confirm"), `cancelLabel` (default "Cancel"), `danger`, `placement` (default bottom), `onConfirm`, `onCancel`, `className` | ✓ | ✓ | Match |
| Panel | `w-72 rounded-lg border border-border bg-surface-raised p-4 shadow-xl`, 8px from the trigger (`mt-2` / `mb-2` / `mr-2` / `ml-2`) | same classes, 8px gap, start-aligned, in a transparent RN `Modal` window (+ Android elevation) | Match (adapted) |
| Content | question icon (`text-warning`, `text-error` when `danger`), `text-sm font-medium` title, `text-xs` description, ghost Cancel + primary / danger Confirm (`size="sm"`) | same | Match |
| Confirm / cancel | close, then `onConfirm` / `onCancel` | same | Match |
| Close | outside click, Escape (no confirm) | outside tap, Android back (no confirm) | Match (adapted) |
| Accessibility | `role="alertdialog"`, `aria-modal`, `aria-label` = string title or "Confirm action" | `role="alertdialog"`, same label, `accessibilityViewIsModal`; trigger gets expanded state | Match |
| Focus | focus moved into the panel on open and returned to the trigger on Escape (`useFocusTrap`) | contained by `accessibilityViewIsModal`; screen-reader focus sent to Cancel once the window is shown (`AnchoredPanel onShow`, `02d510b`); not explicitly returned to the trigger | Match (adapted; return-to-trigger is a keyboard pattern, as DropdownMenu) |
| Tests | 6 | 8 (KuiReact's cases ported; the focus assertions are replaced by an initial-focus case (`02d510b`) and modal / Android-back checks, plus a class check) | Match |
| Showcase | Default, Danger + description | same titles and copy | Match |
