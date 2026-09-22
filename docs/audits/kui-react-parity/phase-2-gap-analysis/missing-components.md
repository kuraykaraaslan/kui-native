# Missing components

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> 28 in-scope KuiReact ui-layer components (Atom/Molecule/Organism) have no KuiNative counterpart.

## Scope

KuiNative development is scoped to KuiReact's core **ui-layer atoms, molecules and organisms** (the registry's own `Atom`/`Molecule`/`Organism` categories, all under `modules/ui/`). **App-layer components** (`modules/app/`, e.g. AppShell, Toast's provider chrome, Form, Calendar, RichTextEditor), **domain verticals** (`modules/domains/*`, 217 components across 18 industries) and **theme demos** (`app/theme/*`) are out of scope for this backlog and roadmap. They remain listed for reference in [01-kui-react-inventory.md](../01-kui-react-inventory.md) and [phase-1-inventory/kui-react-components.md](../phase-1-inventory/kui-react-components.md), marked out of scope, but have no backlog file and do not count toward coverage.

| Scope | KuiReact components |
| --- | --- |
| In scope (ui-layer Atom/Molecule/Organism) | 62 |
| Out of scope: app layer | 40 |
| Out of scope: domain verticals | 217 |
| Out of scope: hooks | 3 |
| Out of scope: external library | 1 |
| Out of scope: other ui-layer categories | 2 |

## Priority and complexity definitions

- **Critical** — required before any production mobile app can be built on KuiNative (baseline form, feedback, overlay, navigation primitives) or a dependency root for many others.
- **High** — required for strong parity; frequently used in KuiReact or blocking several other components.
- **Medium** — common but not blocking; or a platform adaptation with moderate demand.
- **Low** — niche, desktop-web oriented, or a domain-vertical demo component.
- **Complexity** — Small (<1 d), Medium (2–3 d), Large (5–8 d), Very Large (10–20 d) for a parity-quality port incl. tests + showcase entry. Informed by KuiReact LOC and RN platform gaps.
- **Fit** — `direct` mechanical port · `adapt` needs a platform-idiomatic redesign (sheet instead of popover, etc.) · `web-only` recommended parity exception.
- **Wave** — roadmap wave (see [08-roadmap.md](../08-roadmap.md)).

## Core components (ui-layer Atom/Molecule/Organism) — 28

| Component | Category | Priority | Complexity | Wave | Fit | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| [DatePicker](../component-backlog/date-picker.md) | Forms | High | Large | W2 | adapt | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| [BrandLogo](../component-backlog/brand-logo.md) | Foundation | Medium | Small | W2 | direct | Used by AppShell/AppFooter/SplashScreen; blocks those ports. |
| [TabButton](../component-backlog/tab-button.md) | Navigation | Medium | Small | W2 | direct | Single tab button with count badge; building block of TabGroup. |
| [ComboBox](../component-backlog/combo-box.md) | Forms | Medium | Large | W2 | adapt | Async-searchable single select; needed for large option sets. |
| [DateRangePicker](../component-backlog/date-range-picker.md) | Forms | Medium | Large | W2 | adapt | Range selection for filters/bookings; shares DatePicker internals. |
| [FileInput](../component-backlog/file-input.md) | Forms | Medium | Medium | W2 | adapt | File selection; RN has no `<input type=file>`. |
| [StarRating](../component-backlog/star-rating.md) | Forms | Medium | Small | W2 | direct | Rating display/input; used by reviews domain and 3 KuiReact components. |
| [TagInput](../component-backlog/tag-input.md) | Forms | Medium | Medium | W2 | direct | Chip entry with suggestions; composes Badge(dismissible). |
| [TimePicker](../component-backlog/time-picker.md) | Forms | Medium | Medium | W2 | adapt | Time entry companion to DatePicker. |
| [Popconfirm](../component-backlog/popconfirm.md) | Overlay | Medium | Small | W2 | adapt | Inline confirmation for destructive actions. |
| [StatCard](../component-backlog/stat-card.md) | Data Display | Medium | Small | W2 | direct | Card-wrapped KPI. |
| [Statistic](../component-backlog/statistic.md) | Data Display | Medium | Small | W2 | direct | Numeric KPI with trend/prefix/suffix; used in dashboards. |
| [Timeline](../component-backlog/timeline.md) | Data Display | Medium | Small | W2 | direct | Activity timeline grouped by day; used by domain feeds. |
| [Table](../component-backlog/table.md) | Tables | Medium | Medium | W2 | adapt | Static data table; on phones tables need horizontal scroll or card fallback. |
| [Chart](../component-backlog/chart.md) | Charts | Medium | Very Large | W3 | adapt | KuiReact wraps Chart.js (1.8k LOC); canvas is not available on RN. |
| [Slider](../component-backlog/slider.md) | Media | Medium | Medium | W2 | direct | Accessible carousel (autoPlay, dots, arrows, loop). |
| [ScrollArea](../component-backlog/scroll-area.md) | Layout | Low | Small | W3 | adapt | Styled-scrollbar container; on RN `ScrollView` is already the primitive. |
| [ColorPicker](../component-backlog/color-picker.md) | Forms | Low | Large | W3 | adapt | Niche input; large (1.2k LOC). |
| [ViewToggle](../component-backlog/view-toggle.md) | Forms | Low | Small | W3 | direct | List/grid switch; small. |
| [ContentScoreBar](../component-backlog/content-score-bar.md) | Data Display | Low | Small | W3 | direct | SEO/content-quality meter; niche. |
| [TreeView](../component-backlog/tree-view.md) | Data Display | Low | Large | W3 | direct | Recursive tree; niche on mobile. |
| [AdvancedDataTable](../component-backlog/advanced-data-table.md) | Tables | Low | Very Large | W3 | adapt | Selectable table with row actions (2k LOC). |
| [BulkActionTable](../component-backlog/bulk-action-table.md) | Tables | Low | Medium | W3 | adapt | Selection + bulk actions. |
| [DataTable](../component-backlog/data-table.md) | Tables | Low | Large | W3 | adapt | Searchable/sortable table (800 LOC). |
| [MapView](../component-backlog/map-view.md) | Media | Low | Very Large | W3 | adapt | Leaflet map with markers/zones/routes. |
| [VideoPlayer](../component-backlog/video-player.md) | Media | Low | Very Large | W3 | adapt | Custom HTML5 player (1.5k LOC). |
| [DiffViewer](../component-backlog/diff-viewer.md) | Advanced Components | Low | Large | W3 | adapt | Diff display. |
| [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Utility | Low | Small | W3 | web-only | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit. |