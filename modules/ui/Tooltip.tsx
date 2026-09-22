import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, View, type LayoutChangeEvent, type ViewStyle } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type TooltipTheme = "default" | "dark" | "light";
type TooltipPlacement = "top" | "bottom" | "left" | "right";

// Pixel-for-pixel with KuiReact's Tooltip (modules/ui/Tooltip.tsx), including
// its raw gray-900 / white themes.
const themeMap: Record<TooltipTheme, { box: string; text: string; arrow: string }> = {
  default: { box: "bg-surface-overlay border border-border", text: "text-text-primary", arrow: "bg-surface-overlay border-border" },
  dark: { box: "bg-gray-900 border border-transparent", text: "text-white", arrow: "bg-gray-900 border-transparent" },
  light: { box: "bg-white border border-border shadow-md", text: "text-gray-900", arrow: "bg-white border-border" },
};

// KuiReact arrow: "absolute w-2 h-2 rotate-45 border", offset -5px, two borders hidden.
const arrowPlacement: Record<TooltipPlacement, { style: ViewStyle; hide: string }> = {
  top: { style: { bottom: -5, left: "50%", marginLeft: -4 }, hide: "border-t-0 border-l-0" },
  bottom: { style: { top: -5, left: "50%", marginLeft: -4 }, hide: "border-b-0 border-r-0" },
  left: { style: { right: -5, top: "50%", marginTop: -4 }, hide: "border-l-0 border-b-0" },
  right: { style: { left: -5, top: "50%", marginTop: -4 }, hide: "border-r-0 border-t-0" },
};

// A wide, touch-transparent lane beside the trigger lets the tooltip size
// to its content on one line (KuiReact: whitespace-nowrap) instead of being
// squeezed to the trigger's width.
const LANE = 1000;
const lane: Record<TooltipPlacement, ViewStyle> = {
  top: { bottom: "100%", left: "50%", width: LANE, marginLeft: -LANE / 2, marginBottom: 8, alignItems: "center" },
  bottom: { top: "100%", left: "50%", width: LANE, marginLeft: -LANE / 2, marginTop: 8, alignItems: "center" },
  left: { right: "100%", width: LANE, marginRight: 8, alignItems: "flex-end" },
  right: { left: "100%", width: LANE, marginLeft: 8, alignItems: "flex-start" },
};

type TriggerHandlers = {
  onLongPress?: (...a: unknown[]) => void;
  onPressOut?: (...a: unknown[]) => void;
  onHoverIn?: (...a: unknown[]) => void;
  onHoverOut?: (...a: unknown[]) => void;
  onFocus?: (...a: unknown[]) => void;
  onBlur?: (...a: unknown[]) => void;
  accessibilityHint?: string;
};

export type TooltipProps = {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  theme?: TooltipTheme;
  arrow?: boolean;
  /** ms before showing (KuiReact's `delay`). */
  delay?: number;
  children: React.ReactNode;
  className?: string;
};

/**
 * KuiReact shows the tooltip on hover/focus. On touch devices it shows on
 * long-press and hides on release; hover and focus still work on
 * react-native-web. String content is also exposed as the trigger's
 * accessibility hint (KuiReact: aria-describedby).
 */
export function Tooltip({ content, placement = "top", theme = "default", arrow = false, delay = 0, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // KuiReact: "transition-opacity duration-150".
    Animated.timing(opacity, { toValue: visible ? 1 : 0, duration: 150, useNativeDriver: true }).start();
  }, [visible, opacity]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function show() {
    if (delay > 0) timer.current = setTimeout(() => setVisible(true), delay);
    else setVisible(true);
  }
  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  }

  const handlers = { onLongPress: show, onPressOut: hide, onHoverIn: show, onHoverOut: hide, onFocus: show, onBlur: hide };
  const hint = typeof content === "string" ? content : undefined;
  const child = React.isValidElement<TriggerHandlers>(children) ? (
    React.cloneElement(children, {
      accessibilityHint: children.props.accessibilityHint ?? hint,
      ...Object.fromEntries(
        Object.entries(handlers).map(([k, fn]) => [
          k,
          (...a: unknown[]) => {
            (children.props as Record<string, ((...x: unknown[]) => void) | undefined>)[k]?.(...a);
            fn();
          },
        ]),
      ),
    })
  ) : (
    <Pressable accessibilityHint={hint} {...handlers}>
      {children}
    </Pressable>
  );

  const vertical = placement === "left" || placement === "right";
  const t = themeMap[theme];

  return (
    <View className={cn("relative self-start", className)}>
      {child}
      <View
        pointerEvents="none"
        style={[
          { position: "absolute", zIndex: 80, elevation: 8 },
          lane[placement],
          vertical ? { top: "50%", marginTop: -height / 2 } : null,
        ]}
      >
        <Animated.View
          testID="tooltip"
          accessibilityElementsHidden={!visible}
          importantForAccessibility={visible ? "auto" : "no-hide-descendants"}
          onLayout={(e: LayoutChangeEvent) => setHeight(e.nativeEvent.layout.height)}
          style={[{ opacity }, Platform.OS === "android" ? { elevation: 4 } : null]}
        >
          {/* KuiReact: "rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md" */}
          <View className={cn("rounded-md px-2.5 py-1.5 shadow-md", t.box)}>
            {typeof content === "string" ? (
              <Text numberOfLines={1} className={cn("text-xs font-medium", t.text)}>
                {content}
              </Text>
            ) : (
              content
            )}
            {arrow ? (
              <View
                testID="tooltip-arrow"
                className={cn("absolute h-2 w-2 border", t.arrow, arrowPlacement[placement].hide)}
                style={[arrowPlacement[placement].style, { transform: [{ rotate: "45deg" }] }]}
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
