# 06 · Behaviour differences

> Summary of [behavior-differences.md](phase-3-parity-review/behavior-differences.md) and [accessibility-differences.md](phase-3-parity-review/accessibility-differences.md).

## Defects (fix regardless of parity)

| # | Severity | Component | Defect |
| --- | --- | --- | --- |
| AX1 | Critical | Modal | Nested accessible Pressables collapse the whole dialog into one VoiceOver element |
| AX2 | Critical | TextInput, Checkbox | Errors not announced, not linked to the field |
| B1 | High | Modal | Long content overflows the screen (no scroll) |
| B2 | High | Modal | Keyboard covers inputs (no KeyboardAvoidingView) |
| B4 | High | Text | Headings render regular weight on iOS/web |
| AX3 | High | Switch | Label and control are separate focus stops |
| B7 | Medium | Switch | Label press doesn't toggle |
| B5 | Medium | Spinner | `sm` and `md` identical |
| B3 | Low | Modal | Android status bar not covered by backdrop |
| B6 | Low | Avatar | Blank name renders empty circle |

## Parity differences

- **States:** Button `loading` blocks press in KuiNative, not in KuiReact (KuiNative's behaviour is safer — keep and record it). Checkbox is controlled-only. Input has no success/read-only/disabled visuals. Card has no loading state. Modal backdrop dismissal isn't configurable.
- **Transitions:** KuiReact overlays run a presence state machine with animated exit; KuiNative relies on the OS fade.
- **Focus:** KuiReact traps and restores focus and shows focus rings; KuiNative has no focus handling or focus styles (relevant on react-native-web, which KuiNative targets).
- **Dismissal:** KuiNative Modal has no × button.
- **Hover → press:** only Button and Checkbox give pressed feedback.
