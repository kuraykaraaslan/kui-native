# Feature matrix — Button

> KuiReact `modules/ui/Button.tsx` (91 LOC, 12 tests, 12 showcase variants, **137 production imports**, the most-used KuiReact component) ↔ KuiNative `modules/ui/Button.tsx` (89 LOC, 0 tests, 3 showcase demos).
> **Status: PARITY_MAJOR_GAPS.** Details: [component-status-matrix](../phase-3-parity-review/component-status-matrix.md#button)

## API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Content model | `children?: ReactNode` | `label: string` (**required**) | **Differs**: rich content (icons inline, counts, `<Trans>`) impossible; every KuiReact usage needs rewriting |
| Press handler | `onClick` (DOM, via rest) | `onPress?: () => void` | Match (platform rename) |
| `variant` values | `primary · secondary · ghost · danger · outline` | `primary · secondary · outline · ghost · destructive` | **Differs**: `danger` ≠ `destructive` |
| `variant` default | `primary` | `primary` | Match |
| `size` values | `xs · sm · md · lg · xl` | `sm · md · lg` | **Missing** `xs`, `xl` |
| `size` default | `md` | `md` | Match |
| `loading` | ✓ | ✓ | Match |
| `disabled` | ✓ (native attr via rest) | ✓ explicit prop | Match |
| `iconLeft` | ✓ | ✓ | Match |
| `iconRight` | ✓ | ✗ | **Missing** |
| `iconOnly` (square padding map) | ✓ | ✗ | **Missing** |
| `fullWidth` | ✓ | ✓ | Match |
| `selected` (toggle-button state) | ✓ `aria-pressed` + ring | ✗ | **Missing** |
| Polymorphic `as` | ✓ (`as="a"`, Link) | ✗ | N/A on RN — recommend `asChild` for expo-router `Link` (Gap) |
| `type` submit/reset | ✓ default `button` | — | N/A (no native forms) |
| Test id | `data-testid` | ✗ (no `testID`, no rest spread) | **Missing** |
| Rest props passthrough | ✓ `...rest` to element | ✗ — only 9 named props | **Missing**: no `onLongPress`, `hitSlop`, `accessibilityHint`, `testID` |
| Ref | ✓ (React 19 `ref` via rest) | ✗ | **Missing** |
| `className` merge via `cn()` | ✓ | ✓ | Match |
| Exported props type | ✗ (not exported from barrel) | ✓ `ButtonProps` | Native-ahead |

## Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Radius | `rounded-md` | `rounded-lg` | **Differs** |
| Font weight | `font-medium` | `font-semibold` | **Differs** |
| Padding sm | `px-3 py-1.5` | `px-3 py-1.5` | Match |
| Padding md | `px-4 py-2` | `px-4 py-2.5` | **Differs** (+4 px height) |
| Padding lg | `px-5 py-2.5` | `px-5 py-3` | **Differs** |
| Text size sm/md/lg | `text-sm / text-sm / text-base` | `text-sm / text-sm / text-base` | Match |
| Variant colours (bg/fg) | primary `bg-primary text-primary-fg` … danger `bg-error text-text-inverse`, outline `border-border` | identical tokens | Match |
| Hover / pressed colour | `hover:bg-primary-hover`, ghost/outline `hover:bg-surface-overlay`, danger `hover:opacity-90` | `active:opacity-80` for every variant | **Gap**: `*-hover`/`*-active`/`surface-overlay` tokens unused; pressed feedback should use them |
| Focus ring | `focus-visible:ring-2 ring-border-focus` | none | **Missing** (matters on RN-web, Android TV, hardware keyboards) |
| Disabled | `opacity-50 cursor-not-allowed` | `opacity-50` | Match |
| Selected ring | `ring-2 ring-border-focus` | — | Missing |
| Loading indicator | 16 px CSS ring in `currentColor` | `ActivityIndicator` coloured `primary-fg` / `primary` | Match (adapted); colour for `secondary`/`destructive` uses `primary-fg` rather than the variant's fg token — acceptable (both white) |
| Gap between icon and label | `gap-2` | `gap-2` | Match |

## Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Loading hides icons | ✓ (left + right) | ✓ (left) | Match |
| Loading blocks interaction | ✗ — only `aria-busy`; button stays clickable | ✓ `disabled = disabled \|\| loading` | **Differs** (KuiNative is safer; record the decision and ideally fix KuiReact) |
| Keyboard activation | Enter/Space (native button, tested) | n/a on native; RN-web Pressable handles Enter | Partial |

## Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Role | implicit `button` | `accessibilityRole="button"` | Match |
| Accessible name | children text / `aria-label` for `iconOnly` | `accessibilityLabel={label}` — always the label, not overridable | Gap (no override; `iconOnly` impossible) |
| Busy | `aria-busy` | `accessibilityState.busy` | Match |
| Disabled | native `disabled` | `accessibilityState.disabled` | Match |
| Pressed/selected | `aria-pressed` | — | Missing |
| Decorative icons hidden | `aria-hidden` on icon spans | `iconLeft` rendered raw, can be announced | **Gap** |

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase variants | 12 (Primary, Secondary, Ghost, Danger, Outline, Disabled, Sizes, Icon left/right, Icon only, Full width, Selected, Loading) | 3 (Variants, Sizes, Loading/disabled) | Gap |
| Unit tests | 12 cases (`Button.test.tsx`) | 0 | **Missing** |
| Visual regression | Playwright snapshots | none | Missing |

## Required changes (R-button)

1. Replace `label` with `children` (wrap string children in `Text` internally; keep `label` as deprecated alias for one release).
2. Rename `destructive` → `danger`; add `xs`/`xl`; add `iconRight`, `iconOnly`, `selected`.
3. Spread `...rest: PressableProps` and forward `ref`; accept `testID`.
4. Align radius `rounded-md`, weight `font-medium`, md/lg padding.
5. Pressed state: `active:bg-primary-hover` (etc.) instead of opacity; focus style on RN-web.
6. Hide decorative icons from the a11y tree; `accessibilityState.selected` for `selected`.
7. Port the 12 KuiReact test cases (minus `type`/`as`).
