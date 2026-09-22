# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**

**Not close. Overall parity is 32 / 100.** KuiNative is a well-styled starter kit that shares KuiReact's colour palette exactly and follows its authoring idioms. It is not yet a counterpart library:

- It covers 11 of 107 core KuiReact components.
- None of its 12 components reaches full parity.
- It cannot be installed as a package.
- It has no tests.

A developer who knows KuiReact would recognise the look but would guess wrong on the first component they touch: `<Button>Save</Button>` does not compile.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **32 %** |
| Core components that exist | 10.3 % (11 / 107) |
| Core usage covered, weighted by KuiReact production imports | 65.5 % |
| Prop-name parity on shared components | 51 % |
| Shared components at PARITY_COMPLETE | 0 / 12 |
| Test parity | 0 % |

## Strengths

1. **Tokens:** all 33 semantic colour tokens are identical in name and value, in light and dark. A runtime light/dark/system switch works.
2. **Idioms:** named exports, `Record<Variant,string>` maps, an identical `cn()`, an explicit barrel. Where names match, the code reads like KuiReact.
3. **Token discipline:** raw colours appear only where RN props cannot take a class, and each one is commented. That is stricter than KuiReact.
4. **Typed API surface:** every component exports its `*Props` type, which KuiReact does not.
5. **Sensible platform choices:** `expo-image` with error fallback, `accessibilityState` usage, a boolean Checkbox `onChange`, and Button `loading` that blocks double submits.

## Weaknesses

1. Not a package: `private: true`, `main: expo-router/entry`, no exports and no build. The theme provider lives in the showcase.
2. No tests, lint config, CI or visual regression. KuiReact has 40 test cases on the shared components alone, plus 739 visual snapshots.
3. It takes RN naming over KuiReact naming (`TextInput`, `Switch`, `visible`, `destructive`, `label`). This contradicts the stated goal and KuiReact's ADR 0003.
4. No shared internals (overlay core, field shell), so defects repeat.
5. Documentation is only a README with factual errors (SDK version, font, link) and a 15-demo showcase.

## Largest gaps

1. **Form controls:** Select, Textarea, RadioGroup, CheckboxGroup, DatePicker, Label; Input parity.
2. **Feedback:** Toast plus the `toast()` store, AlertBanner, Progress, Loading/Error states.
3. **Overlays:** Drawer/sheet, Popover, DropdownMenu, plus a Modal that works.
4. **Navigation:** TabGroup, Stepper, PageHeader. The app-shell pieces exist only as private showcase components.
5. **Quality infrastructure:** tests, lint, CI, parity contract.

## Missing components

**313** in total: **96 core** (Critical 10, High 20, Medium 32, Low 34) and **217 domain**. Every one has a backlog file. Seven are recommended parity exceptions rather than work items: SkipLink, AppCommandBar, AppFooter, CodeEditor, Gantt, FormBuilder, useA11yCheck. See [03-missing-components.md](03-missing-components.md).

## Shared components with major parity issues

Button, Card, Badge, TextInput (Input), Checkbox, Switch (Toggle), EmptyState and SkeletonCard (Skeleton) are PARITY_MAJOR_GAPS. Avatar, Spinner and Text have minor gaps. See [component-status-matrix.md](phase-3-parity-review/component-status-matrix.md).

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
| Published component library | **No**: not installable, untested |
| "React Native counterpart of KuiReact" claim | **No**: 0 components at parity, 10 % core coverage |

## Recommended next actions

1. **Decide the naming policy.** Adopt KuiReact names (`Input`, `Toggle`, `open`, `danger`, `neutral`, `children`), keep RN names as deprecated aliases, and write it down as a KuiNative ADR together with a `parity.exceptions.json`. Everything else depends on this.
2. **Stand up quality infrastructure:** jest-expo, @testing-library/react-native, an ESLint config and CI. Port KuiReact's 40 shared-component tests as the first suite.
3. **Fix the defects:** Text heading weights (B4), Modal accessibility and overflow (AX1, B1, B2), and silent form errors (AX2).
4. **Package the library:** exports map, build, peer deps, a `KuiProvider`, and Font Awesome v7.
5. **Execute Wave 1** ([wave-1-critical.md](phase-5-roadmap/wave-1-critical.md)): 28 items, 30.5–51 engineer-days. Then re-run this audit; the generator scripts make that cheap.
