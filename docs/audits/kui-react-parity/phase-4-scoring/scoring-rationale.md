# Scoring rationale

> **Scope for every number below: KuiReact ui-layer atoms, molecules and organisms only** (registry categories Atom/Molecule/Organism, 62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are excluded — see [phase-2-gap-analysis/missing-components.md#scope](../phase-2-gap-analysis/missing-components.md#scope).

Every score is computed from measured values where possible; judgement scores are itemised so they can be challenged individually.

## 1. Component Coverage — 33

| Input | Value | Source |
| --- | --- | --- |
| In-scope KuiReact components (ui-layer Atom/Molecule/Organism) | 62 | `phase-1-inventory/kui-react-components.md` |
| With KuiNative counterpart | 11 | feature-matrix/README.md |
| Count coverage | 17.7 % | 11 / 62 |
| Usage-weighted coverage (share of 476 production imports across the in-scope set that target a shared component) | 343 / 476 = 72.1 % | import graph parsed from KuiReact source |

Formula: 0.6 × count + 0.4 × usage-weighted = 0.6 × 17.7 + 0.4 × 72.1 = 10.6 + 28.8 = **39.4**, rounded down to **33** for a −6 penalty: usage weighting is generous here because Button (137 imports) and Badge (109) alone carry most of the in-scope set's real usage — count coverage is the more honest long-run signal, so it is weighted more heavily than the raw arithmetic above implies.

Existence only — parity quality is scored below.

## 2. API Consistency — 44

| Input | Value |
| --- | --- |
| KuiReact prop names present in KuiNative (11 shared components; excluding web-only `as`, `type`, `id`, `data-testid`, `portalTarget`, `ref`; `onClick`≙`onPress`) | 41 / 80 = 51.3 % |
| Component names identical | 9 / 11 = 81.8 % |
| Enumerated values matching (variant + size across Button, Badge, Avatar, Spinner, Card, Toggle, Modal) | 22 / 38 = 57.9 % |

Base = 0.5 × 51.3 + 0.2 × 81.8 + 0.3 × 57.9 = 59.4.
Penalties: −10 content model (`label` instead of `children`) on the two most-used components; −5 no rest-prop spread / typed ref on 9 of 12 exports (no `testID`). Score **44**.

Per-component prop matches: Button 6/10 · Card 6/10 · Avatar 4/5 · Badge 2/7 · Input 4/12 · Checkbox 4/6 · Toggle 3/8 · Spinner 2/2 · EmptyState 4/5 · Skeleton 1/2 · Modal 5/13.

## 3. Visual Consistency — 46

Per-component visual ratings (from the Design sections of each feature matrix): Button 60 · Card 35 · Avatar 70 · AvatarGroup 20 · Badge 75 · Input 45 · Checkbox 55 · Toggle 35 · Spinner 55 (raised from 40 after the size-ladder fix) · EmptyState 45 · Skeleton 35 · Modal 30. Mean = 560 / 12 = **46.7 → 46**.

Drivers: identical colours (+); radius one step larger on Button/Input/Modal; md/lg padding differs; component titles 2–3 steps larger; no shadows; sectioned anatomy missing on Card/Modal; OS controls for Switch/Spinner; system font instead of Geist.

## 4. Design Token Alignment — 71

| Dimension | Weight | Score | Evidence |
| --- | --- | --- | --- |
| Colour token names + light/dark values | 50 % | 100 | 33 / 33 identical, 0 mismatches (programmatic diff of `globals.css` vs `libs/theme.ts`) |
| Token usage per component | 30 % | 70 | Mostly identical classes; deviations: Modal `surface-base` vs `surface-raised`, Switch off-track `border-strong` vs `surface-sunken`, Checkbox border `border-strong` vs `border`, EmptyState icon `text-secondary` vs `text-disabled`; `*-hover`/`*-active`/`surface-overlay` unused |
| Typography / shadow / motion tokens | 20 % | 0 | Geist not loaded; no shadow token strategy; no motion tokens |

0.5 × 100 + 0.3 × 70 + 0.2 × 0 = **71**.

## 5. Accessibility Alignment — 40

Per-component a11y ratings: Button 70 · Card 40 · Avatar 75 · AvatarGroup 10 · Badge 60 · Input 35 · Checkbox 60 · Toggle 45 · Spinner 85 (raised after the `accessible` fix) · EmptyState 50 · Skeleton 70 · Modal 10. Mean 50.8.
Penalty −10: no platform a11y infrastructure (announce/live region/focus helpers — KuiReact has `announce`, `useAnnounce`, `LiveRegion`, `useFocusTrap`) and a systemic defect found while adding the first real test — a plain `View` with `accessibilityRole` but no `accessible={true}` is invisible to role-based queries and to some assistive tech, present on SkeletonCard and EmptyState until they are fixed. Score **40**.

## 6. Documentation Alignment — 18

| Dimension | KuiReact | KuiNative | Score |
| --- | --- | --- | --- |
| Showcase variants for shared components (40 %) | 68 | 15 | 22 |
| Usage snippet per component (15 %) | ✓ | ✓ (showcase `usage`) | 100 |
| Prop tables / API reference (15 %) | registry + per-component markdown incl. full source | none | 0 |
| Machine-readable catalog / AI docs (10 %) | registry JSON + schema + llms.txt + MCP server | none | 0 |
| Architecture docs / ADRs / contributor guide (10 %) | AGENTS.md, CONTRIBUTING, 4 ADRs, dev plans | README only | 10 |
| Accuracy (10 %) | — | README: wrong SDK version, wrong font, wrong link; stale comments | 0 |

0.4 × 22 + 0.15 × 100 + 0.1 × 10 = 8.8 + 15 + 1 = 24.8, minus 7 for inaccuracies that actively mislead (the README is the only doc) → **18**.

## 7. Testing Alignment — 10

| Input | Value |
| --- | --- |
| Test runner | Jest (`jest-expo` preset) + `@testing-library/react-native` v14, configured and verified working (`jest.config.js`, `jest.setup.js`) |
| Passing suites | 1 (Spinner, 8 cases) |
| Shared-component test cases mirrored from KuiReact | 0 of the other 10 shared components' ~32 relevant cases |
| CI | none |
| Visual regression | none |
| Lint config | none (`expo lint` script exists, no rules file) |

A working, verified harness plus one real component's tests earns real credit over the prior 0, but it is 1 of 12 shared components and none of the 51 in-scope backlog items. Score **10**.

## 8. Developer Experience Alignment — 25

| Dimension | Score | Evidence |
| --- | --- | --- |
| Installable package with entry points (25 %) | 0 | `private: true`, `main: expo-router/entry` |
| Same import names / mental model (25 %) | 40 | 9/11 names equal, but `label` vs `children`, `destructive`, `visible`, `value/onValueChange` |
| Types (15 %) | 90 | every component exports `*Props` (better than KuiReact) |
| Theming out of the box (15 %) | 20 | tokens exist; provider lives in showcase |
| Tooling (scaffold, registry, lint rules) (20 %) | 15 | KuiReact has `new:component`, registry, MCP, custom lint rules; KuiNative has a documented 3-step manual process plus a working test script (`npm test`) |

0 + 10 + 13.5 + 3 + 3 = 29.5, minus 4 for escape hatches missing (no `testID`/rest) → **25**.

## 9. Architecture Consistency — 40

| Dimension | Score | Evidence |
| --- | --- | --- |
| Layering (KuiReact's ui layer only, per scope) (25 %) | 60 | `modules/ui` exists with the same atom/molecule idiom; no internal Atom/Molecule/Organism sub-grouping or registry |
| Token pipeline (CSS vars → Tailwind names) (20 %) | 90 | same names, `var(--color-*)` mapping, `cn()` identical |
| Component idioms (named exports, variant maps, barrels) (15 %) | 85 | same idioms |
| Shared internals (overlay core, field shell, presence) (20 %) | 0 | none; KuiReact has `Overlays/shared/*` |
| Providers / theme ownership (20 %) | 10 | theme in showcase, no provider |

15 + 18 + 12.75 + 0 + 2 = **47.75**, minus 8 for zero test-file architecture until this pass (mitigated but not yet systematic — one component, no CI) → **40**.

## 10. Overall Parity — 34

| Area | Weight | Score | Contribution |
| --- | --- | --- | --- |
| Coverage | 20 % | 33 | 6.6 |
| API | 15 % | 44 | 6.6 |
| Visual | 10 % | 46 | 4.6 |
| Tokens | 5 % | 71 | 3.6 |
| Accessibility | 10 % | 40 | 4.0 |
| Documentation | 10 % | 18 | 1.8 |
| Testing | 10 % | 10 | 1.0 |
| DX | 10 % | 25 | 2.5 |
| Architecture | 10 % | 40 | 4.0 |
| **Total** | | | **34.7 → 34** |

Tokens get the lowest weight because they are the one area that is already solved and cheap to keep solved.
