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
| `6fcde20` | Docs refresh pinned to `0770214`: 13 feature matrices, backlog pruned (28 left), status matrix (26 complete, 10 minor, 0 major), re-scoring 66 → 71; tooling gains `KN_REV` and remediation status |
| `97f78b5` | DatePicker suite (DatePicker, DateRangePicker, DateTimePicker stub); Calendar gets the merged `messages` (KuiReact's `today` override never applies) |
| `44cdca3` | BrandLogo + Popconfirm (KuiReact tests ported) |
| `e024908` | StarRating, StatCard, Statistic, TabButton |
| `586b14a` | Timeline (connector stops at the last item, per KuiReact's documented intent) |
| `77ce794` | TagInput (double-tap / long-press edit) |
| `5630391` | Audit gaps closed: DropdownMenu initial screen-reader focus (`AnchoredPanel onShow`), MultiSelect error `ring-1` |
| `1fe3d56` | ComboBox (`modules/ui/ComboBox/`, shared hooks, windowed list) |
| `6265440` | FileInput on `expo-document-picker` (paste variant not reproduced) |
| `b83d87f` | Table primitive (`modules/ui/Table/`; DataTable still to do) |
| `248e523` | TimePicker (hour / minute columns) + KuiReact's DateRangePicker "Time picker" demo |
| `cd76c65` | Slider carousel (swipe momentum, edge resistance, autoplay) |
| `08c1c32` | ContentScoreBar, ViewToggle, ScrollArea |
| `d434692` | Docs refresh pinned to `08c1c32`: 18 feature matrices, DropdownMenu / MultiSelect matrices closed, backlog pruned (10 left), status matrix (41 complete, 13 minor, 0 major), re-scoring 71 → 75; public-exports reads `*Props` types from the barrel |
| `9aafffe` | TreeView (KuiReact's `useTreeState` unchanged; tap / long-press multi-select) |
| `17c8796` | ColorPicker (KuiReact's colour maths and `useColorState` unchanged; hue strip for the native picker; `expo-clipboard` copy) |
| `02d510b` | Audit gaps closed: DatePicker / DateRangePicker trigger and TagInput error `ring-1`, Popconfirm initial screen-reader focus (`AnchoredPanel onShow`), `time-picker` showcase entry (Default, Required / error) |
| `d856e72` | DatePicker error-ring test typing fix |
| `da93014` | DataTable (static / paginated / server; KuiReact's `useTable` / `useServerTable` unchanged; long-press multi-sort) |
| `10af451` | BulkActionTable (id-keyed selection, bulk-action bar) |
| `172a657` | AdvancedDataTable (index-keyed selection, expandable rows, sticky header) |
| `1466d8c` | DiffViewer (KuiReact's LCS `useDiff` unchanged; unified / split with synced scroll, collapsible context) |
| `7bb58b2` | Chart library (Line, Bar, Area, Pie, Donut, Scatter, SparkLine on `react-native-svg`; M3 stubs) |
| `8a03aa8` | MapView (`react-native-maps` with KuiReact's CartoDB tiles, zones / routes, tap-to-add; web build shows a notice) |
| `3d2d0f9` | VideoPlayer (`expo-video`, KuiReact's control overlay and settings, parsed WebVTT subtitles; Cast and keyboard shortcuts not ported) |
| (this commit) | Docs refresh pinned to `3d2d0f9`: 9 feature matrices, DatePicker / DateRangePicker / TimePicker / Popconfirm / TagInput matrices closed, backlog pruned (SkipLink left), status matrix (53 complete, 10 minor, 0 major), re-scoring 75 → 77; tooling gains `KN_SRC` (sources read from a snapshot of the pinned commit) and reads `index.ts` / multi-line barrel entries |

## Next

0. **Refresh the docs for `fcc2af9`** (Spinner two-tone ring, `SkeletonTableRow`, Label rest props, Modal `ref`), which landed after this refresh's `KN_REV=3d2d0f9` cutoff; with it Spinner, Skeleton, Label and Modal should move to PARITY_COMPLETE and `R-spinner` / `R-skeleton` to done.
1. **SkipLink + LiveRegion: decide the exception.** It is the only in-scope KuiReact component without a KuiNative counterpart (fit `web-only`; 16 production imports, mostly the theme-demo `layout.tsx` shells). Either record it in `parity.exceptions.json` with the rationale (no skip-navigation on RN; announcements via `AccessibilityInfo.announceForAccessibility`), or ship a small `LiveRegion` / `announce` helper and except only `SkipLink`.
2. **Infra:** packaging + `KuiProvider`, ESLint config, Font Awesome 7, Geist, CI.
3. **Remaining minor gaps:** focus move / restore for Popover (use `AnchoredPanel onShow`, as DropdownMenu and Popconfirm do); Chart: `img` role on Pie / Donut / Scatter and the `Brush` stub export; MapView's web fallback; Select outside-tap close (documented in `fcc2af9`); TabGroup arrow keys (keyboard pattern).
4. After each batch: add the new ids to `SHARED` in `tooling/extract.js` (and the category maps in `generate.js`), snapshot the pinned commit (`git archive <commit> modules libs app | tar -x -C <dir>`), run `KN_REV=<commit> KN_SRC=<dir> node extract.js` then `KN_SRC=<dir> node generate.js`, delete the now-stale backlog files, write feature matrices, update status matrix and scores, and mark finished `R-*` items in `REM_STATUS`.
