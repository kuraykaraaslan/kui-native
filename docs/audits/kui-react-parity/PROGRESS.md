# Parity work — progress log

Working branch: `feature/wave1-parity`. Scope: KuiReact ui-layer atoms, molecules and organisms only (no app layer, domains or themes).

## Standing rules (from review)

1. **Pixel-perfect first.** Every component matches KuiReact's exact classes (radius, padding, type scale, weights, borders, shadows, motion). Fix existing components before adding new ones.
2. **Showcase demos are 1:1 with KuiReact's showcase.** Same variant titles, same sample copy. If a variant needs a prop that isn't ported yet, list it in a comment next to the variants array instead of inventing a substitute. Sidebar abbreviations come from KuiReact's registry `abbr`.
3. Every change ships with tests (Jest + `@testing-library/react-native` v14: `render` and `fireEvent` are async, always `await` them; `container.queryAll` replaces `UNSAFE_root`; pass `{ hidden: true }` to query hidden elements) and a clean `npx tsc --noEmit`.
4. A plain `View` with an `accessibilityRole` needs `accessible`, but never put `accessible` on a container that holds other interactive elements (iOS merges them).
5. Don't invent URLs or facts: verify against KuiReact's source or `package.json`.

## Done

| Commit | What |
| --- | --- |
| `35213bc` | Parity audit workspace |
| `4ebda43` | Scope correction (ui-layer only); Jest harness; Spinner fixed |
| `048ebed` | Pixel-perfect pass on every existing component; new Label + Separator; showcase demos matched to KuiReact |
| `9f595c4` | AlertBanner |
| `09fc889` | RadioGroup |
| `c935af3` | Textarea |
| `2ae6209` | TabGroup |
| `12b56f3` | Progress |
| `7ca2284` | Docs refresh: regenerated inventories/backlog (44 missing), feature matrices for the 7 new components, Update blocks on the original 11, status matrix, re-scoring (34 → 56), README corrections; Avatar `src: null`, EmptyState `action` node + ReactNode `icon` |
| `d8af042` | Select (inline listbox panel, as KuiReact); `countries-list` added for the 1:1 demos |
| `27def3b` | Overlay core (`Overlays/shared`: usePresence, Backdrop, useFocusOnOpen) + Drawer; Modal refactored onto it |
| `55f2d1b` | Toast suite (`toast()` API, Toaster, cards), `<Toaster />` mounted in the app root |
| `2866e66` | Button API parity (children, danger, iconRight, iconOnly, selected, rest/ref); Text defers to explicit font classes |
| `3e48fad` | Badge API parity (children, neutral, sizes, dot, dismissible) |
| `75edb0c` | Checkbox parity (hint, error, uncontrolled, disabled look) |
| `5f484a8` | Switch → Toggle (checked / onChange / ariaLabel; Switch kept as alias) |
| `92af9a3` | TextInput → Input with KuiReact's full feature set (TextInput kept as alias) |
| `dbdbdbd` | Card onPress / hoverable / loading |
| `599c8a1` | AvatarGroup rewritten to KuiReact's data-driven API |
| `eacef99` | Docs refresh: Select / Drawer / Toast matrices, API-parity Update blocks, status matrix (16 complete, 7 minor, 0 major), re-scoring 56 → 66 |
| `68ce86d` | Anchored overlay core (`Overlays/shared/AnchoredPanel`: useAnchor, computePosition, AnchoredPanel; `useTrigger`) + Popover, DropdownMenu, Tooltip |
| `6798bc6` | Accordion |
| `98242aa` | ButtonGroup |
| `859211c` | CheckboxGroup |
| `ed7a0e5` | SearchBar |
| `729f8ad` | Pagination (KuiReact tests ported) |
| `3bdedc4` | Stepper + Breadcrumb (href → expo-router) |
| `1f19759` | PageHeader |
| `6e76a56` | MultiSelect on KuiReact's ported ComboBox hooks (filter, async, load-more) |
| `0770214` | RangeSlider (single + dual handle) |
| (this commit) | Docs refresh pinned to `0770214`: 13 feature matrices, backlog pruned (28 left), status matrix (26 complete, 10 minor, 0 major), re-scoring 66 → 71; tooling gains `KN_REV` and remediation status |

## Next

1. **Refresh the docs for the DatePicker suite** (`97f78b5`, landed after this refresh's `KN_REV=0770214` cutoff) and anything after it.
2. **Remaining roadmap components** in order: BrandLogo, Popconfirm, StarRating, StatCard, Statistic, TabButton, Timeline, FileInput, Slider, Table, TagInput, TimePicker, ComboBox, DateRangePicker, then Wave 3 (Chart, ContentScoreBar, ScrollArea, ViewToggle, the tables, ColorPicker, DiffViewer, TreeView, MapView, VideoPlayer; SkipLink as an exception). Each pixel-perfect with 1:1 showcase demos.
3. **Infra:** packaging + `KuiProvider`, ESLint config, Font Awesome 7, Geist, CI.
4. **Minor gaps:** focus move / restore for the anchored overlays (Popover, DropdownMenu; reuse `useFocusOnOpen`), MultiSelect error `ring-1`, Spinner two-tone ring, Select outside-tap close, Modal `ref`, Label rest props, `SkeletonTableRow` (with Table).
5. After each batch: add the new ids to `SHARED` in `tooling/extract.js` (and the category maps in `generate.js`), run `KN_REV=<commit> node extract.js` then `node generate.js`, delete the now-stale backlog files, write feature matrices, update status matrix and scores, and mark finished `R-*` items in `REM_STATUS`.
