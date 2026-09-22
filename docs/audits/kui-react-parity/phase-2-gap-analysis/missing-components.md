# Missing components

> KuiReact ↔ KuiNative parity audit · 2026-09-22 · generated from source (KuiReact registry v0.1.0, snapshot 2026-09-18).
> 1 in-scope KuiReact ui-layer components (Atom/Molecule/Organism) have no KuiNative counterpart.

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

## Core components (ui-layer Atom/Molecule/Organism) — 1

| Component | Category | Priority | Complexity | Wave | Fit | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| [SkipLink + LiveRegion](../component-backlog/skip-link.md) | Utility | Low | Small | W3 | web-only | Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit. |