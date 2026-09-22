# ProductImageGallery

> Backlog item · KuiReact id `commerce-product-image-gallery` · layer `domain` · **Domain — Commerce** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](../../README.md)

## Overview

Product image viewer: large main image with a thumbnail strip below. Hovering a thumbnail instantly swaps the main image via crossfade. When the image count exceeds thumbsVisible (default 5), the strip grows left/right arrows and becomes a slider.

**Why it matters for KuiNative:** Industry-vertical demo component. KuiReact's own ADR 0003 records this vertical as React-only for KuiEJS; treat it the same way for KuiNative unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/domains/commerce/product/ProductImageGallery.tsx` (1 file, 155 LOC) |
| Public export | `@/modules/domains/commerce` — source-public (vertical barrel; not in npm package) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | 4 görsel — thumbnail strip, 8 görsel — slider aktif, Video aspect ratio |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 2 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/domains/commerce/product/ProductImageGallery.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `images` | `ProductGalleryImage[]` | **yes** | — |  | same |
| `thumbsVisible` | `number` | no | `5` |  | same |
| `aspect` | `'square' \| 'video' \| 'portrait'` | no | `'square'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### 4 görsel — thumbnail strip

```tsx
<ProductImageGallery
  images={[
    { src: '/front.jpg',   alt: 'Front view' },
    { src: '/side.jpg',    alt: 'Side view' },
    { src: '/on-desk.jpg', alt: 'On desk' },
    { src: '/profile.jpg', alt: 'Profile' },
  ]}
  thumbsVisible={5}
/>
```

### 8 görsel — slider aktif

```tsx
// 8 images, thumbsVisible=5 → arrows appear automatically
<ProductImageGallery
  images={productImages}
  thumbsVisible={5}
/>
```

### Video aspect ratio

```tsx
<ProductImageGallery
  images={productImages}
  aspect="video"
  thumbsVisible={5}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `aspect`: 'square' · 'video' · 'portrait' (default 'square')

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
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-label` | `accessibilityLabel` |
| `aria-pressed` | `accessibilityState.selected` |

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
| `border-strong` | #d1d5db | #475569 | ✓ |
| `surface-overlay` | #f3f4f6 | #334155 | ✓ |
| `surface-sunken` | #e5e7eb | #1e293b | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** the primitives above reaching parity

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

## Implementation Notes

- Location: `modules/domains/commerce/ProductImageGallery.tsx`, named export `ProductImageGallery` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ProductImageGalleryProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.
- Domain component: create `modules/domains/commerce/` with a barrel; do not import across verticals (KuiReact enforces this with `check:cross-vertical`).

## Acceptance Criteria

- [ ] Exported as `ProductImageGallery` from the `modules/domains/commerce` barrel with its props type
- [ ] All 4 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 3 KuiReact variants (4 görsel — thumbnail strip, 8 görsel — slider aktif, Video aspect ratio)
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border`, `border-focus`, `border-strong`, `surface-overlay`, `surface-sunken`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
