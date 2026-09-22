# Feature matrix — DropdownMenu

> KuiReact `modules/ui/DropdownMenu.tsx` (112 LOC + `useFocusTrap`; 11 tests, 2 showcase variants) ↔ KuiNative `modules/ui/DropdownMenu.tsx` (added 2026-09-22 in `68ce86d`, on `Overlays/shared/AnchoredPanel` + `useTrigger`; 9 tests, 2 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `trigger`, `items`, `header`, `align` (default left), `className` | ✓ | ✓ | Match |
| Items: `{ label, icon?, danger?, disabled? }` and `{ type: 'separator' }` | ✓ | ✓ (a string `icon` such as "✏" is rendered as text, as KuiReact's demos use glyphs) | Match |
| `onClick` | ✓ | `onPress` | Match (onClick → onPress, approved) |
| Trigger | `cloneElement` with `aria-haspopup="menu"`, `aria-expanded`, chained `onClick` | toggle chained into the trigger's `onPress`; `accessibilityState.expanded` + "Opens a menu" hint | Match (adapted) |
| Menu | `mt-1 min-w-[10rem] rounded-lg border border-border bg-surface-raised shadow-lg py-1`, `left-0` / `right-0` | same, 4px below the measured trigger, start / end aligned, in a transparent RN `Modal` window (+ Android elevation) | Match (adapted) |
| Header | `border-b border-border mb-1` | same | Match |
| Item | `flex w-full items-center gap-2 px-3 py-2 text-sm`, danger = `text-error`, `opacity-50` when disabled | same | Match |
| Item hover | `hover:bg-surface-overlay` / `hover:bg-error-subtle` | pressed state with the same tokens | Adapted |
| Separator | `my-1 border-t border-border`, `role="separator"` | same look; no role (RN has none) | Match (adapted) |
| Close | select, outside mousedown, Escape | select, outside tap, Android back | Match (adapted) |
| Roles | `menu` / `menuitem` | `menu` / `menuitem` + disabled state | Match |
| Focus | focus moved to the first item on open, returned to the trigger on Escape, Tab wraps (disabled items skipped) | `accessibilityViewIsModal`; no focus move / return; Tab wrap not ported | Gap: focus management; Tab wrap is a desktop keyboard pattern |
| Tests | 11 | 9 (the 3 keyboard-focus cases are N/A; expanded state and class checks added) | Match |
| Showcase | Default, Right-aligned | same titles and copy | Match |
