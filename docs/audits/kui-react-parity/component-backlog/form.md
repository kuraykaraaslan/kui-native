# Form

> Backlog item · KuiReact id `form` · layer `app` · **Forms** · Priority **High** · Complexity **Small** · Wave 2 · Fit `direct` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

Form layout wrapper with title, description, error and actions slots. `columns` prop renders fields in a 1 or 2 column grid.

**Why it matters for KuiNative:** Form layout shell: title, description, error banner, grid, actions.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/app/Form.tsx` (1 file, 56 LOC) |
| Public export | `@kuraykaraaslan/kui-react/app` — public (npm: root + /app) |
| Registry | yes · status `stable` · since 2025-03 |
| Showcase variants | Single column, Two column |
| Composes | AlertBanner (missing) |
| Used by (registry) | — |
| Usage frequency | imported by 11 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | — |

## Required Props

Parsed from `modules/app/Form.tsx`. **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `title` | `string` | no | — |  | same |
| `description` | `string` | no | — |  | same |
| `error` | `string` | no | — |  | same |
| `columns` | `1 \| 2` | no | `1` |  | same |
| `actions` | `React.ReactNode` | no | — |  | same |
| `children` | `React.ReactNode` | no | — |  | keep (strings must be wrapped in `Text`) |
| `onSubmit` | `React.FormEventHandler<HTMLFormElement>` | no | — |  | use value-based callback (RN has no DOM events) |
| `className` | `string` | no | — |  | keep (NativeWind) |

## Variants

### Single column

```tsx
<Form
  title="Create project"
  description="Fill in the details to create a new project."
  onSubmit={handleSubmit}
  actions={
    <>
      <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" type="submit">Save project</Button>
    </>
  }
>
  <Input id="name" label="Project name" required value={name} onChange={...} error={nameError} />
  <Input id="email" label="Owner email" type="email" required value={email} onChange={...} />
  <Select id="visibility" label="Visibility" value={visibility} onChange={...} options={options} />
// …
```

### Two column

```tsx
<Form title="Create project" columns={2} onSubmit={handleSubmit} actions={<Button type="submit">Save</Button>}>
  <Input id="name" label="Project name" required value={name} onChange={...} />
  <Input id="email" label="Owner email" type="email" value={email} onChange={...} />
  <Select id="visibility" label="Visibility" value={visibility} onChange={...} options={options} />
  <MultiSelect id="stack" label="Tech stack" value={stack} onChange={setStack} options={options} />
  <div className="sm:col-span-2">
    <Textarea id="description" label="Description" value={description} onChange={...} />
  </div>
</Form>
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| error | `error` | error tokens, message with role=alert | error tokens + message announced (live region / announceForAccessibility) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact source uses no explicit ARIA attributes or roles for this component.

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border` | #e5e7eb | #334155 | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `secondary` | #8b5cf6 | #a78bfa | ✓ |
| `text-primary` | #111827 | #f1f5f9 | ✓ |
| `text-secondary` | #6b7280 | #94a3b8 | ✓ |

Use NativeWind classes (`bg-border`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- AlertBanner — missing → [backlog](alert-banner.md)

**Blocked by (roadmap):** `alert-banner`

**Third-party:** none

**Suggested RN libraries:** `alert-banner`

## Implementation Notes

ScrollView + KeyboardAvoidingView wrapper; 1/2-column grid collapses to 1 on phones.

- Location: `modules/app/Form.tsx`, named export `Form` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `FormProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `Form` from the `modules/app` barrel with its props type
- [ ] All 8 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (Single column, Two column)
- [ ] State **error** implemented: error tokens + message announced (live region / announceForAccessibility)
- [ ] Uses only semantic tokens (`border`, `primary`, `secondary`, `text-primary`, `text-secondary`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
