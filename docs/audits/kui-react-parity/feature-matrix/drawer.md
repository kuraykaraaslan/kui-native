# Feature matrix — Drawer

> KuiReact `modules/ui/Overlays/Drawer/index.tsx` (120 LOC + shared overlay hooks, 8 tests, 3 showcase variants) ↔ KuiNative `modules/ui/Drawer.tsx` (added 2026-09-22, on `Overlays/shared`, 9 tests, 3 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `open`, `onClose`, `title`, `side` (default right), `children`, `footer`, `className` | ✓ | ✓ | Match |
| `closeOnRouteChange` | accepted, no-op (M6 stub) | accepted, no-op | Match |
| `reducedMotion` | accepted, TODO | accepted; the OS Reduce Motion setting is always honoured | Native-ahead |
| `portalTarget`, `ref` | ✓ | — | N/A (RN Modal window) / Gap (ref) |
| Panel | `w-80 max-w-full h-full bg-surface-raised shadow-xl`, border on the inner edge | same (+ Android elevation, safe-area padding) | Match |
| Motion | 200ms slide, backdrop fade | same, via the shared `usePresence` | Match |
| Header / body / footer | `px-4 py-4` + divider / scrolling `px-4 py-4` / `px-4 py-4` + divider | same; footer buttons inline with no gap, as KuiReact renders them | Match |
| Close | Escape, backdrop, "Close drawer" button | Android back, backdrop, "Close drawer" button | Match (adapted) |
| Accessibility | dialog, aria-modal, aria-label = title, focus trap | accessibilityViewIsModal, label = title, focus moved to the title | Match (adapted) |
| Tests | 8 | 9 (KuiReact's cases ported) | Match |
| Showcase | Right drawer, Left drawer, Route-aware close (M6 stub) | same titles and copy | Match |
