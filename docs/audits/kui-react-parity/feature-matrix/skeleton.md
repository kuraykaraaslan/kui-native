# Feature matrix — Skeleton (KuiNative `SkeletonCard`)

> KuiReact `modules/ui/Skeleton.tsx` (60 LOC, 0 tests, 6 showcase variants; exports `SkeletonLine`, `SkeletonAvatar`, `SkeletonText`, `SkeletonCard`, `SkeletonTableRow`) ↔ KuiNative `modules/ui/SkeletonCard.tsx` (38 LOC, 0 tests, 1 demo; exports `SkeletonCard` only).
> **Status: PARITY_MAJOR_GAPS.**

## Exports

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `SkeletonLine` (`width`, `className`) | ✓ | ✗ | **Missing** |
| `SkeletonAvatar` (`size` sm/md/lg) | ✓ | ✗ | **Missing** |
| `SkeletonText` (`lines`, default 3; last line 80 %) | ✓ | ✗ | **Missing** |
| `SkeletonCard` | ✓ | ✓ | Present (layout differs) |
| `SkeletonTableRow` (`cols`) | ✓ | ✗ | Missing (only meaningful once Table exists) |
| File/module name | `Skeleton.tsx` | `SkeletonCard.tsx` | Differs |

## SkeletonCard design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Container | `bg-surface-raised border-border rounded-xl p-6 space-y-4` | same tokens, `p-4` | Differs (padding) |
| Content | avatar + 2 lines header, 3-line text block, 2 footer chips | 3 bars (50 %, 100 %, 83 %) | **Differs** (different skeleton shape) |
| Bar colour | `bg-surface-sunken` | `bg-surface-sunken` | Match |
| Animation | Tailwind `animate-pulse` (opacity 1 → 0.5, 2 s ease-in-out) | Animated opacity 0.3 ↔ 1, 700 ms each way (1.4 s cycle) | **Differs** (amplitude and rate — native flickers noticeably more) |
| Animation engine | CSS | legacy `Animated` (Reanimated 4 installed but unused) | Note |
| Reduced motion | ✗ | ✗ | Both missing (native should honour `useReducedMotion`) |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Busy semantics | `aria-busy="true"` + `aria-label="Loading content"` | `accessibilityRole="progressbar"` + label "Loading" | Match (adapted); add `accessibilityState.busy` |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Lines, Text block, Card, Table rows, Dashboard layout, Article layout | Loading | Gap |
| Tests | 0 | 0 | Both missing |
