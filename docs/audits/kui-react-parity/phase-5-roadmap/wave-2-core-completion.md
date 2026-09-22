# Wave 2 — Core completion

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Required for strong parity. Finishes the remaining shared-component remediation (Badge, Card, Avatar/AvatarGroup, Checkbox, Toggle, Skeleton, Spinner, EmptyState, shadows), adds the parity contract tooling, and ports the remaining commonly-used ui-layer primitives.

**Exit criteria:** every shared component is PARITY_COMPLETE; every KuiReact ui-layer component with fit `direct`/`adapt` and priority ≥ Medium exists; `parity.exceptions.json` lists every deliberate gap and CI fails on an unexplained one.

## Totals

| | |
| --- | --- |
| Items | 25 (10 remediation of shared components/infra, 15 new components) |
| Estimated effort | 35–58 engineer-days (7.0–11.6 engineer-weeks) |
| Remaining (excluding done items) | 18 items, 31.5–51 engineer-days |
| By priority | Critical 0 · High 8 · Medium 17 · Low 0 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 12 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d | Makes this audit repeatable and CI-enforced (mirrors KuiReact ADR 0003). |
| 13 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) | High | Small | — | 0.5–1 d | AvatarGroup uses a children API; KuiReact uses data-driven `avatars/max/size` with overflow chip. |
| 14 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) | High | Small | — | 0.5–1 d | Second most-imported KuiReact component (109 production imports); 60+ domain status badges wrap it. |
| 15 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) | Medium | Small | — | 0.5–1 d | No KuiNative component renders a shadow; KuiReact Card/Modal/Toggle do. |
| 16 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) | High | Small | R-shadow | 0.5–1 d | Layout differs (single padded box vs header/body/footer sections). |
| 17 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) | High | Small | R-field-shell | 0.5–1 d | Error/hint states missing. |
| 18 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; SkeletonTableRow waits for Table | High | Small | — | 0.5–1 d | 4 of 5 KuiReact skeleton exports missing. |
| 19 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) | High | Small | — | 0.5–1 d | Different name and prop names; label is not pressable. |
| 20 | [DatePicker](../component-backlog/date-picker.md) | High | Large | R-overlay-core, R-field-shell | 5–8 d | Date entry is a core form control; KuiReact ships a 1.4k-LOC calendar popover. |
| 21 | [BrandLogo](../component-backlog/brand-logo.md) | Medium | Small | — | 0.5–1 d | Used by AppShell/AppFooter/SplashScreen; blocks those ports. |
| 22 | [Popconfirm](../component-backlog/popconfirm.md) | Medium | Small | R-overlay-core, R-button | 0.5–1 d | Inline confirmation for destructive actions. |
| 23 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) | Medium | Small | — | 0.5–1 d | `actionLabel/onAction` cannot express KuiReact's arbitrary action node. |
| 24 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing | Medium | Small | — | 0.5–1 d | `sm` and `md` render identically; xs/xl missing. |
| 25 | [StarRating](../component-backlog/star-rating.md) | Medium | Small | — | 0.5–1 d | Rating display/input; used by reviews domain and 3 KuiReact components. |
| 26 | [StatCard](../component-backlog/stat-card.md) | Medium | Small | — | 0.5–1 d | Card-wrapped KPI. |
| 27 | [Statistic](../component-backlog/statistic.md) | Medium | Small | — | 0.5–1 d | Numeric KPI with trend/prefix/suffix; used in dashboards. |
| 28 | [TabButton](../component-backlog/tab-button.md) | Medium | Small | — | 0.5–1 d | Single tab button with count badge; building block of TabGroup. |
| 29 | [Timeline](../component-backlog/timeline.md) | Medium | Small | — | 0.5–1 d | Activity timeline grouped by day; used by domain feeds. |
| 30 | [FileInput](../component-backlog/file-input.md) | Medium | Medium | R-field-shell | 2–3 d | File selection; RN has no `<input type=file>`. |
| 31 | [Slider](../component-backlog/slider.md) | Medium | Medium | — | 2–3 d | Accessible carousel (autoPlay, dots, arrows, loop). |
| 32 | [Table](../component-backlog/table.md) | Medium | Medium | — | 2–3 d | Static data table; on phones tables need horizontal scroll or card fallback. |
| 33 | [TagInput](../component-backlog/tag-input.md) | Medium | Medium | R-field-shell | 2–3 d | Chip entry with suggestions; composes Badge(dismissible). |
| 34 | [TimePicker](../component-backlog/time-picker.md) | Medium | Medium | R-overlay-core, R-field-shell | 2–3 d | Time entry companion to DatePicker. |
| 35 | [ComboBox](../component-backlog/combo-box.md) | Medium | Large | R-overlay-core, R-field-shell | 5–8 d | Async-searchable single select; needed for large option sets. |
| 36 | [DateRangePicker](../component-backlog/date-range-picker.md) | Medium | Large | date-picker, R-overlay-core, R-field-shell | 5–8 d | Range selection for filters/bookings; shares DatePicker internals. |