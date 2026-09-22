import { useCallback, useRef } from "react";
import { AccessibilityInfo, findNodeHandle, type Text as RNText } from "react-native";

/**
 * Moves screen-reader focus to an element once an overlay has opened — the
 * native counterpart of KuiReact's `useFocusTrap` initial focus. Pass
 * `focusRef` to the overlay's title and `onOpened` to `usePresence`.
 */
export function useFocusOnOpen() {
  const focusRef = useRef<RNText>(null);
  const onOpened = useCallback(() => {
    const node = focusRef.current ? findNodeHandle(focusRef.current) : null;
    if (node) AccessibilityInfo.setAccessibilityFocus(node);
  }, []);
  return { focusRef, onOpened };
}
