# ShareDialog

> Backlog item · KuiReact id `share-dialog` · layer `app` · **Overlay** · Priority **Low** · Complexity **Medium** · Wave 3 · Fit `adapt` · est. 2–3 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Share modal: copyable link, email invitation with permission picker, and a list of current invitees with permission/remove controls.

**Why it matters for KuiNative:** Collaboration invite dialog; native share is usually `Share.share`.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/ShareDialog.tsx` (1 file, 267 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2026-05 |
| Showcase variants | With invitees, Empty / link only |
| Composes | Avatar (exists as `Avatar` + `AvatarGroup`), Button (exists as `Button`), Modal (exists as `Modal`) |
| Used by (registry) | — |
| Usage frequency | imported by 0 production file(s), 1 showcase file(s) |
| Third-party imports | `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons` |
| Unit tests | none |
| Interaction flags | focus-visible ring, animated/transitions, hover styles |

## Required Props

Parsed from `modules/app/ShareDialog.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `open` | `boolean` | **yes** | — |  | same |
| `onClose` | `() => void` | **yes** | — |  | same |
| `title` | `string` | no | `'Share'` |  | same |
| `description` | `string` | no | `'Invite people or copy the li…` |  | same |
| `shareUrl` | `string` | **yes** | — |  | same |
| `invitees` | `ShareInvitee[]` | no | `[]` |  | same |
| `permissions` | `{ value: SharePermission; label: string }[]` | no | `DEFAULT_PERMISSIONS` |  | same |
| `defaultPermission` | `SharePermission` | no | `'viewer'` |  | same |
| `onInvite` | `(email: string, permission: SharePermission) => void \| Promise<void>` | no | — |  | same |
| `onRemove` | `(id: string) => void` | no | — |  | same |
| `onPermissionChange` | `(id: string, permission: SharePermission) => void` | no | — |  | same |
| `portalTarget` | `Element \| string \| null` | no | — |  | n/a (use root overlay host) |

## Variants

### With invitees

```tsx
<ShareDialog
  open
  onClose={() => {}}
  shareUrl="https://app.example.com/docs/x4y9"
  invitees={[
    { id: '1', name: 'Alice Brooks',  email: 'alice@example.com', permission: 'owner' },
    { id: '2', name: 'Marcus Reed',   email: 'marcus@example.com', permission: 'editor' },
  ]}
/>
```

### Empty / link only

```tsx
<ShareDialog
  open
  onClose={() => {}}
  shareUrl="https://app.example.com/docs/x4y9"
  invitees={[]}
/>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| open / expanded | `open` | visible/expanded | `accessibilityState.expanded` / modal visibility |
| hover | `hover:` classes | hover colour/elevation | pressed state instead (`active:` classes / Pressable `pressed`) |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="alert"` | `accessibilityRole="alert"` |
| `aria-describedby` | `accessibilityHint` |
| `aria-hidden` | `accessibilityElementsHidden` + `importantForAccessibility="no-hide-descendants"` |
| `aria-invalid` | announce error; include in hint |
| `aria-label` | `accessibilityLabel` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).
- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `surface-base` | #ffffff | #0f172a | ✓ |
| `surface-raised` | #f9fafb | #1e293b | ✓ |
| `border` | #e5e7eb | #334155 | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-primary`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- Avatar — exists as `Avatar` + `AvatarGroup`
- Button — exists as `Button`
- Modal — exists as `Modal`

**Blocked by (roadmap):** `R-avatar`, `R-button`, `R-modal`, `R-overlay-core`

**Third-party:** `@fortawesome/react-fontawesome` → @fortawesome/react-native-fontawesome, `@fortawesome/free-solid-svg-icons`

**Suggested RN libraries:** `modal`

## Implementation Notes

Port as Modal content; expose OS share sheet as an additional action.

- Location: `modules/app/ShareDialog.tsx`, named export `ShareDialog` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `ShareDialogProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `ShareDialog` from the `modules/app` barrel with its props type
- [ ] All 12 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (With invitees, Empty / link only)
- [ ] State **open / expanded** implemented: `accessibilityState.expanded` / modal visibility
- [ ] State **hover** implemented: pressed state instead (`active:` classes / Pressable `pressed`)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`primary`, `surface-base`, `surface-raised`, `border`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
