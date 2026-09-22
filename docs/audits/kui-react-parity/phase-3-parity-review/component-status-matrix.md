# Component status matrix

> Every KuiNative library export classified against its KuiReact counterpart. 2026-09-22.

## Rubric

| Status | Definition |
| --- | --- |
| PARITY_COMPLETE | Every KuiReact prop, variant, size and state that is meaningful on RN exists with the same name and default; visuals are token-equivalent; tests and showcase demos exist. |
| PARITY_MINOR_GAPS | Same component and prop names and the same API shape; gaps limited to missing enumeration values, cosmetic token/spacing deviations, or one non-critical feature. |
| PARITY_MAJOR_GAPS | Component or prop **names** differ, or KuiReact-documented variants/states/features are missing, so KuiReact usages cannot be ported mechanically. Fixable incrementally. |
| REQUIRES_REWRITE | The API model or internal structure differs so fundamentally (or has critical defects) that incremental fixes would touch most of the file and break every call site anyway. |

Note: no KuiNative component has tests, so **none can be PARITY_COMPLETE** under this rubric regardless of API.

## Summary

| Status | Count | Components |
| --- | --- | --- |
| PARITY_COMPLETE | 0 | — |
| PARITY_MINOR_GAPS | 3 | Avatar, Spinner (fixed this pass — size ladder + a11y bug — pending re-audit against every KuiReact detail before reclassifying to COMPLETE), Text (native-only) |
| PARITY_MAJOR_GAPS | 8 | Button, Card, Badge, TextInput (Input), Checkbox, Switch (Toggle), EmptyState, SkeletonCard (Skeleton) |
| REQUIRES_REWRITE | 2 | Modal, AvatarGroup |

## Per component

### Button
**Status: PARITY_MAJOR_GAPS** · KuiReact `Button`
`label: string` instead of `children`; `destructive` instead of `danger`; missing `xs`/`xl`, `iconRight`, `iconOnly`, `selected`; no rest/ref/testID; radius and weight differ; hover/active tokens unused. Colours, loading, disabled and fullWidth match. → [matrix](../feature-matrix/button.md)

### Card
**Status: PARITY_MAJOR_GAPS** · KuiReact `Card`
Missing `flat`, `headerRight`, interactive `onPress`, `loading`; single padded box instead of header/body/footer sections; title typography far larger; no shadow. → [matrix](../feature-matrix/card.md)

### Avatar
**Status: PARITY_MINOR_GAPS** · KuiReact `Avatar`
Same props and sizes; missing `status` dot; `lg`/`xl` pixel sizes differ (56/80 vs 48/64); empty name renders nothing instead of `?`. Image-error fallback is better than KuiReact. → [matrix](../feature-matrix/avatar.md)

### AvatarGroup
**Status: REQUIRES_REWRITE** · KuiReact `AvatarGroup`
Children-based flex row vs data-driven `avatars/max/size` with overlap and `+N` chip. Shares only the name. → [rewrite](rewrite-candidates.md#avatargroup)

### Badge
**Status: PARITY_MAJOR_GAPS** · KuiReact `Badge`
`label` vs `children`; `default` vs `neutral`; missing `size`, `dot`, `dismissible`. The md visual is an exact match. → [matrix](../feature-matrix/badge.md)

### TextInput
**Status: PARITY_MAJOR_GAPS** · KuiReact `Input`
Different name; 8 KuiReact features missing (success, required, prefix/suffix, clearable, counter, password toggle, number stepper, readOnly/disabled styling); untyped ref; `className` targets a different element; hint/error not exposed to assistive tech. → [matrix](../feature-matrix/input.md)

### Checkbox
**Status: PARITY_MAJOR_GAPS** · KuiReact `Checkbox`
Missing `hint`, `error`, uncontrolled mode. Boolean `onChange` is an approved improvement. → [matrix](../feature-matrix/checkbox.md)

### Switch
**Status: PARITY_MAJOR_GAPS** · KuiReact `Toggle`
Different component name and prop names (`value/onValueChange` vs `checked/onChange`); missing `description`, `size`, `ariaLabel`; label not pressable; two accessibility focus stops; OS rendering differs from KuiReact's custom track. → [matrix](../feature-matrix/toggle.md)

### Spinner
**Status: PARITY_MINOR_GAPS** · KuiReact `Spinner` · **fixed 2026-09-22**
Now has all 5 sizes (xs–xl) via a scale transform on `ActivityIndicator`, `size="sm"` and `size="md"` are visually distinct, `accessibilityLabel` is overridable, and the component carries `accessible` so its `accessibilityRole="progressbar"` actually registers (previously it did not — see [B5, AX-Spinner]). Remaining gap: OS indicator shape instead of KuiReact's two-tone rotating ring. Has a real test suite (8 cases). → [matrix](../feature-matrix/spinner.md)

### EmptyState
**Status: PARITY_MAJOR_GAPS** · KuiReact `EmptyState`
`icon: IconDefinition` (always shown) vs optional `ReactNode`; `actionLabel/onAction` vs `action: ReactNode`; spacing and title size differ. → [matrix](../feature-matrix/empty-state.md)

### SkeletonCard
**Status: PARITY_MAJOR_GAPS** · KuiReact `Skeleton` module
Only 1 of 5 exports; card layout and pulse timing differ; no reduced-motion. → [matrix](../feature-matrix/skeleton.md)

### Modal
**Status: REQUIRES_REWRITE** · KuiReact `Modal`
`visible` vs `open`; 7 props missing; no close button; long content overflows; nested accessible Pressables merge the whole dialog into one VoiceOver element; no focus management; no keyboard avoidance. → [rewrite](rewrite-candidates.md#modal)

### Text
**Status: PARITY_MINOR_GAPS (native-only)** · no KuiReact counterpart
Required by RN. Heading variants render regular weight on iOS/web (no `fontWeight`); scale not anchored to KuiReact usage; Geist not loaded. → [matrix](../feature-matrix/text.md)
