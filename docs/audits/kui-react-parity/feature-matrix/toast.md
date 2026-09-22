# Feature matrix — Toast

> KuiReact `modules/ui/Toast/` (≈700 LOC: store, API, Region, ToastItem, ProgressBar; 0 tests, 5 showcase variants) ↔ KuiNative `modules/ui/Toast/` (added 2026-09-22, 15 tests, 5 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `toast()`, `.success/.error/.warning/.info/.loading`, `.promise`, `.update`, `.dismiss`, `.clear` | ✓ | ✓ (ported verbatim) | Match |
| Store: variant durations (5s; error / loading persistent), `duration: 0`, FIFO `max` | ✓ | ✓ | Match |
| `useToast()`, `useToastStore`, `getEffectiveDuration` | ✓ | ✓ | Match |
| `<Toaster position max gap reducedMotion messages>` | ✓ | ✓ | Match |
| Six positions + per-toast `position` | fixed regions | absolute regions with safe-area insets | Match (adapted) |
| Back-compat `ToastProvider`, `ToastRegion`, `Toast` | ✓ | ✓ | Match |
| Card | `w-80 rounded-xl border shadow-lg`, variant surfaces, `px-4 pt-4 pb-3`, 16px icon, text-sm title / message, × close | same | Match |
| Actions | `{ label, onClick(dismiss), variant }`, text-xs, danger = text-error, default underlined | `onPress(dismiss)` | Match (onClick → onPress, approved) |
| Countdown bar | `h-0.5`, 50% opacity fill, 50ms tick | same | Match |
| Motion | 250ms opacity / translate-y / scale | same | Match |
| Pause | hover, hidden tab | press-and-hold, app in background | Adapted |
| Accessibility | status + polite (success/info/loading), alert + assertive (warning/error) | same roles + live regions + `announceForAccessibility` | Match |
| Swipe to dismiss | M3 stub | — | Match (neither implements it) |
| Above modals | above everything (fixed, z-90) | not above an open RN `Modal` (separate native window) | Gap (platform) |
| Showcase | Variants, Title + Message, Actions, Loading & Promise, toast.promise() API | same titles, KuiReact's Turkish copy verbatim | Match |
