# 03 · Missing components

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

**28** in-scope KuiReact ui-layer components (Atom/Molecule/Organism) have no KuiNative counterpart. Every one has a backlog file under [component-backlog/](component-backlog/README.md). App-layer components, domain verticals and theme demos are out of scope (see [missing-components.md](phase-2-gap-analysis/missing-components.md#scope)).

Details: [missing-components.md](phase-2-gap-analysis/missing-components.md) · [priority-matrix.md](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis.md](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order.md](phase-2-gap-analysis/implementation-order.md)

## Counts

| Priority | Count |
| --- | --- |
| Critical | 0 |
| High | 1 |
| Medium | 15 |
| Low | 12 |
| **Total** | **28** |

| Fit | Count |
| --- | --- |
| direct port | 11 |
| platform adaptation | 16 |
| recommended exception (web-only) | 1 |

## Critical (0)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |

## High (1)

| Component | Category | Priority | Complexity | Reason |
| --- | --- | --- | --- | --- |
| [DatePicker](component-backlog/date-picker.md) | Forms | High | Large | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |

## Medium / Low core

[BrandLogo](component-backlog/brand-logo.md) (M/Small) · [Chart](component-backlog/chart.md) (M/Very Large) · [ComboBox](component-backlog/combo-box.md) (M/Large) · [DateRangePicker](component-backlog/date-range-picker.md) (M/Large) · [FileInput](component-backlog/file-input.md) (M/Medium) · [Popconfirm](component-backlog/popconfirm.md) (M/Small) · [Slider](component-backlog/slider.md) (M/Medium) · [StarRating](component-backlog/star-rating.md) (M/Small) · [StatCard](component-backlog/stat-card.md) (M/Small) · [Statistic](component-backlog/statistic.md) (M/Small) · [TabButton](component-backlog/tab-button.md) (M/Small) · [Table](component-backlog/table.md) (M/Medium) · [TagInput](component-backlog/tag-input.md) (M/Medium) · [Timeline](component-backlog/timeline.md) (M/Small) · [TimePicker](component-backlog/time-picker.md) (M/Medium) · [AdvancedDataTable](component-backlog/advanced-data-table.md) (L/Very Large) · [BulkActionTable](component-backlog/bulk-action-table.md) (L/Medium) · [ColorPicker](component-backlog/color-picker.md) (L/Large) · [ContentScoreBar](component-backlog/content-score-bar.md) (L/Small) · [DataTable](component-backlog/data-table.md) (L/Large) · [DiffViewer](component-backlog/diff-viewer.md) (L/Large) · [MapView](component-backlog/map-view.md) (L/Very Large) · [ScrollArea](component-backlog/scroll-area.md) (L/Small) · [SkipLink + LiveRegion](component-backlog/skip-link.md) (L/Small) · [TreeView](component-backlog/tree-view.md) (L/Large) · [VideoPlayer](component-backlog/video-player.md) (L/Very Large) · [ViewToggle](component-backlog/view-toggle.md) (L/Small)

## Out of scope

217 domain-vertical components, 40 app-layer components, 3 hooks and 1 external-library entry are excluded from this backlog by scope decision (ui-layer atoms/molecules/organisms only). See [missing-components.md](phase-2-gap-analysis/missing-components.md#scope).
