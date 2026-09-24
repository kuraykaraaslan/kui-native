import type * as React from "react";
import { Pressable, View } from "react-native";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router, type Href } from "expo-router";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type BreadcrumbItem = {
  label: string;
  /** Route pushed with expo-router when the crumb is pressed (KuiReact's `href`). */
  href?: string;
  /** Overrides the `href` navigation. */
  onPress?: () => void;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Breadcrumb (modules/ui/Breadcrumb.tsx): a
 * wrapping `gap-1 text-sm` trail of `text-text-secondary` links, a 10px
 * chevron separator (or a custom `separator`), and the current page last in
 * `text-text-primary font-medium`. `maxItems` collapses the middle into "…".
 */
export function Breadcrumb({ items, separator, maxItems, className }: BreadcrumbProps) {
  const t = useThemeTokens();
  const sep = (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {separator ?? <FontAwesomeIcon icon={faChevronRight} size={10} color={t["text-disabled"]} />}
    </View>
  );

  let displayed = items;
  let truncated = false;
  if (maxItems && items.length > maxItems) {
    truncated = true;
    displayed = [items[0], { label: "…" }, ...items.slice(-(maxItems - 1))];
  }

  return (
    <View role="navigation" aria-label="Breadcrumb" className={className}>
      <View role="list" className="flex-row flex-wrap items-center gap-1">
        {displayed.map((item, i) => {
          const isLast = i === displayed.length - 1;
          const isEllipsis = item.label === "…" && truncated;
          const pressable = !isLast && (item.href || item.onPress);
          return (
            <View key={i} role="listitem" className="flex-row items-center gap-1">
              {pressable ? (
                <Pressable
                  accessibilityRole="link"
                  onPress={item.onPress ?? (() => router.push(item.href as Href))}
                  className="rounded"
                >
                  {/* KuiReact's hover:text-text-primary becomes the pressed colour. */}
                  {({ pressed }) => (
                    <Text className={cn("text-sm", pressed ? "text-text-primary" : "text-text-secondary")}>{item.label}</Text>
                  )}
                </Pressable>
              ) : (
                <Text
                  aria-current={isLast ? "page" : undefined}
                  accessibilityElementsHidden={isEllipsis}
                  importantForAccessibility={isEllipsis ? "no-hide-descendants" : undefined}
                  className={cn("text-sm", isLast ? "font-medium text-text-primary" : "text-text-secondary")}
                >
                  {item.label}
                </Text>
              )}
              {!isLast ? sep : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
