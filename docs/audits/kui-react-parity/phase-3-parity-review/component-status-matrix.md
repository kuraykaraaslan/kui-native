# Component status matrix

> Every KuiNative library export classified against its KuiReact counterpart. Re-classified 2026-09-22 after the pixel-perfect pass (`048ebed`) and the first Wave 1 components (`9f595c4`…`12b56f3`). The pre-fix classification is in git history.

## Rubric

| Status | Definition |
| --- | --- |
| PARITY_COMPLETE | Every KuiReact prop, variant, size and state that is meaningful on RN exists with the same name and default; visuals use KuiReact's exact classes/tokens; tests and 1:1 showcase demos exist. |
| PARITY_MINOR_GAPS | Same component and prop names and the same API shape; gaps limited to a platform-adapted detail, a missing enumeration value, or one non-critical feature. |
| PARITY_MAJOR_GAPS | Component or prop **names** differ, or KuiReact-documented variants/states/features are missing, so KuiReact usages cannot be ported mechanically. Fixable incrementally. |
| REQUIRES_REWRITE | The API model differs so fundamentally that incremental fixes would break every call site anyway. |

## Summary

| Status | Count | Components |
| --- | --- | --- |
| PARITY_COMPLETE | 7 | Avatar, EmptyState, Separator, AlertBanner, RadioGroup, Textarea, Progress |
| PARITY_MINOR_GAPS | 6 | Spinner, Text (native-only), Skeleton, Modal, Label, TabGroup |
| PARITY_MAJOR_GAPS | 6 | Button, Card, Badge, TextInput (Input), Checkbox, Switch (Toggle) |
| REQUIRES_REWRITE | 1 | AvatarGroup |

Every component now renders with KuiReact's exact classes. The remaining MAJOR entries are **API** gaps (names and missing props), not visual ones.

## Per component

### Button — PARITY_MAJOR_GAPS
Pixel-perfect since `048ebed` (rounded-md, font-medium, full xs–xl ladder). Still open: `label` instead of `children`, `destructive` instead of `danger`, no `iconRight` / `iconOnly` / `selected`, no rest props or ref. → [matrix](../feature-matrix/button.md)

### Card — PARITY_MAJOR_GAPS
Pixel-perfect (header/body/footer sections, typography, shadow, `flat`, `headerRight`). Still open: interactive `onPress` (KuiReact `onClick`), `hoverable`, `loading`. → [matrix](../feature-matrix/card.md)

### Avatar — PARITY_COMPLETE
48/64px lg/xl, borders, status dot, `?` fallback, `src: string | null`; tests. Image-error fallback is better than KuiReact's. → [matrix](../feature-matrix/avatar.md)

### AvatarGroup — REQUIRES_REWRITE
Still children-based; KuiReact's is data-driven (`avatars`, `max`, overlap, `+N`). → [rewrite](rewrite-candidates.md#avatargroup)

### Badge — PARITY_MAJOR_GAPS
Visual already matched KuiReact's `md`. Still open: `label` vs `children`, `default` vs `neutral`, `size`, `dot`, `dismissible`. → [matrix](../feature-matrix/badge.md)

### TextInput — PARITY_MAJOR_GAPS
Pixel-perfect field (rounded-md, py-2, text-sm, error background, disabled look). Still open: the `Input` name, `success`, `required`, prefix/suffix, clearable, counter, password toggle, typed ref, and errors announced to screen readers. → [matrix](../feature-matrix/input.md)

### Checkbox — PARITY_MAJOR_GAPS
Pixel-perfect (16px box, border-border, gap-3, items-start). Still open: `hint`, `error`, uncontrolled `defaultChecked`. → [matrix](../feature-matrix/checkbox.md)

### Switch — PARITY_MAJOR_GAPS
Rebuilt as KuiReact's custom track (sizes, description, whole-row press, single a11y element). Still open: the names (`Switch`/`value`/`onValueChange` vs `Toggle`/`checked`/`onChange`). → [matrix](../feature-matrix/toggle.md)

### Spinner — PARITY_MINOR_GAPS
Five sizes, overridable label, a11y fixed. Remaining: OS indicator instead of KuiReact's two-tone ring. → [matrix](../feature-matrix/spinner.md)

### EmptyState — PARITY_COMPLETE
48px circle, text-disabled icon, text-sm title, py-16, optional icon (IconDefinition or node), KuiReact's `action` node (plus the `actionLabel`/`onAction` shorthand). → [matrix](../feature-matrix/empty-state.md)

### Skeleton — PARITY_MINOR_GAPS
SkeletonLine/Avatar/Text/Card with KuiReact's shapes and pulse timing, reduce-motion aware. Remaining: `SkeletonTableRow` (needs Table). → [matrix](../feature-matrix/skeleton.md)

### Modal — PARITY_MINOR_GAPS
Rebuilt on KuiReact's panel; sizes, fullscreen, scrollable, backdrop option, motion, a11y fixed. Remaining: `closeOnRouteChange`, a panel `ref` (KuiReact's `reducedMotion` is a TODO there; KuiNative honours the OS setting automatically). → [matrix](../feature-matrix/modal.md)

### Text — PARITY_MINOR_GAPS (native-only)
Real bold/semibold weights, `title`/`titleSm`, header role. Remaining: Geist font not bundled. → [matrix](../feature-matrix/text.md)

### Label — PARITY_MINOR_GAPS
Remaining: no rest props; `htmlFor` adapted to `onPress`. → [matrix](../feature-matrix/label.md)

### Separator — PARITY_COMPLETE → [matrix](../feature-matrix/separator.md)
### AlertBanner — PARITY_COMPLETE → [matrix](../feature-matrix/alert-banner.md)
### RadioGroup — PARITY_COMPLETE → [matrix](../feature-matrix/radio-group.md)
### Textarea — PARITY_COMPLETE → [matrix](../feature-matrix/textarea.md)

### TabGroup — PARITY_MINOR_GAPS
Remaining: KuiReact's desktop keyboard navigation. → [matrix](../feature-matrix/tab-group.md)

### Progress — PARITY_COMPLETE → [matrix](../feature-matrix/progress.md)
