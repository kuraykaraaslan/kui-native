# Feature matrix — Text (KuiNative-only)

> KuiReact has **no** `Text`/`Typography`/`Heading` component (verified: no such export in `modules/` or `libs/`). Typography is expressed with Tailwind classes inline. React Native requires every string to sit inside `<Text>`, so KuiNative needs this primitive. It is audited against KuiReact's *de facto* typography.
> **Status (2026-09-22): PARITY_MINOR_GAPS.** Audit-time detail below; see the Update block for what changed.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- Headings render real bold / semibold (numeric `fontWeight`; the old family swap left them regular on iOS, web and Android).
- `title` / `titleSm` variants anchored to KuiReact's component-title typography.
- Heading variants default to the `header` role; typed `ref`; 14 tests.

**Still open**

- Geist / Geist Mono not bundled (system font).

## Scale vs KuiReact usage

| KuiNative variant | KuiNative classes | Where KuiReact uses a comparable style | Status |
| --- | --- | --- | --- |
| `h1` | `text-3xl` | not used by any audited shared component | Unanchored |
| `h2` | `text-2xl` | PageHeader title `text-2xl font-bold` | Match size; weight bug (below) |
| `h3` | `text-xl` | — (KuiNative Modal uses it; KuiReact Modal title is `text-base font-semibold`) | Misapplied |
| `h4` | `text-lg` | — (KuiNative Card/EmptyState use it; KuiReact uses `text-sm font-semibold`) | Misapplied |
| `body` | `text-base text-text-primary` | body copy | Match |
| `bodySm` | `text-sm text-text-secondary` | descriptions `text-sm text-text-secondary` | Match |
| `label` | `text-sm text-text-primary` (medium) | Label/Input/Checkbox `text-sm font-medium` | Match |
| `caption` | `text-xs text-text-secondary` | hints `text-xs text-text-secondary` | Match |
| — | — | card/section titles `text-sm font-semibold` (Card, EmptyState) and `text-base font-semibold` (Modal, Drawer) | **Missing** variants (`title`, `titleSm`) |

## Fonts and weights

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Sans family | **Geist** (`next/font`, `--font-geist-sans`) | OS system font; README says "to match KUIREACT's Inter" | **Differs**, and the README is wrong (Inter ≠ Geist) |
| Mono family | Geist Mono | Menlo / monospace | Differs |
| Heading weight | `font-semibold` / `font-bold` classes | `fontFamily` only, **no `fontWeight`**. iOS/web `System` has no weight in its name → h1–h4 render **regular weight**. Android `bold: "sans-serif"` is also the regular family | **Bug** |
| Consumer font override | class wins | inline `style={{fontFamily}}` is applied before user `style` but after NativeWind classes, so `className="font-mono"` cannot override the family | Gap |

## API

| Feature | KuiNative | Note |
| --- | --- | --- |
| `variant` (8) | ✓ | |
| RN `TextProps` spread | ✓ | good (numberOfLines, accessibilityRole…) |
| `accessibilityRole="header"` for h1–h4 | ✗ | Gap — headings are not announced as headings |
| Exported type | ✓ `TextProps` | |

## Recommendation (R-typography)

1. Add `fontWeight` (or `font-semibold`/`font-bold` classes) to heading variants; fix Android bold family.
2. Bundle Geist + Geist Mono with `expo-font`; update README (Inter → Geist).
3. Add KuiReact-anchored variants `title` (`text-base font-semibold`) and `titleSm` (`text-sm font-semibold`); switch Card/Modal/EmptyState to them.
4. Default `accessibilityRole="header"` on heading variants.
5. Record `Text` in `parity.exceptions.json` as native-only with this rationale.
