# Parity work — progress log

Working branch: `feature/wave1-parity`. Scope: KuiReact ui-layer atoms, molecules and organisms only (no app layer, domains or themes).

## Standing rules (from review)

1. **Pixel-perfect first.** Every component matches KuiReact's exact classes (radius, padding, type scale, weights, borders, shadows, motion). Fix existing components before adding new ones.
2. **Showcase demos are 1:1 with KuiReact's showcase.** Same variant titles, same sample copy. If a variant needs a prop that isn't ported yet, list it in a comment next to the variants array instead of inventing a substitute.
3. Every change ships with tests (Jest + `@testing-library/react-native` v14: `render` and `fireEvent` are async, always `await` them; `container.queryAll` replaces `UNSAFE_root`) and a clean `npx tsc --noEmit`.
4. A plain `View` with an `accessibilityRole` needs `accessible` or the role is invisible.

## Done

| Commit | What |
| --- | --- |
| `35213bc` | Parity audit workspace |
| `4ebda43` | Scope correction (ui-layer only); Jest harness; Spinner fixed |
| `048ebed` | Pixel-perfect pass on every existing component (Text, Button, Card, Avatar, TextInput, Checkbox, Switch rebuild, EmptyState, Skeleton family, Modal rebuild); new Label + Separator; showcase demos matched to KuiReact; 137 tests |

## Next

1. **Docs refresh for `048ebed`**: re-run `tooling/extract.js` + `generate.js` (SHARED already includes `label`, `separator`); delete `component-backlog/label.md`, `separator.md`; add `feature-matrix/label.md`, `separator.md`; update every existing feature matrix, the status/parity matrices, testing-differences, implementation-quality, scoring, 00/07/09 to reflect the fixes.
2. **Remaining API gaps on shared components** (not pixel): Button `children`/`danger`/`iconRight`/`iconOnly`/`selected`/rest+ref; Badge `children`/`neutral`/`size`/`dot`/`dismissible`; Card `onPress`/`loading`; TextInput → `Input` + success/required/prefix/suffix/clearable/count/password/readOnly/ref; Checkbox `hint`/`error`/uncontrolled; Switch → `Toggle` naming; AvatarGroup rewrite; `SkeletonTableRow` (with Table).
3. **Wave 1 new components** in roadmap order: AlertBanner, RadioGroup, TabGroup, Textarea, Drawer, Progress, Select, Toast — each pixel-perfect with 1:1 showcase demos.
4. Infra still open: R-infra-package, R-infra-lint, R-theme-provider, R-fa-version (FA 6 → 7).
