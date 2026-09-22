# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**
>
> Scope: KuiReact's ui-layer atoms, molecules and organisms (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope by decision. Updated 2026-09-22 through commit `599c8a1`; earlier verdicts (34, then 56) are in git history.

**A faithful counterpart for what exists, but only a third of it exists.** In-scope parity is **66 / 100**.

- **Shared components:** all 21 match KuiReact's classes, prop names and showcase demos. Sixteen are fully at parity; the other seven have only minor, platform-driven gaps.
- **Coverage:** 41 in-scope KuiReact components aren't built yet.
- **Packaging:** the library can't be installed yet.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **66 %** |
| In-scope components that exist | 33.9 % (21 / 62) |
| In-scope usage covered | 77.7 % |
| Prop-name parity on shared components | 97.9 % |
| Components at PARITY_COMPLETE | 16 / 23 |
| Tests | 22 suites, 278 tests |

## Strengths

1. **Pixel and API parity on everything shared.**
   - The component names, props, variants and sizes are KuiReact's.
   - Old KuiNative names remain as deprecated aliases.
2. **Showcase parity:** 102 of 104 KuiReact demos are reproduced with KuiReact's own titles and copy.
3. **Architecture echoes KuiReact:**
   - A shared overlay core under `Overlays/shared`, used by Modal and Drawer.
   - Toast's store and API ported line for line.
   - Label reused as the form-field label.
4. **Accessibility:** every defect from the first audit is fixed, and role-bearing Views are `accessible`.
5. **Tests on every component,** with KuiReact's own cases ported where they exist.

## Weaknesses

1. **Coverage:** 41 in-scope components are missing, including DropdownMenu, Popover, Tooltip, Accordion, ButtonGroup, Pagination, Stepper, the date pickers and the tables.
2. **Not a package:** `private: true`, no exports map, and theme wiring lives in the showcase.
3. **Geist isn't bundled,** so typography uses the system font.
4. **Nothing has been verified visually on a device** or against KuiReact screenshots.

## Release readiness

| Use | Ready? |
| --- | --- |
| Internal showcase / design reference | Yes |
| Starter code to copy into an Expo app | Yes, for the 21 shared components |
| Published component library | No: not installable |
| "React Native counterpart of KuiReact" claim | For the shared set, yes; for the library as a whole, not until coverage rises |

## Recommended next actions

1. **Build the remaining roadmap components** in order: DropdownMenu, Popover, Tooltip, Accordion, ButtonGroup, and so on.
2. **Package the library:** exports map, build, `KuiProvider`, Font Awesome v7.
3. **Bundle Geist.**
4. **Add CI** (typecheck and tests), then take side-by-side screenshots against KuiReact's showcase.
