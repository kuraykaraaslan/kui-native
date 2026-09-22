# API differences

> Shared components only. Evidence: parsed prop types from both repos (see `phase-1-inventory/kui-native-components.md` and each backlog/feature-matrix file).

## Cross-cutting findings

### A1 — Content passed as `label: string` instead of `children` (Button, Badge)
KuiReact: `<Button>Save</Button>`, `<Badge variant="success">Paid</Badge>`. KuiNative: `<Button label="Save" />`, `<Badge label="Paid" />`. These are the two most-imported KuiReact components (137 and 109 production imports), so this single decision makes almost every KuiReact snippet non-portable. RN can accept `children` and wrap strings in `Text` internally. **Fix:** accept `children`; keep `label` as a deprecated alias.

### A2 — Renamed components and props
| KuiReact | KuiNative | Kind |
| --- | --- | --- |
| `Input` | `TextInput` | component |
| `Toggle` | `Switch` | component |
| `Skeleton` module (`SkeletonLine`…) | `SkeletonCard` file | module |
| `Button variant="danger"` | `variant="destructive"` | value |
| `Badge variant="neutral"` (default) | `variant="default"` | value |
| `Toggle checked / onChange` | `Switch value / onValueChange` | props |
| `Modal open` | `Modal visible` | prop |
| `Input className` (wrapper) | `TextInput className` (field) + `containerClassName` (wrapper) | semantics |

KuiNative adopted RN primitive naming (`TextInput`, `Switch`, `visible`, `onValueChange`). The stated goal ("a developer familiar with KuiReact should immediately understand KuiNative") and KuiReact ADR 0003 ("same prop names and defaults, so porting is a mechanical rename, not a redesign") both require KuiReact names. **Fix:** rename, export the RN-style names as deprecated aliases for one minor version.

### A3 — No rest-prop spread and no refs on most components
KuiReact spreads `...rest` onto the root on 8 of 11 shared components and forwards `ref` on Button (React 19 prop), Input (`forwardRef`, tested) and Modal (`ref` prop). KuiNative spreads host props only on Card, Text and TextInput and forwards no typed ref. Consequences: no `testID` (so no E2E selectors — KuiReact's Button has `data-testid`), no `accessibilityHint`, no `hitSlop`, no `onLongPress`, and no programmatic focus for form field chaining. **Fix:** every component accepts `...rest` of its host props and a typed `ref`.

### A4 — Missing variants and sizes
| Component | Missing |
| --- | --- |
| Button | sizes `xs`, `xl` |
| Badge | `size` prop entirely (`sm`, `md`, `lg`) |
| Card | variant `flat` |
| Spinner | sizes `xs`, `xl` (and `md` renders as `sm`) |
| Toggle | `size` prop entirely |
| Modal | `size` prop entirely, `fullscreen` |

### A5 — Missing feature props
Button `iconRight`, `iconOnly`, `selected` · Card `headerRight`, `onPress`, `loading` · Avatar `status` · Badge `dot`, `dismissible`, `onDismiss` · Input `success`, `required`, `prefixIcon`, `suffixIcon`, `clearable`, `onClear`, `showCount` (+ counter), password toggle, number stepper · Checkbox `hint`, `error`, `defaultChecked` · Toggle `description`, `ariaLabel` · Modal `description`, `scrollable`, `closeOnBackdropClick`, `closeOnRouteChange`, `reducedMotion` · Skeleton `SkeletonLine`, `SkeletonAvatar`, `SkeletonText`, `SkeletonTableRow`.

### A6 — Different prop shapes
| Component | KuiReact | KuiNative |
| --- | --- | --- |
| EmptyState | `icon?: ReactNode`, `action?: ReactNode` | `icon?: IconDefinition` (default `faInbox`), `actionLabel` + `onAction` |
| AvatarGroup | `avatars: {src,name}[]`, `max`, `size` | `children`, `className` |
| Avatar | `src?: string \| null` | `src?: string` |

### A7 — Required-ness differs
KuiReact requires `label` on Input, Checkbox, Toggle and `title` on Modal (accessible name guaranteed by the type system). KuiNative makes all four optional. **Fix:** require them (or require an `accessibilityLabel` alternative).

### A8 — Callback signatures
| Component | KuiReact | KuiNative | Verdict |
| --- | --- | --- | --- |
| Button | `onClick(e)` | `onPress()` | approved platform rename |
| Checkbox | `onChange(event)` | `onChange(next: boolean)` | approved — better, and consistent with KuiReact's own Toggle; document |
| Toggle | `onChange(checked)` | `onValueChange(next)` | rename to `onChange` |
| Input | `onChange(event)` | `onChangeText(text)` (RN) | approved platform difference |

### A9 — Controlled/uncontrolled
KuiReact Checkbox works uncontrolled (`defaultChecked`) because it wraps a native input. KuiNative Checkbox requires `checked` (controlled only). Toggle is controlled in both. Modal is controlled in both.

### A10 — Where KuiNative is ahead
- Exports a `*Props` type for every component (KuiReact's ui barrel exports none of them).
- `Spinner` accepts `color`.
- `Card`/`Text`/`TextInput` spread typed host props (KuiReact Card uses `Record<string, unknown>`).
- Checkbox's boolean `onChange`.

## Per-component tables

See the API section of each [feature matrix](../feature-matrix/README.md).
