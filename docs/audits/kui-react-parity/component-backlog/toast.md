# Toast

> Backlog item · KuiReact id `toast` · layer `ui` · **Feedback** · Priority **Critical** · Complexity **Medium** · Wave 1 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Notification system with success/warning/error/info/loading variants. Hover-to-freeze, progress bar, title, actions, and promise support.

**Why it matters for KuiNative:** Transient notifications with a programmatic `toast()` store are required by virtually every app; KuiReact exports Toast, ToastProvider, ToastRegion, useToastStore, toast().

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/Toast/index.tsx` (7 files, 733 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-02 |
| Showcase variants | Variants, Title + Message, Actions, Loading & Promise, toast.promise() API |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 0 showcase file(s) |
| Third-party imports | `zustand`, `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, reduced-motion aware, animated/transitions, hover styles |

## Required Props

Parsed from `modules/ui/Toast/index.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `variant` | `ToastItem['variant']` | no | `'info'` |  | same |
| `message` | `string` | **yes** | — |  | same |
| `duration` | `number` | no | — |  | same |
| `onDismiss` | `() => void` | no | — |  | same |
| `action` | `{ label: string; onClick: () => void }` | no | — |  | same |

## Variants

### Variants

```tsx
toast.success('Kaydedildi.');
toast.info('Güncelleme mevcut.');
toast.warning('Oturum sona eriyor.');
toast.error('Sunucu hatası.'); // persistent
```

### Title + Message

```tsx
toast.success('Dosya yüklendi.', { title: 'Yükleme tamamlandı' });
toast.error('Sunucuya bağlanılamadı.', { title: 'Bağlantı hatası' });
```

### Actions

```tsx
toast.info('Öğe silindi.', {
  title: 'Silindi',
  actions: [
    { label: 'Geri Al', onClick: (dismiss) => { undo(); dismiss(); } },
    { label: 'Kalıcı sil', onClick: (d) => { purge(); d(); }, variant: 'danger' },
  ],
});
```

### Loading & Promise

```tsx
// Loading state (persistent until updated)
toast.loading('İşleniyor...');

// Promise: auto-transitions loading → success/error
toast.promise(fetchData(), {
  loading: 'Yükleniyor...',
  success: (data) => `${data.name} hazır.`,
  error: 'Yüklenemedi.',
});
```

### toast.promise() API

```tsx
// Single call drives one toast through loading → success | error.
// Strings or value-aware functions are accepted for success/error.
toast.promise(fetchUser(), {
  loading: 'Kullanıcı yükleniyor...',
  success: (u) => `${u.name} (#${u.id}) yüklendi.`,
  error:   (e) => `Hata: ${(e as Error).message}`,
});

// Error path resolves to an assertive role="alert" toast.
toast.promise(fetchBroken(), {
  loading: 'İstek gönderiliyor...',
  success: 'Tamamlandı!',
  error:   (e) => `Başarısız: ${(e as Error).message}`,
});
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `role="role"` | review manually |
| `role="status"` | `accessibilityRole="summary"` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `error` | #ef4444 | #f87171 | ✓ |
| `error-subtle` | #fef2f2 | #450a0a | ✓ |
| `info` | #06b6d4 | #22d3ee | ✓ |
| `info-subtle` | #ecfeff | #083344 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `success` | #22c55e | #4ade80 | ✓ |
| `success-fg` | #14532d | #bbf7d0 | ✓ |
| `success-subtle` | #f0fdf4 | #052e16 | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |
| `warning` | #f59e0b | #fbbf24 | ✓ |
| `warning-subtle` | #fffbeb | #451a03 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** `zustand`, `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `zustand`, `react-native-reanimated`, `react-native-safe-area-context`

## Implementation Notes

Port the Zustand store verbatim (`useToastStore`, `toast`, `getEffectiveDuration`). Render a `ToastRegion` in a root-level absolutely-positioned View inside SafeArea; Reanimated enter/exit; swipe-to-dismiss via gesture-handler. Announce with `AccessibilityInfo.announceForAccessibility`.

- Location: `modules/ui/Toast.tsx`, named export `Toast` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ToastProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Toast` from the `modules/ui` barrel with its props type
- [ ] All 5 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 5 KuiReact variants (Variants, Title + Message, Actions, Loading & Promise, toast.promise() API)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `error`, `error-subtle`, `info`, `info-subtle`, `primary`, `success`, …); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
