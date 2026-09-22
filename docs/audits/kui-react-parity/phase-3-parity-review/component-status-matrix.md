# Component status matrix

> Every KuiNative library export classified against its KuiReact counterpart. Re-classified 2026-09-22 through commit `599c8a1` (pixel-perfect pass, Wave 1 components, API parity on the original components). Earlier classifications are in git history.

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
| PARITY_COMPLETE | 16 | Button, Card, Avatar, AvatarGroup, Badge, Input, Checkbox, Toggle, EmptyState, Separator, AlertBanner, RadioGroup, Textarea, Progress, Drawer, Toast |
| PARITY_MINOR_GAPS | 7 | Spinner, Text (native-only), Skeleton, Modal, Label, TabGroup, Select |
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

Per-component detail: [feature-matrix/](../feature-matrix/README.md).
