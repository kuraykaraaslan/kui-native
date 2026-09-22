# Rewrite candidates

Two KuiNative components are marked **REQUIRES_REWRITE**. One is on a watch list.

---

## Modal

**Status: REQUIRES_REWRITE**

### Why
- API diverges on the basic prop (`visible` vs `open`) and lacks 7 of KuiReact's props (`description`, `size`, `fullscreen`, `scrollable`, `closeOnBackdropClick`, `closeOnRouteChange`, `reducedMotion`); `title` is optional.
- Structure differs: no header/body/footer sections, no × button, different surface token (`surface-base` vs `surface-raised`), radius, title size, no shadow.
- Critical defects: nested accessible `Pressable`s collapse the dialog into one VoiceOver element; content overflows with no scroll; keyboard covers inputs; no focus management.
- The fix for the a11y defect changes the component's core structure (backdrop becomes a sibling, panel becomes a View), and adding scroll/keyboard handling changes it again. Together with the rename, almost no line survives. An incremental patch series would cost more than a rewrite.
- Every future overlay (Drawer, Popover, Select sheet, DropdownMenu, Popconfirm, Toast region) needs the same foundations; writing them once as an overlay core is the architectural fix.

### Estimated effort
Overlay core: 2–3 d · Modal on top: 2–3 d · tests (7 KuiReact cases + a11y cases): 1 d → **5–7 engineer-days**.

### Risks
- Breaking change for every current `Modal` call site (`visible` → `open`, required `title`). Mitigate with a one-release alias (`visible` accepted, dev warning).
- RN `Modal` vs custom root host: RN `Modal` gives a separate window (correct above native headers, handles Android back) but complicates stacking and animation control. A custom host (portal to root View) gives full control but must handle Android back (`BackHandler`) and status bar. Recommendation below.
- NativeWind `vars()` theme must reach the overlay's tree. It does today because the Modal stays a React child of the themed root; a portal host must be mounted inside `KuiProvider`.

### Recommended architecture
```
modules/ui/Overlays/
  shared/
    usePresence.ts      // open → closing → closed, 250 ms, mirrors KuiReact; drives Reanimated
    Backdrop.tsx        // absolute Pressable sibling, bg-black/50, closeOnBackdropPress, a11y label
    OverlayHost.tsx     // portal host rendered by KuiProvider (for Popover/Toast); Modal/Drawer use RN Modal
    useOverlayA11y.ts   // accessibilityViewIsModal, initial focus on title, restore focus
    useBackHandler.ts   // Android back → onClose (for host-rendered overlays)
    useReducedMotion    // re-export from Reanimated
  Modal/index.tsx       // RN Modal (transparent, statusBarTranslucent) + Backdrop + panel View
  Drawer/index.tsx      // same core, translate animation, swipe to close
  Popover/index.tsx     // OverlayHost + measureInWindow positioning (port positioning.ts)
```
Modal panel: `View` with `bg-surface-raised rounded-xl border-border` + shadow token; header (`px-6 py-4 border-b`, title `text-base font-semibold`, `accessibilityRole="header"`, × button with `accessibilityLabel="Close dialog"`), body in `ScrollView` when `scrollable` (max height 85 % of window), footer (`px-6 py-4 border-t`, `flex-row justify-end gap-2`). Wrap in `KeyboardAvoidingView`. Enter: backdrop fade + panel scale 0.95→1 over 200 ms; skip when Reduce Motion is on. `closeOnRouteChange` → expo-router `useFocusEffect` cleanup.

### Migration strategy
1. Land overlay core + new `Modal` behind the same export; accept `visible` as a deprecated alias that logs once in `__DEV__`.
2. Port KuiReact's 7 Modal tests plus a11y tests (each child focusable, title focused on open).
3. Update showcase with KuiReact's 5 variants (Confirmation, Sizes, Scrollable, Fullscreen, Nested).
4. Remove `visible` alias in the next minor version.

---

## AvatarGroup

**Status: REQUIRES_REWRITE**

### Why
KuiReact's AvatarGroup is data-driven (`avatars: {src,name}[]`, `max = 4`, `size`), overlaps avatars (`-space-x-2`, `ring-2 ring-surface-base`), renders a `+N` overflow chip and labels the group ("N users"). KuiNative's is a 9-line `flex-row` wrapper around `children`. None of the behaviour exists and the prop model is incompatible, so there is nothing to increment from.

### Estimated effort
0.5–1 d including tests.

### Risks
Breaking change for children-based call sites (only the showcase uses it today). Supporting `children` as a fallback would keep a non-KuiReact API alive; don't.

### Recommended architecture
Map `avatars.slice(0, max)` to `Avatar` with `size`; negative margin (`-ml-2` on all but first) and a `border-2 border-surface-base` ring; overflow `View` with `bg-surface-sunken text-text-secondary`; container `accessibilityRole="image"` + `accessibilityLabel={`${avatars.length} users`}` and children hidden from the a11y tree.

### Migration strategy
Replace in one change (only internal usage). Export `AvatarGroupProps`.

---

## Watch list: Switch → Toggle

Incremental fixes cover the rename, props, description, label press and single a11y element. It becomes a rewrite only if KuiReact's `size` and custom track appearance are required: the OS `Switch` cannot be resized or restyled, so a Reanimated track + thumb would replace the whole file. **Decision needed:** match KuiReact's look (rewrite, 1–2 d) or record "OS switch" as an approved exception and drop `size` (incremental, 0.5 d).
