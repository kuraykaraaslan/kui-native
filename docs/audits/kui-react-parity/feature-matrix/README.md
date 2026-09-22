# Feature matrices

One file per component that exists in both libraries (plus `Text`, KuiNative-only). Status legend: **Match** · **Missing** · **Differs** · **Gap** (partial) · **Bug** · **N/A** (not applicable on the platform) · **Native-ahead** · **Adapted** (same outcome, platform-specific mechanism) · **Deviation** (deliberate difference, e.g. a KuiReact bug not reproduced).

The matrices for the original twelve components keep their audit-time detail and carry **Update** blocks for the pixel-perfect pass (`048ebed`) and the API-parity work. Popover, DropdownMenu and MultiSelect share the anchored overlay core (`Overlays/shared/AnchoredPanel`: `useAnchor`, `computePosition`, `AnchoredPanel`, plus `useTrigger`), which renders panels in a transparent RN `Modal` window with outside-tap and Android-back close; Tooltip renders inline, as in KuiReact. The same anchored layer carries Popconfirm, the DatePicker / DateRangePicker / TimePicker panels, the ColorPicker popover and the DataTable filter popovers; ComboBox renders its list in flow, as KuiReact does, on the ComboBox hooks it shares with MultiSelect. The table family (Table, DataTable, AdvancedDataTable, BulkActionTable) shares KuiReact's ported `Table/types.ts` and `useTable` / `useServerTable` hooks.

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
| DropdownMenu | DropdownMenu | [dropdown-menu.md](dropdown-menu.md) | PARITY_COMPLETE |
| Tooltip | Tooltip | [tooltip.md](tooltip.md) | PARITY_COMPLETE |
| Accordion | Accordion | [accordion.md](accordion.md) | PARITY_COMPLETE |
| ButtonGroup | ButtonGroup | [button-group.md](button-group.md) | PARITY_COMPLETE |
| CheckboxGroup | CheckboxGroup | [checkbox-group.md](checkbox-group.md) | PARITY_COMPLETE |
| SearchBar | SearchBar | [search-bar.md](search-bar.md) | PARITY_COMPLETE |
| Pagination | Pagination | [pagination.md](pagination.md) | PARITY_COMPLETE |
| Stepper | Stepper | [stepper.md](stepper.md) | PARITY_COMPLETE |
| Breadcrumb | Breadcrumb | [breadcrumb.md](breadcrumb.md) | PARITY_COMPLETE |
| PageHeader | PageHeader | [page-header.md](page-header.md) | PARITY_COMPLETE |
| MultiSelect | MultiSelect | [multi-select.md](multi-select.md) | PARITY_COMPLETE |
| RangeSlider | RangeSlider | [range-slider.md](range-slider.md) | PARITY_COMPLETE |
| DatePicker (+ DateTimePicker stub) | DatePicker / DateTimePicker | [date-picker.md](date-picker.md) | PARITY_COMPLETE |
| DateRangePicker | DateRangePicker | [date-range-picker.md](date-range-picker.md) | PARITY_COMPLETE |
| TimePicker | TimePicker | [time-picker.md](time-picker.md) | PARITY_COMPLETE |
| BrandLogo | BrandLogo | [brand-logo.md](brand-logo.md) | PARITY_COMPLETE |
| Popconfirm | Popconfirm | [popconfirm.md](popconfirm.md) | PARITY_COMPLETE |
| StarRating | StarRating | [star-rating.md](star-rating.md) | PARITY_COMPLETE |
| StatCard | StatCard | [stat-card.md](stat-card.md) | PARITY_COMPLETE |
| Statistic | Statistic | [statistic.md](statistic.md) | PARITY_COMPLETE |
| TabButton | TabButton | [tab-button.md](tab-button.md) | PARITY_COMPLETE |
| Timeline | Timeline | [timeline.md](timeline.md) | PARITY_COMPLETE |
| TagInput | TagInput | [tag-input.md](tag-input.md) | PARITY_COMPLETE |
| ComboBox | ComboBox | [combo-box.md](combo-box.md) | PARITY_COMPLETE |
| FileInput | FileInput | [file-input.md](file-input.md) | PARITY_COMPLETE |
| Table | Table | [table.md](table.md) | PARITY_COMPLETE |
| Slider | Slider (+ `releaseStep`) | [slider.md](slider.md) | PARITY_COMPLETE |
| ContentScoreBar | ContentScoreBar | [content-score-bar.md](content-score-bar.md) | PARITY_COMPLETE |
| ViewToggle | ViewToggle | [view-toggle.md](view-toggle.md) | PARITY_COMPLETE |
| ScrollArea | ScrollArea | [scroll-area.md](scroll-area.md) | PARITY_COMPLETE |
| TreeView | TreeView | [tree-view.md](tree-view.md) | PARITY_COMPLETE |
| ColorPicker | ColorPicker (+ `DEFAULT_COLOR_SWATCHES`) | [color-picker.md](color-picker.md) | PARITY_COMPLETE |
| DataTable | DataTable (+ `useTable`, `useServerTable`) | [data-table.md](data-table.md) | PARITY_COMPLETE |
| BulkActionTable | BulkActionTable | [bulk-action-table.md](bulk-action-table.md) | PARITY_COMPLETE |
| AdvancedDataTable | AdvancedDataTable | [advanced-data-table.md](advanced-data-table.md) | PARITY_COMPLETE |
| DiffViewer | DiffViewer | [diff-viewer.md](diff-viewer.md) | PARITY_COMPLETE |
| Chart | LineChart, BarChart, AreaChart, PieChart, DonutChart, ScatterChart, SparkLine | [chart.md](chart.md) | PARITY_MINOR_GAPS |
| MapView | MapView (native; web fallback notice) | [map-view.md](map-view.md) | PARITY_MINOR_GAPS |
| VideoPlayer | VideoPlayer | [video-player.md](video-player.md) | PARITY_COMPLETE |
