# Priority matrix

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> Priority × complexity for the in-scope missing set (ui-layer Atom/Molecule/Organism).

## Core (51)

| Priority \ Complexity | Small | Medium | Large | Very Large | Total |
| --- | --- | --- | --- | --- | --- |
| **Critical** | Label, Separator, Textarea, RadioGroup, AlertBanner, TabGroup | Progress, Select, Toast, Drawer | — | — | 10 |
| **High** | ButtonGroup, SearchBar, CheckboxGroup, Accordion, PageHeader, Stepper | MultiSelect, RangeSlider, DropdownMenu | DatePicker | — | 10 |
| **Medium** | BrandLogo, StarRating, Statistic, Popconfirm, StatCard, Pagination, TabButton, Timeline | TagInput, FileInput, TimePicker, Slider, Popover, Table | ComboBox, DateRangePicker | Chart | 17 |
| **Low** | SkipLink + LiveRegion, ScrollArea, Breadcrumb, ViewToggle, Tooltip, ContentScoreBar | BulkActionTable | ColorPicker, DiffViewer, TreeView, DataTable | AdvancedDataTable, VideoPlayer, MapView | 14 |

## Quick wins (Critical/High × Small)

- ButtonGroup — Segmented control pattern (options/selected/onChange); very common on mobile.
- Label — Every KuiReact form control renders its label with the same required-marker + disabled treatment; KuiNative duplicates ad-hoc label Text in TextInput/Checkbox/Switch.
- Separator — Trivial primitive used by DropdownMenu, Card sections, lists and settings screens; its absence forces raw `View` borders everywhere.
- Textarea — Multi-line text entry is a baseline form control; KuiReact has a dedicated component with label/hint/error/count.
- SearchBar — Search is ubiquitous on mobile lists; KuiReact exposes value/onChange/onClear.
- RadioGroup — Mutually-exclusive choice control; core form primitive.
- CheckboxGroup — Composes Checkbox; needed for multi-choice forms and filter panels.
- Accordion — Collapsible sections (FAQ, settings); common on mobile.
- PageHeader — Screen title + subtitle + actions; every screen uses one.
- AlertBanner — Inline semantic alerts (success/error/warning/info) with title/message/action; basic feedback surface.
- TabGroup — In-screen tabs (tabs/activeTab/onChange) are a staple of mobile screens.
- Stepper — Step indicator used by wizards/checkout.

## Expensive and important (Critical/High × Large/Very Large)

- DatePicker (Large) — Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover.

## Recommended parity exceptions (fit = web-only)

- SkipLink + LiveRegion — Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit.