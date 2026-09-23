import { AccessibilityInfo, Platform, type View } from "react-native";

/**
 * Moves focus to an element when an overlay opens (KuiReact's focus trap
 * initial focus). react-native-web has no `sendAccessibilityEvent`, so on the
 * web the element's DOM node is focused directly, as KuiReact does.
 */
export function focusElement(node: View | null) {
  if (!node) return;
  if (Platform.OS === "web") (node as unknown as { focus?: () => void }).focus?.();
  else AccessibilityInfo.sendAccessibilityEvent(node, "focus");
}
