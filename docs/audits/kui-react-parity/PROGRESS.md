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
| (this commit) | Docs refresh: regenerated inventories/backlog (44 missing), feature matrices for the 7 new components, Update blocks on the original 11, status matrix, re-scoring (34 → 56), README corrections; Avatar `src: null`, EmptyState `action` node + ReactNode `icon` |

## Next

1. **Wave 1 new components:** Select, Drawer, Toast (and the overlay core they share), then the rest of the roadmap order, each pixel-perfect with 1:1 showcase demos.
2. **API renames** on older components (keep deprecated aliases): Button/Badge `children`, `danger`, `neutral`, `TextInput` → `Input`, `Switch` → `Toggle`; then Button `iconRight`/`iconOnly`/`selected`, Badge `size`/`dot`/`dismissible`, Card `onPress`/`loading`, Input features, Checkbox `hint`/`error`, AvatarGroup rewrite.
3. **Accessibility:** announce TextInput/Checkbox errors.
4. **Infra:** packaging + `KuiProvider`, ESLint config, Font Awesome 7, Geist, CI.
5. After each batch: add the new ids to `SHARED` in `tooling/extract.js` (and the category maps in `generate.js`), re-run both scripts, delete the now-stale backlog files, write feature matrices, update status matrix and scores.
