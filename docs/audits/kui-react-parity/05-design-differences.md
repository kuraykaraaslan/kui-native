# 05 · Design differences

> Summary of [phase-3-parity-review/design-differences.md](phase-3-parity-review/design-differences.md).

| Area | Parity | Finding |
| --- | --- | --- |
| Colour tokens | ● full | 33 / 33 names and light + dark values identical |
| Typography | ○ | Geist not loaded (README wrongly says Inter); headings render regular weight on iOS/web; component titles 2–3 steps larger than KuiReact |
| Radius | ◐ | Button/Input `rounded-lg` vs `rounded-md`; Modal `rounded-2xl` vs `rounded-xl` |
| Spacing | ◐ | Button md/lg, Input, Card, Modal, EmptyState, SkeletonCard paddings differ |
| Shadows | ○ | none in KuiNative; KuiReact Card `shadow-sm`, Modal `shadow-xl`, Toggle thumb |
| Interaction colours | ○ | `*-hover`, `*-active`, `surface-overlay` unused; no focus style |
| Motion | ○ | no Reanimated usage; Modal lacks scale-in; Skeleton pulse faster and deeper |
| Anatomy | ○ | Card and Modal lack header/body/footer sections and dividers; Modal lacks × button |
| Icons | ◐ | Font Awesome 6.7.2 vs KuiReact's v7 requirement |
| OS controls | decision | Switch and Spinner use OS widgets; KuiReact custom-renders both |

Mean per-component visual rating: **45 / 100**.
