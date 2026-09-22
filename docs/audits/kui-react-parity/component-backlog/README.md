# Component backlog

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> 51 backlog files — one per in-scope KuiReact ui-layer component (Atom/Molecule/Organism) missing from KuiNative.

Each file contains: Overview · KuiReact Reference · Required Props (parsed from source) · Variants (KuiReact showcase code) · States · Accessibility Requirements (ARIA → RN mapping) · Design Tokens (with light/dark values) · Dependencies · Implementation Notes · Acceptance Criteria.

Shared components that exist but lack parity are **not** here — see [feature-matrix/](../feature-matrix/) and [phase-3-parity-review/](../phase-3-parity-review/component-status-matrix.md). App-layer components, domain verticals and theme demos are out of scope by decision (see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope)) and have no backlog file.

## Core (51)

| Component | Category | Priority | Complexity | Wave | Fit |
| --- | --- | --- | --- | --- | --- |
| [AlertBanner](alert-banner.md) | Feedback | Critical | Small | 1 | direct |
| [Drawer](drawer.md) | Overlay | Critical | Medium | 1 | adapt |
| [Label](label.md) | Typography | Critical | Small | 1 | direct |
| [Progress](progress.md) | Feedback | Critical | Medium | 1 | direct |
| [RadioGroup](radio-group.md) | Forms | Critical | Small | 1 | direct |
| [Select](select.md) | Forms | Critical | Medium | 1 | adapt |
| [Separator](separator.md) | Layout | Critical | Small | 1 | direct |
| [TabGroup](tab-group.md) | Navigation | Critical | Small | 1 | direct |
| [Textarea](textarea.md) | Forms | Critical | Small | 1 | direct |
| [Toast](toast.md) | Feedback | Critical | Medium | 1 | adapt |
| [Accordion](accordion.md) | Data Display | High | Small | 2 | direct |
| [ButtonGroup](button-group.md) | Forms | High | Small | 2 | direct |
| [CheckboxGroup](checkbox-group.md) | Forms | High | Small | 2 | direct |
| [DatePicker](date-picker.md) | Forms | High | Large | 2 | adapt |
| [DropdownMenu](dropdown-menu.md) | Overlay | High | Medium | 2 | adapt |
| [MultiSelect](multi-select.md) | Forms | High | Medium | 2 | adapt |
| [PageHeader](page-header.md) | Layout | High | Small | 2 | direct |
| [RangeSlider](range-slider.md) | Forms | High | Medium | 2 | direct |
| [SearchBar](search-bar.md) | Forms | High | Small | 2 | direct |
| [Stepper](stepper.md) | Navigation | High | Small | 2 | direct |
| [BrandLogo](brand-logo.md) | Foundation | Medium | Small | 2 | direct |
| [Chart](chart.md) | Charts | Medium | Very Large | 3 | adapt |
| [ComboBox](combo-box.md) | Forms | Medium | Large | 2 | adapt |
| [DateRangePicker](date-range-picker.md) | Forms | Medium | Large | 2 | adapt |
| [FileInput](file-input.md) | Forms | Medium | Medium | 2 | adapt |
| [Pagination](pagination.md) | Navigation | Medium | Small | 2 | adapt |
| [Popconfirm](popconfirm.md) | Overlay | Medium | Small | 2 | adapt |
| [Popover](popover.md) | Overlay | Medium | Medium | 2 | adapt |
| [Slider](slider.md) | Media | Medium | Medium | 2 | direct |
| [StarRating](star-rating.md) | Forms | Medium | Small | 2 | direct |
| [StatCard](stat-card.md) | Data Display | Medium | Small | 2 | direct |
| [Statistic](statistic.md) | Data Display | Medium | Small | 2 | direct |
| [TabButton](tab-button.md) | Navigation | Medium | Small | 2 | direct |
| [Table](table.md) | Tables | Medium | Medium | 2 | adapt |
| [TagInput](tag-input.md) | Forms | Medium | Medium | 2 | direct |
| [Timeline](timeline.md) | Data Display | Medium | Small | 2 | direct |
| [TimePicker](time-picker.md) | Forms | Medium | Medium | 2 | adapt |
| [AdvancedDataTable](advanced-data-table.md) | Tables | Low | Very Large | 3 | adapt |
| [Breadcrumb](breadcrumb.md) | Navigation | Low | Small | 3 | adapt |
| [BulkActionTable](bulk-action-table.md) | Tables | Low | Medium | 3 | adapt |
| [ColorPicker](color-picker.md) | Forms | Low | Large | 3 | adapt |
| [ContentScoreBar](content-score-bar.md) | Data Display | Low | Small | 3 | direct |
| [DataTable](data-table.md) | Tables | Low | Large | 3 | adapt |
| [DiffViewer](diff-viewer.md) | Advanced Components | Low | Large | 3 | adapt |
| [MapView](map-view.md) | Media | Low | Very Large | 3 | adapt |
| [ScrollArea](scroll-area.md) | Layout | Low | Small | 3 | adapt |
| [SkipLink + LiveRegion](skip-link.md) | Utility | Low | Small | 3 | web-only |
| [Tooltip](tooltip.md) | Overlay | Low | Small | 3 | adapt |
| [TreeView](tree-view.md) | Data Display | Low | Large | 3 | direct |
| [VideoPlayer](video-player.md) | Media | Low | Very Large | 3 | adapt |
| [ViewToggle](view-toggle.md) | Forms | Low | Small | 3 | direct |
