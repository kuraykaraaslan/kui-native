# Feature matrices

One file per component that exists in both libraries (plus `Text`, KuiNative-only). Status legend: **Match** · **Missing** (KuiReact has it, KuiNative doesn't) · **Differs** (both have it, incompatibly) · **Gap** (partial) · **Bug** (defect in KuiNative) · **N/A** (not applicable on the platform) · **Native-ahead** (KuiNative better than KuiReact) · **Adapted** (same outcome, platform-specific mechanism).

The matrices for the original twelve components record the audit-time state and carry an **Update** block describing what the pixel-perfect pass (`048ebed`) changed.

| KuiReact | KuiNative | Matrix | Status |
| --- | --- | --- | --- |
| Button | Button | [button.md](button.md) | PARITY_MAJOR_GAPS |
| Card | Card | [card.md](card.md) | PARITY_MAJOR_GAPS |
| Avatar | Avatar | [avatar.md](avatar.md) | PARITY_COMPLETE |
| AvatarGroup | AvatarGroup | [avatar.md](avatar.md#avatargroup) | REQUIRES_REWRITE |
| Badge | Badge | [badge.md](badge.md) | PARITY_MAJOR_GAPS |
| Input | TextInput | [input.md](input.md) | PARITY_MAJOR_GAPS |
| Checkbox | Checkbox | [checkbox.md](checkbox.md) | PARITY_MAJOR_GAPS |
| Toggle | Switch | [toggle.md](toggle.md) | PARITY_MAJOR_GAPS |
| Spinner | Spinner | [spinner.md](spinner.md) | PARITY_MINOR_GAPS |
| EmptyState | EmptyState | [empty-state.md](empty-state.md) | PARITY_COMPLETE |
| Skeleton | SkeletonLine / Avatar / Text / Card | [skeleton.md](skeleton.md) | PARITY_MINOR_GAPS |
| Modal | Modal | [modal.md](modal.md) | PARITY_MINOR_GAPS |
| — | Text | [text.md](text.md) | PARITY_MINOR_GAPS (native-only) |
| Label | Label | [label.md](label.md) | PARITY_MINOR_GAPS |
| Separator | Separator | [separator.md](separator.md) | PARITY_COMPLETE |
| AlertBanner | AlertBanner | [alert-banner.md](alert-banner.md) | PARITY_COMPLETE |
| RadioGroup | RadioGroup | [radio-group.md](radio-group.md) | PARITY_COMPLETE |
| Textarea | Textarea | [textarea.md](textarea.md) | PARITY_COMPLETE |
| TabGroup | TabGroup | [tab-group.md](tab-group.md) | PARITY_MINOR_GAPS |
| Progress | Progress | [progress.md](progress.md) | PARITY_COMPLETE |
