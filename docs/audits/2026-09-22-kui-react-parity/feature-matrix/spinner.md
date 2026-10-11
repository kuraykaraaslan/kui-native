# Feature matrix — Spinner

> KuiReact `modules/ui/Spinner.tsx` (33 LOC, 0 tests, 2 showcase variants) ↔ KuiNative `modules/ui/Spinner.tsx` (54 LOC, **8 tests**, 2 demos).
> **Status: PARITY_MINOR_GAPS — fixed 2026-09-22** (API shape identical; visual rendering approach still differs by design; the enumeration bug is resolved).

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `size` values | `xs · sm · md · lg · xl` | `xs · sm · md · lg · xl` | ✅ **Fixed** — full 5-value ladder |
| `size` default | `md` | `md` | Match |
| Size rendering | 12 / 16 / 24 / 32 / 48 px | native `small`/`large` scaled via `transform: [{ scale }]` (xs 0.7 · sm 1 · md 1.3 · lg 1 · xl 1.4) — 5 visually distinct steps | ✅ **Fixed** (approach differs, outcome matches: every size is now distinguishable) |
| Visual | two-tone ring: `border-border` + `border-t-primary`, rotating | OS `ActivityIndicator` (spokes on iOS, arc on Android) | **Differs** (kept as a documented platform choice — see Required changes below for the alternative) |
| Colour | `primary` (via class) | `primary` via `useThemeTokens`, overridable `color` prop | Match + native-only `color` |
| `className` | ✓ | ✓ (on wrapper) | Match |
| a11y: label | spinner `aria-hidden` + sr-only "Loading…" | `accessibilityLabel` prop, defaults to `"Loading"`, now overridable | ✅ **Fixed** — KuiNative is ahead (KuiReact's label is not overridable) |
| a11y: registers with assistive tech | implicit (native `<span>` + sr-only text always renders) | ✅ **Fixed bug**: the wrapping `View` now has `accessible={true}`. Without it, a `View`'s `accessibilityRole` is not exposed to screen readers or to role-based test queries — RN's own documented behavior, not a testing-library quirk. Confirmed via `getByRole("progressbar")` failing before the fix and passing after. | Match |
| Reduced motion | ✗ | ✗ (OS indicator) | Match |
| Showcase | Sizes, In a Button | Sizes (all 5), In a Button | ✅ **Fixed** — both KuiReact variants now reproduced |
| Tests | 0 | **8** (`Spinner.test.tsx`): role/label render, custom color, custom `accessibilityLabel` clears the default, and one case per size | KuiNative ahead |

## Required changes — remaining

The only open item is cosmetic: KuiReact's two-tone rotating ring vs. the OS `ActivityIndicator`. Options, in order of fidelity to KuiReact:

1. Replace `ActivityIndicator` with a `react-native-reanimated` `Animated.View` styled as a ring (`borderColor: border`, `borderTopColor: primary`) driven by `withRepeat(withTiming(360deg))` — reproduces KuiReact's look exactly and keeps the same five discrete sizes.
2. Keep the OS indicator (current state) and record the visual difference as an approved platform exception in `parity.exceptions.json`, since it costs nothing further and both platforms already read clearly as "loading".

No further prop/API work is needed — `size`, `color`, `accessibilityLabel`, and `className` now match KuiReact's contract (`onDismiss`-style raw hex/animation internals aside).
