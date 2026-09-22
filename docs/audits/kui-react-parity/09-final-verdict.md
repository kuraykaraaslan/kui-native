# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**
>
> **Scope of this verdict: KuiReact's ui-layer atoms, molecules and organisms only** (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope by decision — see [phase-2-gap-analysis/missing-components.md#scope](phase-2-gap-analysis/missing-components.md#scope).

**Not close, but moving.** In-scope parity is **34 / 100**. KuiNative is a well-styled starter kit that shares KuiReact's colour palette exactly and follows its authoring idioms. It is not yet a counterpart library within its own declared scope:

- It covers 11 of 62 in-scope KuiReact components.
- None of its 12 components reaches full parity, though Spinner is now fixed (size ladder + an accessibility defect) and has real tests.
- It cannot be installed as a package.
- It has a working test harness but only one component under test.

A developer who knows KuiReact would recognise the look but would guess wrong on the first component they touch: `<Button>Save</Button>` does not compile.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **34 %** |
| In-scope components that exist | 17.7 % (11 / 62) |
| In-scope usage covered, weighted by KuiReact production imports | 72.1 % |
| Prop-name parity on shared components | 51 % |
| Shared components at PARITY_COMPLETE | 0 / 12 (Spinner fixed but not yet re-classified — see below) |
| Test parity | 1 component with a real suite; 0 / 40 KuiReact shared-component test cases ported |

## Strengths

1. **Tokens:** all 33 semantic colour tokens are identical in name and value, in light and dark. A runtime light/dark/system switch works.
2. **Idioms:** named exports, `Record<Variant,string>` maps, an identical `cn()`, an explicit barrel. Where names match, the code reads like KuiReact.
3. **Token discipline:** raw colours appear only where RN props cannot take a class, and each one is commented. That is stricter than KuiReact.
4. **Typed API surface:** every component exports its `*Props` type, which KuiReact does not.
5. **Sensible platform choices:** `expo-image` with error fallback, `accessibilityState` usage, a boolean Checkbox `onChange`, and Button `loading` that blocks double submits.
6. **A verified test harness now exists.** Jest (`jest-expo`) + `@testing-library/react-native` v14 is installed, configured, and caught a real cross-component accessibility bug on its first real test (a plain `View` needs `accessible={true}` for its `accessibilityRole` to register — RN's own semantics, not a testing-library quirk).

## Weaknesses

1. Not a package: `private: true`, `main: expo-router/entry`, no exports and no build. The theme provider lives in the showcase.
2. Testing is 1 component deep. KuiReact has 40 test cases on its 11 shared-component counterparts alone, plus 739 visual snapshots.
3. It takes RN naming over KuiReact naming (`TextInput`, `Switch`, `visible`, `destructive`, `label`). This contradicts the stated goal and KuiReact's ADR 0003.
4. No shared internals (overlay core, field shell), so defects repeat.
5. Documentation is only a README with factual errors (SDK version, font, link) and a 15-demo showcase.

## Largest gaps (in scope)

1. **Form controls:** Select, Textarea, RadioGroup, CheckboxGroup, Label; Input parity.
2. **Feedback:** Toast plus the `toast()` store, AlertBanner, Progress.
3. **Overlays:** Drawer/sheet, Popover, DropdownMenu, plus a Modal that works.
4. **Navigation/layout:** TabGroup, Stepper, PageHeader, Breadcrumb.
5. **Quality infrastructure:** broader test coverage, lint, CI, parity contract.

## Missing components (in scope)

**51** KuiReact ui-layer components have no KuiNative counterpart: Critical 10, High 10, Medium 17, Low 14. Every one has a backlog file. One is a recommended parity exception (`SkipLink` — a DOM/keyboard concept with no RN equivalent; its sibling `LiveRegion`/`Announcer` exports do have one). App-layer components, domain verticals and theme demos are out of scope and not counted here — see [03-missing-components.md](03-missing-components.md).

## Shared components with major parity issues

Button, Card, Badge, TextInput (Input), Checkbox, Switch (Toggle), EmptyState and SkeletonCard (Skeleton) are PARITY_MAJOR_GAPS. Avatar and Text have minor gaps. **Spinner has been fixed** this pass (five-size ladder, `accessibilityLabel` override, and the `accessible` accessibility bug) and should be re-classified toward PARITY_COMPLETE once its feature matrix and status entry are refreshed. See [component-status-matrix.md](phase-3-parity-review/component-status-matrix.md).

## Rewrite candidates

- **Modal:** critical accessibility defect, overflow, no keyboard handling, and API divergence. Rewrite it on a shared overlay core; estimate 5–7 days.
- **AvatarGroup:** incompatible API model; estimate 0.5–1 day.
- **Watch list:** Switch, if KuiReact's custom track and sizes are required.

See [rewrite-candidates.md](phase-3-parity-review/rewrite-candidates.md).

## Release readiness

| Use | Ready? |
| --- | --- |
| Internal showcase / design reference | Yes |
| Starter code to copy into an Expo app | With care: fix Text weights and Modal first |
| Published component library | **No**: not installable, testing is one component deep |
| "React Native counterpart of KuiReact" claim | **No**: 0 components at full parity, 17.7 % in-scope coverage |

## Recommended next actions

1. **Decide the naming policy.** Adopt KuiReact names (`Input`, `Toggle`, `open`, `danger`, `neutral`, `children`), keep RN names as deprecated aliases, and write it down as a KuiNative ADR together with a `parity.exceptions.json`. Everything else depends on this.
2. **Broaden test coverage** from Spinner to the rest of Wave 1's components as they're fixed; add CI once more than a couple of suites exist.
3. **Fix the remaining defects:** Text heading weights, Modal accessibility and overflow, silent form errors, and the same `accessible` bug on SkeletonCard/EmptyState.
4. **Package the library:** exports map, build, peer deps, a `KuiProvider`, and Font Awesome v7.
5. **Continue executing Wave 1** ([wave-1-critical.md](phase-5-roadmap/wave-1-critical.md)): 21 items, 27–44 engineer-days, in-scope only. Then re-run the audit; the generator scripts make that cheap.
