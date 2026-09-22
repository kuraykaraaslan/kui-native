# SkipLink + LiveRegion

> Backlog item · KuiReact id `skip-link` · layer `ui` · **Utility** · Priority **Low** · Complexity **Small** · Wave 3 · Fit `web-only` · est. 0.5–1 d
> Generated 2026-09-22 from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](README.md)

## Overview

SkipLink is visually hidden until focused, enabling keyboard users to bypass navigation. LiveRegion announces dynamic content to screen readers.

**Why it matters for KuiNative:** Skip-to-content links are a keyboard/DOM concept. LiveRegion/Announcer (same file) do have an RN equivalent and are tracked in accessibility-kit.

> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears.

## KuiReact Reference

| | |
| --- | --- |
| Source | `kui-react/modules/ui/SkipLink.tsx` (1 file, 60 LOC) |
| Public export | `@kuraykaraaslan/kui-react/ui` — public (npm: root + /ui) |
| Registry | yes · status `stable` · since 2025-01 |
| Showcase variants | SkipLink (focus to reveal), LiveRegion |
| Composes | — |
| Used by (registry) | — |
| Usage frequency | imported by 16 production file(s), 1 showcase file(s) |
| Third-party imports | — |
| Unit tests | none |
| Interaction flags | focus-visible ring, sr-only text |

## Required Props

Parsed from `modules/ui/SkipLink.tsx` (SkipLink + LiveRegion). **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.

| Prop | Type | Required | Default | Notes | RN mapping |
| --- | --- | --- | --- | --- | --- |
| `href` | `string` | no | `'#main-content'` |  | → `onPress` + expo-router `Link` |
| `label` | `string` | no | `'Skip to main content'` |  | same |
| `className` | `string` | no | — |  | keep (NativeWind) |
| `message` | `string` | no | — | (LiveRegion) | same |
| `politeness` | `'polite' \| 'assertive'` | no | `'polite'` | (LiveRegion) | same |
| `className` | `string` | no | — | (LiveRegion) | keep (NativeWind) |

## Variants

### SkipLink (focus to reveal)

```tsx
// Place at top of layout:
<SkipLink href="#main-content" />

// Linked target:
<main id="main-content">...</main>
```

### LiveRegion

```tsx
function Demo() {
  const [msg, setMsg] = useState('');
  return (
    <>
      <button onClick={() => setMsg('Action completed')}>Act</button>
      <LiveRegion message={msg} />
    </>
  );
}
```

Every variant above must have an equivalent demo in `modules/showcase/registry.tsx` with the same title.

**Enumerated props:**

- `politeness`: 'polite' · 'assertive' (default 'polite')

## States

| State | KuiReact signal | KuiReact behaviour | KuiNative requirement |
| --- | --- | --- | --- |
| focus | `focus-visible:ring-2` | focus ring on keyboard focus | focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state) |

Plus, for every component: light + dark scheme, font scaling (`allowFontScaling` respected, layout survives 200 % text), and RTL (`I18nManager.isRTL`).

## Accessibility Requirements

KuiReact uses the following; each needs its React Native equivalent:

| KuiReact | React Native |
| --- | --- |
| `role="status"` | `accessibilityRole="summary"` |
| `aria-atomic` | announce full message |
| `aria-live` | `accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility` |

Platform requirements (all components):

- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use `hitSlop` when the visual is smaller.
- Every interactive element has `accessibilityRole` and an accessible name; decorative icons are hidden from the accessibility tree.
- Do not nest multiple interactive elements inside one accessible `Pressable` (iOS merges them into a single element).

## Design Tokens

| Token | Light | Dark | In KuiNative theme |
| --- | --- | --- | --- |
| `border-focus` | #3b82f6 | #60a5fa | ✓ |
| `primary` | #3b82f6 | #60a5fa | ✓ |
| `primary-fg` | #ffffff | #ffffff | ✓ |

Use NativeWind classes (`bg-border-focus`, …); only props that cannot take `className` (icon `color`, `placeholderTextColor`, `trackColor`, SVG `fill`) may read `useThemeTokens()`. No raw hex.

## Dependencies

**KuiReact components it composes:**

- none

**Blocked by (roadmap):** nothing

**Third-party:** none

## Implementation Notes

Record SkipLink as a parity exception. Port `LiveRegion`/`Announcer` via `AccessibilityInfo.announceForAccessibility` and `accessibilityLiveRegion` (Android).

- Location: `modules/ui/SkipLink.tsx`, named export `SkipLink` (same name as KuiReact), re-exported from the layer barrel.
- Styling via `cn()` + semantic token classes; variant/size maps as `Record<Variant, string>` like the existing KuiNative components.
- Props: keep KuiReact names/defaults; spread remaining host props (`...rest`) and forward `ref` so `testID`, `accessibilityHint`, `hitSlop` etc. pass through (current KuiNative components mostly do not).
- Export the `SkipLinkProps` type.
- Add a showcase entry (`modules/showcase/registry.tsx`) with one demo per KuiReact variant.

## Acceptance Criteria

- [ ] Exported as `SkipLink` from the `modules/ui` barrel with its props type
- [ ] All 6 KuiReact props present with identical names and defaults, or each deviation recorded in `parity.exceptions.json` (RN mappings above are pre-approved deviations)
- [ ] Showcase demos for all 2 KuiReact variants (SkipLink (focus to reveal), LiveRegion)
- [ ] State **focus** implemented: focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)
- [ ] Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack
- [ ] Uses only semantic tokens (`border-focus`, `primary`, `primary-fg`); renders correctly in light and dark
- [ ] Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props
- [ ] Prop table + usage snippet documented in the showcase entry
