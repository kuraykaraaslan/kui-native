# 04 · API differences

> Summary of [phase-3-parity-review/api-differences.md](phase-3-parity-review/api-differences.md). Per-component tables: [feature-matrix/](feature-matrix/README.md).

**41 of 80** KuiReact prop names on shared components exist in KuiNative (51 %). **22 of 38** variant/size values match. **9 of 11** component names match.

## Top issues

| # | Issue | Components | Impact |
| --- | --- | --- | --- |
| A1 | Content via `label: string` instead of `children` | Button, Badge | Breaks the two most-used KuiReact components (246 production imports combined) |
| A2 | Renamed components/props: `Input→TextInput`, `Toggle→Switch`, `danger→destructive`, `neutral→default`, `open→visible`, `checked/onChange→value/onValueChange` | Input, Toggle, Button, Badge, Modal | A KuiReact developer guesses wrong |
| A3 | No `...rest` / typed `ref` | 9 of 12 exports | No `testID`, `accessibilityHint`, `hitSlop`, focus chaining |
| A4 | Missing variants/sizes | Button xs/xl, Badge sizes, Card flat, Spinner xs/xl, Toggle sizes, Modal sizes/fullscreen | |
| A5 | Missing feature props (30+) | all but Spinner | see list in phase-3 |
| A6 | Incompatible prop shapes | EmptyState `icon`/`action`, AvatarGroup | |
| A7 | Accessible-name props optional | Input, Checkbox, Toggle labels; Modal title | unlabeled controls possible |
| A9 | Checkbox controlled-only | Checkbox | |

## Approved deviations (record in `parity.exceptions.json`)

`onClick → onPress`, DOM events → value callbacks (`onChangeText`, `onChange(boolean)`), `id`/`htmlFor` → `nativeID`/`accessibilityLabel`, no polymorphic `as`, no `type`, no `portalTarget`.

## KuiNative ahead

Exported `*Props` types for every component; Spinner `color`; typed host-prop spread on Card/Text/TextInput; boolean Checkbox `onChange`.
