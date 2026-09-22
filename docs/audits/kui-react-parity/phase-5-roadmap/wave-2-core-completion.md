# Wave 2 — Core completion

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).

Required for strong parity. Finishes the remaining shared-component remediation (Badge, Card, Avatar/AvatarGroup, Checkbox, Toggle, Skeleton, Spinner, EmptyState, shadows), adds the parity contract tooling, and ports the remaining commonly-used ui-layer primitives. Those primitives have all landed (the last of them in `08c1c32`, so they have left this list); what remains is remediation and tooling.

**Exit criteria:** every shared component is PARITY_COMPLETE; every KuiReact ui-layer component with fit `direct`/`adapt` and priority ≥ Medium exists; `parity.exceptions.json` lists every deliberate gap and CI fails on an unexplained one.

## Totals

| | |
| --- | --- |
| Items | 10 (10 remediation of shared components/infra, 0 new components) |
| Estimated effort | 6.5–12 engineer-days (1.3–2.4 engineer-weeks) |
| Remaining (excluding done items) | 3 items, 3–5 engineer-days |
| By priority | Critical 0 · High 7 · Medium 3 · Low 0 |

## Items in recommended order

| Order | Item | Priority | Complexity | Dependencies | Estimated effort | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 12 | **R-infra-parity** Parity contract: `parity.exceptions.json`, generated parity matrix, component registry | High | Medium | R-infra-test | 2–3 d | Makes this audit repeatable and CI-enforced (mirrors KuiReact ADR 0003). |
| 13 | **R-avatar** Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite — ✓ done (`599c8a1`) | High | Small | — | 0.5–1 d | AvatarGroup uses a children API; KuiReact uses data-driven `avatars/max/size` with overflow chip. |
| 14 | **R-badge** Badge parity (children, `neutral`, sizes, dot, dismissible) — ✓ done (`3e48fad`) | High | Small | — | 0.5–1 d | Second most-imported KuiReact component (109 production imports); 60+ domain status badges wrap it. |
| 15 | **R-shadow** Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation) — ✓ done (`048ebed`: shadow classes + Android elevation) | Medium | Small | — | 0.5–1 d | No KuiNative component renders a shadow; KuiReact Card/Modal/Toggle do. |
| 16 | **R-card** Card parity (flat variant, headerRight, onPress, loading, section layout, shadow) — ✓ done (`dbdbdbd`) | High | Small | R-shadow | 0.5–1 d | Layout differs (single padded box vs header/body/footer sections). |
| 17 | **R-checkbox** Checkbox parity (hint, error, uncontrolled `defaultChecked`) — ✓ done (`75edb0c`) | High | Small | R-field-shell | 0.5–1 d | Error/hint states missing. |
| 18 | **R-skeleton** Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion — partial: Line / Avatar / Text since `048ebed`; Table primitive landed (`b83d87f`) but SkeletonTableRow is still missing | High | Small | — | 0.5–1 d | 4 of 5 KuiReact skeleton exports missing. |
| 19 | **R-toggle** Switch → Toggle parity (name, checked/onChange, description, size, label press) — ✓ done (`5f484a8`) | High | Small | — | 0.5–1 d | Different name and prop names; label is not pressable. |
| 20 | **R-empty-state** EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing) — ✓ done (`7ca2284`) | Medium | Small | — | 0.5–1 d | `actionLabel/onAction` cannot express KuiReact's arbitrary action node. |
| 21 | **R-spinner** Spinner parity (xs–xl, two-tone ring, md ≠ sm) — partial: sizes fixed in `4ebda43`; two-tone ring still missing | Medium | Small | — | 0.5–1 d | `sm` and `md` render identically; xs/xl missing. |