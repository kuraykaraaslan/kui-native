# 00 · Executive summary: KuiReact ↔ KuiNative parity audit

> Audit date 2026-09-22. Reference: `kui-react` (registry v0.1.0 snapshot 2026-09-18, package 1.0.1). Target: `KUInative` @ `316b51f`. Every finding is derived from source code in both repositories.

## Verdict

**Overall parity: 32 / 100.** KuiNative's palette and authoring idioms match KuiReact, but it is not yet its React Native counterpart. It covers 11 of 107 core KuiReact components, and none of its 12 components is at full parity. It is not installable as a package and has no tests. Full verdict: [09-final-verdict.md](09-final-verdict.md).

## Key numbers

| | |
| --- | --- |
| KuiReact entries audited | 325 (315 registry + 10 unregistered barrel exports/hooks) |
| Core KuiReact components (ui/app/hooks) | 107 |
| KuiNative library exports | 13 (12 components + AvatarGroup) |
| Shared components | 11 KuiReact ids ↔ 12 KuiNative exports; `Text` is native-only |
| Missing from KuiNative | **313**: 96 core, 217 domain |
| Core missing by priority | Critical 10 · High 20 · Medium 32 · Low 34 |
| Shared-component status | 0 complete · 3 minor gaps · 8 major gaps · 2 rewrite |
| Colour-token parity | 33 / 33 identical (light + dark) |
| Prop-name parity on shared components | 41 / 80 (51 %) |
| Test parity | 0 / 40 KuiReact test cases |
| Roadmap effort (core) | W1 30.5–51 d · W2 74–126 d · W3 143.5–267 d |

## Scores

| Coverage | API | Visual | Tokens | A11y | Docs | Testing | DX | Architecture | **Overall** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 25 | 44 | 45 | 71 | 40 | 18 | 0 | 25 | 40 | **32** |

## Five findings that matter most

1. **Naming diverges from KuiReact.** KuiNative uses `TextInput`, `Switch`, `visible`, `destructive`, `default`, `value/onValueChange` and `label: string` where KuiReact uses `Input`, `Toggle`, `open`, `danger`, `neutral`, `checked/onChange` and `children`. Button and Badge together account for 246 KuiReact production imports, and neither accepts `children`. [04](04-api-differences.md)
2. **Modal needs a rewrite.** Nested accessible Pressables collapse it into one VoiceOver element. Long content overflows, the keyboard covers inputs, there is no close button, and 7 KuiReact props are missing. [rewrite-candidates](phase-3-parity-review/rewrite-candidates.md)
3. **Headings render regular weight on iOS and web.** `Text` sets only `fontFamily`, never a weight. KuiReact uses Geist, not Inter as KuiNative's README claims. [text](feature-matrix/text.md)
4. **There is no quality infrastructure.** KuiNative has no tests, ESLint config, CI, registry or ADRs. KuiReact has 18 test files, 739 visual snapshots, 3 CI workflows, custom lint rules and audits.
5. **It cannot be consumed.** `package.json` has `private: true` and `main: expo-router/entry`, and theme wiring lives in the showcase's `app/_layout.tsx`.

## What's good

- Tokens are an exact copy of KuiReact's.
- Raw colours are confined to documented exceptions.
- Components use the same `cn()` and variant-map idiom, and every component exports its `*Props` type.
- Avatar falls back to initials when an image fails, which KuiReact does not do.
- Button blocks presses while loading, which prevents double submits.

## Recommended next actions

1. Write an ADR adopting KuiReact names, with RN names kept as deprecated aliases, and create `parity.exceptions.json`.
2. Set up jest-expo, @testing-library/react-native, ESLint and CI, then port KuiReact's 40 shared-component tests.
3. Fix the Text weights, the Modal defects and silent form errors.
4. Make KuiNative an installable package: add an exports map and build, export a `KuiProvider`, and move to Font Awesome v7.
5. Execute [Wave 1](phase-5-roadmap/wave-1-critical.md) (28 items), then re-run the audit.

## Workspace map

| Phase | Files |
| --- | --- |
| Summary | [00](00-executive-summary.md) · [01 KuiReact inventory](01-kui-react-inventory.md) · [02 KuiNative inventory](02-kui-native-inventory.md) · [03 missing](03-missing-components.md) · [04 API](04-api-differences.md) · [05 design](05-design-differences.md) · [06 behaviour](06-behavior-differences.md) · [07 scores](07-consistency-scores.md) · [08 roadmap](08-roadmap.md) · [09 verdict](09-final-verdict.md) |
| 1 Inventory | [kui-react-components](phase-1-inventory/kui-react-components.md) · [kui-native-components](phase-1-inventory/kui-native-components.md) · [public-exports](phase-1-inventory/public-exports.md) · [inventory-summary](phase-1-inventory/inventory-summary.md) |
| 2 Gap analysis | [missing-components](phase-2-gap-analysis/missing-components.md) · [priority-matrix](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order](phase-2-gap-analysis/implementation-order.md) |
| 3 Parity review | [api](phase-3-parity-review/api-differences.md) · [design](phase-3-parity-review/design-differences.md) · [behaviour](phase-3-parity-review/behavior-differences.md) · [a11y](phase-3-parity-review/accessibility-differences.md) · [testing](phase-3-parity-review/testing-differences.md) · [quality](phase-3-parity-review/implementation-quality.md) · [status matrix](phase-3-parity-review/component-status-matrix.md) · [rewrites](phase-3-parity-review/rewrite-candidates.md) · [parity matrix](phase-3-parity-review/component-parity-matrix.md) |
| 4 Scoring | [scoring](phase-4-scoring/scoring.md) · [rationale](phase-4-scoring/scoring-rationale.md) |
| 5 Roadmap | [wave 1](phase-5-roadmap/wave-1-critical.md) · [wave 2](phase-5-roadmap/wave-2-core-completion.md) · [wave 3](phase-5-roadmap/wave-3-advanced.md) · [order](phase-5-roadmap/implementation-order.md) |
| Per component | [feature-matrix/](feature-matrix/README.md) (12 shared + Text) · [component-backlog/](component-backlog/README.md) (313 missing) |
| Re-running | [tooling/](tooling/README.md): the extraction and generator scripts that produced the data-driven files |

## Limitations

- KuiNative's typecheck was **not** run: `node_modules` is absent in the working copy and nothing was installed.
- Behaviour on devices (VoiceOver, TalkBack, Android status bar) is inferred from RN semantics and source code, not observed on hardware.
- Props for 10 of 325 KuiReact entries could not be parsed statically (barrel re-exports and hooks). Their backlog files say so.
- Usage frequency counts importing files, not render sites.
