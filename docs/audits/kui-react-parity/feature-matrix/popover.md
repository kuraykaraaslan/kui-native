# Feature matrix — Popover

> KuiReact `modules/ui/Overlays/Popover/index.tsx` (73 LOC + `useDismiss`, `useFocusTrap`, `positioning`; 5 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Popover.tsx` (added 2026-09-22 in `68ce86d`, on `Overlays/shared/AnchoredPanel` + `useTrigger`; 13 tests, 3 demos).
> **Status: PARITY_MINOR_GAPS**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `trigger`, `children`, `placement` (default bottom), `className` (on the panel), `focusTrap` (default true) | ✓ | ✓ | Match |
| Trigger | wrapping `<div onClick>` toggles | toggle injected into the trigger element's own `onPress` (its original `onPress` still runs); non-elements wrapped in a Pressable | Adapted: the inner Pressable claims the touch on RN |
| Panel | `min-w-[12rem] rounded-lg border border-border bg-surface-raised shadow-xl` | same (+ Android elevation) | Match |
| Placement | `mt-2` / `mb-2` / `mr-2` / `ml-2`, start-aligned, absolute inside a `relative` wrapper | 8px beyond the measured trigger, start-aligned, in a transparent RN `Modal` window | Adapted: an absolute panel would be clipped by `overflow-hidden` ancestors and could not catch outside taps |
| Screen edges | panel may overflow the viewport | panel is kept 8px inside the screen horizontally | Native-ahead |
| Close | outside pointerdown, Escape (layer-aware `useDismiss`) | outside tap, Android back, pressing the trigger again | Match (adapted) |
| Focus | focus moved into the panel (`role="dialog"`, `tabIndex=-1`), Tab trapped, focus returned to the trigger on Escape | `accessibilityViewIsModal` keeps screen-reader focus inside; no explicit focus move on open or return on close | Gap: focus is not moved / restored (Drawer and Modal do this via `useFocusOnOpen`) |
| Trigger state | — | `accessibilityState.expanded` | Native-ahead |
| `z-[70]` layering | ✓ | separate native window | N/A |
| Tests | 5 | 13 (KuiReact's cases mapped to RN, plus `computePosition` placement cases) | Match |
| Showcase | Bottom (default), Placements, Focus trap inside Popover | same titles and copy | Match |
