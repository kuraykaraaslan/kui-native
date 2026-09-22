# Component status matrix

> Every KuiNative library export classified against its KuiReact counterpart. Re-classified 2026-09-22 through commit `0770214` (pixel-perfect pass, Wave 1 components, API parity on the original components, then Popover, DropdownMenu, Tooltip, Accordion, ButtonGroup, CheckboxGroup, SearchBar, Pagination, Stepper, Breadcrumb, PageHeader, MultiSelect and RangeSlider). Earlier classifications are in git history.

## Rubric

| Status | Definition |
| --- | --- |
| PARITY_COMPLETE | Every KuiReact prop, variant, size and state that is meaningful on RN exists with the same name and default; visuals use KuiReact's exact classes and tokens; tests and 1:1 showcase demos exist. |
| PARITY_MINOR_GAPS | Same names and API shape; gaps limited to a platform-adapted detail, a missing enumeration value, or one non-critical feature. |
| PARITY_MAJOR_GAPS | Names differ, or KuiReact-documented variants/states/features are missing. |
| REQUIRES_REWRITE | The API model differs so fundamentally that incremental fixes would break every call site anyway. |

## Summary

| Status | Count | Components |
| --- | --- | --- |
| PARITY_COMPLETE | 26 | Button, Card, Avatar, AvatarGroup, Badge, Input, Checkbox, Toggle, EmptyState, Separator, AlertBanner, RadioGroup, Textarea, Progress, Drawer, Toast, Tooltip, Accordion, ButtonGroup, CheckboxGroup, SearchBar, Pagination, Stepper, Breadcrumb, PageHeader, RangeSlider |
| PARITY_MINOR_GAPS | 10 | Spinner, Text (native-only), Skeleton, Modal, Label, TabGroup, Select, Popover, DropdownMenu, MultiSelect |
| PARITY_MAJOR_GAPS | 0 | — |
| REQUIRES_REWRITE | 0 | — |

Deprecated aliases keep older KuiNative call sites working: `Button label` / `destructive`, `Badge label` / `default`, `TextInput`, `Switch`, `Modal visible`, AvatarGroup children, `SkeletonCard.tsx`.

## Minor gaps

| Component | Remaining gap | Why |
| --- | --- | --- |
| Spinner | OS activity indicator instead of KuiReact's two-tone rotating ring | Visual only; sizes, label and colour match |
| Text | Geist not bundled (system font) | Native-only primitive; needs font assets |
| Skeleton | No `SkeletonTableRow` | Waits for Table |
| Modal | No `closeOnRouteChange`, no panel `ref` | KuiReact's own `closeOnRouteChange` is a stub |
| Label | No rest props; `htmlFor` adapted to `onPress` | No id-based label linking on RN |
| TabGroup | No arrow / Home / End keyboard navigation | Desktop keyboard pattern |
| Select | No close-on-outside-tap for the inline panel; plain mode uses the custom panel | RN has no `<select>` |
| Popover | Focus is not moved into the panel on open or returned to the trigger on close (screen-reader focus is kept inside via `accessibilityViewIsModal`) | Drawer / Modal already do this with `useFocusOnOpen`; the anchored panel does not yet |
| DropdownMenu | Same focus gap as Popover; Tab wrap not ported | Tab wrap is a desktop keyboard pattern |
| MultiSelect | Error state lacks KuiReact's `ring-1 ring-error` | Visual only; border and background match |

Common RN adaptations in the new components (not counted as gaps): hover → pressed state, `divide-*` → `border-t` / `border-l`, `bg-primary/20` computed from the hex token, Tooltip on long-press, anchored panels in a transparent RN `Modal` with outside-tap close, Escape → Android back, `href` → expo-router `router.push`, `onClick` → `onPress`.

Per-component detail: [feature-matrix/](../feature-matrix/README.md).
