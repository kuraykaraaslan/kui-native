# Feature matrix — AlertBanner

> KuiReact `modules/ui/AlertBanner.tsx` (93 LOC, 0 tests, 7 showcase variants) ↔ KuiNative `modules/ui/AlertBanner.tsx` (added 2026-09-22, 13 tests, 7 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `variant` success / warning / error / info (default info) | subtle bg + solid border + `*-fg` text | same tokens | Match |
| Layout | `flex items-start gap-3 rounded-lg border p-4` | same | Match |
| `title` / `message` | `font-semibold` title, `mt-0.5` message, `text-sm` | same | Match |
| Default icons | circle-check / triangle-exclamation / circle-xmark / circle-info, 16px | same Font Awesome icons, 16px, `*-fg` colour | Match |
| `icon` override | ReactNode | ReactNode | Match |
| `dismissible` | × button labelled "Dismiss", local state | same | Match |
| `action` | `{ label, href?, onClick? }`, `text-xs font-semibold underline` | `{ label, href?, onPress? }`; `href` via `Linking.openURL` | Match (onClick → onPress is an approved rename) |
| Accessibility | `role="alert"` on the box | alert role + polite live region on the text block, so the CTA and Dismiss stay separate elements | Adapted |
| Showcase | Info, Success, Warning, Error, With CTA action, Link CTA (action.href), Custom icon | same titles and copy | Match |
