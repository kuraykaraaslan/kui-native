# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**
>
> Scope: KuiReact's ui-layer atoms, molecules and organisms (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope by decision. Updated 2026-09-22 through commit `0770214`; earlier verdicts (34, 56, then 66) are in git history.

**A faithful counterpart for what exists, and more than half of it now exists.** In-scope parity is **71 / 100**.

- **Shared components:** all 34 match KuiReact's classes, prop names and showcase demos. Twenty-six are fully at parity; the other ten have only minor, platform-driven gaps.
- **Coverage:** 28 in-scope KuiReact components aren't built yet, but the 34 that are cover 89.5 % of KuiReact's in-scope production imports.
- **Packaging:** the library can't be installed yet.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **71 %** |
| In-scope components that exist | 54.8 % (34 / 62) |
| In-scope usage covered | 89.5 % |
| Prop-name parity on shared components | 98.7 % |
| Components at PARITY_COMPLETE | 26 / 36 |
| Tests | 35 suites, 381 tests |

## Strengths

1. **Pixel and API parity on everything shared.**
   - The component names, props, variants and sizes are KuiReact's.
   - Old KuiNative names remain as deprecated aliases.
2. **Showcase parity:** 141 of 143 KuiReact demos are reproduced with KuiReact's own titles and copy.
3. **Architecture echoes KuiReact:**
   - A shared overlay core under `Overlays/shared`: presence / backdrop / focus for Modal and Drawer, an anchored-panel layer for Popover, DropdownMenu and MultiSelect.
   - KuiReact's ComboBox hooks (`useFilter`, `useAsync`, `useLoadMore`) ported for MultiSelect.
   - Toast's store and API ported line for line.
   - Label reused as the form-field label.
4. **Accessibility:** every defect from the first audit is fixed, and role-bearing Views are `accessible`.
5. **Tests on every component,** with KuiReact's own cases ported where they exist.

## Weaknesses

1. **Coverage:** 28 in-scope components are missing, including the date and time pickers, ComboBox, TagInput, FileInput, the tables and Chart.
2. **Not a package:** `private: true`, no exports map, and theme wiring lives in the showcase.
3. **Geist isn't bundled,** so typography uses the system font.
4. **Nothing has been verified visually on a device** or against KuiReact screenshots.
5. **Focus management** on the anchored overlays: Popover and DropdownMenu don't move focus into the panel or back to the trigger.

## Release readiness

| Use | Ready? |
| --- | --- |
| Internal showcase / design reference | Yes |
| Starter code to copy into an Expo app | Yes, for the 34 shared components |
| Published component library | No: not installable |
| "React Native counterpart of KuiReact" claim | For the shared set, yes; for the library as a whole, not until coverage rises |

## Recommended next actions

1. **Build the remaining roadmap components** in order: DatePicker (landed after this refresh), BrandLogo, Popconfirm, StarRating, StatCard, Statistic, TabButton, Timeline, and so on.
2. **Package the library:** exports map, build, `KuiProvider`, Font Awesome v7.
3. **Bundle Geist.**
4. **Add CI** (typecheck and tests), then take side-by-side screenshots against KuiReact's showcase.
