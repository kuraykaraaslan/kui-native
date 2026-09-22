# Feature matrices

One file per component that exists in both libraries (plus `Text`, KuiNative-only). Status legend: **Match** · **Missing** (KuiReact has it, KuiNative doesn't) · **Differs** (both have it, incompatibly) · **Gap** (partial) · **Bug** (defect in KuiNative) · **N/A** (not applicable on the platform) · **Native-ahead** (KuiNative better than KuiReact).

| KuiReact | KuiNative | Matrix | Status |
| --- | --- | --- | --- |
| Button | Button | [button.md](button.md) | PARITY_MAJOR_GAPS |
| Card | Card | [card.md](card.md) | PARITY_MAJOR_GAPS |
| Avatar | Avatar | [avatar.md](avatar.md) | PARITY_MINOR_GAPS |
| AvatarGroup | AvatarGroup | [avatar.md](avatar.md#avatargroup) | REQUIRES_REWRITE |
| Badge | Badge | [badge.md](badge.md) | PARITY_MAJOR_GAPS |
| Input | TextInput | [input.md](input.md) | PARITY_MAJOR_GAPS |
| Checkbox | Checkbox | [checkbox.md](checkbox.md) | PARITY_MAJOR_GAPS |
| Toggle | Switch | [toggle.md](toggle.md) | PARITY_MAJOR_GAPS |
| Spinner | Spinner | [spinner.md](spinner.md) | PARITY_MINOR_GAPS |
| EmptyState | EmptyState | [empty-state.md](empty-state.md) | PARITY_MAJOR_GAPS |
| Skeleton (5 exports) | SkeletonCard | [skeleton.md](skeleton.md) | PARITY_MAJOR_GAPS |
| Modal | Modal | [modal.md](modal.md) | REQUIRES_REWRITE |
| — | Text | [text.md](text.md) | PARITY_MINOR_GAPS (native-only) |
