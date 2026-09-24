import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Pressable, View, type ViewProps } from "react-native";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIds?: string[];
  openIds?: string[];
  onChange?: (openIds: string[]) => void;
  allowMultiple?: boolean;
  className?: string;
} & Omit<ViewProps, "children">;

// KuiReact: "h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform duration-200", rotate-180 when open.
function Chevron({ open }: { open: boolean }) {
  const t = useThemeTokens();
  const spin = useRef(new Animated.Value(open ? 1 : 0)).current;
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (cancelled) return;
        if (reduce) spin.setValue(open ? 1 : 0);
        else Animated.timing(spin, { toValue: open ? 1 : 0, duration: 200, useNativeDriver: true }).start();
      })
      .catch(() => spin.setValue(open ? 1 : 0));
    return () => {
      cancelled = true;
    };
  }, [open, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  return (
    <Animated.View
      testID="accordion-chevron"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ transform: [{ rotate }] }}
    >
      <FontAwesomeIcon icon={faChevronDown} size={14} color={t["text-secondary"]} />
    </Animated.View>
  );
}

/**
 * Pixel-for-pixel with KuiReact's Accordion (modules/ui/Accordion.tsx): a
 * `rounded-lg border border-border bg-surface-base` stack of disclosure
 * headers (`px-4 py-3 text-sm font-medium`) with `px-4 pb-4 text-sm
 * text-text-secondary` panels. Single-open by default; `allowMultiple` lets
 * panels open independently. Controlled via `openIds`, or uncontrolled via
 * `defaultOpenIds`. KuiReact's `divide-y` (unsupported by NativeWind) is a
 * `border-t` on every item after the first.
 */
export function Accordion({
  items,
  defaultOpenIds = [],
  openIds: controlledOpenIds,
  onChange,
  allowMultiple = false,
  className,
  ...rest
}: AccordionProps) {
  const [uncontrolledOpenIds, setUncontrolledOpenIds] = useState<string[]>(defaultOpenIds);
  const openIds = controlledOpenIds ?? uncontrolledOpenIds;

  function toggle(id: string) {
    const next = openIds.includes(id)
      ? openIds.filter((x) => x !== id)
      : allowMultiple
        ? [...openIds, id]
        : [id];
    setUncontrolledOpenIds(next);
    onChange?.(next);
  }

  return (
    <View className={cn("overflow-hidden rounded-lg border border-border bg-surface-base", className)} {...rest}>
      {items.map((item, i) => {
        const isOpen = openIds.includes(item.id);
        return (
          <View key={item.id} className={cn(i > 0 && "border-t border-border")}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen, disabled: Boolean(item.disabled) }}
              disabled={item.disabled}
              onPress={() => toggle(item.id)}
              className={cn(
                "w-full flex-row items-center justify-between gap-3 px-4 py-3",
                // KuiReact's hover background becomes the pressed state.
                "active:bg-surface-overlay",
                item.disabled && "opacity-50",
              )}
            >
              <View className="flex-1">
                {typeof item.title === "string" ? (
                  <Text className="text-sm font-medium text-text-primary">{item.title}</Text>
                ) : (
                  item.title
                )}
              </View>
              <Chevron open={isOpen} />
            </Pressable>
            {/* KuiReact: role="region" with hidden={!isOpen}. */}
            {isOpen ? (
              <View accessibilityRole="summary" className="px-4 pb-4">
                {typeof item.content === "string" ? (
                  <Text className="text-sm text-text-secondary">{item.content}</Text>
                ) : (
                  item.content
                )}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
