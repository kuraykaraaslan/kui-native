# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**
>
> Scope: KuiReact's ui-layer atoms, molecules and organisms (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope by decision. Updated 2026-09-22 through commit `12b56f3`; the first-pass verdict (34 / 100) is in git history.

**Halfway, and visually faithful.** In-scope parity is **56 / 100**.

- **Coverage:** 18 of 62 in-scope KuiReact components exist. They carry 75.8% of KuiReact's in-scope usage.
- **Visuals:** every component now renders with KuiReact's exact classes, and its showcase reuses KuiReact's own demos.
- **Remaining gaps:** they are now mostly about API naming, missing components, and packaging, rather than looks.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **56 %** |
| In-scope components that exist | 29.0 % (18 / 62) |
| In-scope usage covered | 75.8 % |
| Prop-name parity on shared components | 79.7 % |
| Components at PARITY_COMPLETE | 7 / 20 |
| Tests | 18 suites, 195 tests |

## Strengths

1. **Pixel parity on everything that exists:** radius, padding, type scale, weights, borders, shadows and motion match KuiReact's source classes.
2. **Showcase parity:** demos reuse KuiReact's variant titles and sample copy. Where a variant needs an unported prop, a comment says so instead of inventing a substitute.
3. **Tokens:** all 33 colour tokens are identical in light and dark.
4. **Accessibility fixes beyond KuiReact's baseline:**
   - Modal, Switch and AlertBanner keep interactive children as separate accessibility elements.
   - Every role-bearing View is `accessible`.
   - Reduce Motion is honoured by Skeleton and Modal.
5. **Tests:** every component has a suite, and KuiReact's own cases are ported where they exist.

## Weaknesses

1. **Not a package:** `private: true`, no exports map, and theme wiring lives in the showcase.
2. **API naming is still React Native-flavoured** on older components: `label` vs `children`, `destructive`, `default`, `TextInput`, `Switch`.
3. **44 in-scope components are still missing**, including Select, Toast, Drawer, DropdownMenu, Popover and Tooltip.
4. **Form errors aren't announced to screen readers** on TextInput and Checkbox.
5. **Geist isn't bundled**, so typography uses the system font.

## Release readiness

| Use | Ready? |
| --- | --- |
| Internal showcase / design reference | Yes |
| Starter code to copy into an Expo app | Yes, for the 20 components that exist |
| Published component library | No: not installable |
| "React Native counterpart of KuiReact" claim | Not yet: 29% in-scope coverage, 7 components fully at parity |

## Recommended next actions

1. **Finish Wave 1:** Select, Drawer, Toast, then the overlay core they share.
2. **Do the API renames** as a batch, keeping deprecated aliases:
   - Button and Badge: `label` → `children`.
   - Values: `destructive` → `danger`, `default` → `neutral`.
   - Components: `TextInput` → `Input`, `Switch` → `Toggle`.
3. **Package the library:** exports map, build, `KuiProvider`, Font Awesome v7.
4. **Add Geist, and announce form errors.**
5. **Add CI** running typecheck and tests, then take the first side-by-side screenshots against KuiReact's showcase.
