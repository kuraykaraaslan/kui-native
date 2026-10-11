# Feature matrix — Modal

> KuiReact `modules/ui/Overlays/Modal/index.tsx` (145 LOC + shared overlay hooks, 7 tests, 5 showcase variants, 11 production imports) ↔ KuiNative `modules/ui/Modal.tsx` (51 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): PARITY_MINOR_GAPS.** Audit-time detail below; see the Update block for what changed.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- Rebuilt: `surface-raised rounded-xl shadow-xl` panel; header (title, description, close button, divider), body, footer (divider, right-aligned actions), all `px-6 py-4`.
- `open` (with `visible` as a deprecated alias), required `title`, `description`, `size`, `fullscreen`, `scrollable`, `closeOnBackdropClick`.
- Fade + scale 95% → 100% over 200ms; exit animation; skipped with Reduce Motion.
- Backdrop is a sibling of the panel, so VoiceOver no longer merges the dialog; focus moves to the title; keyboard avoiding; Android status bar covered.
- 11 tests (KuiReact's Modal cases ported); showcase uses KuiReact's five demos.

**Still open**

- `closeOnRouteChange`; a panel `ref`.

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Visibility prop | `open` | `visible` | **Differs** |
| `onClose` (required) | ✓ | ✓ | Match |
| `title` | **required** (dialog must be named) | optional | **Differs** |
| `description` | ✓ | ✗ | **Missing** |
| `children` / `footer` | ✓ / ✓ | ✓ / ✓ | Match |
| `size` `sm · md · lg` (default md) | ✓ | ✗ (fixed `max-w-md`) | **Missing** |
| `fullscreen` | ✓ | ✗ | **Missing** |
| `scrollable` body | ✓ | ✗ | **Missing** |
| `closeOnBackdropClick` (default true) | ✓ | ✗ (always closes) | **Missing** |
| `closeOnRouteChange` | accepted (no-op stub) | ✗ | Gap (map to expo-router blur) |
| `reducedMotion` | accepted (TODO) | ✗ | Gap |
| `portalTarget` | ✓ | — | N/A (RN Modal is its own window) |
| `ref` to panel | ✓ | ✗ | Missing |
| `className` on panel | ✓ | ✓ | Match |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Panel background | `bg-surface-raised` | `bg-surface-base` | **Differs** |
| Radius | `rounded-xl` | `rounded-2xl` | **Differs** |
| Shadow | `shadow-xl` | none | **Gap** |
| Structure | header (`px-6 py-4 border-b`) · body (`px-6 py-4`) · footer (`px-6 py-4 border-t`, right-aligned `gap-2`) | single `p-5` box; footer `mt-4 justify-end gap-2`, no dividers | **Differs** |
| Title | `text-base font-semibold` | `h3` → `text-xl` (regular weight on iOS) | **Differs** |
| Close (×) button | ✓ top-right, `text-text-disabled` | ✗ | **Missing** |
| Backdrop | `bg-black/50` | `rgba(0,0,0,0.5)` | Match |
| Outer padding | `p-4` | `px-6` | Differs |
| Enter/exit motion | backdrop fade + panel scale 95→100 %, 200 ms, exit animated via `usePresence` (250 ms) | `animationType="fade"` (whole window) | Differs |

## Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Dismiss: Escape / Android back | Escape (focus trap) | `onRequestClose` (Android back) | Match (adapted) |
| Backdrop press closes | configurable | always | Gap |
| Long content | `scrollable` → `overflow-y-auto` | overflows off-screen (no ScrollView, no max height) | **Bug** |
| Keyboard avoidance | n/a | none — inputs in the modal are covered by the keyboard | **Gap** |
| Android status bar | n/a | `statusBarTranslucent` not set → backdrop leaves status bar uncovered | Gap |
| Scroll lock | `useScrollLock` | inherent | Match |
| Nested modals | layer-aware Escape (showcase) | untested | Unknown |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Dialog semantics | `role="dialog"` `aria-modal` `aria-labelledby` `aria-describedby` | `accessibilityViewIsModal` (iOS only) | Partial |
| Focus management | focus trap, initial focus, restore on close | none | **Gap** (`AccessibilityInfo.setAccessibilityFocus` on title) |
| Accessibility tree | normal | **Backdrop `Pressable` wraps the whole panel, and the panel is itself a `Pressable`** — both are `accessible` by default, so iOS VoiceOver collapses the entire modal (title, content, footer buttons) into one element | **Critical bug** |
| Backdrop labelled | `aria-hidden` | unlabeled pressable | Gap |
| Close button label | "Close dialog" | — | Missing |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Confirmation dialog, Sizes, Scrollable body, Fullscreen, Nested modals | Confirm | Gap |
| Unit tests | 7 cases (closed renders nothing, labelledby/describedby, Escape, backdrop click, `closeOnBackdropClick=false`, close button, footer) | 0 | **Missing** |
