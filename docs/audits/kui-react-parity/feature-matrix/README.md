# Feature matrices

One file per component that exists in both libraries (plus `Text`, KuiNative-only). Status legend: **Match** · **Missing** · **Differs** · **Gap** (partial) · **Bug** · **N/A** (not applicable on the platform) · **Native-ahead** · **Adapted** (same outcome, platform-specific mechanism).

The matrices for the original twelve components keep their audit-time detail and carry **Update** blocks for the pixel-perfect pass (`048ebed`) and the API-parity work. Popover, DropdownMenu and MultiSelect share the anchored overlay core (`Overlays/shared/AnchoredPanel`: `useAnchor`, `computePosition`, `AnchoredPanel`, plus `useTrigger`), which renders panels in a transparent RN `Modal` window with outside-tap and Android-back close; Tooltip renders inline, as in KuiReact.

| KuiReact | KuiNative | Matrix | Status |
| --- | --- | --- | --- |
| Button | Button | [button.md](button.md) | PARITY_COMPLETE |
| Card | Card | [card.md](card.md) | PARITY_COMPLETE |
| Avatar / AvatarGroup | Avatar / AvatarGroup | [avatar.md](avatar.md) | PARITY_COMPLETE |
| Badge | Badge | [badge.md](badge.md) | PARITY_COMPLETE |
| Input | Input (`TextInput` alias) | [input.md](input.md) | PARITY_COMPLETE |
| Checkbox | Checkbox | [checkbox.md](checkbox.md) | PARITY_COMPLETE |
| Toggle | Toggle (`Switch` alias) | [toggle.md](toggle.md) | PARITY_COMPLETE |
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
| Select | Select | [select.md](select.md) | PARITY_MINOR_GAPS |
| Drawer | Drawer | [drawer.md](drawer.md) | PARITY_COMPLETE |
| Toast | Toast suite | [toast.md](toast.md) | PARITY_COMPLETE |
| Popover | Popover | [popover.md](popover.md) | PARITY_MINOR_GAPS |
| DropdownMenu | DropdownMenu | [dropdown-menu.md](dropdown-menu.md) | PARITY_MINOR_GAPS |
| Tooltip | Tooltip | [tooltip.md](tooltip.md) | PARITY_COMPLETE |
| Accordion | Accordion | [accordion.md](accordion.md) | PARITY_COMPLETE |
| ButtonGroup | ButtonGroup | [button-group.md](button-group.md) | PARITY_COMPLETE |
| CheckboxGroup | CheckboxGroup | [checkbox-group.md](checkbox-group.md) | PARITY_COMPLETE |
| SearchBar | SearchBar | [search-bar.md](search-bar.md) | PARITY_COMPLETE |
| Pagination | Pagination | [pagination.md](pagination.md) | PARITY_COMPLETE |
| Stepper | Stepper | [stepper.md](stepper.md) | PARITY_COMPLETE |
| Breadcrumb | Breadcrumb | [breadcrumb.md](breadcrumb.md) | PARITY_COMPLETE |
| PageHeader | PageHeader | [page-header.md](page-header.md) | PARITY_COMPLETE |
| MultiSelect | MultiSelect | [multi-select.md](multi-select.md) | PARITY_MINOR_GAPS |
| RangeSlider | RangeSlider | [range-slider.md](range-slider.md) | PARITY_COMPLETE |
