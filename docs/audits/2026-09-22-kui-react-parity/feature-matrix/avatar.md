# Feature matrix — Avatar & AvatarGroup

> KuiReact `modules/ui/Avatar.tsx` (124 LOC, 0 tests, 5 showcase variants, 41 production imports) ↔ KuiNative `modules/ui/Avatar.tsx` (83 LOC, 0 tests, 1 demo).
> **Status (2026-09-22): Avatar PARITY_COMPLETE · AvatarGroup PARITY_COMPLETE.** Audit-time detail below; see the Update blocks for what changed.

## Update 2026-09-22 (API parity, `599c8a1`)

**Fixed**

- AvatarGroup rewritten to KuiReact's `avatars` / `max` / `size` API with overlap, ring and `+N` chip (children form kept, deprecated).
- Showcase shows all 5 KuiReact variants.

**Still open**

- Nothing for parity.

## Update 2026-09-22 (pixel-perfect pass, `048ebed`)

**Fixed**

- `lg` 48px / `xl` 64px with `text-base` / `text-lg` (were 56 / 80px, `text-lg` / `text-2xl`).
- Borders (`border-border` on images, `border-primary-subtle` on initials).
- `status` dot (online / offline / away / busy); `?` for blank names; `src` accepts `null`.
- The view now sets `accessible`, so its `image` role registers.
- 15 tests; showcase uses KuiReact's Initials (sizes) / With label / Image source / Status dot demos.

**Still open**

- AvatarGroup rewrite (data-driven `avatars` / `max` / overlap / `+N`).

## Avatar — API

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `name` (required) | ✓ | ✓ | Match |
| `src` | `string \| null` | `string` | Gap (null not accepted; minor type friction when porting) |
| `size` values / default | `xs · sm · md · lg · xl` / `md` | same | Match |
| `status` dot (`online · offline · away · busy`) | ✓ | ✗ | **Missing** |
| `className` | ✓ | ✓ | Match |
| Exported props type | ✗ | ✓ `AvatarProps` | Native-ahead |

## Avatar — Design

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Sizes xs/sm/md | 24 / 32 / 40 px | 24 / 32 / 40 | Match |
| Size lg | **48 px** (`h-12`) | 56 px (`h-14`) | **Differs** |
| Size xl | **64 px** (`h-16`) | 80 px (`h-20`) | **Differs** |
| Initials text lg / xl | `text-base` / `text-lg` | `text-lg` / `text-2xl` | **Differs** |
| Fallback colours | `bg-primary-subtle text-primary font-semibold` | same | Match |
| Border | image `border-border`; initials `border-primary-subtle` | none | Gap |
| Status dot | `border-2 border-surface-base`, success/text-disabled/warning/error | — | Missing |

## Avatar — Behaviour

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Initials algorithm | first letter of first 2 words, uppercase | same | Match |
| Empty/blank name | renders `?` | renders **empty circle** (`""`) | **Bug** |
| Broken image | renders a broken `<img>` (no fallback) | falls back to initials via `onError` | Native-ahead (KuiReact should adopt) |
| Image transition | none | 150 ms fade (`expo-image`) | Differs (acceptable) |

## Avatar — Accessibility

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Name exposed | `alt` / `aria-label` | `accessibilityRole="image"` + `accessibilityLabel={name}` | Match |
| Status exposed | `aria-label={status}` on dot | — | Missing |

## AvatarGroup

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| API model | data-driven: `avatars: {src,name}[]` | `children` | **Differs fundamentally** |
| `max` (default 4) + overflow chip `+N` | ✓ | ✗ | **Missing** |
| `size` applied to all | ✓ | ✗ | **Missing** |
| Overlap | `-space-x-2` + `ring-2 ring-surface-base` | none — plain `flex-row` | **Missing** |
| Group label | `aria-label="N users"` | none | **Missing** |
| `className` | ✗ | ✓ | Native-only |
| Props type exported | — | ✗ (inline type) | Gap |

AvatarGroup shares only its name with KuiReact. Every KuiReact call site (`<AvatarGroup avatars={users} max={3} />`) fails to compile against KuiNative. See [rewrite-candidates.md](../phase-3-parity-review/rewrite-candidates.md#avatargroup).

## Documentation & testing

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| Showcase | Initials (sizes), With label, Image source, Status dot, AvatarGroup | Sizes (Avatar + AvatarGroup) | Gap |
| Unit tests | 0 | 0 | Match (both missing) |
