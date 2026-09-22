# Priority matrix

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Priority × complexity for the in-scope missing set (ui-layer Atom/Molecule/Organism).

## Core (28)

| Priority \ Complexity | Small | Medium | Large | Very Large | Total |
| --- | --- | --- | --- | --- | --- |
| **Critical** | — | — | — | — | 0 |
| **High** | — | — | DatePicker | — | 1 |
| **Medium** | BrandLogo, StarRating, Statistic, Popconfirm, StatCard, TabButton, Timeline | TagInput, FileInput, TimePicker, Slider, Table | ComboBox, DateRangePicker | Chart | 15 |
| **Low** | SkipLink + LiveRegion, ScrollArea, ViewToggle, ContentScoreBar | BulkActionTable | ColorPicker, DiffViewer, TreeView, DataTable | AdvancedDataTable, VideoPlayer, MapView | 12 |

## Quick wins (Critical/High × Small)

## Expensive and important (Critical/High × Large/Very Large)

- DatePicker (Large) — Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover.

## Recommended parity exceptions (fit = web-only)

- SkipLink + LiveRegion — Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit.