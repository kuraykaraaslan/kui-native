# 09 · Final verdict

> **If KuiNative were released today, how close is it to being a true React Native counterpart of KuiReact?**
>
> Scope: KuiReact's ui-layer atoms, molecules and organisms (62 components under `modules/ui/`). App-layer components, domain verticals and theme demos are out of scope by decision. Updated 2026-09-22 through commit `08c1c32`; earlier verdicts (34, 56, 66, then 71) are in git history.

**A faithful counterpart for what exists, and most of it now exists.** In-scope parity is **75 / 100**.

- **Shared components:** all 52 match KuiReact's classes, prop names and showcase demos. Forty-one are fully at parity; the other thirteen have only minor gaps.
- **Coverage:** 10 in-scope KuiReact components aren't built yet, all Wave 3; the 52 that are cover 94.7 % of KuiReact's in-scope production imports.
- **Packaging:** the library can't be installed yet.

## Estimated parity

| Lens | Value |
| --- | --- |
| Overall parity score | **75 %** |
| In-scope components that exist | 83.9 % (52 / 62) |
| In-scope usage covered | 94.7 % |
| Prop-name parity on shared components | 99.2 % |
| Components at PARITY_COMPLETE | 41 / 54 |
| Tests | 52 suites, 487 tests |

## Strengths

1. **Pixel and API parity on everything shared.**
   - The component names, props, variants and sizes are KuiReact's.
   - Old KuiNative names remain as deprecated aliases.
2. **Showcase parity:** 184 of 189 KuiReact demos are reproduced with KuiReact's own titles and copy.
3. **Architecture echoes KuiReact:**
   - A shared overlay core under `Overlays/shared`: presence / backdrop / focus for Modal and Drawer, an anchored-panel layer for Popover, DropdownMenu, Popconfirm, MultiSelect and the date / time pickers.
   - KuiReact's ComboBox hooks (`useFilter`, `useAsync`, `useLoadMore`) ported and shared by ComboBox and MultiSelect; the DatePicker suite and `Table/types.ts` keep KuiReact's layout.
   - Toast's store and API ported line for line.
   - Label reused as the form-field label.
4. **Accessibility:** every defect from the first audit is fixed, and role-bearing Views are `accessible`.
5. **Tests on every component,** with KuiReact's own cases ported where they exist.

## Weaknesses

1. **Coverage:** 10 in-scope components are missing: Chart, DataTable / AdvancedDataTable / BulkActionTable, ColorPicker, DiffViewer, TreeView, MapView, VideoPlayer, and SkipLink (recommended exception).
2. **Not a package:** `private: true`, no exports map, and theme wiring lives in the showcase.
3. **Geist isn't bundled,** so typography uses the system font.
4. **Nothing has been verified visually on a device** or against KuiReact screenshots.
5. **Focus management** on the anchored overlays: Popover and Popconfirm don't move focus into the panel or back to the trigger (DropdownMenu now moves it in on open).

## Release readiness

| Use | Ready? |
| --- | --- |
| Internal showcase / design reference | Yes |
| Starter code to copy into an Expo app | Yes, for the 52 shared components |
| Published component library | No: not installable |
| "React Native counterpart of KuiReact" claim | For the shared set, yes; for the library as a whole, once it is installable and the data tables land |

## Recommended next actions

1. **Package the library:** exports map, build, `KuiProvider`, Font Awesome v7.
2. **Finish Wave 3** in roadmap order: Chart, SkipLink (as an exception), BulkActionTable, ColorPicker, DataTable, DiffViewer, TreeView, AdvancedDataTable, MapView, VideoPlayer.
3. **Bundle Geist.**
4. **Add CI** (typecheck and tests), then take side-by-side screenshots against KuiReact's showcase.
