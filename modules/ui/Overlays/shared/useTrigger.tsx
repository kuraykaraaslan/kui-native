import * as React from "react";
import { Pressable, View, type GestureResponderEvent } from "react-native";

type PressableTriggerProps = { onPress?: (e: GestureResponderEvent) => void } & Record<string, unknown>;

/**
 * Wires an overlay trigger. On the web KuiReact relies on the click bubbling
 * up to a wrapping <div>; on RN the inner Pressable (e.g. a Button) claims
 * the touch, so the toggle is injected into the trigger element's own
 * `onPress` (KuiReact's DropdownMenu does the same with cloneElement).
 * Non-element triggers are wrapped in a Pressable. The wrapper View is the
 * anchor that gets measured.
 */
export function Trigger({
  anchorRef,
  trigger,
  onToggle,
  extraProps,
}: {
  anchorRef: React.RefObject<View | null>;
  trigger: React.ReactNode;
  onToggle: () => void;
  extraProps?: Record<string, unknown>;
}) {
  const node = React.isValidElement<PressableTriggerProps>(trigger) ? (
    React.cloneElement(trigger, {
      ...extraProps,
      onPress: (e: GestureResponderEvent) => {
        trigger.props.onPress?.(e);
        onToggle();
      },
    })
  ) : (
    <Pressable onPress={onToggle} accessibilityRole="button" {...extraProps}>
      {trigger}
    </Pressable>
  );
  return (
    <View ref={anchorRef} collapsable={false} className="self-start">
      {node}
    </View>
  );
}
